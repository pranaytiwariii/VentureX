import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X, Send, MessageCircle } from "lucide-react";
import axios from "axios";

const InvestorChatbot = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatbotRef = useRef(null);

  const VULTR_API_KEY = "CXFDY7PLZHZHBFQQAJZHEULKUHSG2Z35WRAA"; // Replace with your actual API key

  const toggleChatbot = () => setChatbotOpen(!chatbotOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setChatbotOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input) return; // Prevent sending empty messages

    const newMessage = { content: input, sender: "user" };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true); // Optional loading state

    try {
      const response = await axios.post(
        "https://api.vultrinference.com/v1/chat/completions",
        {
          model: "llama2-7b-chat-Q5_K_M", // Specify your model here
          messages: [
            {
              role: "user",
              content: input, // User's message
            }
          ],
          max_tokens: 512,
          temperature: 0.8,
          top_k: 40,
          top_p: 0.9,
        },
        {
          headers: {
            "Authorization": `Bearer ${VULTR_API_KEY}`, // Your API key
            "Content-Type": "application/json",
          },
        }
      );

      // Assume the response is structured correctly
      const botMessage = { content: response.data.choices[0].message.content.trim(), sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
      const errorMessage = { content: "Error in getting response.", sender: "bot" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="bg-white">
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg"
        onClick={toggleChatbot}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chatbot UI */}
      {chatbotOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-20 right-4 w-80 h-96 bg-white border rounded-lg shadow-xl flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">InvestDAO Assistant</h3>
            <Button variant="ghost" size="sm" onClick={() => setChatbotOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    message.sender === "bot" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
              {loading && <div className="p-2 text-muted">Typing...</div>} {/* Show loading message */}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form className="flex items-center" onSubmit={handleSendMessage}>
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-grow"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" size="sm" className="ml-2">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorChatbot;
