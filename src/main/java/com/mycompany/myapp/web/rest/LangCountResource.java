package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LangCount;

import com.mycompany.myapp.repository.LangCountRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LangCount.
 */
@RestController
@RequestMapping("/api")
public class LangCountResource {

    private final Logger log = LoggerFactory.getLogger(LangCountResource.class);

    private static final String ENTITY_NAME = "langCount";
        
    private final LangCountRepository langCountRepository;

    public LangCountResource(LangCountRepository langCountRepository) {
        this.langCountRepository = langCountRepository;
    }

    /**
     * POST  /lang-counts : Create a new langCount.
     *
     * @param langCount the langCount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new langCount, or with status 400 (Bad Request) if the langCount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lang-counts")
    @Timed
    public ResponseEntity<LangCount> createLangCount(@RequestBody LangCount langCount) throws URISyntaxException {
        log.debug("REST request to save LangCount : {}", langCount);
        if (langCount.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new langCount cannot already have an ID")).body(null);
        }
        LangCount result = langCountRepository.save(langCount);
        return ResponseEntity.created(new URI("/api/lang-counts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lang-counts : Updates an existing langCount.
     *
     * @param langCount the langCount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated langCount,
     * or with status 400 (Bad Request) if the langCount is not valid,
     * or with status 500 (Internal Server Error) if the langCount couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lang-counts")
    @Timed
    public ResponseEntity<LangCount> updateLangCount(@RequestBody LangCount langCount) throws URISyntaxException {
        log.debug("REST request to update LangCount : {}", langCount);
        if (langCount.getId() == null) {
            return createLangCount(langCount);
        }
        LangCount result = langCountRepository.save(langCount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, langCount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lang-counts : get all the langCounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of langCounts in body
     */
    @GetMapping("/lang-counts")
    @Timed
    public List<LangCount> getAllLangCounts() {
        log.debug("REST request to get all LangCounts");
        List<LangCount> langCounts = langCountRepository.findAll();
        return langCounts;
    }

    /**
     * GET  /lang-counts/:id : get the "id" langCount.
     *
     * @param id the id of the langCount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the langCount, or with status 404 (Not Found)
     */
    @GetMapping("/lang-counts/{id}")
    @Timed
    public ResponseEntity<LangCount> getLangCount(@PathVariable Long id) {
        log.debug("REST request to get LangCount : {}", id);
        LangCount langCount = langCountRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(langCount));
    }

    /**
     * DELETE  /lang-counts/:id : delete the "id" langCount.
     *
     * @param id the id of the langCount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lang-counts/{id}")
    @Timed
    public ResponseEntity<Void> deleteLangCount(@PathVariable Long id) {
        log.debug("REST request to delete LangCount : {}", id);
        langCountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
