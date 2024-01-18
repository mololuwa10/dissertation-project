package com.example.dissertation_backend.solution.Customers.Controllers;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.Customers.Service.UserService;
import java.security.Principal;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(
  origins = { "*" },
  methods = {
    RequestMethod.OPTIONS,
    RequestMethod.GET,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.POST,
  }
)
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  @GetMapping("/")
  public String helloUserController() {
    return "User access level";
  }

  @GetMapping("/info")
  public ResponseEntity<ApplicationUser> getUserDetails() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      Jwt jwt = (Jwt) authentication.getPrincipal();
      String username = jwt.getClaim("sub");
      Optional<ApplicationUser> optionalUser = userRepository.findByUsername(
        username
      );
      if (optionalUser.isPresent()) {
        ApplicationUser user = optionalUser.get();
        user.setPassword(null);
        return ResponseEntity.ok(user);
      } else {
        throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "User not found"
        );
      }
    } else {
      throw new ResponseStatusException(
        HttpStatus.UNAUTHORIZED,
        "User not authenticated"
      );
    }
  }

  @PutMapping("/{userId}")
  public ResponseEntity<?> updateUser(
    @PathVariable Integer userId,
    @RequestBody ApplicationUser updatedUser
  ) {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      Jwt jwt = (Jwt) authentication.getPrincipal();
      Long authenticatedUserIdLong = jwt.getClaim("userId");

      // converting Long to Integer
      Integer authenticatedUserId = authenticatedUserIdLong != null
        ? authenticatedUserIdLong.intValue()
        : null;

      // Checking if the authenticated user is trying to update their own details
      if (authenticatedUserId == null || !userId.equals(authenticatedUserId)) {
        return ResponseEntity
          .status(HttpStatus.UNAUTHORIZED)
          .body("You can only update your own details.");
      }

      try {
        ApplicationUser user = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok(user);
      } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
      }
    } else {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("User not authenticated");
    }
  }

  @PostMapping("/request-artisan")
  public ResponseEntity<?> requestArtisanRole(Principal principal) {
    userService.requestArtisanRole(principal.getName());
    return ResponseEntity.ok(
      "Request to become an artisan submitted successfully."
    );
  }
}
