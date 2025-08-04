import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const MessageScreen = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [person, setPerson] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Fetch conversation and user details on component mount
  useEffect(() => {
    if (user && id) {
      const fetchConversation = async () => {
        try {
          const conversationResponse = await axios.get(
            `http://localhost:8080/messages/conversation?user1Id=${user.id}&user2Id=${id}`
          );

          // Sort messages by timestamp (oldest first)
          const sortedMessages = conversationResponse.data.sort((a, b) =>
            new Date(a.timestamp) - new Date(b.timestamp)
          );

          setChatMessages(sortedMessages);

          const personResponse = await axios.get(
            `http://localhost:8080/user/${id}`
          );
          setPerson(personResponse.data);

          // Fetch profile picture for the person
          const profileResponse = await axios.get(
            "http://localhost:8080/profile-picture",
            { params: { userId: id } }
          );
          setProfileImage(profileResponse.data || "https://media.istockphoto.com/id/1681388313/vector/cute-baby-panda-cartoon-on-white-background.jpg?s=612x612&w=0&k=20&c=qFrzn8TqONiSfwevvkYhys1z80NAmDfw3o-HRdwX0d8="); // Fallback image
        } catch (error) {
          console.error("Error fetching conversation or person:", error);
        }
      };

      fetchConversation();
    }
  }, [id, user]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle sending a message
  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/messages/send",
          null,
          {
            params: {
              senderId: user.id,
              receiverId: id,
              content: newMessage,
            },
          }
        );

        // If message sent successfully, add it to the chat and sort again
        if (response.data) {
          setChatMessages((prevMessages) =>
            [...prevMessages, response.data].sort((a, b) =>
              new Date(a.timestamp) - new Date(b.timestamp)
            )
          );
          setNewMessage(""); // Clear input field
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Message content is empty");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex align-items-center mb-3">
          <img
            src={profileImage}
            alt={person?.firstName || "User"}
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <h3>{person?.firstName || "User"}</h3>
        </div>

        {/* Chat Messages Container with fixed height and scroll */}
        <div
          className="border rounded p-3 mb-3"
          style={{
            height: "400px", // Fixed height for the messages container
            overflowY: "auto", // Allows scrolling for the messages inside
            scrollBehavior: "smooth", // Smooth scroll effect for new messages
          }}
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender.id === user.id ? "sent" : "received"}`}
              style={{
                display: "flex",
                flexDirection: message.sender.id === user.id ? "row-reverse" : "row", // Align based on sender
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: message.sender.id === user.id ? "#d1f7c4" : "#e0e0e0", // Sender's message green, Receiver's message gray
                  borderRadius: "10px",
                  padding: "10px",
                  maxWidth: "70%",
                }}
              >
                <div className="message-text">{message.content}</div>
                <small style={{ fontSize: "10px", color: "#666" }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
          {/* Auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MessageScreen;
