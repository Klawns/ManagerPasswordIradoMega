package com.example.GerenciadorDeSenhas.DTO;

public record PasswordViewDTO (
    Long id,
    String site,
    String username,
    String password
){ }
