package com.colaborapp.repository;

import com.colaborapp.model.Project;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findById(Long projectId);

    Optional<Object> findOne(Specification<Project> spec);
}
