package com.example.dissertation_backend.solution.Customers.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Repository.ArtisanProfileRepository;
import java.util.*;
// import org.apache.commons.beanutils.BeanUtils;
// import org.springframework.beans.BeanWrapper;
// import org.springframework.beans.BeanWrapperImpl;
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

  public List<ArtisanProfile> findNewArtisansToHighlight() {
    // Calculate the date 2 weeks ago from current date
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.WEEK_OF_YEAR, -2);
    Date twoWeeksAgo = cal.getTime();

    return artisanProfileRepository.findAllByCreationDateAfter(twoWeeksAgo);
  }

  public ArtisanProfile updateArtisanProfile(
    ArtisanProfile artisanProfile,
    ApplicationUser currentUser
  ) {
    ArtisanProfile existingArtisanProfile = artisanProfileRepository
      .findByArtisan(currentUser)
      .orElseThrow(() ->
        new RuntimeException("ArtisanProfile not found for the current user")
      );

    // Check if the currentUser is the same as the artisan who owns the profile
    if (!existingArtisanProfile.getArtisan().equals(currentUser)) {
      throw new RuntimeException("You are not authorized to edit this profile");
    }

    // Update fields
    // existingArtisanProfile.setBio(artisanProfile.getBio());
    // try {
    //   BeanUtils.copyProperties(existingArtisanProfile, artisanProfile);
    // } catch (Exception e) {
    //   throw new RuntimeException("Could not update artisan profile", e);
    // }

    if (artisanProfile.getBio() != null) {
      existingArtisanProfile.setBio(artisanProfile.getBio());
    }
    if (artisanProfile.getProfilePicture() != null) {
      existingArtisanProfile.setProfilePicture(
        artisanProfile.getProfilePicture()
      );
    }

    if (artisanProfile.getLocation() != null) {
      existingArtisanProfile.setLocation(artisanProfile.getLocation());
    }

    if (artisanProfile.getStoreName() != null) {
      existingArtisanProfile.setStoreName(artisanProfile.getStoreName());
    }

    if (artisanProfile.getStoreBanner() != null) {
      existingArtisanProfile.setStoreBanner(artisanProfile.getStoreBanner());
    }

    if (artisanProfile.getAnnouncements() != null) {
      existingArtisanProfile.setAnnouncements(
        artisanProfile.getAnnouncements()
      );
    }

    if (artisanProfile.getBusinessHours() != null) {
      existingArtisanProfile.setBusinessHours(
        artisanProfile.getBusinessHours()
      );
    }

    if (
      artisanProfile.getGallery() != null &&
      !artisanProfile.getGallery().isEmpty()
    ) {
      existingArtisanProfile.setGallery(artisanProfile.getGallery());
    }

    if (artisanProfile.getStories() != null) {
      existingArtisanProfile.setStories(artisanProfile.getStories());
    }

    if (artisanProfile.getSpecializations() != null) {
      existingArtisanProfile.setSpecializations(
        artisanProfile.getSpecializations()
      );
    }

    if (artisanProfile.getMaterialsUsed() != null) {
      existingArtisanProfile.setMaterialsUsed(
        artisanProfile.getMaterialsUsed()
      );
    }

    if (artisanProfile.getServicesOffered() != null) {
      existingArtisanProfile.setServicesOffered(
        artisanProfile.getServicesOffered()
      );
    }

    if (artisanProfile.getExperienceYears() != null) {
      existingArtisanProfile.setExperienceYears(
        artisanProfile.getExperienceYears()
      );
    }

    if (artisanProfile.getShippingPolicies() != null) {
      existingArtisanProfile.setShippingPolicies(
        artisanProfile.getShippingPolicies()
      );
    }

    if (artisanProfile.getReturnPolicy() != null) {
      existingArtisanProfile.setReturnPolicy(artisanProfile.getReturnPolicy());
    }

    if (artisanProfile.getPaymentOptions() != null) {
      existingArtisanProfile.setPaymentOptions(
        artisanProfile.getPaymentOptions()
      );
    }

    if (artisanProfile.getTermsConditions() != null) {
      existingArtisanProfile.setTermsConditions(
        artisanProfile.getTermsConditions()
      );
    }

    if (artisanProfile.getPrivacyPolicy() != null) {
      existingArtisanProfile.setPrivacyPolicy(
        artisanProfile.getPrivacyPolicy()
      );
    }

    if (artisanProfile.getCommunicationPreferences() != null) {
      existingArtisanProfile.setCommunicationPreferences(
        artisanProfile.getCommunicationPreferences()
      );
    }

    if (artisanProfile.getPreferredLanguage() != null) {
      existingArtisanProfile.setPreferredLanguage(
        artisanProfile.getPreferredLanguage()
      );
    }

    // Save the updated profile
    return artisanProfileRepository.save(existingArtisanProfile);
  }

  public void deleteArtisanProfile(Integer id) {
    if (id == null) {
      return;
    }
    artisanProfileRepository.deleteById(id);
  }

  // Method to find ArtisanProfile by ApplicationUser
  public Optional<ArtisanProfile> findByArtisan(ApplicationUser artisan) {
    Optional<ArtisanProfile> profiles = artisanProfileRepository.findByArtisan(
      artisan
    );
    return profiles.isEmpty() ? Optional.empty() : Optional.of(profiles.get());
  }
  // Utility method to get names of null properties from a bean
  // private String[] getNullPropertyNames(Object source) {
  //   final BeanWrapper src = new BeanWrapperImpl(source);
  //   PropertyDescriptor[] pds = src.getPropertyDescriptors();

  //   Set<String> emptyNames = new HashSet<>();
  //   for (PropertyDescriptor pd : pds) {
  //     // Check if value of property is null
  //     Object srcValue = src.getPropertyValue(pd.getName());
  //     if (srcValue == null) emptyNames.add(pd.getName());
  //   }
  //   String[] result = new String[emptyNames.size()];
  //   return emptyNames.toArray(result);
  // }
}
