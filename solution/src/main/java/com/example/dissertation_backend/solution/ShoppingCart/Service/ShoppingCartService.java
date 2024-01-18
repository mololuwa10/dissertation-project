package com.example.dissertation_backend.solution.ShoppingCart.Service;

import com.example.dissertation_backend.solution.Category.Model.Category;
import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.ArtisanProfileDTO;
import com.example.dissertation_backend.solution.DTO.CartItemDTO;
import com.example.dissertation_backend.solution.DTO.CategoryDTO;
import com.example.dissertation_backend.solution.DTO.ProductDTO;
import com.example.dissertation_backend.solution.DTO.ShoppingCartDTO;
import com.example.dissertation_backend.solution.Products.Model.Products;
import com.example.dissertation_backend.solution.Products.Repository.ProductRepository;
import com.example.dissertation_backend.solution.ShoppingCart.Model.CartItem;
import com.example.dissertation_backend.solution.ShoppingCart.Model.ShoppingCart;
import com.example.dissertation_backend.solution.ShoppingCart.Repository.CartItemRepository;
import com.example.dissertation_backend.solution.ShoppingCart.Repository.ShoppingCartRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

// import com.example.dissertation_backend.solution.Repository.ShoppingCartRepository;

@Service
public class ShoppingCartService {

  // @Autowired
  // private ShoppingCartRepository shoppingCartRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ShoppingCartRepository shoppingCartRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public ShoppingCart getOrCreateCart(ApplicationUser user) {
    Optional<ShoppingCart> existingCart = shoppingCartRepository.findByUser(
      user
    );
    if (!existingCart.isPresent()) {
      try {
        ShoppingCart newCart = new ShoppingCart();
        newCart.setUser(user);
        newCart.setDateCreated(LocalDateTime.now());
        return shoppingCartRepository.save(newCart);
      } catch (DataIntegrityViolationException e) {
        // Handling the case where user cannot create a new cart
        return shoppingCartRepository
          .findByUser(user)
          .orElseThrow(() ->
            new RuntimeException("Unable to retrieve or create cart")
          );
      }
    }
    return existingCart.get();
  }

  public CartItemDTO addProductToCart(
    ApplicationUser user,
    Integer productId,
    Integer quantity
  ) {
    ShoppingCart cart = getOrCreateCart(user);

    // Fetch the product
    if (productId == null) {
      return null;
    }
    Products product = productRepository
      .findById(productId)
      .orElseThrow(() -> new RuntimeException("Product not found"));

    // Checking if there is enough stock available
    if (product.getProductStockQuantity() < quantity) {
      throw new RuntimeException("Not enough stock available");
    }

    // Checking if the product is already in the cart
    Optional<CartItem> existingCartItem = cart
      .getCartItems()
      .stream()
      .filter(item -> item.getProduct().getProductId().equals(productId))
      .findFirst();

    CartItemDTO cartItemDTO;
    if (existingCartItem.isPresent()) {
      // If the product is already in the cart, just update the quantity
      CartItem cartItem = existingCartItem.get();
      System.out.println(
        "Found existingCartItem: " +
        cartItem.getProduct().getProductId() +
        ", Quantity: " +
        cartItem.getQuantity()
      );
      int newQuantity = cartItem.getQuantity() + quantity;
      Double totalProductPrice = product.getProductPrice() * newQuantity;
      if (product.getProductStockQuantity() >= newQuantity) {
        cartItem.setQuantity(newQuantity);
        cartItem.setTotalProductPrice(totalProductPrice);
        cartItemDTO = convertCartItemToDTO(cartItemRepository.save(cartItem));
      } else {
        throw new RuntimeException(
          "Not enough stock available to add the requested quantity"
        );
      }
    } else {
      // If the product is not in the cart, create a new CartItem
      CartItem cartItem = new CartItem();
      cartItem.setProduct(product);
      cartItem.setShoppingCart(cart);
      cartItem.setQuantity(quantity);
      cartItem.setTotalProductPrice(product.getProductPrice());
      cartItemDTO = convertCartItemToDTO(cartItemRepository.save(cartItem));
    }

    return cartItemDTO;
  }

  public ShoppingCartDTO getCartByUsername(String username) {
    ApplicationUser user = userRepository
      .findByUsername(username)
      .orElseThrow(() -> new RuntimeException("User not found"));

    ShoppingCart cart = getOrCreateCart(user);
    return convertToDTO(cart);
  }

  private CartItemDTO convertCartItemToDTO(CartItem cartItem) {
    CartItemDTO cartItemDTO = new CartItemDTO();
    cartItemDTO.setCartItemId(cartItem.getCartItemId());
    cartItemDTO.setProduct(convertProductToDTO(cartItem.getProduct()));
    cartItemDTO.setQuantity(cartItem.getQuantity());
    // cartItemDTO.setTotalProductPrice(cartItem.getTotalProductPrice());
    return cartItemDTO;
  }

  private ShoppingCartDTO convertToDTO(ShoppingCart cart) {
    ShoppingCartDTO cartDTO = new ShoppingCartDTO();
    cartDTO.setCartId(cart.getCartId());

    List<CartItemDTO> cartItemDTOs = cart
      .getCartItems()
      .stream()
      .map(this::convertCartItemToDTO)
      .collect(Collectors.toList());

    cartDTO.setCartItems(cartItemDTOs);

    return cartDTO;
  }

  private ProductDTO convertProductToDTO(Products product) {
    ProductDTO productDTO = new ProductDTO();
    productDTO.setProductId(product.getProductId());
    productDTO.setProductName(product.getProductName());
    productDTO.setProductPrice(product.getProductPrice());
    productDTO.setProductStockQuantity(product.getProductStockQuantity());
    productDTO.setProductDescription(product.getProductDescription());
    // productDTO.setProductImage(product.getProductImage());

    ArtisanProfile artisanProfile = product.getArtisan();
    ArtisanProfileDTO artisanProfileDTO = convertArtisanProfileToDTO(
      artisanProfile
    );
    productDTO.setArtisanProfile(artisanProfileDTO);

    Category category = product.getCategory();
    CategoryDTO categoryDTO = convertCategoryToDTO(category);
    productDTO.setCategory(categoryDTO);

    return productDTO;
  }

  private ArtisanProfileDTO convertArtisanProfileToDTO(
    ArtisanProfile artisanProfile
  ) {
    ArtisanProfileDTO artisanProfileDTO = new ArtisanProfileDTO();
    artisanProfileDTO.setArtisanId(artisanProfile.getArtisanId());
    artisanProfileDTO.setBio(artisanProfile.getBio());
    artisanProfileDTO.setProfilePicture(artisanProfile.getProfilePicture());
    artisanProfileDTO.setLocation(artisanProfile.getLocation());

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

  private CategoryDTO convertCategoryToDTO(Category category) {
    CategoryDTO categoryDTO = new CategoryDTO();
    categoryDTO.setCategoryId(category.getCategoryId());
    categoryDTO.setCategoryName(category.getCategoryName());
    categoryDTO.setCategoryDescription(category.getCategoryDescription());

    return categoryDTO;
  }
}
