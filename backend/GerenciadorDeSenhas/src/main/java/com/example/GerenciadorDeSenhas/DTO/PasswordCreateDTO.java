package com.example.GerenciadorDeSenhas.DTO;

public record PasswordCreateDTO (
        String site,
        String username,
        String password,
        Long userId
){ }
