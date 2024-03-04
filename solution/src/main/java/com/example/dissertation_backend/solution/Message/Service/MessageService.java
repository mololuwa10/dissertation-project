package com.example.dissertation_backend.solution.Message.Service;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
// import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.Message.Model.Message;
import com.example.dissertation_backend.solution.Message.Repository.MessageRepository;
import com.example.dissertation_backend.solution.WebSocket.Chat.ChatMessage;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

  @Autowired
  private MessageRepository messageRepository;

  // @Autowired
  // private UserRepository userRepository;

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

  public List<Message> getMessageHistory(ApplicationUser receiver) {
    return messageRepository.findByReceiver(receiver);
  }
}
