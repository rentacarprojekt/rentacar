package hr.tvz.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;
import hr.tvz.project.service.UserService;

@RestController
@RequestMapping("rac/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> save(@RequestBody final UserRegistrationDto newUser){
		try {
		userService.createNewUser(newUser);
		}
		catch (UsernameOrEmailAlreadyInUseException|EmptyFieldsException e) {
			return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(e.getMessage());
		}
		return new ResponseEntity<String>(HttpStatus.CREATED);
    }
    
    @GetMapping("/username/{username}")
    public UserDetailsDto getUserByUsername(@PathVariable String username) {
    	return userService.getUserByUsername(username);
    }
    
    @GetMapping("/email/{email}")
    public UserDetailsDto getUserByEmail(@PathVariable String email) {
    	return userService.getUserByEmail(email);
    }
    
    @GetMapping("/id/{id}")
    public UserDetailsDto getUserById(@PathVariable Integer id) {
    	return userService.getUserById(id);
    }
    
    @GetMapping("/all")
    public List<UserDetailsDto> getAllUsers() {
    	return userService.getAllUsers();
    }
    
    @PostMapping("/validate")
    public UserDetailsDto validateUser(@RequestBody UserLoginDto user) {
    	return userService.validateUser(user);
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserDetailsDto updatedUser){
    	userService.updateUser(updatedUser);
    	return new ResponseEntity<String>(HttpStatus.ACCEPTED);
    }

}
