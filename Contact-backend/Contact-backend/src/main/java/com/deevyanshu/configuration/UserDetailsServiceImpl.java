package com.deevyanshu.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.deevyanshu.entity.User;
import com.deevyanshu.repository.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user=repository.getUserByUserName(username);
		if(user==null)
		{
			throw new UsernameNotFoundException("no user found");
		}else
		{
			return new CustomUserDetails(user);
		}
	}

}
