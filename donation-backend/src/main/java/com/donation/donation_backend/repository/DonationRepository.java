package com.donation.donation_backend.repository;

import com.donation.donation_backend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT COUNT(d) FROM Donation d")
    long countTotalDonations();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Donation d WHERE d.paymentStatus = 'COMPLETED'")
    BigDecimal sumTotalAmount();

    @Query("SELECT COUNT(d) FROM Donation d WHERE d.createdAt >= :startOfDay AND d.createdAt < :endOfDay")
    long countTodayDonations(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Donation d WHERE d.paymentStatus = 'COMPLETED' AND d.createdAt >= :startOfDay AND d.createdAt < :endOfDay")
    BigDecimal sumTodayAmount(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}