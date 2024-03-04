package com.example.dissertation_backend.solution.WebSocket.Chat;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
public class ChatMessage {

  private MessageType type;
  private String content;
  private String sender;
  private Integer recipientId;

  public ChatMessage(MessageType type, String content, String sender) {
    this.type = type;
    this.content = content;
    this.sender = sender;
  }

  public ChatMessage(
    MessageType type,
    String content,
    String sender,
    Integer recipientId
  ) {
    this.type = type;
    this.content = content;
    this.sender = sender;
    this.recipientId = recipientId;
  }

  public enum MessageType {
    CHAT,
    SENT,
    RECEIVED,
    JOIN,
    LEAVE,
  }

  public MessageType getType() {
    return type;
  }

  public void setType(MessageType type) {
    this.type = type;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public Integer getRecipientId() {
    return recipientId;
  }

  public void setRecipientId(Integer recipientId) {
    this.recipientId = recipientId;
  }
}
