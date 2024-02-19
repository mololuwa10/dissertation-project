// package com.example.dissertation_backend.solution.EmailVerification;

// import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class JavaMailSenderService {

//   @Autowired
//   private JavaMailSender mailSender;

//   public void sendVerificationEmail(ApplicationUser user, String token) {
//     String recipientAddress = user.getUser_email();
//     String subject = "Registration Confirmation";
//     String confirmationUrl = "/api/auth/verify?token=" + token;
//     String message = "Please click the link to verify your account: ";

//     SimpleMailMessage email = new SimpleMailMessage();
//     email.setTo(recipientAddress);
//     email.setSubject(subject);
//     email.setText(message + "http://localhost:8080" + confirmationUrl);
//     mailSender.send(email);
//   }
// }
