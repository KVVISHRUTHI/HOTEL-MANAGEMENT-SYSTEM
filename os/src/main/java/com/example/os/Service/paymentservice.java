package com.example.os.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.os.Entity.payment;
import com.example.os.Repository.paymentrepository;

@Service
public class paymentservice {

    @Autowired
    private paymentrepository repository;

    public payment save(payment payment) {
        return repository.save(payment);
    }

    public List<payment> getAll() {
        return repository.findAll();
    }
}