package com.example.os.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.os.Entity.customer;
import com.example.os.Service.customerservice;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "*")
public class customercontroller {

    @Autowired
    private customerservice service;

    @PostMapping
    public customer save(@RequestBody customer customer) {
        return service.save(customer);
    }

    @GetMapping
    public List<customer> getAll() {
        return service.getAll();
    }
}