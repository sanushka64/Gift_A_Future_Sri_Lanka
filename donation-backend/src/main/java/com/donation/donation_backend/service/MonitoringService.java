package com.donation.donation_backend.service;

import com.donation.donation_backend.dto.MonitoringMetrics;
import com.donation.donation_backend.repository.DonationRepository;
import org.springframework.stereotype.Service;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Timer;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class MonitoringService {

    private final DonationRepository donationRepository;
    private final MeterRegistry meterRegistry;

    private final Counter donationCounter;
    private final Timer donationTimer;

    public MonitoringService(DonationRepository donationRepository, MeterRegistry meterRegistry) {
        this.donationRepository = donationRepository;
        this.meterRegistry = meterRegistry;

        this.donationCounter = Counter.builder("donations.total")
                .description("Total number of donations")
                .register(meterRegistry);

        this.donationTimer = Timer.builder("donation.processing.time")
                .description("Time taken to process donations")
                .register(meterRegistry);
    }

    public void recordDonation() {
        donationCounter.increment();
    }

    public Timer.Sample startTimer() {
        return Timer.start(meterRegistry);
    }

    public Timer getDonationTimer() {
        return donationTimer;
    }

    public MonitoringMetrics getSystemMetrics() {
        MonitoringMetrics metrics = new MonitoringMetrics();
        metrics.setStatus("UP");

        try {
            long totalDonations = donationRepository.countTotalDonations();
            double totalAmount = donationRepository.sumTotalAmount() != null ?
                    donationRepository.sumTotalAmount().doubleValue() : 0.0;

            LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
            LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

            long todayDonations = donationRepository.countTodayDonations(startOfDay, endOfDay);
            double todayAmount = donationRepository.sumTodayAmount(startOfDay, endOfDay) != null ?
                    donationRepository.sumTodayAmount(startOfDay, endOfDay).doubleValue() : 0.0;

            metrics.setTotalDonations(totalDonations);
            metrics.setTotalAmount(totalAmount);
            metrics.setTodayDonations(todayDonations);
            metrics.setTodayAmount(todayAmount);

        } catch (Exception e) {
            metrics.setStatus("DEGRADED");
        }

        Map<String, Object> systemMetrics = new HashMap<>();
        Runtime runtime = Runtime.getRuntime();
        systemMetrics.put("memory.total", runtime.totalMemory());
        systemMetrics.put("memory.free", runtime.freeMemory());
        systemMetrics.put("memory.used", runtime.totalMemory() - runtime.freeMemory());
        systemMetrics.put("processors", runtime.availableProcessors());
        systemMetrics.put("uptime", System.currentTimeMillis());

        metrics.setSystemMetrics(systemMetrics);
        return metrics;
    }
}
