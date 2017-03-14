package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Restaurant;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Restaurant entity.
 */
@SuppressWarnings("unused")
public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

}
