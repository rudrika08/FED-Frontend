import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/ChatBot.module.scss";
import { BsSend, BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoCloseOutline, IoCopyOutline } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { apiBot } from "../../services";
import { Alert } from "../../microInteraction";

export default function ChatBot() {
  const name = "FedRick";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [initialMsg, setInitialMsg] = useState(
    `Hello! I am ${name}, your personal assistant for FED. How can I help you today?`
  );
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEventOngoing, setIsEventOngoing] = useState(true);
  const chatboxRef = useRef(null);
  const location = useLocation();
  const isOmega = location.pathname.includes("/Omega");
  const [alert, setAlert] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);

  useEffect(() => {
    const fetchInitialMessage = async () => {
      setTimeout(async () => {
        try {
          const response = await apiBot.post("/chat", {
            message: "Connection Request",
          });

          if (response.status === 200 || response.status === 201) {
            console.log(
              "Successfully connected to chatbot",
              response.data.message
            );
          } else {
            console.log("Error:", response.data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setIsThinking(false);
        scrollToBottom();
      }, 1500);
    };

    fetchInitialMessage();
  }, []);

  const typeMessage = async (message) => {
    let typedMessage = "";
    setIsTyping(true); // Start typing
    for (let i = 0; i < message.length; i++) {
      typedMessage += message[i];
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { bot: typedMessage, isTyping: true },
      ]);
      scrollToBottom();
      await new Promise((resolve) => setTimeout(resolve, 20));
      setIsThinking(false);
    }
    setIsTyping(false); // Typing completed
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { bot: typedMessage, isTyping: false }, // Mark the message as fully typed
    ]);
    scrollToBottom();

    if (isSpeaking) {
      speakMessage(typedMessage);
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const userMessage = { user: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setTimeout(() => {
      setIsThinking(true);
    }, 600);

    setTimeout(async () => {
      try {
        const response = await apiBot.post("/chat", { message: input });

        if (response.status === 200 || response.status === 201) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { bot: "", isTyping: true },
          ]);
          await typeMessage(response.data.response);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { bot: "Error: Unable to connect to the server.", isTyping: false },
          ]);
          console.log("Error:", response.data.message);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { bot: "Error: Unable to connect to the server.", isTyping: false },
        ]);
        console.error("Error:", error);
      }

      scrollToBottom();
    }, 4500); // Total delay considering thinking and typing phases
  };

  const onHandleKey = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isEventOngoing) {
      if (isVisible) {
        document.body.classList.add(styles.lockScroll);
      } else {
        document.body.classList.remove(styles.lockScroll);
      }
    }

    return () => {
      document.body.classList.remove(styles.lockScroll);
    };
  }, [isVisible, isEventOngoing]);

  const closePopup = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClick = () => {
    setIsActive(!isActive);
    setIsVisible(!isVisible);
  };

  const botToggle = isActive ? styles.hidden : "";
  const chatBotOpen = isActive ? "" : styles.hidden;

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setAlert({
          type: "success",
          message: "Copied to clipboard!",
          position: "bottom-left",
          duration: 2000,
        });
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "Failed to copy to clipboard!",
          position: "bottom-left",
          duration: 2000,
        });
      });
  };

  const speakMessage = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop current speech
      setIsSpeaking(false); // Toggle to non-speaking state
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false); // Reset speaking state after speech ends
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true); // Set to speaking state
    }
  };

  return (
    <>
      <button
        className={`${styles.chatbottoggle} ${botToggle} ${
          isOmega ? styles.omegaBackGround : ""
        }`}
        onClick={handleClick}
      >
        <span>
          <BiSolidMessageSquareDetail size={42} />
        </span>
      </button>

      <div className={`${styles.popup} ${isVisible ? styles.fadeIn : ""}`}>
        <div className={`${styles.chatcontainer} ${chatBotOpen}`}>
          <header>
            <div className={styles.logo}>
              <img
                src="https://uploads-ssl.webflow.com/629d87f593841156e4e0d9a4/62eeaa9927e6aea4ff13590e_FedLogo.png"
                alt="logo"
              />
              <h2 className={styles.fed}>{name}</h2>
            </div>
            <span
              className={`${styles.close} ${styles.chatBotClose} ${
                isOmega ? styles.omegaBackGround : ""
              }`}
              onClick={handleClick}
            >
              <IoCloseOutline />
            </span>
          </header>
          <hr />
          <div className={styles.chatbox} ref={chatboxRef}>
            <div className={styles.messageBox}>
              <div
                className={`${styles.botmessage} ${
                  isOmega ? styles.omegaBackGround : ""
                }`}
              >
                {initialMsg}
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.user
                      ? styles.usermessage
                      : `${styles.botmessage} ${
                          isOmega ? styles.omegaBackGround : ""
                        }`
                  }
                >
                  {message.user || message.bot}
                  {!message.user &&
                    !message.isTyping && ( // Show icons only for fully typed bot messages
                      <div className={styles.messageActions}>
                        <button onClick={() => copyToClipboard(message.bot)}>
                          <IoCopyOutline size={18} style={{ color: "white" }} />
                        </button>
                        <button onClick={() => speakMessage(message.bot)}>
                          {isSpeaking ? (
                            <BsFillMicMuteFill
                              size={18}
                              style={{ color: "white" }}
                            />
                          ) : (
                            <BsFillMicFill
                              size={18}
                              style={{ color: "white" }}
                            />
                          )}
                        </button>
                      </div>
                    )}
                </div>
              ))}

              <div className={styles.thinking}>
                {isThinking && (
                  <div className={styles.thinkingIndicator}>
                    {name} is thinking...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={onHandleKey}
            />
            <button className={styles.sendMessage} onClick={sendMessage}>
              <BsSend
                className={`${styles.sendIcon} ${
                  isOmega ? styles.omegaBackGround : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <Alert />
    </>
  );
}
