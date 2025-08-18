package com.giftafuture.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApprovalEmail(String toEmail, String organizationName) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("🎉 NGO Registration Approved - Gift a Future Sri Lanka");

        String htmlContent = """
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background-color: #2a9d8f; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0;">Gift a Future Sri Lanka</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                      <p>Dear <b>%s</b>,</p>
                      <p>🎉 We are thrilled to inform you that your <b>NGO registration</b> has been <span style="color: #2a9d8f; font-weight: bold;">approved!</span></p>
                      <p>You can now sign in to the <b>Gift a Future Sri Lanka</b> platform using your registered username and password.</p>
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="https://giftafuture.org/login" style="background-color: #2a9d8f; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-size: 16px;">Login Now</a>
                      </div>
                      <p style="margin-top: 20px;">Best regards,<br><b>Gift a Future Team</b></p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            """.formatted(organizationName);

        helper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }

    public void sendRegistrationEmail(String toEmail, String organizationName) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("📩 NGO Registration Submitted - Gift a Future Sri Lanka");

        String htmlContent = """
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background-color: #264653; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0;">Gift a Future Sri Lanka</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                      <p>Dear <b>%s</b>,</p>
                      <p>Thank you for registering your NGO with <b>Gift a Future Sri Lanka</b>. ✅</p>
                      <p>Your registration has been successfully submitted and is currently <span style="color: #e76f51; font-weight: bold;">pending admin approval</span>.</p>
                      <p>We will notify you via email once your application has been reviewed.</p>
                      <p style="margin-top: 20px;">Best regards,<br><b>Gift a Future Team</b></p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            """.formatted(organizationName);

        helper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }
}
