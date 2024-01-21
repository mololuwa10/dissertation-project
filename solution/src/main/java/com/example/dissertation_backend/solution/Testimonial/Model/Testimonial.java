package com.example.dissertation_backend.solution.Testimonial.Model;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonial")
public class Testimonial {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "testimonial_id")
  private Integer testimonialId;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  private ApplicationUser applicationUser;

  @Column(name = "testimonial_content")
  private String testimonial;

  @Column(name = "testimonial_rating")
  private Integer rating;

  @Column(name = "testimonial_date")
  private LocalDateTime testimonialDate;

  // Constructors
  public Testimonial() {
    super();
  }

  public Testimonial(
    Integer testimonialId,
    ApplicationUser applicationUser,
    String testimonial,
    Integer rating,
    LocalDateTime testimonialDate
  ) {
    super();
    this.testimonialId = testimonialId;
    this.applicationUser = applicationUser;
    this.testimonial = testimonial;
    this.rating = rating;
    this.testimonialDate = testimonialDate;
  }

  // Getters and setters
  public Integer getTestimonialId() {
    return testimonialId;
  }

  public void setTestimonialId(Integer testimonialId) {
    this.testimonialId = testimonialId;
  }

  public ApplicationUser getApplicationUser() {
    return applicationUser;
  }

  public void setApplicationUser(ApplicationUser applicationUser) {
    this.applicationUser = applicationUser;
  }

  public String getTestimonial() {
    return testimonial;
  }

  public void setTestimonial(String testimonial) {
    this.testimonial = testimonial;
  }

  public Integer getRating() {
    return rating;
  }

  public void setRating(Integer rating) {
    this.rating = rating;
  }

  public LocalDateTime getTestimonialDate() {
    return testimonialDate;
  }

  public void setTestimonialDate(LocalDateTime testimonialDate) {
    this.testimonialDate = testimonialDate;
  }
}
