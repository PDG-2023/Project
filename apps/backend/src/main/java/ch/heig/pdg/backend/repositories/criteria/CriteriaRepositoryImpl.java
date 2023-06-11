package ch.heig.pdg.backend.repositories.criteria;

import ch.heig.pdg.backend.exception.exceptions.BadRequestException;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

public class CriteriaRepositoryImpl<T, ID> implements CriteriaRepository<T, ID> {
    @PersistenceContext
    private EntityManager entityManager;

    public List<T> findByFilter(HugoSearchFilter<T> filter) {
        return this.findByFilter(filter, null);
    }

    public Integer count(HugoSearchFilter<T> filter, Integer inventoryId) {
        return this.findByFilter(filter, inventoryId, false).size();
    }

    public Integer count(HugoSearchFilter<T> filter) {
        return this.findByFilter(filter, null, false).size();
    }

    public List<T> findByFilter(HugoSearchFilter<T> filter, Integer inventoryId) {
        return this.findByFilter(filter, null, true);
    }

    private List<T> findByFilter(HugoSearchFilter<T> filter, Integer inventoryId, boolean addLimitOffset) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(filter.klass());
        Root<T> root = criteriaQuery.from(filter.klass());

        Integer maxResults = null;
        Integer firstResult = null;
        List<Order> ordering = new ArrayList<>();

        if (!filter.hasFilters()) {
            criteriaQuery.select(root);
        } else {
            List<Predicate> conditions = new ArrayList<>();

            for (Map.Entry<String, String> filters : filter.filters().entrySet()) {
                criteriaQuery.select(root);
                String filterContent = filters.getKey();
                String filterValue = filters.getValue();
                Date dateFilterValue = null;
                try {
                    LocalDateTime ta = LocalDateTime.parse(filterValue, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                    dateFilterValue = Date.from(ta.atZone(ZoneId.systemDefault()).toInstant());
                } catch (DateTimeParseException ignored) {
                }

                if (filterContent.startsWith("where")) {
                    String where = filterContent.replace("where[", "").replaceAll("]$", "");
                    String fieldName = where.split("\\$")[0].replace("][", ".");
                    String fieldComparison = where.split("\\$")[1];
                    Path<T> nestedPath = null;

                    for (String nestedName : fieldName.split("\\.")) {
                        if (nestedPath == null) {
                            nestedPath = root.get(nestedName);
                        } else {
                            nestedPath = nestedPath.get(nestedName);
                        }
                    }

                    //@formatter:off
                    if (dateFilterValue == null) {
                        Comparable<?> value = filterValue;

                        // Enum type will fail the query if set as a string
                        if (nestedPath != null
                            && nestedPath.getModel() != null
                            && nestedPath.getModel().getBindableJavaType().isEnum()
                        ) {
                            // Dates can not be enum values
                            value = Enum.valueOf((Class) nestedPath.getModel().getBindableJavaType(), filterValue);
                        }

                        // Only if the datatype is an integer
                        // TODO: same for date?
                        // TODO: for string?
                        boolean isNull = nestedPath.getModel() != null
                                && nestedPath.getModel().getBindableJavaType() == Integer.class
                                && (filterValue.equals("null") || filterValue.equals(""));

                        conditions.add(
                            switch (fieldComparison) {
                                case "eq" -> isNull ? criteriaBuilder.isNull(nestedPath) : criteriaBuilder.equal(nestedPath, value);
                                case "neq" -> isNull ? criteriaBuilder.isNotNull(nestedPath) : criteriaBuilder.notEqual(nestedPath, value);
                                case "lte" -> criteriaBuilder.lessThanOrEqualTo(nestedPath.as(String.class), filterValue);
                                case "gte" -> criteriaBuilder.greaterThanOrEqualTo(nestedPath.as(String.class), filterValue);
                                case "lt" -> criteriaBuilder.lessThan(nestedPath.as(String.class), filterValue);
                                case "gt" -> criteriaBuilder.greaterThan(nestedPath.as(String.class), filterValue);
                                case "like" -> criteriaBuilder.like(nestedPath.as(String.class), filterValue);
                                default -> throw new BadRequestException("Unexpected value: " + fieldComparison);
                            }
                        );
                    } else {
                        conditions.add(
                            switch (fieldComparison) {
                                case "eq" -> criteriaBuilder.equal(nestedPath, dateFilterValue);
                                case "neq" -> criteriaBuilder.notEqual(nestedPath, dateFilterValue);
                                case "lte" -> criteriaBuilder.lessThanOrEqualTo(nestedPath.as(Date.class), dateFilterValue);
                                case "gte" -> criteriaBuilder.greaterThanOrEqualTo(nestedPath.as(Date.class), dateFilterValue);
                                case "lt" -> criteriaBuilder.lessThan(nestedPath.as(Date.class), dateFilterValue);
                                case "gt" -> criteriaBuilder.greaterThan(nestedPath.as(Date.class), dateFilterValue);
                                default -> throw new BadRequestException("Unexpected value: " + fieldComparison);
                            }
                        );
                    }
                    //@formatter:on
                } else if (filterContent.startsWith("limit")) {
                    maxResults = Integer.parseInt(filterValue);
                } else if (filterContent.startsWith("offset")) {
                    firstResult = Integer.parseInt(filterValue);
                } else if (filterContent.startsWith("order")) {
                    String fieldToOrderBy = filterContent.replace("order[", "").replaceAll("]$", "");
                    if (Objects.equals(filterValue, "asc")) {
                        ordering.add(criteriaBuilder.asc(root.get(fieldToOrderBy)));
                    } else if (Objects.equals(filterValue, "desc")) {
                        ordering.add(criteriaBuilder.desc(root.get(fieldToOrderBy)));
                    } else {
                        throw new BadRequestException("Invalid ordering " + filterValue);
                    }
                } else {
                    throw new BadRequestException("Invalid filter");
                }
            }

            if (!conditions.isEmpty()) {
                criteriaQuery.where(conditions.toArray(new Predicate[conditions.size()]));
            }
        }

        criteriaQuery.orderBy(ordering);
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery.distinct(true));

        if (addLimitOffset) {
            if (maxResults != null) {
                query.setMaxResults(maxResults);
            }

            if (firstResult != null) {
                query.setFirstResult(firstResult);
            }
        }

        return query.getResultList();
    }
}
