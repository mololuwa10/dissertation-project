package com.example.dissertation_backend.solution.Message.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.Message.Model.Message;
import com.example.dissertation_backend.solution.Message.Repository.MessageRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

  @Autowired
  private MessageRepository messageRepository;

  @Autowired
  private UserRepository userRepository;

  public Message sendMessage(
    Integer senderId,
    Integer receiverId,
    String messageText
  ) {
    if (senderId == null || receiverId == null || messageText == null) {
      return null;
    }
    ApplicationUser sender = userRepository
      .findById(senderId)
      .orElseThrow(() -> new RuntimeException("Sender not found"));
    ApplicationUser receiver = userRepository
      .findById(receiverId)
      .orElseThrow(() -> new RuntimeException("Receiver not found"));

    Message message = new Message();
    message.setSender(sender);
    message.setReceiver(receiver);
    message.setMessageText(messageText);
    message.setDateSent(LocalDateTime.now());

    return messageRepository.save(message);
  }

  public List<Message> getConversation(Integer senderId, Integer receiverId) {
    return messageRepository.findBySender_UserIdAndReceiver_UserId(
      senderId,
      receiverId
    );
  }
}
