package com.example.dissertation_backend.solution.Products.Model;

import com.example.dissertation_backend.solution.Category.Model.Category;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
@Table(name = "products")
public class Products {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_id")
  private Integer productId;

  @ManyToOne
  @JoinColumn(name = "artisan_id", referencedColumnName = "artisan_id")
  private ArtisanProfile artisan;

  @ManyToOne
  @JoinColumn(name = "category_id", referencedColumnName = "category_id")
  private Category category;

  @OneToMany(
    mappedBy = "product",
    cascade = CascadeType.ALL,
    fetch = FetchType.EAGER
  )
  @Column(name = "product_images")
  private Set<ProductImages> images = new HashSet<>();

  @Column(name = "product_name")
  private String productName;

  @Column(name = "product_description")
  private String productDescription;

  @Column(name = "product_price")
  private Double productPrice;

  @Column(name = "product_stock_quantity")
  private Integer productStockQuantity;

  @Column(name = "date_time_listed")
  private LocalDateTime dateTimeListed;

  @Column(name = "product_date_updated")
  private LocalDateTime dateTimeUpdated;

  // CONSTRUCTORS
  public Products() {
    super();
  }

  public Products(
    ArtisanProfile artisan,
    Category category,
    String productName,
    String productDescription,
    Double productPrice,
    Integer productStockQuantity,
    LocalDateTime dateTimeListed,
    LocalDateTime dateTimeUpdated
  ) {
    this.artisan = artisan;
    this.category = category;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productStockQuantity = productStockQuantity;
    this.dateTimeListed = dateTimeListed;
    this.dateTimeUpdated = dateTimeUpdated;
  }

  // GETTERS AND SETTERS
  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  public ArtisanProfile getArtisan() {
    return artisan;
  }

  public void setArtisan(ArtisanProfile artisan) {
    this.artisan = artisan;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
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

  public LocalDateTime getDateListed() {
    return dateTimeListed;
  }

  public void setDateListed(LocalDateTime dateTimeListed) {
    this.dateTimeListed = dateTimeListed;
  }

  public Set<ProductImages> getImages() {
    return images;
  }

  public void setImages(Set<ProductImages> images) {
    this.images = images;
  }

  // Method to add an image to the product
  public void addImage(ProductImages image) {
    this.images.add(image);
    image.setProduct(this);
  }

  public LocalDateTime getDateTimeUpdated() {
    return dateTimeUpdated;
  }

  public void setDateTimeUpdated(LocalDateTime dateTimeUpdated) {
    this.dateTimeUpdated = dateTimeUpdated;
  }
}
