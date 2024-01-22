package com.example.dissertation_backend.solution.Message.Repository;

import com.example.dissertation_backend.solution.Message.Model.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
  List<Message> findBySender_UserIdAndReceiver_UserId(
    Integer senderId,
    Integer receiverId
  );
}
