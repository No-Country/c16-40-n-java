package com.colaborapp.repository;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
    List<Project> findAllByStatusAndEndDateAfter(Status status, LocalDate date);

    Optional<Project> findByIdAndStatusAndEndDateAfter(Long id, Status status, LocalDate date);
}
