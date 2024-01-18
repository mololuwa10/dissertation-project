package com.example.dissertation_backend.solution.Category.Controller;

import com.example.dissertation_backend.solution.Category.Model.Category;
import com.example.dissertation_backend.solution.Category.Repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(
  origins = { "*" },
  methods = {
    RequestMethod.OPTIONS,
    RequestMethod.GET,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.POST,
  }
)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  @Autowired
  private CategoryRepository categoryRepository;

  @GetMapping("/{id}")
  public ResponseEntity<Category> getCategoryById(
    @PathVariable(value = "id") Integer categoryId
  ) {
    if (categoryId == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    Optional<Category> category = categoryRepository.findById(categoryId);
    if (category.isPresent()) {
      return ResponseEntity.ok().body(category.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping
  public Category addCategory(@RequestBody Category category) {
    // Checking if Category already exists ignoring all cases
    List<Category> existingCategory = categoryRepository.findByCategoryName(
      category.getCategoryName()
    );
    if (existingCategory.size() > 0) {
      return null;
    }
    // return categoryRepository.save(category);
    return categoryRepository.save(category);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Category> updateCategory(
    @PathVariable(value = "id") Integer categoryId,
    @RequestBody Category categoryDetails
  ) {
    if (categoryId == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    Optional<Category> category = categoryRepository.findById(categoryId);
    if (category.isPresent()) {
      Category updatedCategory = category.get();
      updatedCategory.setCategoryName(categoryDetails.getCategoryName());
      updatedCategory.setCategoryDescription(
        categoryDetails.getCategoryDescription()
      );
      categoryRepository.save(updatedCategory);
      return ResponseEntity.ok().body(updatedCategory);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategory(
    @PathVariable(value = "id") Integer categoryId
  ) {
    if (categoryId == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    Optional<Category> category = categoryRepository.findById(categoryId);
    category.ifPresent(categoryRepository::delete);

    return category.isPresent()
      ? ResponseEntity.ok().build()
      : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }
}
