package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.entities.AbstractEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.openapitools.jackson.nullable.JsonNullable;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractDataMapper {
    @PersistenceContext
    protected EntityManager entityManager;

    protected JsonNullable<Integer> getIdOrNull(AbstractEntity entity) {
        return JsonNullable.of(entity != null ? entity.getId() : null);
    }

    protected <T extends AbstractEntity> List<Integer> getIdsOrEmptyList(List<T> entities) {
        if (entities == null || entities.isEmpty()) {
            return List.of();
        }

        return entities.stream().map(AbstractEntity::getId).collect(Collectors.toList());
    }

    protected <T extends AbstractEntity> List<T> getReferences(List<Integer> ids, Class<T> obj) {
        if (ids == null || ids.isEmpty()) {
            return null;
        }

        return ids.stream().map(e -> this.entityManager.getReference(obj, e)).collect(Collectors.toList());
    }

    protected <T extends AbstractEntity> T getReference(Integer id, Class<T> obj) {
        if (id == null) {
            return null;
        }

        return this.entityManager.getReference(obj, id);
    }
}
