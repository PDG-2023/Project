package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.UserDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class UserMapper extends AbstractDataMapper implements IDataTransferObjectManager<User> {
    @Override
    public IDataTransferObject<User> getDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setCreated(DateFormatUtil.dateToString(user.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(user.getUpdatedAt()));
        dto.setOwnedInventories(this.getIdsOrEmptyList(user.getOwnedInventories()));
        dto.setSharedInventories(this.getIdsOrEmptyList(user.getSharedInventories()));
        return dto;
    }

    @Override
    public User createFromDTO(IDataTransferObject<User> dto) {
        return this.updateFromDTO(new User(), dto);
    }

    @Override
    public User updateFromDTO(User user, IDataTransferObject<User> dto) {
        UserDTO userDTO = (UserDTO) dto;
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        // FIXME: change password maybe ?

        user.setSharedInventories(this.getReferences(userDTO.getSharedInventories(), Inventory.class));
        user.setOwnedInventories(this.getReferences(userDTO.getOwnedInventories(), Inventory.class));
        return user;
    }
}
