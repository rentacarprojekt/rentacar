package hr.tvz.project.service;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserDetailsDto createNewUser(UserRegistrationDto newUser) throws UsernameOrEmailAlreadyInUseException;

    UserDetailsDto getUserByUsername(String username);

    UserDetailsDto getUserByEmail(String email);

    UserDetailsDto getUserById(Integer id);

    List<UserDetailsDto> getAllUsers();

    UserDetailsDto authenticateUser(UserLoginDto user);

    UserDetailsDto updateUser(UserDetailsDto updatedUser);

}
