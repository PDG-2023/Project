package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ItemRepository extends CrudRepository<Item, Integer>, PagingAndSortingRepository<Item, Integer>, CriteriaRepository<Item> {
}
