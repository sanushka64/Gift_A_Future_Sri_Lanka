package com.donation.donation_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@EntityListeners(AuditingEntityListener.class)
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "donation_type", nullable = false)
    private String donationType;

    @NotNull
    @DecimalMin("1.0")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotBlank
    @Column(name = "bank", nullable = false)
    private String bank;

    // Donor Information
    @NotBlank
    @Column(name = "donor_title", nullable = false)
    private String donorTitle;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(name = "donor_name", nullable = false)
    private String donorName;

    @NotBlank
    @Email
    @Column(name = "donor_email", nullable = false)
    private String donorEmail;

    @NotBlank
    @Pattern(regexp = "^[+]?[0-9]{10,15}$")
    @Column(name = "donor_phone", nullable = false)
    private String donorPhone;

    @NotBlank
    @Column(name = "donor_province", nullable = false)
    private String donorProvince;

    @NotBlank
    @Column(name = "donor_city", nullable = false)
    private String donorCity;

    // Payment Information (Encrypted)
    @Column(name = "card_name_encrypted")
    private String cardNameEncrypted;

    @Column(name = "card_number_hash")
    private String cardNumberHash;

    @Column(name = "payment_status")
    private String paymentStatus = "PENDING";

    @Column(name = "consent_given", nullable = false)
    private Boolean consentGiven;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    // Constructors
    public Donation() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDonationType() { return donationType; }
    public void setDonationType(String donationType) { this.donationType = donationType; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getBank() { return bank; }
    public void setBank(String bank) { this.bank = bank; }

    public String getDonorTitle() { return donorTitle; }
    public void setDonorTitle(String donorTitle) { this.donorTitle = donorTitle; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getDonorEmail() { return donorEmail; }
    public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

    public String getDonorPhone() { return donorPhone; }
    public void setDonorPhone(String donorPhone) { this.donorPhone = donorPhone; }

    public String getDonorProvince() { return donorProvince; }
    public void setDonorProvince(String donorProvince) { this.donorProvince = donorProvince; }

    public String getDonorCity() { return donorCity; }
    public void setDonorCity(String donorCity) { this.donorCity = donorCity; }

    public String getCardNameEncrypted() { return cardNameEncrypted; }
    public void setCardNameEncrypted(String cardNameEncrypted) { this.cardNameEncrypted = cardNameEncrypted; }

    public String getCardNumberHash() { return cardNumberHash; }
    public void setCardNumberHash(String cardNumberHash) { this.cardNumberHash = cardNumberHash = cardNumberHash; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public Boolean getConsentGiven() { return consentGiven; }
    public void setConsentGiven(Boolean consentGiven) { this.consentGiven = consentGiven; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
}