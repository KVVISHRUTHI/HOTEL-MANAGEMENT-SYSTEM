package com.example.os.Service;

import com.example.os.Entity.customer;
import com.example.os.Repository.customerrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class customerservice {

    @Autowired
    private customerrepository repository;

    public customer save(customer customer) {
        return repository.save(customer);
    }

    public List<customer> getAll() {
        return repository.findAll();
    }
}