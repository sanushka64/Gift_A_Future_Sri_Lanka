package com.giftafuture.controller;

import com.giftafuture.entity.NGOAdmin;
import com.giftafuture.entity.User;
import com.giftafuture.repository.NGOAdminRepository;
import com.giftafuture.repository.UserRepository;
import com.giftafuture.service.EmailService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final UserRepository userRepository;
    private final NGOAdminRepository ngoAdminRepository;
    private final EmailService emailService;

    public UserController(UserRepository userRepository, NGOAdminRepository ngoAdminRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.ngoAdminRepository = ngoAdminRepository;
        this.emailService = emailService;
    }

    @PostConstruct
    public void init() {
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestParam("organizationName") String organizationName,
            @RequestParam("organizationAddress") String organizationAddress,
            @RequestParam("registeredNumber") String registeredNumber,
            @RequestParam("email") String email,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("userName") String userName,
            @RequestParam("password") String password,
            @RequestParam("confirmPassword") String confirmPassword,
            @RequestParam("document") MultipartFile document) {
        Map<String, String> response = new HashMap<>();

        if (!password.equals(confirmPassword)) {
            response.put("error", "Passwords do not match");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByUserName(userName).isPresent()) {
            response.put("error", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByEmail(email).isPresent()) {
            response.put("error", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if (document.isEmpty()) {
            response.put("error", "Document is required");
            return ResponseEntity.badRequest().body(response);
        }

        String fileName = System.currentTimeMillis() + "_" + document.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        try {
            Files.write(filePath, document.getBytes());
        } catch (IOException e) {
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        User user = new User();
        user.setOrganizationName(organizationName);
        user.setOrganizationAddress(organizationAddress);
        user.setRegisteredNumber(registeredNumber);
        user.setEmail(email);
        user.setContactNumber(contactNumber);
        user.setUserName(userName);
        user.setPassword(password); // Store plain text password
        user.setCertificatePath(filePath.toString());
        user.setStatus("PENDING");

        userRepository.save(user);
        try {
            emailService.sendRegistrationEmail(user.getEmail(), user.getOrganizationName());
        } catch (Exception e) {
            System.err.println("Failed to send registration email: " + e.getMessage());
        }
        response.put("message", "Registered successfully! Waiting for admin approval.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pending-users")
    public ResponseEntity<List<User>> getPendingUsers() {
        return ResponseEntity.ok(userRepository.findByStatus("PENDING"));
    }

    @PostMapping("/update-status/{userId}")
    public ResponseEntity<Map<String, String>> updateUserStatus(@PathVariable Long userId, @RequestParam String status, @RequestParam String approvedBy) {
        Map<String, String> response = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            response.put("error", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        User user = optionalUser.get();
        user.setStatus(status);
        userRepository.save(user);

        if (status.equals("APPROVED")) {
            NGOAdmin ngoAdmin = new NGOAdmin();
            ngoAdmin.setUser(user);
            ngoAdmin.setApprovedBy(approvedBy);
            ngoAdmin.setApprovedAt(LocalDateTime.now());
            ngoAdminRepository.save(ngoAdmin);

            try {
                emailService.sendApprovalEmail(user.getEmail(), user.getOrganizationName());
            } catch (Exception e) {
                System.err.println("Failed to send approval email: " + e.getMessage());
            }
        }

        response.put("message", "Status updated to " + status);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> signIn(@RequestParam String userName, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();
        Optional<User> optionalUser = userRepository.findByUserName(userName);
        if (!optionalUser.isPresent()) {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = optionalUser.get();
        if (!password.equals(user.getPassword())) { // Compare plain text passwords
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (!user.getStatus().equals("APPROVED") && !userName.equals("admin")) {
            response.put("error", "Account not approved");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        response.put("role", userName.equals("admin") ? "ROLE_ADMIN" : "ROLE_NGO");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/certificate/{userId}")
    public ResponseEntity<byte[]> getCertificate(@PathVariable Long userId) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent() || optionalUser.get().getCertificatePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get(optionalUser.get().getCertificatePath());
        byte[] fileBytes = Files.readAllBytes(filePath);
        String fileName = FilenameUtils.getName(optionalUser.get().getCertificatePath());

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + fileName)
                .body(fileBytes);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage() != null ? ex.getMessage() : "Internal server error");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}