package com.example.dissertation_backend.solution.Orders.Repository;

import com.example.dissertation_backend.solution.Orders.Model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {}
