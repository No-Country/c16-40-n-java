package com.colaborapp.service.impl;

import com.colaborapp.dto.CategoryResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.CategoryType;
import com.colaborapp.model.mapper.CategoryMapper;
import com.colaborapp.repository.CategoryRepository;
import com.colaborapp.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public Category getCategoryByType(CategoryType type) {
        if (Objects.isNull(type)) {
            throw new RuntimeException("CategoryType is needed to perform this operation."); // TODO: change me
        }
        return categoryRepository.findCategoryByType(type)
                .orElseThrow(() -> new RuntimeException("Category not found for type '%s'".formatted(type))); // TODO: change me
    }

    @Override
    public List<CategoryResponseDTO> listAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDTO).toList();
    }
}
