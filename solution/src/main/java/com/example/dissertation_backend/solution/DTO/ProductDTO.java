package com.example.dissertation_backend.solution.DTO;

public class ProductDTO {
  private Integer productId;
  private String productName;
  private String productDescription;
  private Double productPrice;
  private Integer productStockQuantity;
  private ArtisanProfileDTO artisanProfile;
  private CategoryDTO category;

  public ProductDTO() {
    super();
  }

  public ProductDTO(Integer productId, String productName, String productDescription, Double productPrice,
      Integer productStockQuantity, ArtisanProfileDTO artisanProfile, CategoryDTO category) {
    super();
    this.productId = productId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productStockQuantity = productStockQuantity;
    this.artisanProfile = artisanProfile;
    this.category = category;
  }

  public ArtisanProfileDTO getArtisanProfile() {
    return artisanProfile;
  }

  public void setArtisanProfile(ArtisanProfileDTO artisanProfile) {
    this.artisanProfile = artisanProfile;
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

  public String getProductDescription() {
    return productDescription;
  }

  public void setProductDescription(String productDescription) {
    this.productDescription = productDescription;
  }

  public Double getProductPrice() {
    return productPrice;
  }

  public void setProductPrice(Double productPrice) {
    this.productPrice = productPrice;
  }

  public Integer getProductStockQuantity() {
    return productStockQuantity;
  }

  public void setProductStockQuantity(Integer productStockQuantity) {
    this.productStockQuantity = productStockQuantity;
  }

  public CategoryDTO getCategory() {
    return category;
  }

  public void setCategory(CategoryDTO category) {
    this.category = category;
  }

}
