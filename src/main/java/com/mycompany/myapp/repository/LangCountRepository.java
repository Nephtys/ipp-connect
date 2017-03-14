package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LangCount;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the LangCount entity.
 */
@SuppressWarnings("unused")
public interface LangCountRepository extends JpaRepository<LangCount,Long> {

}
