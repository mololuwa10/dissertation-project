package com.example.dissertation_backend.solution.Category.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_id")
  private Integer categoryId;

  @Column(name = "category_name")
  private String categoryName;

  @Column(name = "category_description")
  private String categoryDescription;

  @Column(name = "category_image_url")
  private String categoryImageUrl;

  // Constructor
  public Category() {
    super();
  }

  // GETTERS AND SETTERSS
  public Category(String name) {
    this.categoryName = name;
  }

  public Integer getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public String getCategoryDescription() {
    return categoryDescription;
  }

  public void setCategoryDescription(String categoryDescription) {
    this.categoryDescription = categoryDescription;
  }

  public String getCategoryImageUrl() {
    return categoryImageUrl;
  }

  public void setCategoryImageUrl(String categoryImageUrl) {
    this.categoryImageUrl = categoryImageUrl;
  }
}
