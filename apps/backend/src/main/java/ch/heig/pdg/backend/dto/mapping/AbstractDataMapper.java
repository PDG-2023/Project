package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.entities.AbstractEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.openapitools.jackson.nullable.JsonNullable;

public abstract class AbstractDataMapper {

    @PersistenceContext
    protected EntityManager entityManager;

    protected JsonNullable<Integer> idOrNull(AbstractEntity entity) {
        return JsonNullable.of(entity != null ? entity.getId() : null);
    }
}
