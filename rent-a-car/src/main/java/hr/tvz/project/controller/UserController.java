package hr.tvz.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.exceptions.EmptyFieldsException;
import hr.tvz.project.exceptions.UsernameOrEmailAlreadyInUseException;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;
import hr.tvz.project.service.UserService;

@RestController
@RequestMapping("rac")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService userService;

    @PostMapping
    public ResponseEntity save(@RequestBody final UserRegistrationDto newUser){
		try {
		userService.createNewUser(newUser);
		}
		catch (UsernameOrEmailAlreadyInUseException|EmptyFieldsException e) {
			return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(e.getMessage());
		}
		return new ResponseEntity(HttpStatus.CREATED);
    }

}
