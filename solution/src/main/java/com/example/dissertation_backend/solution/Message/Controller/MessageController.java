package com.example.dissertation_backend.solution.Message.Controller;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.MessageDTO;
import com.example.dissertation_backend.solution.Message.Model.Message;
import com.example.dissertation_backend.solution.Message.Service.MessageService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

  @Autowired
  private MessageService messageService;

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/send")
  public ResponseEntity<?> sendMessage(
    @RequestBody MessageDTO messageDTO,
    Principal principal
  ) {
    // Check if the user is logged in
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("You must be logged in to send a message.");
    }

    // Fetch the sender (logged-in user) details
    ApplicationUser sender = userRepository
      .findByUsername(principal.getName())
      .orElseThrow(() -> new RuntimeException("User not found"));

    Message message = messageService.sendMessage(
      sender.getUserId(),
      messageDTO.getReceiverId(),
      messageDTO.getMessageText()
    );
    return ResponseEntity.ok(message);
  }

  @GetMapping("/conversation/{receiverId}")
  public ResponseEntity<?> getConversation(
    @PathVariable Integer receiverId,
    Principal principal
  ) {
    // Check if the user is logged in
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("You must be logged in to view messages.");
    }

    // Fetch the logged-in user (sender) details
    ApplicationUser sender = userRepository
      .findByUsername(principal.getName())
      .orElseThrow(() -> new RuntimeException("User not found"));

    // Fetch the conversation between the logged-in user and the specified receiver
    List<Message> conversation = messageService.getConversation(
      sender.getUserId(),
      receiverId
    );

    return ResponseEntity.ok(conversation);
  }
}