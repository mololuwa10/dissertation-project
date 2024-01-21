package com.example.dissertation_backend.solution.DTO;

import java.time.LocalDateTime;

public class TestimonialDTO {

  private Integer testimonialId;
  private ApplicationUserDTO applicationUser;
  private Integer rating;
  private String comment;
  private LocalDateTime testimonialDate;

  // constructor
  public TestimonialDTO(
    Integer testimonialId,
    ApplicationUserDTO applicationUser,
    Integer rating,
    String comment,
    LocalDateTime testimonialDate
  ) {
    super();
    this.testimonialId = testimonialId;
    this.applicationUser = applicationUser;
    this.rating = rating;
    this.comment = comment;
    this.testimonialDate = testimonialDate;
  }

  // Getters and setters
  public Integer getTestimonialId() {
    return testimonialId;
  }

  public void setTestimonialId(Integer testimonialId) {
    this.testimonialId = testimonialId;
  }

  public ApplicationUserDTO getApplicationUser() {
    return applicationUser;
  }

  public void setApplicationUser(ApplicationUserDTO applicationUser) {
    this.applicationUser = applicationUser;
  }

  public Integer getRating() {
    return rating;
  }

  public void setRating(Integer rating) {
    this.rating = rating;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public LocalDateTime getTestimonialDate() {
    return testimonialDate;
  }

  public void setTestimonialDate(LocalDateTime testimonialDate) {
    this.testimonialDate = testimonialDate;
  }

  public TestimonialDTO() {
    super();
  }
}
