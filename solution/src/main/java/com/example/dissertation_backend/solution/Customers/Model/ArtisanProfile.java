package com.example.dissertation_backend.solution.Customers.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "artisan_profiles")
public class ArtisanProfile {

  @Id
  @Column(name = "artisan_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer artisanId;

  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  private ApplicationUser artisan;

  @Column(name = "bio")
  private String bio;

  // Possibly other artisan-specific fields
  @Column(name = "profile_picture")
  private String profilePicture;

  @Column(name = "location")
  private String location;

  @Column(name = "store_name")
  private String storeName;

  // Constructor
  public ArtisanProfile() {
    super();
  }

  public ArtisanProfile(
    ApplicationUser artisan,
    String bio,
    String profilePicture,
    String location,
    String storeName
  ) {
    this.artisan = artisan;
    this.bio = bio;
    this.profilePicture = profilePicture;
    this.location = location;
    this.storeName = storeName;
  }

  // Getters and Setters
  public Integer getArtisanId() {
    return artisanId;
  }

  public void setArtisanId(Integer artisanId) {
    this.artisanId = artisanId;
  }

  public ApplicationUser getArtisan() {
    return artisan;
  }

  public void setArtisan(ApplicationUser artisan) {
    this.artisan = artisan;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public void setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }
}
