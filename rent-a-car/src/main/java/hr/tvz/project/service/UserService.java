package hr.tvz.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;

@Service
public interface UserService {
	
	public UserDetailsDto createNewUser(UserRegistrationDto newUser) throws UsernameOrEmailAlreadyInUseException;
	public UserDetailsDto getUserByUsername(String username);
	public UserDetailsDto getUserByEmail(String email);
	public UserDetailsDto getUserById(Integer id);
	public List<UserDetailsDto> getAllUsers();

}
