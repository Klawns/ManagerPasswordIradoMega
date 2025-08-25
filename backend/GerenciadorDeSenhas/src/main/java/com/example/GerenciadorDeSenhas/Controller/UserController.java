package com.example.GerenciadorDeSenhas.Controller;

import com.example.GerenciadorDeSenhas.DTO.UserRequest;
import com.example.GerenciadorDeSenhas.DTO.UserResponse;
import com.example.GerenciadorDeSenhas.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest req){
        return ResponseEntity.ok(userService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest req) {
        return userService.login(req)
                .<ResponseEntity<Object>>map(u -> ResponseEntity.ok(Map.of(
                        "id", u.getId(),
                        "username", u.getUsername()
                )))
                .orElseGet(() -> ResponseEntity.status(401).body("Usuário ou senha inválidos"));
    }
}
