package com.example.os.Service;

import com.example.os.Entity.hotel;
import com.example.os.Repository.hotelrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class hotelservice {

    @Autowired
    private hotelrepository repository;

    public hotel save(hotel hotel) {
        return repository.save(hotel);
    }

    public List<hotel> getAll() {
        return repository.findAll();
    }
}