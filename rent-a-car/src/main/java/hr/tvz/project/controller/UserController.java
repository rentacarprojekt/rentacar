package hr.tvz.project.controller;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rac/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


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