package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.UserDTO;
import ch.heig.pdg.backend.dto.mapping.UserMapper;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.exception.exceptions.ForbiddenOperationException;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.UserRepository;
import ch.heig.pdg.backend.security.utils.CurrentUser;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService extends AbstractService {
    private final UserRepository userRepository;
    private final CurrentUser currentUser;
    private final UserMapper userMapper;

    protected UserService(InventoryRepository inventoryRepository, UserRepository userRepository, CurrentUser currentUser, UserMapper userMapper) {
        super(inventoryRepository);
        this.userRepository = userRepository;
        this.currentUser = currentUser;
        this.userMapper = userMapper;
    }

    public UserDTO addUser(UserDTO userDTO) {
        User user = this.userRepository.save(
                this.userMapper.createFromDTO(userDTO)
        );
        UserDTO newUserDTO = (UserDTO) this.userMapper.getDTO(
                user
        );

        Inventory inventory = new Inventory();
        inventory.setOwner(user);
        inventory.setName(user.getFirstName() + "'s pouch of wonders");

        this.inventoryRepository.save(inventory);

        return newUserDTO;
    }

    public List<UserDTO> search(Integer inventoryId, String searchTerm) {
        return this.userRepository
                .search(inventoryId, searchTerm)
                .stream()
                .map(u -> (UserDTO) this.userMapper.getDTO(u))
                .collect(Collectors.toList());
    }

    public UserDTO removeUser(Integer id) {
        if (!Objects.equals(this.currentUser.getCurrentUserData().userId, id)) {
            throw new ForbiddenOperationException("Can not remove other user");
        }
        UserDTO userDTO = (UserDTO) this.userMapper.getDTO(this.getEntityIfExists(id, this.userRepository));
        this.userRepository.deleteById(id);
        return userDTO;
    }

    public UserDTO getUser(Integer id) {
        return (UserDTO) this.userMapper.getDTO(
                this.getEntityIfExists(id, this.userRepository)
        );
    }

    public List<UserDTO> getUsers(HugoSearchFilter<User> filter) {
        return this.userRepository
                .findByFilter(filter)
                .stream()
                .map(u -> (UserDTO) this.userMapper.getDTO(u))
                .collect(Collectors.toList());
    }

    public Integer getUsersCount(HugoSearchFilter<User> filter) {
        return this.userRepository.count(filter);
    }

    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        if (!Objects.equals(this.currentUser.getCurrentUserData().userId, id)) {
            throw new ForbiddenOperationException("Can not update other user");
        }
        return (UserDTO) this.userMapper.getDTO(
                this.userRepository.save(
                        this.userMapper.updateFromDTO(
                                this.getEntityIfExists(id, this.userRepository),
                                userDTO
                        )
                )
        );
    }

    public UserDTO getCurrentUser() {
        return (UserDTO) this.userMapper.getDTO(
                this.getEntityIfExists(this.currentUser.getCurrentUserData().userId, this.userRepository)
        );
    }
}
