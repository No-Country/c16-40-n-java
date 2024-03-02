package com.colaborapp.config;

import com.colaborapp.model.Category;
import com.colaborapp.model.CategoryType;
import com.colaborapp.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AppSeeder implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.findAll().isEmpty()) {
            categoryRepository.saveAll(List.of(
                    Category.builder().type(CategoryType.EDUCATION).build(),
                    Category.builder().type(CategoryType.HEALTH).build(),
                    Category.builder().type(CategoryType.ENVIRONMENT).build(),
                    Category.builder().type(CategoryType.COMMUNITY).build(),
                    Category.builder().type(CategoryType.HUMANITARIAN).build(),
                    Category.builder().type(CategoryType.HUMAN_RIGHTS).build(),
                    Category.builder().type(CategoryType.ART_CULTURE).build(),
                    Category.builder().type(CategoryType.ANIMAL).build(),
                    Category.builder().type(CategoryType.TECHNOLOGY).build(),
                    Category.builder().type(CategoryType.SOCIAL).build(),
                    Category.builder().type(CategoryType.OTHER).build()
            ));
        }
    }
}
