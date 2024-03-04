package com.example.dissertation_backend.solution.WebSocket.Chat;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.Message.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Controller
@CrossOrigin(
  origins = { "*" },
  methods = {
    RequestMethod.OPTIONS,
    RequestMethod.GET,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.POST,
  }
)
public class ChatController {

  @Autowired
  private MessageService messageService;

  @Autowired
  private UserRepository userRepository;

  // @MessageMapping("/chat.sendMessage")
  // @SendTo("/topic/public")
  // public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
  //   return chatMessage;
  // }

  @MessageMapping("/api/chat.sendMessage")
  @SendTo("/topic/public")
  public ChatMessage sendMessage(
    @Payload ChatMessage chatMessage,
    SimpMessageHeaderAccessor headerAccessor
  ) {
    // Extract sender and receiver information from the message or security context
    ApplicationUser sender = userRepository
      .findByUsername(chatMessage.getSender())
      .orElseThrow();
    @SuppressWarnings("null")
    ApplicationUser recipient = userRepository
      .findById(chatMessage.getRecipientId())
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Artisan not found")
      );

    // Save the message to the database
    messageService.saveMessage(chatMessage, sender, recipient);

    // Return the message to broadcast it to the WebSocket topic
    return chatMessage;
  }

  @MessageMapping("/chat.replyMessage")
  @SendTo("/topic/public")
  public ChatMessage replyMessage(@Payload ChatMessage chatMessage) {
    // Logic to handle reply from artisan
    return chatMessage;
  }

  @SuppressWarnings("null")
  @MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public ChatMessage addUser(
    @Payload ChatMessage chatMessage,
    SimpMessageHeaderAccessor headerAccessor
  ) {
    // Add username in websocket session
    headerAccessor
      .getSessionAttributes()
      .put("username", chatMessage.getSender());
    return chatMessage;
  }
}
