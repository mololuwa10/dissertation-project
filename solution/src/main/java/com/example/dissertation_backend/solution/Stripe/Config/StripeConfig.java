package com.example.dissertation_backend.solution.Stripe.Config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

// import org.springframework.stereotype.Component;

@Configuration
public class StripeConfig {

  @Value("${stripe.api.secretKey}")
  private String secretKey;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }
}
