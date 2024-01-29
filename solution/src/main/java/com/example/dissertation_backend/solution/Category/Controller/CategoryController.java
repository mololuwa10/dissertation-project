package com.example.dissertation_backend.solution.Category.Controller;

import com.example.dissertation_backend.solution.Category.Model.Category;
import com.example.dissertation_backend.solution.Category.Repository.CategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

  @GetMapping
  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

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
  public ResponseEntity<Object> addCategory(
    @RequestParam("image") MultipartFile image,
    @RequestParam("category") String categoryStr
  ) {
    try {
      String imageUrl = storeImage(image); // Method to store the image and return the URL

      ObjectMapper mapper = new ObjectMapper();
      Category category = mapper.readValue(categoryStr, Category.class);
      category.setCategoryImageUrl(imageUrl);

      List<Category> existingCategory = categoryRepository.findByCategoryName(
        category.getCategoryName()
      );
      if (!existingCategory.isEmpty()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }

      Category savedCategory = categoryRepository.save(category);
      return ResponseEntity.ok(savedCategory);
    } catch (IOException e) {
      // Handling IOException
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Failed to add category");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateCategory(
    @PathVariable(value = "id") Integer categoryId,
    @RequestParam(value = "image", required = false) MultipartFile image,
    @RequestParam("category") String categoryStr
  ) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      Category categoryDetails = mapper.readValue(categoryStr, Category.class);

      if (categoryId == null) {
        return null;
      }
      Optional<Category> categoryOptional = categoryRepository.findById(
        categoryId
      );
      if (categoryOptional.isPresent()) {
        Category existingCategory = categoryOptional.get();

        // If a new image is provided, update it
        if (image != null && !image.isEmpty()) {
          String imageUrl = storeImage(image); // Method to store the image and return the URL
          existingCategory.setCategoryImageUrl(imageUrl);
        }
        // If no image is provided and existing category doesn't have an image, retain or ignore it

        existingCategory.setCategoryName(categoryDetails.getCategoryName());
        existingCategory.setCategoryDescription(
          categoryDetails.getCategoryDescription()
        );

        categoryRepository.save(existingCategory);
        return ResponseEntity.ok(existingCategory);
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
    } catch (IOException e) {
      // Handling IOException
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Failed to update category");
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

  private String storeImage(MultipartFile image) throws IOException {
    if (image != null && !image.isEmpty()) {
      Path uploadDir = Paths.get("uploads");

      // If the directory doesn't exist, create it
      if (!Files.exists(uploadDir)) {
        Files.createDirectories(uploadDir);
      }

      // Generate a unique filename using the current time and the original filename
      String filename =
        System.currentTimeMillis() + "_" + image.getOriginalFilename();

      // Save the image file to the upload directory
      Files.copy(image.getInputStream(), uploadDir.resolve(filename));

      // Return the URL of the image
      return "/uploads/" + filename;
    }
    return null;
  }
}
