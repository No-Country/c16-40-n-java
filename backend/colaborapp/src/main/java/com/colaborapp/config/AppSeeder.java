package com.colaborapp.config;

import com.colaborapp.model.*;
import com.colaborapp.repository.CategoryRepository;
import com.colaborapp.repository.RoleRepository;
import com.colaborapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AppSeeder implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

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
        if (roleRepository.findAll().isEmpty()) {
            Role ROLE_ADMIN = Role.builder().type(RoleType.ADMIN).build();
            Role ROLE_USER = Role.builder().type(RoleType.USER).build();
            ROLE_ADMIN = roleRepository.save(ROLE_ADMIN);
            roleRepository.save(ROLE_USER);
            User ADMIN = User.builder()
                    .email("admin@mail.com")
                    .name("ADMIN")
                    .lastName("ADMIN")
                    .role(ROLE_ADMIN)
                    .enable(true)
                    .password(encoder.encode("admin"))
                    .build();
            userRepository.save(ADMIN);
        }

    }
}
