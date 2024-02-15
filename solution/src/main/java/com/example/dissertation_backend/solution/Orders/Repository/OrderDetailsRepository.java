package com.example.dissertation_backend.solution.Orders.Repository;

import com.example.dissertation_backend.solution.Orders.Model.OrderDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository
  extends JpaRepository<OrderDetails, Integer> {
  List<OrderDetails> findByProduct_Artisan_ArtisanId(Integer artisanId);
}
