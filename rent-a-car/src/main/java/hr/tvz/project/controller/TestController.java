package hr.tvz.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.project.model.Test;
import hr.tvz.project.repository.TestRepository;

@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	TestRepository testRepository;
	
	@GetMapping("/test")
	public List<Test> getAll(){
		return testRepository.findAll();
	}
	
}
