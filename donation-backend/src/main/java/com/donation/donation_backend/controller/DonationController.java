package com.donation.donation_backend.controller;

import com.donation.donation_backend.dto.DonationRequest;
import com.donation.donation_backend.service.DonationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173"})
@Validated
public class DonationController {

    private static final Logger logger = LoggerFactory.getLogger(DonationController.class);

    @Autowired
    private DonationService donationService;

    @PostMapping("/donations")
    public ResponseEntity<Map<String, Object>> createDonation(
            @Valid @RequestBody DonationRequest donationRequest,
            HttpServletRequest request) {

        logger.info("Received donation request from IP: {}", request.getRemoteAddr());

        try {
            Map<String, Object> result = donationService.processDonation(donationRequest, request);

            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }

        } catch (Exception e) {
            logger.error("Unexpected error processing donation", e);
            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "An unexpected error occurred. Please try again later."
                    )
            );
        }
    }

    @GetMapping("/donations/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "timestamp", java.time.Instant.now().toString(),
                "service", "donation-api"
        ));
    }
}