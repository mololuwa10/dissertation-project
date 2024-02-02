package com.example.dissertation_backend.solution.DTO;

public class ArtisanProfileDTO {

  private Integer artisanId;
  private String bio;
  private String profilePicture;
  private String location;
  private String storeName;

  // Fields from ApplicationUser
  private String firstname;
  private String lastname;
  private String user_email;
  private String bankAccountNo;
  private String bankSortCode;
  private String contactTelephone;
  private String contactAddress;

  public ArtisanProfileDTO() {
    super();
  }

  public ArtisanProfileDTO(
    Integer artisanId,
    String bio,
    String profilePicture,
    String location,
    String storeName,
    String firstname,
    String lastname,
    String user_email,
    String bankAccountNo,
    String bankSortCode,
    String contactTelephone,
    String contactAddress
  ) {
    this.artisanId = artisanId;
    this.bio = bio;
    this.profilePicture = profilePicture;
    this.location = location;
    this.storeName = storeName;
    this.firstname = firstname;
    this.lastname = lastname;
    this.user_email = user_email;
    this.bankAccountNo = bankAccountNo;
    this.bankSortCode = bankSortCode;
    this.contactTelephone = contactTelephone;
    this.contactAddress = contactAddress;
  }

  public Integer getArtisanId() {
    return artisanId;
  }

  public void setArtisanId(Integer artisanId) {
    this.artisanId = artisanId;
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

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getUser_email() {
    return user_email;
  }

  public void setUser_email(String user_email) {
    this.user_email = user_email;
  }

  public String getBankAccountNo() {
    return bankAccountNo;
  }

  public void setBankAccountNo(String bankAccountNo) {
    this.bankAccountNo = bankAccountNo;
  }

  public String getBankSortCode() {
    return bankSortCode;
  }

  public void setBankSortCode(String bankSortCode) {
    this.bankSortCode = bankSortCode;
  }

  public String getContactTelephone() {
    return contactTelephone;
  }

  public void setContactTelephone(String contactTelephone) {
    this.contactTelephone = contactTelephone;
  }

  public String getContactAddress() {
    return contactAddress;
  }

  public void setContactAddress(String contactAddress) {
    this.contactAddress = contactAddress;
  }

  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }
}
