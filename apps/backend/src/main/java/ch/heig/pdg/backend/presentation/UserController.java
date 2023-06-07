package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.UserDTO;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.services.UserService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController extends AbstractController implements ch.heig.pdg.backend.api.UserApi {
    private final UserService userService;

    public UserController(HttpServletRequest httpServletRequest, UserService userService) {
        super(httpServletRequest);
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserDTO> createUser(UserDTO userDTO) {
        return new ResponseEntity<>(
                this.userService.addUser(userDTO),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<UserDTO> deleteUser(Integer id) {
        return new ResponseEntity<>(
                this.userService.removeUser(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<UserDTO> getUser(Integer id) {
        return new ResponseEntity<>(
                this.userService.getUser(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<List<UserDTO>> getUsers() {
        HugoSearchFilter<User> filter = HugoSearchFilter.build(this.httpServletRequest, User.class);

        List<UserDTO> users = this.userService.getUsers(filter);
        return new ResponseEntity<>(
                users,
                new LinkedMultiValueMap<>(Map.of("X-Total", List.of(String.format("%d", users.size())))),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<UserDTO> updateUser(Integer id, UserDTO userDTO) {
        return new ResponseEntity<>(
                this.userService.updateUser(id, userDTO),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<UserDTO> getCurrentUser() {
        return new ResponseEntity<>(
                this.userService.getCurrentUser(),
                HttpStatus.OK
        );
    }
}
