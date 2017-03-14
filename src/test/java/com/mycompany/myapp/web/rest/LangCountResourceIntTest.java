package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.LangCount;
import com.mycompany.myapp.repository.LangCountRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LangCountResource REST controller.
 *
 * @see LangCountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class LangCountResourceIntTest {

    private static final String DEFAULT_LANGUAGE = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NB = 1;
    private static final Integer UPDATED_NB = 2;

    @Autowired
    private LangCountRepository langCountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLangCountMockMvc;

    private LangCount langCount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LangCountResource langCountResource = new LangCountResource(langCountRepository);
        this.restLangCountMockMvc = MockMvcBuilders.standaloneSetup(langCountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LangCount createEntity(EntityManager em) {
        LangCount langCount = new LangCount()
            .language(DEFAULT_LANGUAGE)
            .nb(DEFAULT_NB);
        return langCount;
    }

    @Before
    public void initTest() {
        langCount = createEntity(em);
    }

    @Test
    @Transactional
    public void createLangCount() throws Exception {
        int databaseSizeBeforeCreate = langCountRepository.findAll().size();

        // Create the LangCount
        restLangCountMockMvc.perform(post("/api/lang-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langCount)))
            .andExpect(status().isCreated());

        // Validate the LangCount in the database
        List<LangCount> langCountList = langCountRepository.findAll();
        assertThat(langCountList).hasSize(databaseSizeBeforeCreate + 1);
        LangCount testLangCount = langCountList.get(langCountList.size() - 1);
        assertThat(testLangCount.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testLangCount.getNb()).isEqualTo(DEFAULT_NB);
    }

    @Test
    @Transactional
    public void createLangCountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = langCountRepository.findAll().size();

        // Create the LangCount with an existing ID
        langCount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLangCountMockMvc.perform(post("/api/lang-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langCount)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<LangCount> langCountList = langCountRepository.findAll();
        assertThat(langCountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLangCounts() throws Exception {
        // Initialize the database
        langCountRepository.saveAndFlush(langCount);

        // Get all the langCountList
        restLangCountMockMvc.perform(get("/api/lang-counts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(langCount.getId().intValue())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].nb").value(hasItem(DEFAULT_NB)));
    }

    @Test
    @Transactional
    public void getLangCount() throws Exception {
        // Initialize the database
        langCountRepository.saveAndFlush(langCount);

        // Get the langCount
        restLangCountMockMvc.perform(get("/api/lang-counts/{id}", langCount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(langCount.getId().intValue()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.nb").value(DEFAULT_NB));
    }

    @Test
    @Transactional
    public void getNonExistingLangCount() throws Exception {
        // Get the langCount
        restLangCountMockMvc.perform(get("/api/lang-counts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLangCount() throws Exception {
        // Initialize the database
        langCountRepository.saveAndFlush(langCount);
        int databaseSizeBeforeUpdate = langCountRepository.findAll().size();

        // Update the langCount
        LangCount updatedLangCount = langCountRepository.findOne(langCount.getId());
        updatedLangCount
            .language(UPDATED_LANGUAGE)
            .nb(UPDATED_NB);

        restLangCountMockMvc.perform(put("/api/lang-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLangCount)))
            .andExpect(status().isOk());

        // Validate the LangCount in the database
        List<LangCount> langCountList = langCountRepository.findAll();
        assertThat(langCountList).hasSize(databaseSizeBeforeUpdate);
        LangCount testLangCount = langCountList.get(langCountList.size() - 1);
        assertThat(testLangCount.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testLangCount.getNb()).isEqualTo(UPDATED_NB);
    }

    @Test
    @Transactional
    public void updateNonExistingLangCount() throws Exception {
        int databaseSizeBeforeUpdate = langCountRepository.findAll().size();

        // Create the LangCount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLangCountMockMvc.perform(put("/api/lang-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langCount)))
            .andExpect(status().isCreated());

        // Validate the LangCount in the database
        List<LangCount> langCountList = langCountRepository.findAll();
        assertThat(langCountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLangCount() throws Exception {
        // Initialize the database
        langCountRepository.saveAndFlush(langCount);
        int databaseSizeBeforeDelete = langCountRepository.findAll().size();

        // Get the langCount
        restLangCountMockMvc.perform(delete("/api/lang-counts/{id}", langCount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LangCount> langCountList = langCountRepository.findAll();
        assertThat(langCountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LangCount.class);
    }
}
