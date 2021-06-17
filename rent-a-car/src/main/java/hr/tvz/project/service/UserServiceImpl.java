package hr.tvz.project.service;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserServiceImpl implements UserService {
	

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

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
		return userRepository.findAll().stream().map(UserDetailsDto::new).collect(Collectors.toList());
	}

	@Override
	public UserDetailsDto authenticateUser(UserLoginDto user) {
		User validatedUser = userRepository.findByUsernameLikeAndPasswordLike(user.getUsername(), user.getPassword());
		if(validatedUser!=null)
			return new UserDetailsDto(validatedUser);
		else
			return null;
	}

	@Override
	public UserDetailsDto updateUser(UserDetailsDto updatedUser) {
		User user = userRepository.findByEmailLike(updatedUser.getEmail());
		user.setAddress(updatedUser.getAddress());
		user.setBio(updatedUser.getBio());
		user.setImagePath(updatedUser.getImagePath());
		user.setPhoneNumber(updatedUser.getPhoneNumber());
		user.setRole(updatedUser.getRole());
		userRepository.save(user);
		return updatedUser;
	}

}
