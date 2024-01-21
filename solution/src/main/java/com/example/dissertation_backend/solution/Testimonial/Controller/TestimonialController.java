package com.example.dissertation_backend.solution.Testimonial.Controller;

import com.example.dissertation_backend.solution.Testimonial.Model.Testimonial;
import com.example.dissertation_backend.solution.Testimonial.Repository.TestimonialRepo;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

  @Autowired
  private TestimonialRepo testimonialRepo;

  @GetMapping
  public List<Testimonial> getAllTestimonials() {
    return testimonialRepo.findAll();
  }

  @GetMapping("/{id}")
  public Testimonial getTestimonialById(@PathVariable Integer id) {
    if (id == null) {
      return null;
    }
    return testimonialRepo.findById(id).get();
  }

  @PostMapping
  public Testimonial saveOrUpdateTestimonial(
    @RequestBody Testimonial testimonial,
    Principal principal
  ) {
    if (testimonial == null) {
      return null;
    }
    return testimonialRepo.save(testimonial);
  }

  @DeleteMapping("/{id}")
  public void deleteTestimonial(@PathVariable Integer id) {
    if (id == null) {
      return;
    }
    testimonialRepo.deleteById(id);
  }
}
