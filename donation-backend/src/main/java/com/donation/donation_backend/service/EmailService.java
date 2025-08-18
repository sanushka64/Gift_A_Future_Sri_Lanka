package com.donation.donation_backend.service;

import com.donation.donation_backend.entity.Donation;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SecurityService securityService;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendDonationConfirmation(Donation donation) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(donation.getDonorEmail());
            helper.setSubject("🎉 Thank You for Your Generous Donation!");

            String htmlContent = createDonationEmailTemplate(donation);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Donation confirmation email sent to: {}", donation.getDonorEmail());

        } catch (Exception e) {
            logger.error("Failed to send donation confirmation email to: {}", donation.getDonorEmail(), e);
        }
    }

    private String createDonationEmailTemplate(Donation donation) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy 'at' hh:mm a");
        String formattedDate = donation.getCreatedAt().format(formatter);
        String maskedCardNumber = securityService.maskCardNumber("****");

        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Donation Confirmation</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    }
                    .header {
                        background: linear-gradient(135deg, #3498db, #2980b9);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                        font-weight: 300;
                    }
                    .content {
                        padding: 40px 30px;
                    }
                    .donation-card {
                        background: #f8f9fa;
                        border-left: 5px solid #3498db;
                        padding: 20px;
                        margin: 20px 0;
                        border-radius: 5px;
                    }
                    .amount {
                        font-size: 32px;
                        font-weight: bold;
                        color: #2c3e50;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .details {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        padding: 8px 0;
                        border-bottom: 1px solid #eee;
                    }
                    .details:last-child {
                        border-bottom: none;
                    }
                    .label {
                        font-weight: 600;
                        color: #555;
                    }
                    .value {
                        color: #333;
                    }
                    .impact-section {
                        background: linear-gradient(135deg, #74b9ff, #0984e3);
                        color: white;
                        padding: 25px;
                        margin: 30px 0;
                        border-radius: 10px;
                        text-align: center;
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 25px;
                        text-align: center;
                        font-size: 14px;
                    }
                    .social-links {
                        margin: 20px 0;
                    }
                    .social-links a {
                        color: #3498db;
                        text-decoration: none;
                        margin: 0 10px;
                        font-weight: 600;
                    }
                    @media (max-width: 600px) {
                        .container {
                            margin: 10px;
                            border-radius: 10px;
                        }
                        .content {
                            padding: 25px 20px;
                        }
                        .details {
                            flex-direction: column;
                        }
                        .amount {
                            font-size: 28px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <p>Dear %s %s,</p>
                        <p>We are deeply grateful for your generous donation to our cause. Your contribution will directly impact the lives of children across Sri Lanka, helping us secure their innocence, smiles, and future.</p>

                        <div class="amount">Rs %,.2f</div>

                        <div class="donation-card">
                            <h3 style="margin-top: 0; color: #2c3e50;">📋 Donation Details</h3>
                            <div class="details">
                                <span class="label">Transaction ID:</span>
                                <span class="value">%s</span>
                            </div>
                            <div class="details">
                                <span class="label">Donation Type:</span>
                                <span class="value">%s</span>
                            </div>
                            <div class="details">
                                <span class="label">Payment Method:</span>
                                <span class="value">%s</span>
                            </div>
                            <div class="details">
                                <span class="label">Date & Time:</span>
                                <span class="value">%s</span>
                            </div>
                            <div class="details">
                                <span class="label">Status:</span>
                                <span class="value" style="color: #27ae60; font-weight: bold;">✅ Confirmed</span>
                            </div>
                        </div>

                        <div class="impact-section">
                            <h3>🎯 Your Impact</h3>
                            <p>Your donation of Rs %,.2f will help provide:</p>
                            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                                <li>📚 Educational materials for underprivileged children</li>
                                <li>🍎 Nutritious meals and healthcare support</li>
                                <li>🏠 Safe shelter and protection services</li>
                                <li>🎨 Creative and recreational programs</li>
                            </ul>
                        </div>

                        <p style="margin-top: 30px;">We will keep you updated on how your donation is making a difference. You can expect regular updates about our programs and the children you're helping.</p>
                        
                        <p><strong>Important:</strong> Please keep this email as your donation receipt for tax purposes.</p>
                    </div>

                    <div class="footer">
                        <p><strong>Children's Future Foundation</strong></p>
                        <p>Email: donations@childrensfuture.lk | Phone: +94 11 234 5678</p>
                        <div class="social-links">
                            <a href="#">Facebook</a> |
                            <a href="#">Instagram</a> |
                            <a href="#">Website</a>
                        </div>
                        <p style="margin-top: 20px; font-size: 12px; color: #bdc3c7;">
                            This email was sent to %s. If you have any questions about your donation, please contact us.
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                donation.getDonorTitle(),
                donation.getDonorName(),
                donation.getAmount(),
                donation.getTransactionId(),
                donation.getDonationType().equals("one-time") ? "One-Time Donation" : "Monthly Recurring Donation",
                donation.getBank(),
                formattedDate,
                donation.getAmount(),
                donation.getDonorEmail()
        );
    }
}