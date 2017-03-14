package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Appointment;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Appointment entity.
 */
@SuppressWarnings("unused")
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

}
