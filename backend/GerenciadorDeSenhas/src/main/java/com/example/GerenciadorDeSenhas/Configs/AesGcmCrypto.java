package com.example.GerenciadorDeSenhas.Configs;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class AesGcmCrypto {
    private static final String ALGO = "AES";
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    private static final int GCM_TAG_BITS = 128;
    private static final int IV_BYTES = 12;

    private final SecretKey key;
    private final SecureRandom rng = new SecureRandom();


    @Value("${crypto.key-base64}")
    private String keyBase64;

    @PostConstruct
    public void init() {
        if (keyBase64 != null && !keyBase64.isEmpty()) {
            System.out.println("Chave Base64 carregada com sucesso!");
        } else {
            System.out.println("Erro ao carregar a chave Base64!");
        }
    }


    public AesGcmCrypto(AppCryptoProps props) {
        byte[] keyBytes = Base64.getDecoder().decode(props.getKeyBase64());
        if (keyBytes.length != 32) throw new IllegalArgumentException("Chave AES deve ter 32 bytes (AES-256).");
        this.key = new SecretKeySpec(keyBytes, ALGO);
    }

    public Encrypted encrypt(String plaintext) {
        try {
            byte[] iv = new byte[IV_BYTES];
            rng.nextBytes(iv);

            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(GCM_TAG_BITS, iv));
            byte[] out = cipher.doFinal(plaintext.getBytes(java.nio.charset.StandardCharsets.UTF_8));

            return new Encrypted(
                    Base64.getEncoder().encodeToString(iv),
                    Base64.getEncoder().encodeToString(out)
            );
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criptografar", e);
        }
    }

    public String decrypt(String ivB64, String cipherB64) {
        try {
            byte[] iv = Base64.getDecoder().decode(ivB64);
            byte[] c = Base64.getDecoder().decode(cipherB64);

            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(GCM_TAG_BITS, iv));
            byte[] out = cipher.doFinal(c);
            return new String(out, java.nio.charset.StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao descriptografar", e);
        }
    }

    public record Encrypted(String ivBase64, String cipherBase64) {}


}
