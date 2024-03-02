package com.colaborapp.model.mapper;

import com.colaborapp.dto.CategoryResponseDTO;
import com.colaborapp.model.Category;

public interface CategoryMapper {
    CategoryResponseDTO toDTO(Category entity);
}
