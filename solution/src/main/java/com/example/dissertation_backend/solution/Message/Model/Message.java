package com.example.dissertation_backend.solution.Message.Model;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private Integer messageId;

  @ManyToOne
  @JoinColumn(name = "sender_id", referencedColumnName = "user_id")
  private ApplicationUser sender;

  @ManyToOne
  @JoinColumn(name = "receiver_id", referencedColumnName = "user_id")
  private ApplicationUser receiver;

  @Column(name = "message_text")
  private String messageText;

  @Column(name = "date_sent")
  private LocalDateTime dateSent;

  // Constructors

  public Message() {
    super();
  }

  public Message(
    ApplicationUser sender,
    ApplicationUser receiver,
    String messageText,
    LocalDateTime dateSent
  ) {
    this.sender = sender;
    this.receiver = receiver;
    this.messageText = messageText;
    this.dateSent = dateSent;
  }

  // Getters and setters

  public Integer getMessageId() {
    return messageId;
  }

  public void setMessageId(Integer messageId) {
    this.messageId = messageId;
  }

  public ApplicationUser getSender() {
    return sender;
  }

  public void setSender(ApplicationUser sender) {
    this.sender = sender;
  }

  public ApplicationUser getReceiver() {
    return receiver;
  }

  public void setReceiver(ApplicationUser receiver) {
    this.receiver = receiver;
  }

  public String getMessageText() {
    return messageText;
  }

  public void setMessageText(String messageText) {
    this.messageText = messageText;
  }

  public LocalDateTime getDateSent() {
    return dateSent;
  }

  public void setDateSent(LocalDateTime dateSent) {
    this.dateSent = dateSent;
  }
}
