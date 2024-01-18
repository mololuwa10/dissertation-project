package com.example.dissertation_backend.solution.Category.Repository;

import com.example.dissertation_backend.solution.Category.Model.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
  // Add custom query methods if needed
  List<Category> findByCategoryName(String categoryName);
}
