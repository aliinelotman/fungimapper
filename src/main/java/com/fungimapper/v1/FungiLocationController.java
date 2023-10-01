package com.fungimapper.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class FungiLocationController {

    @Autowired
    FungiLocationRepository fungiLocationRepository;

    @GetMapping("all-fungi")
    public ResponseEntity<List<FungiLocation>> getAllLocations(){
        return ResponseEntity.ok().body(fungiLocationRepository.findAll());
    }

    @GetMapping("fungi/{id}")
    public ResponseEntity<FungiLocation> getOneLocation(@PathVariable Long id){
        return ResponseEntity.ok().body(fungiLocationRepository.findById(id).get());
    }

    @DeleteMapping("fungi/{id}")
    public ResponseEntity<List<FungiLocation>> deleteOneLocation(@PathVariable Long id){
        fungiLocationRepository.deleteById(id);
        return ResponseEntity.ok().body(fungiLocationRepository.findAll());
    }

    @PostMapping("fungi")
    public ResponseEntity<List<FungiLocation>> addLocation(@RequestBody FungiLocation fungiLocation) {
        if (fungiLocation.getId() == null || fungiLocationRepository.findById(fungiLocation.getId()).isEmpty()) {
            fungiLocationRepository.save(fungiLocation);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(fungiLocationRepository.findAll());
    }


    @PutMapping("fungi")
    public ResponseEntity<List<FungiLocation>> editLocation(@RequestBody FungiLocation fungiLocation) {
        if (fungiLocationRepository.findById(fungiLocation.getId()).isPresent()) {
            fungiLocationRepository.save(fungiLocation);
        }
        return ResponseEntity.ok().body(fungiLocationRepository.findAll());
    }

}
