package com.colaborapp.model.mapper;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {
    @Override
    public User toEntity(UserRequestDTO dto) {
        return User.builder()
                .name(dto.name())
                .lastName(dto.lastName())
                .phoneNumber(dto.phoneNumber())
                .email(dto.email())
                .build();
    }
}
