package hr.tvz.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.project.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;	

}
