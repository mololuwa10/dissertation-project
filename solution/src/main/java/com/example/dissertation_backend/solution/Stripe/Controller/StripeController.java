package com.example.dissertation_backend.solution.Stripe.Controller;

import com.example.dissertation_backend.solution.Products.Model.Products;
import com.example.dissertation_backend.solution.Products.Repository.ProductRepository;
import com.example.dissertation_backend.solution.Stripe.Model.CheckoutItem;
import com.example.dissertation_backend.solution.Stripe.Model.CheckoutPayment;
import com.example.dissertation_backend.solution.Stripe.Services.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(
  origins = { "*" },
  methods = {
    RequestMethod.OPTIONS,
    RequestMethod.GET,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.POST,
  }
)
public class StripeController {

  @Autowired
  private CheckoutService checkoutService;

  @Autowired
  private ProductRepository productRepository;

  @PostMapping("/create-checkout-session")
  public ResponseEntity<?> createCheckoutSession(
    @Valid @RequestBody CheckoutPayment checkoutPayment
  ) {
    try {
      // Use checkoutItems from CheckoutPayment for validations and updates
      List<CheckoutItem> checkoutItems = checkoutPayment.getItems();

      // Perform checkout validations and updates
      checkoutService.checkout(checkoutItems);

      SessionCreateParams.Builder paramsBuilder = SessionCreateParams
        .builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl(checkoutPayment.getSuccessUrl())
        .setCancelUrl(checkoutPayment.getCancelUrl());

      long totalPriceInCents = 0; // Total price in the smallest currency unit

      // Dynamically add line items based on checkoutItems
      for (CheckoutItem item : checkoutItems) {
        @SuppressWarnings("null")
        Products product = productRepository
          .findById(item.getProductId())
          .orElseThrow(() -> new RuntimeException("Product not found"));

        double priceToUse = (
            product.getProductDiscount() != null &&
            product.getProductDiscount() > 0
          )
          ? product.getProductDiscount()
          : product.getProductPrice();

        long priceInCents = Math.round(priceToUse * 100);
        totalPriceInCents += priceInCents * item.getQuantity();

        paramsBuilder.addLineItem(
          SessionCreateParams.LineItem
            .builder()
            .setPriceData(
              SessionCreateParams.LineItem.PriceData
                .builder()
                .setCurrency(checkoutPayment.getCurrency())
                .setUnitAmount(priceInCents)
                .setProductData(
                  SessionCreateParams.LineItem.PriceData.ProductData
                    .builder()
                    .setName(product.getProductName())
                    .build()
                )
                .build()
            )
            .setQuantity(Long.valueOf(item.getQuantity()))
            .build()
        );
      }

      Session session = Session.create(paramsBuilder.build());
      // Wrap the URL in a JSON object and return it
      Map<String, String> response = new HashMap<>();
      response.put("url", session.getUrl());

      // If you need to display the total price in a standard currency format, convert it here
      double displayTotalPrice = totalPriceInCents / 100.0;
      System.out.println("Total Price for Display: £" + displayTotalPrice); // Example of how to log/display

      return ResponseEntity.ok(response);
    } catch (StripeException e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Failed to create checkout session");
    }
  }
}
