package com.example.dissertation_backend.solution.Customers.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Repository.ArtisanProfileRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtisanProfileService {

  @Autowired
  private ArtisanProfileRepository artisanProfileRepository;

  public List<ArtisanProfile> getAllArtisanProfiles() {
    return artisanProfileRepository.findAll();
  }

  public Optional<ArtisanProfile> getArtisanProfileById(Integer id) {
    if (id == null) {
      return Optional.empty();
    }
    return artisanProfileRepository.findById(id);
  }

  public ArtisanProfile saveOrUpdateArtisanProfile(
    ArtisanProfile artisanProfile
  ) {
    if (artisanProfile == null) {
      return null;
    }
    return artisanProfileRepository.save(artisanProfile);
  }

  public void deleteArtisanProfile(Integer id) {
    if (id == null) {
      return;
    }
    artisanProfileRepository.deleteById(id);
  }

  // Method to find ArtisanProfile by ApplicationUser
  public Optional<ArtisanProfile> findByArtisan(ApplicationUser artisan) {
    List<ArtisanProfile> profiles = artisanProfileRepository.findByArtisan(
      artisan
    );
    return profiles.isEmpty() ? Optional.empty() : Optional.of(profiles.get(0));
  }
}
