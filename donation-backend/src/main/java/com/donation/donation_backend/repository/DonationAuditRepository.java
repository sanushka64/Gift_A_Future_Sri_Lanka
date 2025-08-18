package com.donation.donation_backend.repository;

import com.donation.donation_backend.entity.DonationAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationAuditRepository extends JpaRepository<DonationAudit, Long> {
}