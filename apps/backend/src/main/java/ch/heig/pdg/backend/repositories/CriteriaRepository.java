package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.utils.HugoSearchFilter;

import java.util.List;

public interface CriteriaRepository<T> {
    default List<T> findByFilter(HugoSearchFilter<T> filter) {
        return this.findByFilter(filter, null);
    }

    default List<T> findByFilter(HugoSearchFilter<T> filter, Integer inventoryId) {
        return List.of();
    }
}
