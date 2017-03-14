package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A LangCount.
 */
@Entity
@Table(name = "lang_count")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LangCount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "language")
    private String language;

    @Column(name = "nb")
    private Integer nb;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public LangCount language(String language) {
        this.language = language;
        return this;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getNb() {
        return nb;
    }

    public LangCount nb(Integer nb) {
        this.nb = nb;
        return this;
    }

    public void setNb(Integer nb) {
        this.nb = nb;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LangCount langCount = (LangCount) o;
        if (langCount.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, langCount.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "LangCount{" +
            "id=" + id +
            ", language='" + language + "'" +
            ", nb='" + nb + "'" +
            '}';
    }
}
