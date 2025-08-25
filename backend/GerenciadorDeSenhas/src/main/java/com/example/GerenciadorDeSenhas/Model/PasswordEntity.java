package com.example.GerenciadorDeSenhas.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "passwords")
public class PasswordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String site;
    private String username;

    @Column(name = "password_cipher", columnDefinition = "TEXT")
    private String passwordCipher;

    @Column(name = "password_iv", length = 24)
    private String passwordIv;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordCipher() {
        return passwordCipher;
    }

    public void setPasswordCipher(String passwordCipher) {
        this.passwordCipher = passwordCipher;
    }

    public String getPasswordIv() {
        return passwordIv;
    }

    public void setPasswordIv(String passwordIv) {
        this.passwordIv = passwordIv;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
