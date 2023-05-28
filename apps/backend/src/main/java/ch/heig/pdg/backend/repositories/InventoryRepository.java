package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepositoryImpl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer>, PagingAndSortingRepository<Inventory, Integer>, CriteriaRepository<Inventory, Integer> {
}
