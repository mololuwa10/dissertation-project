package com.example.dissertation_backend.solution.Products.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImages {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_image_id")
  private Integer productImageId;

  @ManyToOne
  @JoinColumn(name = "product_id", referencedColumnName = "product_id")
  private Products product;

  @Column(name = "image_url")
  private String imageUrl;

  // CONSTRUCTORS
  public ProductImages() {
    super();
  }

  public ProductImages(Products product, String imageUrl) {
    this.product = product;
    this.imageUrl = imageUrl;
  }

  // GETTERS AND SETTERS
  public Integer getProductImageId() {
    return productImageId;
  }

  public void setProductImageId(Integer productImageId) {
    this.productImageId = productImageId;
  }

  public Products getProduct() {
    return product;
  }

  public void setProduct(Products product) {
    this.product = product;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
