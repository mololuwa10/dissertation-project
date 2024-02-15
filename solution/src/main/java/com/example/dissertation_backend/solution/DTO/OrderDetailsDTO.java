package com.example.dissertation_backend.solution.DTO;

public class OrderDetailsDTO {

  private Integer id;
  private Integer productId;
  private String productName;
  private Integer quantity;
  private Double priceAtOrder;

  // Constructors
  public OrderDetailsDTO() {}

  public OrderDetailsDTO(
    Integer id,
    Integer productId,
    String productName,
    Integer quantity,
    Double priceAtOrder
  ) {
    this.id = id;
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.priceAtOrder = priceAtOrder;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Double getPriceAtOrder() {
    return priceAtOrder;
  }

  public void setPriceAtOrder(Double priceAtOrder) {
    this.priceAtOrder = priceAtOrder;
  }

  // Conversion method from entity to DTO
  public static OrderDetailsDTO fromEntity(
    com.example.dissertation_backend.solution.Orders.Model.OrderDetails orderDetail
  ) {
    OrderDetailsDTO dto = new OrderDetailsDTO();
    dto.setId(orderDetail.getId());
    dto.setProductId(orderDetail.getProduct().getProductId());
    dto.setProductName(orderDetail.getProduct().getProductName());
    dto.setQuantity(orderDetail.getQuantity());
    dto.setPriceAtOrder(orderDetail.getPriceAtOrder());
    return dto;
  }
}
