package com.donation.donation_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import com.fasterxml.jackson.annotation.JsonProperty;

public class DonationRequest {

    @NotBlank(message = "Donation type is required")
    private String donationType;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Bank selection is required")
    private String bank;

    @NotBlank(message = "Card name is required")
    private String cardName;

    @NotBlank(message = "Card number is required")
    private String cardNumber;

    @NotBlank(message = "Expiry is required")
    private String expiry;

    @NotBlank(message = "CVC is required")
    private String cvc;

    @NotNull(message = "Consent is required")
    private Boolean consentGiven;

    @Valid
    @NotNull(message = "Donor information is required")
    private DonorInfo donor;

    public DonationRequest() {}

    public String getDonationType() { return donationType; }
    public void setDonationType(String donationType) { this.donationType = donationType; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getBank() { return bank; }
    public void setBank(String bank) { this.bank = bank; }

    public String getCardName() { return cardName; }
    public void setCardName(String cardName) { this.cardName = cardName; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getExpiry() { return expiry; }
    public void setExpiry(String expiry) { this.expiry = expiry; }

    public String getCvc() { return cvc; }
    public void setCvc(String cvc) { this.cvc = cvc; }

    public Boolean getConsentGiven() { return consentGiven; }
    public void setConsentGiven(Boolean consentGiven) { this.consentGiven = consentGiven; }

    public DonorInfo getDonor() { return donor; }
    public void setDonor(DonorInfo donor) { this.donor = donor; }
}