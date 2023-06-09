package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemModelRepository extends CrudRepository<ItemModel, Integer>, PagingAndSortingRepository<ItemModel, Integer>, CriteriaRepository<ItemModel, Integer> {
    @Query("SELECT im FROM ItemModel im WHERE im.inventory.id = :inventoryId AND (im.name LIKE %:searchTerm% OR im.description LIKE %:searchTerm%)")
    List<ItemModel> search(Integer inventoryId, String searchTerm);
}
