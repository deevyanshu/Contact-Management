package com.deevyanshu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deevyanshu.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer>{

}
