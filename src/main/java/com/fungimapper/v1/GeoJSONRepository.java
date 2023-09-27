package com.fungimapper.v1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GeoJSONRepository extends JpaRepository<FungiLocation, Long> {
}
