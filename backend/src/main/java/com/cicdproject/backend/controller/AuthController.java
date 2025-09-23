package com.cicdproject.backend.controller;

import com.cicdproject.backend.model.AuthResponse;
import com.cicdproject.backend.model.RegisterRequest;
import com.cicdproject.backend.model.User;
import com.cicdproject.backend.model.UserResponse;
import com.cicdproject.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        User registeredUser = authService.register(request);
        // Return the safe UserResponse DTO, not the User entity
        return new UserResponse(
                registeredUser.getId(),
                registeredUser.getName(),
                registeredUser.getEmail(),
                registeredUser.getRole());
    }

    // This is a simple DTO class for login requests
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        // Return the AuthResponse object which contains the token
        return authService.login(req.getEmail(), req.getPassword());
    }
}