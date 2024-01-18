package com.example.dissertation_backend.solution.Products.Service;

import com.example.dissertation_backend.solution.DTO.ProductDTO;
import com.example.dissertation_backend.solution.Products.Model.Products;
import com.example.dissertation_backend.solution.Products.Repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServices {

  @Autowired
  private ProductRepository productRepository;

  public List<ProductDTO> getAllProductDTOs() {
    List<Products> products = productRepository.findAll();
    return products
      .stream()
      .map(this::convertToDTO)
      .collect(Collectors.toList());
  }

  private ProductDTO convertToDTO(Products product) {
    ProductDTO dto = new ProductDTO();
    dto.setProductId(product.getProductId());
    dto.setProductName(product.getProductName());
    dto.setProductDescription(product.getProductDescription());
    dto.setProductPrice(product.getProductPrice());
    dto.setProductStockQuantity(product.getProductStockQuantity());
    return dto;
  }

  public Optional<Products> getProductById(Integer id) {
    if (id == null) {
      return Optional.empty();
    }
    return productRepository.findById(id);
  }

  public Products saveOrUpdateProduct(Products product) {
    if (product == null) {
      return null;
    }
    return productRepository.save(product);
  }

  public void deleteProduct(Integer id) {
    if (id == null) {
      return;
    }
    productRepository.deleteById(id);
  }
  // Additional business logic methods can be added here
}
