package hr.tvz.project.controller;

import hr.tvz.project.dto.UserDetailsDto;
import hr.tvz.project.dto.UserLoginDto;
import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rac/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<String> saveUser(@RequestBody final UserRegistrationDto newUser){
		try {
		userService.createNewUser(newUser);
		}
		catch (UsernameOrEmailAlreadyInUseException|EmptyFieldsException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
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

    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody UserDetailsDto updatedUser){
    	userService.updateUser(updatedUser);
    	return new ResponseEntity<String>(HttpStatus.ACCEPTED);
    }

}
