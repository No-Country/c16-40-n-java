package com.colaborapp.service;

import com.colaborapp.dto.CategoryResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.CategoryType;

import java.util.List;

public interface CategoryService {
    Category getCategoryByType(CategoryType type);

    List<CategoryResponseDTO> listAllCategories();
}
