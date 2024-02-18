package com.colaborapp.model.mapper;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.model.User;

public interface UserMapper {
    User toEntity(UserRequestDTO dto);
}
