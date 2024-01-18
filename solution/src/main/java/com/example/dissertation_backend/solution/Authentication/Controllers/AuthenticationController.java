package com.example.dissertation_backend.solution.Authentication.Controllers;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.DTO.LoginResponseDTO;
import com.example.dissertation_backend.solution.DTO.RegistrationDTO;
import com.example.dissertation_backend.solution.Services.UserAuthenticationService.AuthenticationService;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthenticationController {

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/register")
  public ApplicationUser registerUser(@RequestBody RegistrationDTO body) {
    LocalDateTime now = LocalDateTime.now();
    return authenticationService.registerUser(
      body.getFirstname(),
      body.getLastname(),
      body.getUser_email(),
      body.getUsername(),
      body.getPassword(),
      body.getBankAccountNo(),
      body.getBankSortCode(),
      body.getContactTelephone(),
      body.getContactAddress(),
      now
    );
  }

  @PostMapping("/login")
  public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
    return authenticationService.loginUser(
      body.getUsername(),
      body.getPassword()
    );
  }
}
