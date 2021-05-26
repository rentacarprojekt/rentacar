package hr.tvz.project.service;

import org.springframework.stereotype.Service;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;

@Service
public interface UserService {
	
	public UserDetailsDto createNewUser(UserRegistrationDto newUser) throws UsernameOrEmailAlreadyInUseException;

}
