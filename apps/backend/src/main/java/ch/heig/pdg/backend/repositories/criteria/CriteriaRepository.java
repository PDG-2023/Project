package ch.heig.pdg.backend.repositories.criteria;

import ch.heig.pdg.backend.utils.HugoSearchFilter;

import java.util.List;

public interface CriteriaRepository<T, ID> {
    List<T> findByFilter(HugoSearchFilter<T> filter, Integer inventoryId);

    List<T> findByFilter(HugoSearchFilter<T> filter);

    Integer count(HugoSearchFilter<T> filter);

    Integer count(HugoSearchFilter<T> filter, Integer inventoryId);
}
