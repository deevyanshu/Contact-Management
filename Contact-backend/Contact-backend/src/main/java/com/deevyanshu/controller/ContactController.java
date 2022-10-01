package com.deevyanshu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deevyanshu.entity.Contact;
import com.deevyanshu.repository.ContactRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/v1/user")
public class ContactController {
	
	@Autowired
	private ContactRepository repository;
	
	

}
