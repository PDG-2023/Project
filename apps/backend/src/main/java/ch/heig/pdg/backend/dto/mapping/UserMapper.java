package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper extends AbstractDataMapper implements IDataTransferObjectManager<User> {
    @Override
    public IDataTransferObject<User> getDTO(User object) {
        return null;
    }

    @Override
    public User createFromDTO(IDataTransferObject<User> dto) {
        return null;
    }

    @Override
    public User updateFromDTO(User object, IDataTransferObject<User> dto) {
        return null;
    }
}
