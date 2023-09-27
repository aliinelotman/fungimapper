package com.fungimapper.v1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.fungimapper.v1")
public class FungimapperApplication {

	public static void main(String[] args) {
		SpringApplication.run(FungimapperApplication.class, args);
	}

}
