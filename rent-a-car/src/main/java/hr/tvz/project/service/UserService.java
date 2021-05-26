package hr.tvz.project.service;

import org.springframework.stereotype.Service;

import hr.tvz.project.dto.UserRegistrationDto;

@Service
public interface UserService {
	
	public void createNewUser(UserRegistrationDto newUser);

}
