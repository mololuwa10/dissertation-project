package com.example.dissertation_backend.solution.ShoppingCart.Repository;

import com.example.dissertation_backend.solution.ShoppingCart.Model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {}
