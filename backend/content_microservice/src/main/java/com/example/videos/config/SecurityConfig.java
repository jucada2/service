package com.example.videos.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Desactiva CSRF para simplificar pruebas
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/video/**").permitAll() // Permite el acceso sin autenticación a /video/**
                .requestMatchers("/rating/**").permitAll() // Permite el acceso sin autenticación a /rating/**
                .anyRequest().authenticated()              // Requiere autenticación para otras rutas (si las hay)
            )
            .httpBasic(Customizer.withDefaults()); // Habilita autenticación básica, si es necesaria para otros endpoints
        return http.build();
    }
}