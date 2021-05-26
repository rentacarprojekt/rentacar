package hr.tvz.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;

@Component
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetailsDto createNewUser(UserRegistrationDto newUser) throws UsernameOrEmailAlreadyInUseException {
		boolean usernameInUse = userRepository.findByUsernameLike(newUser.getUsername())!=null;
		boolean emailInUse = userRepository.findByEmailLike(newUser.getEmail())!=null;
		if(newUser.getFirstName()==null || newUser.getLastName() == null || newUser.getEmail() == null || newUser.getUsername() == null || newUser.getPassword() == null)
			throw new EmptyFieldsException("Neka polja su prazna");
		else if(usernameInUse && emailInUse)
			throw new UsernameOrEmailAlreadyInUseException("Korisničko ime i email se već koriste");
		else if(usernameInUse)
			throw new UsernameOrEmailAlreadyInUseException("Korisničko ime se već koristi");
		else if(emailInUse)
			throw new UsernameOrEmailAlreadyInUseException("Email se već koristi");
		return new UserDetailsDto(userRepository.save(new User(newUser)));
	}

	@Override
	public UserDetailsDto getUserByUsername(String username) {
		User user = userRepository.findByUsernameLike(username);
		if(user!=null)
			return new UserDetailsDto(user);
		else
			return null;
	}

	@Override
	public UserDetailsDto getUserByEmail(String email) {
		User user = userRepository.findByEmailLike(email);
		if(user!=null)
			return new UserDetailsDto(user);
		else
			return null;
	}
	
	@Override
	public UserDetailsDto getUserById(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		if(user!=null)
			return new UserDetailsDto(user);
		else
			return null;
	}
	
	@Override
	public List<UserDetailsDto> getAllUsers() {
		List<UserDetailsDto> userList = userRepository.findAll().stream().map(user->new UserDetailsDto(user)).collect(Collectors.toList());
		return userList;
	}

}
