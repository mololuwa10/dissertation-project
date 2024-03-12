package com.example.dissertation_backend.solution.Message.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.MessageDTO;
import com.example.dissertation_backend.solution.Message.Model.Message;
import com.example.dissertation_backend.solution.Message.Repository.MessageRepository;
import com.example.dissertation_backend.solution.WebSocket.Chat.ChatMessage;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

  @Autowired
  private MessageRepository messageRepository;

  @Autowired
  private UserRepository userRepository;

  public Message saveMessage(
    ChatMessage chatMessage,
    ApplicationUser sender,
    ApplicationUser receiver
  ) {
    Message message = new Message();
    message.setSender(sender);
    message.setReceiver(receiver);
    message.setMessageText(chatMessage.getContent());
    message.setDateSent(LocalDateTime.now());
    return messageRepository.save(message);
  }

  public List<Message> getMessageHistory(
    ApplicationUser user1,
    ApplicationUser user2
  ) {
    // Retrieves the conversation between two users sorted by date
    List<Message> messagesSent = messageRepository.findBySenderAndReceiver(
      user1,
      user2
    );
    List<Message> messagesReceived = messageRepository.findBySenderAndReceiver(
      user2,
      user1
    );

    List<Message> conversation = new ArrayList<>();
    conversation.addAll(messagesSent);
    conversation.addAll(messagesReceived);

    conversation.sort(Comparator.comparing(Message::getDateSent));
    // Consider adding pagination or limiting the number of messages
    return conversation;
  }

  @SuppressWarnings("null")
  public List<MessageDTO> getAllConversations(Integer currentUserId) {
    ApplicationUser currentUser = userRepository
      .findById(currentUserId)
      .orElseThrow(() -> new RuntimeException("User not found"));

    List<Message> messages = messageRepository.findBySenderOrReceiver(
      currentUser,
      currentUser
    );

    // Process messages to group them by conversation with each user
    Map<ApplicationUser, List<Message>> conversations = new HashMap<>();
    messages.forEach(message -> {
      ApplicationUser otherParty = message.getSender().equals(currentUser)
        ? message.getReceiver()
        : message.getSender();
      conversations
        .computeIfAbsent(otherParty, k -> new ArrayList<>())
        .add(message);
    });

    // Convert to a list of Conversation DTOs or similar structure
    List<MessageDTO> conversationList = conversations
      .entrySet()
      .stream()
      .map(entry -> new MessageDTO(entry.getKey(), entry.getValue()))
      .collect(Collectors.toList());

    return conversationList;
  }
}
