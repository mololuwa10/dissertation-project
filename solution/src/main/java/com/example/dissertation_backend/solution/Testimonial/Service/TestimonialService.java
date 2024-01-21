package com.example.dissertation_backend.solution.Testimonial.Service;

import com.example.dissertation_backend.solution.Testimonial.Model.Testimonial;
import com.example.dissertation_backend.solution.Testimonial.Repository.TestimonialRepo;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestimonialService {

  @Autowired
  private TestimonialRepo testimonialRepo;

  public List<Testimonial> getAllTestimonials() {
    return testimonialRepo.findAll();
  }

  public Optional<Testimonial> getTestimonialById(Integer id) {
    if (id == null) {
      return null;
    }
    Optional<Testimonial> testimonial = testimonialRepo.findById(id);
    return testimonial;
  }

  // Add a new review to the database, returns the newly created object on success and an
  // empty object on failure
  public Testimonial saveOrUpdateTestimonial(Testimonial testimonial) {
    if (testimonial == null) {
      return null;
    }
    return testimonialRepo.save(testimonial);
  }

  // Deletes the specified review from the database
  public void deleteTestimonial(Integer id) {
    if (id == null) {
      return;
    }
    testimonialRepo.deleteById(id);
  }
}
