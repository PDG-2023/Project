package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.entities.AbstractEntity;
import ch.heig.pdg.backend.exception.exceptions.NotFoundException;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

abstract public class AbstractDataMapper {
    protected <T> T getEntityIfExists(Integer id, CrudRepository<T, Integer> repository) {
        Optional<T> entity = repository.findById(id);

        if (entity.isEmpty()) {
            throw new NotFoundException("Entity does not exist");
        }

        return entity.get();
    }

    protected JsonNullable<Integer> idOrNull(AbstractEntity entity) {
        return JsonNullable.of(entity != null ? entity.getId() : null);
    }
}
