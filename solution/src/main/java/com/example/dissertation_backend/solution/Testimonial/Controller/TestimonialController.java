package com.example.dissertation_backend.solution.Testimonial.Controller;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Service.UserService;
import com.example.dissertation_backend.solution.DTO.ApplicationUserDTO;
import com.example.dissertation_backend.solution.DTO.TestimonialDTO;
import com.example.dissertation_backend.solution.Testimonial.Model.Testimonial;
import com.example.dissertation_backend.solution.Testimonial.Service.TestimonialService;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testimonials")
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
public class TestimonialController {

  @Autowired
  private TestimonialService testimonialService;

  @Autowired
  private UserService userService;

  @GetMapping
  public List<TestimonialDTO> getAllTestimonials() {
    return testimonialService.getAllTestimonialDTOs();
  }

  @GetMapping("/{id}")
  public Optional<TestimonialDTO> getTestimonialById(@PathVariable Integer id) {
    return testimonialService.getTestimonialByIdDTOs(id);
  }

  @PostMapping
  public ResponseEntity<Object> saveOrUpdateTestimonial(
    @RequestBody TestimonialDTO testimonialDTO,
    Principal principal
  ) {
    // Check if a user is logged in
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("You must be logged in to add a review.");
    }

    // Retrieve the logged-in user's details
    ApplicationUser user = userService.findByUsername(principal.getName());
    if (user == null) {
      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("You must be logged in to add a review.");
    }

    // Create a new Testimonial object and set its fields
    Testimonial testimonial = new Testimonial();
    testimonial.setApplicationUser(user);
    testimonial.setRating(testimonialDTO.getRating());
    testimonial.setTestimonial(testimonialDTO.getComment());
    testimonial.setTestimonialDate(LocalDateTime.now());

    // Add the review to the database
    Testimonial newTestimonial = testimonialService.saveOrUpdateTestimonial(
      testimonial
    );
    return ResponseEntity.ok(convertToDTO(newTestimonial));
  }

  @DeleteMapping("/{id}")
  public void deleteTestimonial(@PathVariable Integer id) {
    testimonialService.deleteTestimonial(id);
  }

  private TestimonialDTO convertToDTO(Testimonial testimonial) {
    TestimonialDTO dto = new TestimonialDTO();
    dto.setTestimonialId(testimonial.getTestimonialId());
    dto.setRating(testimonial.getRating());
    dto.setComment(testimonial.getTestimonial());
    dto.setTestimonialDate(testimonial.getTestimonialDate());
    dto.setApplicationUser(
      convertApplicationUserDTO(testimonial.getApplicationUser())
    );

    return dto;
  }

  private ApplicationUserDTO convertApplicationUserDTO(
    ApplicationUser applicationUser
  ) {
    ApplicationUserDTO dto = new ApplicationUserDTO();
    dto.setUserId(applicationUser.getUserId());
    dto.setFirstname(applicationUser.getFirstname());
    dto.setLastname(applicationUser.getLastname());
    dto.setUsername(applicationUser.getUsername());
    dto.setPassword(applicationUser.getPassword());
    dto.setUser_email(applicationUser.getUser_email());
    dto.setBankAccountNo(applicationUser.getBankAccountNo());
    dto.setBankSortCode(applicationUser.getBankSortCode());
    dto.setContactTelephone(applicationUser.getContactTelephone());
    dto.setContactAddress(applicationUser.getContactAddress());
    dto.setAuthorities(applicationUser.getAuthorities());
    dto.setDateJoined(applicationUser.getDateJoined());

    return dto;
  }
}
