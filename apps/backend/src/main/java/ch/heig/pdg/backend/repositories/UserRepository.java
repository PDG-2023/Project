package ch.heig.pdg.backend.repositories;

import ch.heig.pdg.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>, PagingAndSortingRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    void deleteByUsername(String username);
}
