package com.example.dissertation_backend.solution.DTO;

public class MessageDTO {

  private Integer senderId;
  private Integer receiverId;
  private String messageText;

  // Constructors, Getters, and Setters
  public MessageDTO() {
    super();
  }

  public MessageDTO(Integer senderId, Integer receiverId, String messageText) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.messageText = messageText;
  }

  // Getters and setters
  public Integer getSenderId() {
    return senderId;
  }

  public void setSenderId(Integer senderId) {
    this.senderId = senderId;
  }

  public Integer getReceiverId() {
    return receiverId;
  }

  public void setReceiverId(Integer receiverId) {
    this.receiverId = receiverId;
  }

  public String getMessageText() {
    return messageText;
  }

  public void setMessageText(String messageText) {
    this.messageText = messageText;
  }
}
