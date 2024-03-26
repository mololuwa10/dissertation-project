package com.example.dissertation_backend.solution.Customers.Controllers;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.Customers.Service.ArtisanProfileService;
import java.security.Principal;
// import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artisan")
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
public class ArtisanProfileController {

  @Autowired
  private ArtisanProfileService artisanProfileService;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/")
  public String helloArtisanController() {
    return "Artisan access level";
  }

  @GetMapping("/{id}")
  public ResponseEntity<ArtisanProfile> getArtisanProfileById(
    @PathVariable Integer id
  ) {
    return artisanProfileService
      .getArtisanProfileById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ArtisanProfile createArtisanProfile(
    @RequestBody ArtisanProfile artisanProfile
  ) {
    return artisanProfileService.saveOrUpdateArtisanProfile(artisanProfile);
  }

  @PutMapping
  public ResponseEntity<ArtisanProfile> updateArtisanProfile(
    @RequestBody ArtisanProfile artisanProfile,
    Principal principal
  ) {
    // Assuming you have a method to fetch the ApplicationUser by username
    // Fetch the ApplicationUser by username from Principal
    ApplicationUser currentUser = userRepository
      .findByUsername(principal.getName())
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    if (currentUser == null) {
      // Handle the case where the ApplicationUser cannot be found
      throw new UsernameNotFoundException("User not found");
    }

    // Update the artisan profile for the current user
    ArtisanProfile updatedProfile = artisanProfileService.updateArtisanProfile(
      artisanProfile,
      currentUser
    );

    // Return the updated profile
    return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteArtisanProfile(@PathVariable Integer id) {
    artisanProfileService.deleteArtisanProfile(id);
    return ResponseEntity.ok().build();
  }
  // Additional endpoint methods can be added here
}
