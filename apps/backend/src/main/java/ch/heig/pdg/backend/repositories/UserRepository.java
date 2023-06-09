package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.repositories.criteria.CriteriaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>, PagingAndSortingRepository<User, Integer>, CriteriaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    void deleteByUsername(String username);
}
