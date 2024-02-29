package com.colaborapp.repository;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByStatusAndEndDateAfter(Status status, LocalDate date);
}
