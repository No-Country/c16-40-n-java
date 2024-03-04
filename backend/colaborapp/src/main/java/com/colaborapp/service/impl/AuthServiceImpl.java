package com.colaborapp.service.impl;

import com.colaborapp.auth.JwtService;
import com.colaborapp.dto.AuthRequestDTO;
import com.colaborapp.dto.AuthResponseDTO;
import com.colaborapp.service.AuthService;
import com.colaborapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserService userService;

    @Override
    public AuthResponseDTO authentication(AuthRequestDTO request) {
        var user = userService.getUserByEmailFromDatabase(request.email());
        if (!user.isEnable()) {
            throw new RuntimeException("This account is not longer available."); // TODO: change me
        }
        // creates a user to authenticate
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails userDetails = User.builder() // build a UserDetails (spring security class)
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new SimpleGrantedAuthority(user.getRole().getType().getFullRoleName()))
                .build();
        String token = jwtService.generateToken(userDetails);
        return AuthResponseDTO.builder()
                .email(userDetails.getUsername())
                .token(token)
                .expirationDate(jwtService.getExpirationDate(token))
                .build();
    }

    @Override
    public String getAuthenticatedUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
