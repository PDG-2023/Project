package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends CrudRepository<Location, Integer>, PagingAndSortingRepository<Location, Integer>, CriteriaRepository<Location, Integer> {
    @Query("SELECT l FROM Location l WHERE l.inventory.id = :inventoryId AND (l.name LIKE %:searchTerm% OR l.description LIKE %:searchTerm%)")
    List<Location> search(Integer inventoryId, String searchTerm);
}
