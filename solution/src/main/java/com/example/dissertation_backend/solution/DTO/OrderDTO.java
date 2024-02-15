package com.example.dissertation_backend.solution.DTO;

import com.example.dissertation_backend.solution.Orders.Model.Orders;
import com.example.dissertation_backend.solution.Orders.Model.Orders.Status;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {

  private Long id;
  private Integer userId;
  private Long quantity;
  private Double totalPrice;
  private Status status;
  private LocalDateTime orderDateTime;
  private List<OrderDetailsDTO> items;

  // Constructors, Getters, and Setters

  public OrderDTO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Long getQuantity() {
    return quantity;
  }

  public void setQuantity(Long quantity) {
    this.quantity = quantity;
  }

  public Double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(Double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public LocalDateTime getOrderDateTime() {
    return orderDateTime;
  }

  public void setOrderDateTime(LocalDateTime orderDateTime) {
    this.orderDateTime = orderDateTime;
  }

  public List<OrderDetailsDTO> getItems() {
    return items;
  }

  public void setItems(List<OrderDetailsDTO> items) {
    this.items = items;
  }

  // Converts an Orders entity to an OrderDTO
  public static OrderDTO fromEntity(Orders order) {
    OrderDTO dto = new OrderDTO();
    dto.setId(order.getId());
    dto.setUserId(order.getUserId().getUserId());
    dto.setQuantity(order.getQuantity());
    dto.setTotalPrice(order.getTotalPrice());
    dto.setStatus(order.getStatus());
    dto.setOrderDateTime(order.getOrderDateTime());
    dto.setItems(
      order
        .getItems()
        .stream()
        .map(OrderDetailsDTO::fromEntity)
        .collect(Collectors.toList())
    );
    return dto;
  }
}
