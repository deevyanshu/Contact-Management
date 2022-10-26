package com.deevyanshu.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.deevyanshu.entity.Authentication;
import com.deevyanshu.entity.Contact;
import com.deevyanshu.entity.User;
import com.deevyanshu.repository.ContactRepository;
import com.deevyanshu.repository.UserRepository;
import com.deevyanshu.exception.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@GetMapping("/auth")
	@PreAuthorize("hasAnyRole('user','admin')")
	public Authentication auth()
	{
		return new Authentication("authenticated");
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user)
	{
		user.setEnabled(true);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_user");
		return userRepository.save(user);
		
	}
	
	@GetMapping("/welcome")
	@PreAuthorize("hasRole('user')")
	public String welcome()
	{
		return "welcome";
	}
	
	/*@GetMapping("/{name}")
	public User getUser(@PathVariable("name") String name)
	{
		return userRepository.getUserByUserName(name);
	}*/
	
	@GetMapping("/{name}")
	@PreAuthorize("hasAnyRole('user','admin')")
	public ResponseEntity<User> getUser(@PathVariable("name") String name)
	{
		User user=userRepository.getUserByUserName(name);
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/contacts")
	@PreAuthorize("hasAnyRole('user','admin')")
	public List<Contact> showAllContacts(String name)
	{
		User user=userRepository.getUserByUserName(name);
		return user.getContacts();
	}
	
	@PostMapping("/add")
	@PreAuthorize("hasAnyRole('user','admin')")
	public Contact addContact(@RequestBody Contact contact,String name)
	{
		User user=userRepository.getUserByUserName(name);
		contact.setUser(user);
		user.getContacts().add(contact);
		return contactRepository.save(contact);
		
	}
	
	@DeleteMapping("/contacts/{cid}")
	@PreAuthorize("hasAnyRole('user','admin')")
	public Contact delete(@PathVariable("cid") int cid)
	{
		Contact c=contactRepository.findById(cid).get();
		contactRepository.delete(c);
		return c;
	}
	
	@PutMapping("/update/{cid}")
	@PreAuthorize("hasAnyRole('user','admin')")
	public Contact update(@PathVariable("cid") int cid,@RequestBody Contact c,String name)
	{
		User user=userRepository.getUserByUserName(name);
		c.setUser(user);
		return contactRepository.save(c);
	}
	
	@GetMapping("/contacts/{cid}")
	@PreAuthorize("hasAnyRole('user','admin')")
	public Contact contactById(@PathVariable("cid") int cid) {
		return contactRepository.findById(cid).get();
	}

}
