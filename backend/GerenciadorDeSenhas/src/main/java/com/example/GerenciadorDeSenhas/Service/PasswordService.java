package com.example.GerenciadorDeSenhas.Service;

import com.example.GerenciadorDeSenhas.Configs.AesGcmCrypto;
import com.example.GerenciadorDeSenhas.DTO.PasswordCreateDTO;
import com.example.GerenciadorDeSenhas.DTO.PasswordViewDTO;
import com.example.GerenciadorDeSenhas.Model.PasswordEntity;
import com.example.GerenciadorDeSenhas.Repository.PasswordRepository;
import com.example.GerenciadorDeSenhas.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordService {
    private final PasswordRepository repo;
    private final AesGcmCrypto crypto;
    private final UserRepository userRepo;

    public PasswordService(PasswordRepository repo, AesGcmCrypto crypto, UserRepository userRepo) {
        this.repo = repo;
        this.crypto = crypto;
        this.userRepo = userRepo;
    }


    public List<PasswordViewDTO> findAllByUser(Long userId) {
        return repo.findAllByUserId(userId).stream().map(e -> {
            try {
                String plain = crypto.decrypt(e.getPasswordIv(), e.getPasswordCipher());
                return new PasswordViewDTO(e.getId(), e.getSite(), e.getUsername(), plain);
            } catch (Exception ex) {
                throw new RuntimeException("Erro ao descriptografar senha do site " + e.getSite(), ex);
            }
        }).toList();
    }

    public PasswordViewDTO create(PasswordCreateDTO dto) {
        var user = userRepo.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        var enc = crypto.encrypt(dto.password());
        var e = new PasswordEntity();
        e.setSite(dto.site());
        e.setUsername(dto.username());
        e.setPasswordIv(enc.ivBase64());
        e.setPasswordCipher(enc.cipherBase64());
        e.setUser(user);

        var saved = repo.save(e);
        return new PasswordViewDTO(saved.getId(), saved.getSite(), saved.getUsername(), dto.password());
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
