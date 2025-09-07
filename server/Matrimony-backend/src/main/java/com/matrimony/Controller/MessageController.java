package com.matrimony.Controller;

import com.matrimony.Entity.Message;
import com.matrimony.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // Endpoint to send a message
    @PostMapping("/send")
    public Message sendMessage(@RequestParam Long senderId, @RequestParam Long receiverId, @RequestParam String content) {
        try {
            // Call the service layer to send the message
            Message message = messageService.sendMessage(senderId, receiverId, content);

            // Optionally log the response or return it directly
            return message;  // returning the full message object, including senderId and receiverId
        } catch (Exception e) {
            System.err.println("Error sending message: " + e.getMessage());
            return null;  // or return some error response
        }
    }

    // Endpoint to get a conversation between two users
    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        return messageService.getConversation(user1Id, user2Id);
    }

    // Endpoint to get all conversations for a user
    @GetMapping("/conversations")
    public List<Message> getConversations(@RequestParam Long userId) {
        return messageService.getConversations(userId);
    }
    
    @PostMapping("/markAsRead")
    public void markMessagesAsRead(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        messageService.markMessagesAsRead(user1Id, user2Id);
    }

    // Endpoint to get unread message count
    @GetMapping("/unreadCount/{userId}")
    public int getUnreadMessages(@PathVariable Long userId) {
        return messageService.getUnreadMessageCount(userId);
    }
}
