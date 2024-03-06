package com.colaborapp.repository;

import com.colaborapp.model.Category;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ProjectSpecification {
    public static Specification<Project> filterProjects(Category category) {
        return (root, query, criteriaBuilder) -> {
            Predicate categoryPredicate = criteriaBuilder.equal(root.get("category"), category);
            Predicate statusPredicate = criteriaBuilder.notEqual(root.get("status"), Status.DELETED);
            Predicate datePredicate = criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), LocalDate.now());
            return criteriaBuilder.and(datePredicate, categoryPredicate, statusPredicate);
        };
    }
}
