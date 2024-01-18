package com.example.dissertation_backend.solution.DTO;

public class CategoryDTO {
  private Integer categoryId;
  private String categoryName;
  private String categoryDescription;

  public CategoryDTO() {
    super();
  }

  public CategoryDTO(Integer categoryId, String categoryName, String categoryDescription) {
    super();
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
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

}
