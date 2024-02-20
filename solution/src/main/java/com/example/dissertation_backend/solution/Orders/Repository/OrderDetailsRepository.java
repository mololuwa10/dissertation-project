package com.example.dissertation_backend.solution.Orders.Repository;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Orders.Model.OrderDetails;
import com.example.dissertation_backend.solution.Orders.Model.Orders;
import com.example.dissertation_backend.solution.Products.Model.Products;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository
  extends JpaRepository<OrderDetails, Integer> {
  List<OrderDetails> findByProduct_Artisan_ArtisanId(Integer artisanId);

  List<OrderDetails> findByOrder_UserIdAndProductAndOrder_Status(
    ApplicationUser user,
    Products product,
    Orders.Status status
  );
}
