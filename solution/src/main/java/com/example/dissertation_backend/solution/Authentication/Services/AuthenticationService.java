package com.example.dissertation_backend.solution.Authentication.Services;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Model.Roles;
import com.example.dissertation_backend.solution.Customers.Repository.ArtisanProfileRepository;
import com.example.dissertation_backend.solution.Customers.Repository.RoleRepository;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.ArtisanProfileDTO;
import com.example.dissertation_backend.solution.DTO.LoginResponseDTO;
import com.example.dissertation_backend.solution.Exception.InvalidCredentialsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AuthenticationService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ArtisanProfileRepository artisanProfileRepository;

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

      ApplicationUser user = userRepository
        .findByUsername(username)
        .orElseThrow(() ->
          new UsernameNotFoundException(
            "User not found with username: " + username
          )
        );

      ArtisanProfileDTO artisanDetails = null;
      if (userIsArtisan(user)) {
        // Fetch artisan details
        artisanDetails = fetchArtisanDetailsForUser(user);
      }

      return new LoginResponseDTO(
        userRepository.findByUsername(username).get(),
        token,
        artisanDetails
      );
    } catch (AuthenticationException e) {
      throw new InvalidCredentialsException("Invalid credentials");
    }
  }

  private ArtisanProfileDTO fetchArtisanDetailsForUser(ApplicationUser user) {
    // Fetch artisan profile from the database and convert to DTO
    // This is pseudocode; actual implementation will depend on your database and classes
    ArtisanProfile artisanProfile = artisanProfileRepository
      .findByArtisan_UserId(user.getUserId())
      .orElseThrow(() ->
        new EntityNotFoundException("Artisan profile not found")
      );
    return convertArtisanProfileToDTO(artisanProfile);
  }

  private ArtisanProfileDTO convertArtisanProfileToDTO(
    ArtisanProfile artisanProfile
  ) {
    ArtisanProfileDTO artisanProfileDTO = new ArtisanProfileDTO();
    artisanProfileDTO.setArtisanId(artisanProfile.getArtisanId());
    artisanProfileDTO.setBio(artisanProfile.getBio());
    artisanProfileDTO.setProfilePicture(artisanProfile.getProfilePicture());
    artisanProfileDTO.setLocation(artisanProfile.getLocation());
    artisanProfileDTO.setStoreName(artisanProfile.getStoreName());

    // Map other fields from ApplicationUser to ArtisanProfileDTO as needed
    artisanProfileDTO.setFirstname(artisanProfile.getArtisan().getFirstname());
    artisanProfileDTO.setLastname(artisanProfile.getArtisan().getLastname());
    artisanProfileDTO.setUser_email(
      artisanProfile.getArtisan().getUser_email()
    );
    artisanProfileDTO.setBankAccountNo(
      artisanProfile.getArtisan().getBankAccountNo()
    );
    artisanProfileDTO.setBankSortCode(
      artisanProfile.getArtisan().getBankSortCode()
    );
    artisanProfileDTO.setContactTelephone(
      artisanProfile.getArtisan().getContactTelephone()
    );
    artisanProfileDTO.setContactAddress(
      artisanProfile.getArtisan().getContactAddress()
    );

    return artisanProfileDTO;
  }

  private boolean userIsArtisan(ApplicationUser user) {
    return user
      .getAuthorities()
      .stream()
      .anyMatch(role -> "ARTISAN".equals(role.getAuthority()));
  }
}
