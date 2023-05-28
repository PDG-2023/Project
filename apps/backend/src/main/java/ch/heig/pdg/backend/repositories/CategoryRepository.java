package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer>, PagingAndSortingRepository<Category, Integer>, CriteriaRepository<Category> {
}
