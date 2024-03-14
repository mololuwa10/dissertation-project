package com.example.dissertation_backend.solution.Message.Controller;

import com.example.dissertation_backend.solution.Customers.Model.ApplicationUser;
import com.example.dissertation_backend.solution.Customers.Model.ArtisanProfile;
import com.example.dissertation_backend.solution.Customers.Repository.ArtisanProfileRepository;
import com.example.dissertation_backend.solution.Customers.Repository.UserRepository;
import com.example.dissertation_backend.solution.DTO.MessageDTO;
import com.example.dissertation_backend.solution.DTO.UserDetailsDTO;
import com.example.dissertation_backend.solution.Message.Model.Message;
import com.example.dissertation_backend.solution.Message.Service.MessageService;
import com.example.dissertation_backend.solution.WebSocket.Chat.ChatMessage;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/messages")
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
public class MessageController {

  @Autowired
  private MessageService messageService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ArtisanProfileRepository artisanProfileRepository;

  @GetMapping("/history/{userId}")
  public ResponseEntity<List<ChatMessage>> getMessageHistory(
    @PathVariable Integer userId,
    @RequestParam Integer otherUserId,
    @RequestParam(required = false) Integer productId
  ) {
    @SuppressWarnings("null")
    ApplicationUser currentUser = userRepository
      .findById(userId)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
      );

    @SuppressWarnings("null")
    ApplicationUser otherUser = userRepository
      .findById(otherUserId)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Other user not found"
        )
      );

    // Fetch additional details, like ArtisanProfile, for the other user.
    ArtisanProfile otherUserProfile = fetchArtisanProfile(otherUserId);
    List<Message> messages;

    if (productId != null) {
      messages =
        messageService.getMessageHistoryByProduct(
          currentUser,
          otherUser,
          productId
        );
    } else {
      messages = messageService.getMessageHistory(currentUser, otherUser);
    }
    // Convert messages to ChatMessage DTOs
    List<ChatMessage> chatMessages = messages
      .stream()
      .map(message -> {
        boolean isCurrentUserSender = message.getSender().equals(currentUser);
        ChatMessage.MessageType type = isCurrentUserSender
          ? ChatMessage.MessageType.SENT
          : ChatMessage.MessageType.RECEIVED;
        String senderUsername = isCurrentUserSender
          ? currentUser.getUsername()
          : otherUser.getUsername();

        Integer recipientId = isCurrentUserSender
          ? otherUser.getUserId()
          : currentUser.getUserId();

        UserDetailsDTO userDetails = new UserDetailsDTO(
          isCurrentUserSender ? currentUser : otherUser,
          isCurrentUserSender ? null : otherUserProfile
        );

        return new ChatMessage(
          type,
          message.getMessageText(),
          senderUsername,
          message.getDateSent(),
          recipientId,
          userDetails,
          productId
        );
      })
      .collect(Collectors.toList());

    return ResponseEntity.ok(chatMessages);
  }

  private ArtisanProfile fetchArtisanProfile(Integer userid) {
    return artisanProfileRepository.findByArtisan_UserId(userid).orElse(null);
  }

  // @PostMapping("/send")
  // public ResponseEntity<?> sendMessage(
  //   @RequestBody MessageDTO messageDTO,
  //   Principal principal
  // ) {
  //   // Check if the user is logged in
  //   if (principal == null) {
  //     return ResponseEntity
  //       .status(HttpStatus.UNAUTHORIZED)
  //       .body("You must be logged in to send a message.");
  //   }

  //   // Fetch the sender (logged-in user) details
  //   ApplicationUser sender = userRepository
  //     .findByUsername(principal.getName())
  //     .orElseThrow(() -> new RuntimeException("User not found"));

  //   Message message = messageService.sendMessage(
  //     sender.getUserId(),
  //     messageDTO.getReceiverId(),
  //     messageDTO.getMessageText()
  //   );
  //   return ResponseEntity.ok(message);
  // }

  @GetMapping("/conversations")
  public ResponseEntity<?> getAllConversations(Principal principal) {
    if (principal == null) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("You must be logged in to view messages.");
    }

    ApplicationUser currentUser = userRepository
      .findByUsername(principal.getName())
      .orElseThrow(() -> new RuntimeException("User not found"));

    List<MessageDTO> conversations = messageService.getAllConversations(
      currentUser.getUserId()
    );

    return ResponseEntity.ok(conversations);
  }
}
