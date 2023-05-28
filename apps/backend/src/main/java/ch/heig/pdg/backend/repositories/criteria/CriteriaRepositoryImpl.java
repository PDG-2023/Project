package ch.heig.pdg.backend.repositories.criteria;

import ch.heig.pdg.backend.exception.exceptions.BadRequestException;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class CriteriaRepositoryImpl<T, ID> implements CriteriaRepository<T, ID> {
    @PersistenceContext
    private EntityManager entityManager;

    public List<T> findByFilter(HugoSearchFilter<T> filter) {
        return this.findByFilter(filter, null);
    }

    public List<T> findByFilter(HugoSearchFilter<T> filter, Integer inventoryId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(filter.klass());
        Root<T> root = criteriaQuery.from(filter.klass());

        Integer maxResults = null;
        Integer firstResult = null;

        if (!filter.hasFilters()) {
            criteriaQuery.select(root);
        } else {
            for (Map.Entry<String, String> filters : filter.filters().entrySet()) {
                criteriaQuery.select(root);
                String filterContent = filters.getKey();
                String filterValue = filters.getValue();

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

                    criteriaQuery.where(
                            switch (fieldComparison) {
                                case "eq" -> criteriaBuilder.equal(nestedPath, filterValue);
                                case "neq" -> criteriaBuilder.notEqual(nestedPath, filterValue);
                                case "lte" ->
                                        criteriaBuilder.lessThanOrEqualTo(nestedPath.as(String.class), filterValue);
                                case "gte" ->
                                        criteriaBuilder.greaterThanOrEqualTo(nestedPath.as(String.class), filterValue);
                                case "lt" -> criteriaBuilder.lessThan(nestedPath.as(String.class), filterValue);
                                case "gt" -> criteriaBuilder.greaterThan(nestedPath.as(String.class), filterValue);
                                default -> throw new BadRequestException("Unexpected value: " + fieldComparison);
                            }
                    );
                } else if (filterContent.startsWith("limit")) {
                    maxResults = Integer.parseInt(filterValue);
                } else if (filterContent.startsWith("offset")) {
                    firstResult = Integer.parseInt(filterValue);
                } else if (filterContent.startsWith("order")) {
                    // TODO: Implement later
                } else {
                    throw new BadRequestException("Invalid filter");
                }
            }
        }

        TypedQuery<T> query = entityManager.createQuery(criteriaQuery);

        if (maxResults != null && firstResult != null) {
            query.setFirstResult(firstResult).setMaxResults(maxResults);
        }

        return query.getResultList();
    }
}
