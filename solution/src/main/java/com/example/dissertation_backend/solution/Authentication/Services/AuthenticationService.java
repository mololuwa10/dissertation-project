package com.example.dissertation_backend.solution.Authentication.Services;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.Roles;
import com.example.dissertation_backend.solution.Customers.Repository.RoleRepository;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.LoginResponseDTO;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AuthenticationService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenService tokenService;

  public ApplicationUser registerUser(
    String firstname,
    String lastname,
    String user_email,
    String username,
    String password,
    String bankAccountNo,
    String bankSortCode,
    String contactTelephone,
    String contactAddress,
    LocalDateTime dateJoined
  ) {
    String encodedPassword = passwordEncoder.encode(password);
    // String encryptedBankAccountNo = EncryptionUtil.encrypt(bankAccountNo);
    // String encryptedBankSortCode = EncryptionUtil.encrypt(bankSortCode);
    Roles userRole = roleRepository.findByAuthority("USER").get();

    Set<Roles> authorities = new HashSet<>();
    authorities.add(userRole);

    return userRepository.save(
      new ApplicationUser(
        0,
        firstname,
        lastname,
        user_email,
        username,
        encodedPassword,
        bankAccountNo,
        bankSortCode,
        contactTelephone,
        contactAddress,
        authorities,
        dateJoined
      )
    );
  }

  public LoginResponseDTO loginUser(String username, String password) {
    try {
      Authentication auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password)
      );

      String token = tokenService.generateJwt(auth);

      return new LoginResponseDTO(
        userRepository.findByUsername(username).get(),
        token
      );
    } catch (AuthenticationException e) {
      return new LoginResponseDTO(null, "");
    }
  }
}
