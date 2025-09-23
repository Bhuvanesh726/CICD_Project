package com.cicdproject.backend.service;

import com.cicdproject.backend.model.AuthResponse;
import com.cicdproject.backend.model.RegisterRequest;
import com.cicdproject.backend.model.User;
import com.cicdproject.backend.repository.UserRepository;
import com.cicdproject.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authenticationManager;

        public User register(RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already registered");
                }
                User user = new User();
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setRole("ROLE_USER");
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                return userRepository.save(user);
        }

        public AuthResponse login(String email, String password) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(email, password));
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User not found after successful authentication."));
                String token = jwtUtil.generateToken(user.getEmail());

                // <-- MODIFIED LINE -->
                // Now passing the user's name to the AuthResponse constructor
                return new AuthResponse(token, user.getEmail(), user.getRole(), user.getName());
        }
}