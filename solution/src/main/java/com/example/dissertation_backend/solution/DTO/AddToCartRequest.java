package com.example.dissertation_backend.solution.DTO;

public class AddToCartRequest {
  private Integer userId;
  private Integer quantity;

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

}
