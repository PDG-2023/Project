package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.ItemModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ItemModelRepository extends CrudRepository<ItemModel, Integer>, PagingAndSortingRepository<ItemModel, Integer>, CriteriaRepository<ItemModel> {
}
