package com.example.dissertation_backend.solution.Category.Service;

import com.example.dissertation_backend.solution.Category.Model.Category;
import com.example.dissertation_backend.solution.Category.Repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public Optional<Category> getCategoryById(Integer categoryId) {
    if (categoryId == null) {
      return Optional.empty();
    }
    return categoryRepository.findById(categoryId);
  }

  public Category addCategory(Category category) {
    if (category == null) {
      return null;
    }
    return categoryRepository.save(category);
  }

  public Optional<Category> updateCategory(
    Integer categoryId,
    Category categoryDetails
  ) {
    if (categoryId == null) {
      return Optional.empty();
    }
    Optional<Category> category = categoryRepository.findById(categoryId);
    if (category.isPresent()) {
      Category updatedCategory = category.get();
      updatedCategory.setCategoryName(categoryDetails.getCategoryName());
      updatedCategory.setCategoryDescription(
        categoryDetails.getCategoryDescription()
      );
      updatedCategory.setCategoryImageUrl(
        categoryDetails.getCategoryImageUrl()
      );
      categoryRepository.save(updatedCategory);
      return Optional.of(updatedCategory);
    } else {
      return Optional.empty();
    }
  }

  public boolean deleteCategory(Integer categoryId) {
    if (categoryId == null) {
      return false;
    }
    Optional<Category> category = categoryRepository.findById(categoryId);
    if (category.isPresent()) {
      category.ifPresent(categoryRepository::delete);
      return true;
    }
    return false;
  }
}
