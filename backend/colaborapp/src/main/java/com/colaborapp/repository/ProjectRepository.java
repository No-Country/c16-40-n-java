package com.colaborapp.repository;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByStatusAndEndDateAfter(Status status, LocalDate date);

    Optional<Project> findByIdAndStatusAndEndDateAfter(Long id, Status status, LocalDate date);
}
