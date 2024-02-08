package com.example.dissertation_backend.solution.Products.Repository;

import com.example.dissertation_backend.solution.Products.Model.Products;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {
  // Add any custom query methods if needed
  List<Products> findByArtisan_ArtisanId(Integer artisanId);
}
