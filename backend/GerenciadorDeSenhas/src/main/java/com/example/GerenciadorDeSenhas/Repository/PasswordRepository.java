package com.example.GerenciadorDeSenhas.Repository;

import com.example.GerenciadorDeSenhas.Model.PasswordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordRepository extends JpaRepository<PasswordEntity, Long> {
    List<PasswordEntity> findAllByUserId(Long userId);
}
