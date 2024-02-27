package com.colaborapp.repository;

import com.colaborapp.model.Category;
import com.colaborapp.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findCategoryByType(CategoryType type);
}
