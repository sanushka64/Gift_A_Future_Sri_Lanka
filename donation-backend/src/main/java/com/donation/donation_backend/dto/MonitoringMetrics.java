package com.donation.donation_backend.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class MonitoringMetrics {
    private String status;
    private LocalDateTime timestamp;
    private long totalDonations;
    private double totalAmount;
    private long todayDonations;
    private double todayAmount;
    private Map<String, Object> systemMetrics;
    private String version;

    public MonitoringMetrics() {
        this.timestamp = LocalDateTime.now();
        this.version = "1.0.0";
    }

    // Getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public long getTotalDonations() { return totalDonations; }
    public void setTotalDonations(long totalDonations) { this.totalDonations = totalDonations; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public long getTodayDonations() { return todayDonations; }
    public void setTodayDonations(long todayDonations) { this.todayDonations = todayDonations; }

    public double getTodayAmount() { return todayAmount; }
    public void setTodayAmount(double todayAmount) { this.todayAmount = todayAmount; }

    public Map<String, Object> getSystemMetrics() { return systemMetrics; }
    public void setSystemMetrics(Map<String, Object> systemMetrics) { this.systemMetrics = systemMetrics; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
}