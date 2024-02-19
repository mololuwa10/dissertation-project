package com.example.dissertation_backend.solution.EmailVerification;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
public class VerificationController {

  @Autowired
  private VerificationTokenRepository verificationTokenRepository;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/verify")
  public ResponseEntity<?> verifyAccount(@RequestParam("token") String token) {
    VerificationToken verificationToken = verificationTokenRepository
      .findByToken(token)
      .orElseThrow(() -> new RuntimeException("Invalid token"));

    if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      return ResponseEntity.badRequest().body("Token expired");
    }

    ApplicationUser user = verificationToken.getUser();
    user.setEnabled(true);
    userRepository.save(user);

    return ResponseEntity.ok("Account verified successfully");
  }
}
