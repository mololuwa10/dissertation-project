package com.example.dissertation_backend.solution.Orders.Repository;

import com.example.dissertation_backend.solution.Orders.Model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository
  extends JpaRepository<OrderDetails, Integer> {}
