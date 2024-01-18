package com.example.dissertation_backend.solution.ShoppingCart.Model;

import com.example.dissertation_backend.solution.Products.Model.Products;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "cart_item")
public class CartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cart_item_id")
  private Integer cartItemId;

  @ManyToOne
  @JoinColumn(name = "product_id", referencedColumnName = "product_id")
  private Products product;

  // @ManyToOne
  // @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  // private ApplicationUser user;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "total_product_price")
  private Double totalProductPrice;

  @ManyToOne
  @JoinColumn(name = "cart_id", referencedColumnName = "cart_id")
  @JsonBackReference
  private ShoppingCart shoppingCart;

  // Constructor
  public CartItem() {
    super();
  }

  public CartItem(
    Products product,
    Integer quantity,
    Double totalProductPrice
  ) {
    this.product = product;
    // this.user = user;
    this.quantity = quantity;
    this.totalProductPrice = totalProductPrice;
    // this.shoppingCart = shoppingCart;
  }

  // GETTERS AND SETTERS
  public Integer getCartItemId() {
    return cartItemId;
  }

  public void setCartItemId(Integer cartItemId) {
    this.cartItemId = cartItemId;
  }

  public Products getProduct() {
    return product;
  }

  public void setProduct(Products product) {
    this.product = product;
  }

  // public ApplicationUser getUser() {
  // return user;
  // }

  // public void setUser(ApplicationUser user) {
  // this.user = user;
  // }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public ShoppingCart getShoppingCart() {
    return shoppingCart;
  }

  public void setShoppingCart(ShoppingCart shoppingCart) {
    this.shoppingCart = shoppingCart;
  }

  public Double getTotalProductPrice() {
    return totalProductPrice;
  }

  public void setTotalProductPrice(Double totalProductPrice) {
    this.totalProductPrice = totalProductPrice;
  }
}
