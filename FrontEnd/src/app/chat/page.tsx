"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from '../css/chat.module.css';
import Link from "next/link";
import { fetchQueries, createQuery, fetchAnswer } from '../../common/api/apiQuery';

interface ChatMessage {
  query_id: number;
  db_id: number;
  conversation_id: number;
  query_ques: string;
  answer: string;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [activeDbId, setActiveDbId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const conversationId = searchParams.get("db_id");
    const dbId = searchParams.get("db_id");

    if (conversationId && dbId) {
      setActiveConversationId(Number(conversationId));
      setActiveDbId(Number(dbId));
      fetchAllQueries(Number(conversationId), Number(dbId));
    }
  }, [searchParams]);

  const fetchAllQueries = async (conversationId: number, dbId: number) => {
    try {
      const queries = await fetchQueries(conversationId, dbId);
      setChatHistory(queries);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  const pollForAnswer = async (queryId: number) => {
    const intervalId = setInterval(async () => {
      try {
        const result = await fetchAnswer(queryId);
          
        if (result.success) {
          console.log(chatHistory)
          setChatHistory((prev) =>
            prev.map((msg) =>
              msg.query_id === queryId ? { ...msg, answer: result.answer } : msg
            )
          );
          clearInterval(intervalId); // Stop polling once the answer is received
        }
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() === "" || activeConversationId === null || activeDbId === null) return;





    try {
      const result = await createQuery({
        query_ques: currentMessage,
        conversation_id: activeConversationId,
        db_id: activeDbId,
      });
      const newMessage: Partial<ChatMessage> = {
        query_ques: currentMessage,
        conversation_id: activeConversationId!,
        db_id: activeDbId!,
        answer: "Loading...",
        query_id: result.data.query_id
      };
      setChatHistory((prev) => [...prev, newMessage as ChatMessage]);
      setCurrentMessage("");
      setLoading(true);

      if (result.data.query_id) {
        const updatedMessage = { ...newMessage, ...result };
        setChatHistory((prev) =>
          prev.map((msg) => (msg.query_ques === newMessage.query_ques ? updatedMessage : msg))
        );
        pollForAnswer(result.data.query_id); 
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error creating message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div className={styles["chatpage-container"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["navbar-content"]}>
          <h1 className={styles["navbar-title"]}>
            <Link href="/dashboard">RAGChat</Link>
          </h1>
          <ul className={styles["navbar-links"]}>
            <li><Link href="/dashboard">Home</Link></li>
            {/* <li><Link href="/profile">Profile</Link></li> */}
            <li><Link href="/">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <div className={styles["main-content"]}>
        <div className={styles["chat-section"]}>
          <div className={styles["chat-header"]}>
            <h3>Chat</h3>
          </div>
          <div className={styles["chat-history"]}>
            {chatHistory.map((msg, index) => (
              <div key={index} className={styles['chat-message-container']}>
                <div className={styles['chat-message-right']}>
                  <div className={styles['chat-message']}>
                    <span>{msg.query_ques}</span>
                  </div>
                </div>
                <div className={styles['chat-message-left']}>
                  <div className={styles['chat-message']}>
                    <span>{msg.answer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["message-input"]}>
            <input
              type="text"
              value={currentMessage}
              onChange={handleChangeMessage}
              placeholder="Type a message..."
              className={styles["message-box"]}
            />
            <button onClick={handleSendMessage} className={styles["send-btn"]} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
