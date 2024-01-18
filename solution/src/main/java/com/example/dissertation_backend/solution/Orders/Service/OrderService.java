package com.example.dissertation_backend.solution.Orders.Service;

import com.example.dissertation_backend.solution.Orders.Model.Orders;
import com.example.dissertation_backend.solution.Orders.Repository.OrdersRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

  @Autowired
  private OrdersRepository ordersRepository;

  // @Transactional
  // public Orders checkout(Long cartId) {
  // ShoppingCart cart = shoppingCartRepository.findById(cartId)
  // .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

  // Orders newOrder = createOrderFromCart(cart);
  // ordersRepository.save(newOrder);

  // clearShoppingCart(cart);
  // return newOrder;
  // }

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

  public List<Orders> getAllOrders() {
    return ordersRepository.findAll();
  }

  public void deleteOrder(Long id) {
    if (id == null) {
      return;
    }
    ordersRepository.deleteById(id);
  }
}
