package com.example.os.Controller;

import com.example.os.Entity.customer;
import com.example.os.Service.customerservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
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