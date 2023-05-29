package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Location;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LocationRepository extends CrudRepository<Location, Integer>, PagingAndSortingRepository<Location, Integer>, CriteriaRepository<Location> {
}
