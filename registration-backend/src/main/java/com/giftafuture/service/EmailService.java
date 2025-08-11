package com.giftafuture.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApprovalEmail(String toEmail, String organizationName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("NGO Registration Approved");
        message.setText("Dear " + organizationName + ",\n\nYour NGO registration has been approved! You can now sign in to the Gift a Future Sri Lanka platform using your username and password.\n\nBest regards,\nGift a Future Team");
        mailSender.send(message);
    }

    public void sendRegistrationEmail(String toEmail, String organizationName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("NGO Registration Submitted");
        message.setText("Dear " + organizationName + ",\n\nYour NGO registration has been submitted and is pending admin approval. You will be notified once reviewed.\n\nBest regards,\nGift a Future Team");
        mailSender.send(message);
    }
}