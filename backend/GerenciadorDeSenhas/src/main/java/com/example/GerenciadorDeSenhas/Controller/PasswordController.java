package com.example.GerenciadorDeSenhas.Controller;

import com.example.GerenciadorDeSenhas.DTO.PasswordCreateDTO;
import com.example.GerenciadorDeSenhas.DTO.PasswordViewDTO;
import com.example.GerenciadorDeSenhas.Service.PasswordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passwords")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordController {
    private final PasswordService service;

    public PasswordController(PasswordService service) { this.service = service; }

    @PostMapping
    public PasswordViewDTO create(@RequestBody PasswordCreateDTO dto) { return service.create(dto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    @GetMapping("/{userId}")
    public List<PasswordViewDTO> list(@PathVariable Long userId) {
        return service.findAllByUser(userId);
    }
}
