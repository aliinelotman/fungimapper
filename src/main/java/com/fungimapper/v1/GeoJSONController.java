package com.fungimapper.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
import java.util.List;

@RestController

public class GeoJSONController {

    @Autowired GeoJSONRepository geoJSONRepository;

    @GetMapping("all-fungi")
    public ResponseEntity<List<FungiLocation>> getAllLocations(){
        return ResponseEntity.ok().body(geoJSONRepository.findAll());
    }

    @GetMapping("fungi/{id}")
    public ResponseEntity<FungiLocation> getOneLocation(@PathVariable Long id){
        return ResponseEntity.ok().body(geoJSONRepository.findById(id).get());
    }

    @DeleteMapping("fungi/{id}")
    public ResponseEntity<List<FungiLocation>> deleteOneLocation(@PathVariable Long id){
        geoJSONRepository.deleteById(id);
        return ResponseEntity.ok().body(geoJSONRepository.findAll());
    }

    @PostMapping("fungi")
    public ResponseEntity<List<FungiLocation>> addLocation(@RequestBody FungiLocation fungiLocation) {
        if (fungiLocation.getId() == null || geoJSONRepository.findById(fungiLocation.getId()).isEmpty()) {
            geoJSONRepository.save(fungiLocation);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(geoJSONRepository.findAll());
    }


    @PutMapping("fungi")
    public ResponseEntity<List<FungiLocation>> editLocation(@RequestBody FungiLocation fungiLocation) {
        if (geoJSONRepository.findById(fungiLocation.getId()).isPresent()) {
            geoJSONRepository.save(fungiLocation);
        }
        return ResponseEntity.ok().body(geoJSONRepository.findAll());
    }

}
