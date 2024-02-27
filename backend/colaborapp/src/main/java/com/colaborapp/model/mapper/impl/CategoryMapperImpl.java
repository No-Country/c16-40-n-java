package com.colaborapp.model.mapper.impl;

import com.colaborapp.dto.CategoryResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.mapper.CategoryMapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapperImpl implements CategoryMapper {
    @Override
    public CategoryResponseDTO toDTO(Category entity) {
        return CategoryResponseDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .build();
    }
}
