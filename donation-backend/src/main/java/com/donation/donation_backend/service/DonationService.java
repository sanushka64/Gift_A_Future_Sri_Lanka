package com.donation.donation_backend.service;

import com.donation.donation_backend.dto.DonationRequest;
import com.donation.donation_backend.entity.Donation;
import com.donation.donation_backend.entity.DonationAudit;
import com.donation.donation_backend.repository.DonationRepository;
import com.donation.donation_backend.repository.DonationAuditRepository;
import io.micrometer.core.instrument.Timer;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Map;

@Service
public class DonationService {

    private static final Logger logger = LoggerFactory.getLogger(DonationService.class);

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private DonationAuditRepository auditRepository;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MonitoringService monitoringService;

    @Transactional
    public Map<String, Object> processDonation(@Valid DonationRequest request, HttpServletRequest httpRequest) {
        Timer.Sample sample = monitoringService.startTimer();

        try {
            // Log donation attempt
            logger.info("Processing donation attempt from: {}", request.getDonor().getEmail());

            // Create donation entity
            Donation donation = createDonationEntity(request);

            // Simulate payment processing (replace with actual payment gateway)
            boolean paymentSuccess = processPayment(request);

            if (paymentSuccess) {
                donation.setPaymentStatus("COMPLETED");
                donation = donationRepository.save(donation);

                // Record metrics
                monitoringService.recordDonation();

                // Create audit log
                createAuditLog(donation.getId(), "DONATION_SUCCESS", httpRequest, "Payment completed successfully");

                // Send confirmation email asynchronously
                emailService.sendDonationConfirmation(donation);

                logger.info("Donation processed successfully. Transaction ID: {}", donation.getTransactionId());

                return Map.of(
                        "success", true,
                        "message", "Donation processed successfully",
                        "transactionId", donation.getTransactionId(),
                        "donationId", donation.getId()
                );
            } else {
                donation.setPaymentStatus("FAILED");
                donationRepository.save(donation);

                createAuditLog(donation.getId(), "PAYMENT_FAILED", httpRequest, "Payment processing failed");

                return Map.of(
                        "success", false,
                        "message", "Payment processing failed. Please try again."
                );
            }

        } catch (Exception e) {
            logger.error("Error processing donation", e);
            createAuditLog(null, "DONATION_ERROR", httpRequest, "Error: " + e.getMessage());

            return Map.of(
                    "success", false,
                    "message", "An error occurred processing your donation. Please try again."
            );
        } finally {
            sample.stop(monitoringService.getDonationTimer());
        }
    }

    private Donation createDonationEntity(DonationRequest request) {
        Donation donation = new Donation();

        // Basic donation info
        donation.setDonationType(request.getDonationType());
        donation.setAmount(BigDecimal.valueOf(request.getAmount()));
        donation.setBank(request.getBank());
        donation.setConsentGiven(request.getConsentGiven());
        donation.setTransactionId(securityService.generateTransactionId());

        // Donor information
        donation.setDonorTitle(request.getDonor().getTitle());
        donation.setDonorName(request.getDonor().getName());
        donation.setDonorEmail(request.getDonor().getEmail());
        donation.setDonorPhone(request.getDonor().getPhone());
        donation.setDonorProvince(request.getDonor().getProvince());
        donation.setDonorCity(request.getDonor().getCity());

        donation.setCardNameEncrypted(securityService.encrypt(request.getCardName()));
        donation.setCardNumberHash(securityService.hashCardNumber(request.getCardNumber()));

        return donation;
    }

    private boolean processPayment(DonationRequest request) {
        // Simulate payment processing with validation
        try {
            // Basic validation
            if (request.getCardNumber().length() != 16) {
                return false;
            }
            if (!request.getExpiry().matches("^(0[1-9]|1[0-2])/\\d{2}$")) {
                return false;
            }
            if (request.getCvc().length() != 3) {
                return false;
            }

            // Simulate processing delay
            Thread.sleep(1000);

            // Simulate 95% success rate
            return Math.random() < 0.95;

        } catch (Exception e) {
            logger.error("Payment processing error", e);
            return false;
        }
    }

    private void createAuditLog(Long donationId, String action, HttpServletRequest request, String details) {
        try {
            String ipAddress = getClientIpAddress(request);
            String userAgent = request.getHeader("User-Agent");

            DonationAudit audit = new DonationAudit(donationId, action, ipAddress, userAgent, details);
            auditRepository.save(audit);

        } catch (Exception e) {
            logger.warn("Failed to create audit log", e);
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }
}