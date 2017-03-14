package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Person;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
public interface PersonRepository extends JpaRepository<Person,Long> {

    @Query("select distinct person from Person person left join fetch person.appointments")
    List<Person> findAllWithEagerRelationships();

    @Query("select person from Person person left join fetch person.appointments where person.id =:id")
    Person findOneWithEagerRelationships(@Param("id") Long id);

}
