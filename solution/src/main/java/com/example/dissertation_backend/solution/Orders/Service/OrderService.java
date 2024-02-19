package com.example.dissertation_backend.solution.Orders.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.FullOrderDTO;
import com.example.dissertation_backend.solution.DTO.OrderDTO;
import com.example.dissertation_backend.solution.DTO.OrderDetailsDTO;
import com.example.dissertation_backend.solution.Orders.Model.OrderDetails;
import com.example.dissertation_backend.solution.Orders.Model.Orders;
import com.example.dissertation_backend.solution.Orders.Repository.OrderDetailsRepository;
import com.example.dissertation_backend.solution.Orders.Repository.OrdersRepository;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

  @Autowired
  private OrdersRepository ordersRepository;

  @Autowired
  private OrderDetailsRepository orderDetailsRepository;

  @Autowired
  private UserRepository userRepository;

  public Orders saveOrder(Orders orders) {
    if (orders == null) {
      return null;
    }

    return ordersRepository.save(orders);
  }

  public Optional<Orders> getOrderById(Long id) {
    if (id == null) {
      return Optional.empty();
    }
    return ordersRepository.findById(id);
  }

  public List<OrderDTO> findAllOrdersDTO() {
    List<Orders> allOrders = ordersRepository.findAll();

    // Convert each Orders entity to OrderDTO
    return allOrders
      .stream()
      .map(OrderDTO::fromEntity)
      .collect(Collectors.toList());
  }

  public List<OrderDTO> findOrdersByUserDTO(ApplicationUser user) {
    List<Orders> orders = ordersRepository.findByUserId(user);
    return orders
      .stream()
      .map(OrderDTO::fromEntity)
      .collect(Collectors.toList());
  }

  public List<FullOrderDTO> findFullOrdersByArtisanId(Principal principal) {
    // Retrieve the username from the Principal object
    String username = principal.getName();

    // Find the user by username
    ApplicationUser user = userRepository
      .findByUsername(username)
      .orElseThrow(() ->
        new UsernameNotFoundException(
          "User not found with username: " + username
        )
      );

    // Check if the user has an artisan profile
    if (user.getArtisanProfile() == null) {
      throw new RuntimeException("Logged in user is not an artisan");
    }

    Integer artisanId = user.getArtisanProfile().getArtisanId();

    // Use the artisanId to find order details
    List<OrderDetails> orderDetailsList = orderDetailsRepository.findByProduct_Artisan_ArtisanId(
      artisanId
    );
    return orderDetailsList
      .stream()
      .collect(Collectors.groupingBy(OrderDetails::getOrder))
      .entrySet()
      .stream()
      .map(entry -> {
        OrderDTO orderDTO = OrderDTO.fromEntity(entry.getKey());
        List<OrderDetailsDTO> detailsDTOs = entry
          .getValue()
          .stream()
          .map(OrderDetailsDTO::fromEntity)
          .collect(Collectors.toList());
        return new FullOrderDTO(orderDTO, detailsDTOs);
      })
      .collect(Collectors.toList());
  }

  public void deleteOrder(Long id) {
    if (id == null) {
      return;
    }
    ordersRepository.deleteById(id);
  }
}
