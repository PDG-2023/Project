package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepositoryImpl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LocationRepository extends CrudRepository<Location, Integer>, PagingAndSortingRepository<Location, Integer>, CriteriaRepository<Location, Integer> {
}
