package com.donation.donation_backend.controller;

import com.donation.donation_backend.dto.MonitoringMetrics;
import com.donation.donation_backend.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/monitoring")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8080"})
public class MonitoringController {

    @Autowired
    private MonitoringService monitoringService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "timestamp", java.time.Instant.now().toString(),
                "service", "donation-monitoring"
        ));
    }

    @GetMapping("/metrics")
    public ResponseEntity<MonitoringMetrics> getMetrics() {
        MonitoringMetrics metrics = monitoringService.getSystemMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        MonitoringMetrics metrics = monitoringService.getSystemMetrics();
        return ResponseEntity.ok(Map.of(
                "status", metrics.getStatus(),
                "totalDonations", metrics.getTotalDonations(),
                "totalAmount", metrics.getTotalAmount(),
                "todayDonations", metrics.getTodayDonations(),
                "todayAmount", metrics.getTodayAmount(),
                "timestamp", metrics.getTimestamp()
        ));
    }
}