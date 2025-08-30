package com.example.GerenciadorDeSenhas.DTO;

public record PasswordCreateDTO (
        String site,
        String username,
        String password,
        String passwordIdentify,
        Long userId
){ }
