package com.example.dissertation_backend.solution.DTO;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;

public class LoginResponseDTO {

  private ApplicationUser user;
  private String jwt;
  private ArtisanProfileDTO artisanProfileDTO;

  public LoginResponseDTO() {
    super();
  }

  public LoginResponseDTO(
    ApplicationUser user,
    String jwt,
    ArtisanProfileDTO artisanProfileDTO
  ) {
    this.user = user;
    this.jwt = jwt;
    this.artisanProfileDTO = artisanProfileDTO;
  }

  public ApplicationUser getUser() {
    return this.user;
  }

  public void setUser(ApplicationUser user) {
    this.user = user;
  }

  public String getJwt() {
    return this.jwt;
  }

  public void setJwt(String jwt) {
    this.jwt = jwt;
  }

  public ArtisanProfileDTO getArtisanProfileDTO() {
    return artisanProfileDTO;
  }

  public void setArtisanProfileDTO(ArtisanProfileDTO artisanProfileDTO) {
    this.artisanProfileDTO = artisanProfileDTO;
  }
}
