package com.example.GerenciadorDeSenhas.Service;

import com.example.GerenciadorDeSenhas.DTO.UserRequest;
import com.example.GerenciadorDeSenhas.DTO.UserResponse;
import com.example.GerenciadorDeSenhas.Model.User;
import com.example.GerenciadorDeSenhas.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(UserRequest req){
        userRepository.findByUsername(req.getUsername()).ifPresent(u -> {
            throw new IllegalArgumentException("Usuario já existe");
        });

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        user = userRepository.save(user);
        return new UserResponse(user.getId(), user.getUsername());
    }

    public Optional<UserResponse> login(UserRequest req){
        return userRepository.findByUsername(req.getUsername())
                .filter(u -> passwordEncoder.matches(req.getPassword(), u.getPassword()))
                .map(u -> new UserResponse(u.getId(), u.getUsername()));
    }
}
