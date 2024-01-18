package com.example.dissertation_backend.solution.Customers.Controllers;

import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Service.ArtisanProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artisan")
public class ArtisanProfileController {

  @Autowired
  private ArtisanProfileService artisanProfileService;

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

  @PutMapping("/{id}")
  public ArtisanProfile updateArtisanProfile(
    @PathVariable Integer id,
    @RequestBody ArtisanProfile artisanProfile
  ) {
    artisanProfile.setArtisanId(id);
    return artisanProfileService.saveOrUpdateArtisanProfile(artisanProfile);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteArtisanProfile(@PathVariable Integer id) {
    artisanProfileService.deleteArtisanProfile(id);
    return ResponseEntity.ok().build();
  }
  // Additional endpoint methods can be added here
}
