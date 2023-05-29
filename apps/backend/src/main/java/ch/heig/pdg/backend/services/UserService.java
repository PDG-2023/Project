package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.UserDTO;
import ch.heig.pdg.backend.dto.mapping.UserMapper;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.UserRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends AbstractService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    protected UserService(InventoryRepository inventoryRepository, UserRepository userRepository, UserMapper userMapper) {
        super(inventoryRepository);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO addUser(UserDTO userDTO) {
        return (UserDTO) this.userMapper.getDTO(
                this.userRepository.save(
                        this.userMapper.createFromDTO(userDTO)
                )
        );
    }

    public UserDTO removeUser(Integer id) {
        User user = this.getEntityIfExists(id, this.userRepository);
        this.userRepository.deleteById(id);
        return (UserDTO) this.userMapper.getDTO(user);
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

    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        return (UserDTO) this.userMapper.getDTO(
                this.userRepository.save(
                        this.userMapper.updateFromDTO(
                                this.getEntityIfExists(id, this.userRepository),
                                userDTO
                        )
                )
        );
    }
}