package hr.tvz.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.model.User;
import hr.tvz.project.repository.UserRepository;
import hr.tvz.project.service.UserService;

@RestController
@RequestMapping("rac")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public void save(@Validated @RequestBody final UserRegistrationDto newUser){
		userService.createNewUser(newUser);
    }

}
