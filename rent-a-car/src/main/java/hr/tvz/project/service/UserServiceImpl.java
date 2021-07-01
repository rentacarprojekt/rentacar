package hr.tvz.project.service;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserServiceImpl implements UserService {
	

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Autowired
    private PasswordEncoder passwordEncoder;

	@Override
	public UserDetailsDto createNewUser(UserRegistrationDto newUser) throws UsernameOrEmailAlreadyInUseException {
		newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
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
		var user = userRepository.findByUsernameLike(username);
		if(user!=null)
			return new UserDetailsDto(user);
		else
			return null;
	}

	@Override
	public UserDetailsDto getUserByEmail(String email) {
		var user = userRepository.findByEmailLike(email);
		if(user!=null)
			return new UserDetailsDto(user);
		else
			return null;
	}
	
	@Override
	public UserDetailsDto getUserById(Integer id) {
		var user = userRepository.findById(id).orElse(null);
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
		var validatedUser = userRepository.findByUsernameLikeAndPasswordLike(user.getUsername(), user.getPassword());
		if(validatedUser!=null)
			return new UserDetailsDto(validatedUser);
		else
			return null;
	}

	@Override
	public UserDetailsDto updateUser(UserDetailsDto updatedUser) {
		var user = userRepository.findByEmailLike(updatedUser.getEmail());
		user.setAddress(updatedUser.getAddress());
		user.setBio(updatedUser.getBio());
		user.setImagePath(updatedUser.getImagePath());
		user.setPhoneNumber(updatedUser.getPhoneNumber());
		user.setRole(updatedUser.getRole());
		userRepository.save(user);
		return updatedUser;
	}

	@Override
	public void changeImage(String username, MultipartFile image) {
			var user = userRepository.findByUsernameLike(username);
			String filePath = "C:\\Users\\Bruno\\Documents\\faks\\rent-a-car-projekt\\rent-a-car-frontend\\public\\images\\" + username + ".jpg";
			var dest = new File(filePath);
			if(!dest.exists())
		    {
		       new File(filePath).mkdir();
		    }
		       try {
				image.transferTo(dest);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
		    user.setImagePath("\\images\\" + username + ".jpg");
		    userRepository.save(user);
			
	}

}
