package com.example.dissertation_backend.solution.Exception;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler("/uploads/**")
      .addResourceLocations("file:uploads/"); // Assuming uploads is in the root directory
  }
}
