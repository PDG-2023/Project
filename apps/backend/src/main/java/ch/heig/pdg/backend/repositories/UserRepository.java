package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>, PagingAndSortingRepository<User, Integer>, CriteriaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    void deleteByUsername(String username);

    @Query("SELECT u FROM User u WHERE :inventoryId IN (SELECT i1.id FROM Inventory i1 WHERE i1.owner = u OR u MEMBER OF i1.users) AND (u.firstName LIKE %:searchTerm% OR u.lastName LIKE %:searchTerm%)")
    List<User> search(Integer inventoryId, String searchTerm);
}
