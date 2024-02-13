package com.example.dissertation_backend.solution.Stripe.Controller;

import com.example.dissertation_backend.solution.Stripe.Model.CheckoutPayment;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
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

  @PostMapping("/create-checkout-session")
  public String createCheckoutSession(
    @RequestBody CheckoutPayment checkoutPayment
  ) {
    try {
      SessionCreateParams params = SessionCreateParams
        .builder()
        .addLineItem(
          SessionCreateParams.LineItem
            .builder()
            .setPriceData(
              SessionCreateParams.LineItem.PriceData
                .builder()
                .setCurrency(checkoutPayment.getCurrency())
                .setUnitAmount(checkoutPayment.getAmount())
                .setProductData(
                  SessionCreateParams.LineItem.PriceData.ProductData
                    .builder()
                    .setName(checkoutPayment.getProductName())
                    .build()
                )
                .build()
            )
            .setQuantity(checkoutPayment.getQuantity())
            .build()
        )
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl(checkoutPayment.getSuccessUrl())
        .setCancelUrl(checkoutPayment.getCancelUrl())
        .build();

      Session session = Session.create(params);

      return session.getUrl();
    } catch (StripeException e) {
      e.printStackTrace();
      return "Failed to create checkout session";
    }
  }
}
