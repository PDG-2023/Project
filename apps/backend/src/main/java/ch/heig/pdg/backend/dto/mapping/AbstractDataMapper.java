package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.entities.AbstractEntity;
import ch.heig.pdg.backend.exception.exceptions.NotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

abstract public class AbstractDataMapper {

    @PersistenceContext
    protected EntityManager entityManager;

    protected JsonNullable<Integer> idOrNull(AbstractEntity entity) {
        return JsonNullable.of(entity != null ? entity.getId() : null);
    }
}
