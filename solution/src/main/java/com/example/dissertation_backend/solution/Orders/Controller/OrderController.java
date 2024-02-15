package com.example.dissertation_backend.solution.Orders.Controller;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.Roles;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.OrderDTO;
import com.example.dissertation_backend.solution.DTO.OrderDetailsDTO;
import com.example.dissertation_backend.solution.Orders.Service.OrderService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/all-orders")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public ResponseEntity<?> getAllOrders() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();

    // Check if the user has the ADMIN role
    if (
      authentication
        .getAuthorities()
        .contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
    ) {
      List<OrderDTO> orders = orderService.findAllOrdersDTO();
      return ResponseEntity.ok(orders);
    } else {
      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("Access is denied");
    }
  }

  @GetMapping("/users/my-orders")
  public ResponseEntity<?> getCurrentUserOrdersDTO(Principal principal) {
    // Check if principal is null
    if (principal == null) {
      return ResponseEntity
        .badRequest()
        .body("Error: User not authenticated. Please log in.");
    }

    String username = principal.getName();
    ApplicationUser user = userRepository
      .findByUsername(username)
      .orElseThrow(() ->
        new UsernameNotFoundException(
          "User not found with username: " + username
        )
      );

    List<OrderDTO> orders = orderService.findOrdersByUserDTO(user);
    return ResponseEntity.ok(orders);
  }

  @GetMapping("/artisan/{artisanId}")
  public ResponseEntity<?> getOrdersByArtisan(
    @PathVariable Integer artisanId,
    Principal principal
  ) {
    // Retrieve the username from the Principal object
    String username = principal.getName();

    // Find the user by username
    ApplicationUser user = userRepository
      .findByUsername(username)
      .orElseThrow(() ->
        new UsernameNotFoundException(
          "User not found with username: " + username
        )
      );

    // Verify that the requesting user matches the artisanId or has permission
    boolean isUserArtisan =
      user.getArtisanProfile() != null &&
      user.getArtisanProfile().getArtisanId().equals(artisanId);
    boolean isAdmin = hasRole(user, "ADMIN");

    if (!isUserArtisan && !isAdmin) {
      // User is neither the artisan nor an admin
      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("You do not have permission to view these orders.");
    }

    // If verification passes, proceed to fetch and return the orders
    List<OrderDetailsDTO> orders = orderService.findOrdersByArtisanId(
      artisanId
    );
    return ResponseEntity.ok(orders);
  }

  private boolean hasRole(ApplicationUser user, String roleName) {
    for (Roles role : user.getAuthorities()) {
      if (roleName.equals(role.getAuthority())) {
        return true;
      }
    }
    return false;
  }
}
