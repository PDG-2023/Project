package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Movement;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepositoryImpl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface MovementRepository extends CrudRepository<Movement, Integer>, PagingAndSortingRepository<Movement, Integer>, CriteriaRepository<Movement, Integer> {
}
