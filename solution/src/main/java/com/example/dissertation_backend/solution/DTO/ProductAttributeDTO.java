package com.example.dissertation_backend.solution.DTO;

public class ProductAttributeDTO {

  private Integer productAttributeId;
  private String key;
  private String value;

  // Constructor, getters, and setters
  public ProductAttributeDTO(
    Integer productAttributeId,
    String key,
    String value
  ) {
    this.productAttributeId = productAttributeId;
    this.key = key;
    this.value = value;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public ProductAttributeDTO() {
    super();
  }

  public Integer getProductAttributeId() {
    return productAttributeId;
  }

  public void setProductAttributeId(Integer productAttributeId) {
    this.productAttributeId = productAttributeId;
  }
}
