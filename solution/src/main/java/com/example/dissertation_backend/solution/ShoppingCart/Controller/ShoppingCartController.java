package com.example.dissertation_backend.solution.ShoppingCart.Controller;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.AddToCartRequest;
import com.example.dissertation_backend.solution.DTO.AddToCartResponse;
import com.example.dissertation_backend.solution.DTO.CartItemDTO;
import com.example.dissertation_backend.solution.DTO.ShoppingCartDTO;
import com.example.dissertation_backend.solution.ShoppingCart.Model.CartItem;
import com.example.dissertation_backend.solution.ShoppingCart.Service.CartItemService;
import com.example.dissertation_backend.solution.ShoppingCart.Service.ShoppingCartService;
import java.security.Principal;
// import java.util.ArrayList;
// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shoppingCart")
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
public class ShoppingCartController {

  @Autowired
  private ShoppingCartService shoppingCartService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CartItemService cartItemService;

  // Add product to cart
  @PostMapping("/addToCart/{productId}")
  public ResponseEntity<?> addProductToCart(
    @PathVariable Integer productId,
    @RequestBody AddToCartRequest request,
    Principal principal
  ) {
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("User is not logged in");
    }

    String username = principal.getName();
    ApplicationUser user = userRepository
      .findByUsername(username)
      .orElseThrow(() -> new RuntimeException("User not found"));

    CartItemDTO cartItemDTO = shoppingCartService.addProductToCart(
      user,
      productId,
      request.getQuantity()
    );

    AddToCartResponse response = new AddToCartResponse(
      "Product added successfully",
      cartItemDTO
    );
    return ResponseEntity.ok(response);
  }

  // Getting the cart for the user thats logged in
  @GetMapping("/getCart")
  public ResponseEntity<?> getCart(Principal principal) {
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("User is not logged in");
    }

    // Getting the username of the user logged in
    String username = principal.getName();

    ShoppingCartDTO cartDTO = shoppingCartService.getCartByUsername(username);
    return ResponseEntity.ok(cartDTO);
  }

  // Updating cart item for the user
  @PutMapping("/cartItem/{cartItemId}")
  public ResponseEntity<?> updateCartItemQuantity(
    @PathVariable Integer cartItemId,
    @RequestBody AddToCartRequest request,
    Principal principal
  ) {
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("User is not logged in");
    }

    // Fetch the current user
    CartItem cartItem = cartItemService.findById(cartItemId);
    if (
      !cartItem
        .getShoppingCart()
        .getUser()
        .getUsername()
        .equals(principal.getName())
    ) {
      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("Access denied!! You do not own this cart");
    }

    // Call service method to update the quantity
    CartItemDTO updatedCartItem = shoppingCartService.updateCartItem(
      cartItemId,
      request.getQuantity()
    );
    AddToCartResponse response = new AddToCartResponse(
      "Product updated successfully",
      updatedCartItem
    );
    return ResponseEntity.ok(response);
  }

  // Removing item from cart
  @DeleteMapping("/cartItem/{cartItemId}")
  public ResponseEntity<?> removeCartItem(
    @PathVariable Integer cartItemId,
    Principal principal
  ) {
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("User is not logged in");
    }

    // Fetch the current user
    ApplicationUser user = userRepository
      .findByUsername(principal.getName())
      .orElseThrow(() -> new RuntimeException("User not found"));

    // Call service method to remove the item
    shoppingCartService.removeCartItem(user, cartItemId);
    return ResponseEntity.ok().body("Item removed successfully");
  }
}
