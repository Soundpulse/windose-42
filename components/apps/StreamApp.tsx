import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: number;
}

const StreamApp: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [viewers, setViewers] = useState(2345);
  const [day, setDay] = useState(4);
  const [progress, setProgress] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetMessages = [
    "シェルばんは！",
    "超てんちゃん超天使",
    "ジェルばんは！",
    "顔がいい",
    "ジェルかわ！",
    "顔が良すぎる",
    "超てんちゃんマジ天使",
    "え？",
    "かわいい！",
    "天使すぎる",
    "最高！",
    "推せる",
    "尊い",
    "好き",
    "神！",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const addMessage = () => {
      const randomMessage = presetMessages[Math.floor(Math.random() * presetMessages.length)];
      const newMessage: ChatMessage = {
        id: Date.now() + Math.random(),
        text: randomMessage,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => {
        const updated = [...prev, newMessage];
        return updated.length > 50 ? updated.slice(-50) : updated;
      });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        addMessage();
      }
    }, 1500 + Math.random() * 3000);

    const initialTimeout = setTimeout(() => {
      addMessage();
    }, 500);

    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 50) - 25;
        return Math.max(2000, Math.min(3000, prev + change));
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
      clearInterval(viewerInterval);
    };
  }, []);

  // Animate progress bar from 0 to 100% over 3:23 (203 seconds)
  useEffect(() => {
    const duration = 203 * 1000; // 3 minutes 23 seconds in milliseconds
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 100); // Update every 100ms for smooth animation
    
    return () => clearInterval(interval);
  }, []);

  // Hide scanlines when StreamApp is mounted
  useEffect(() => {
    const scanlines = document.querySelector(".scanlines") as HTMLElement;
    const vignette = document.querySelector(".vignette") as HTMLElement;
    if (scanlines) scanlines.style.display = "none";
    if (vignette) vignette.style.display = "none";

    return () => {
      if (scanlines) scanlines.style.display = "";
      if (vignette) vignette.style.display = "";
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Zpix', 'MS Gothic', 'Courier New', monospace",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
        position: "relative",
      }}>
      {/* Load pixel font */}
      <style>
        {`
          @font-face {
            font-family: 'Zpix';
            src: url('/zpix.ttf') format('truetype');
          }
        `}
      </style>
      {/* Navigation Bar - Below window title */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "2px solid #c9a0dc",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          height: "36px",
        }}>
        {/* Hamburger Menu */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            cursor: "pointer",
            padding: "4px",
          }}>
          <div style={{ width: "18px", height: "2px", backgroundColor: "#6b5b95" }} />
          <div style={{ width: "18px", height: "2px", backgroundColor: "#6b5b95" }} />
          <div style={{ width: "18px", height: "2px", backgroundColor: "#6b5b95" }} />
        </div>

        {/* Live Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#6b5b95",
            fontSize: "12px",
            fontWeight: "bold",
          }}>
          <span style={{ color: "#ff6b6b" }}>►</span>
          <span>live</span>
        </div>

        {/* Long Search Bar */}
        <div
          style={{
            flex: 1,
            height: "24px",
            backgroundColor: "#e8e8e8",
            border: "1px solid #cccccc",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        />

        {/* 3 Gray Circles */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#808080",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area - White Background with Padding */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          padding: "20px",
          gap: "16px",
        }}>
        {/* Stream Window Panel */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f8ecf8",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #d0d0d0",
          }}>
          {/* Video Area with Controls Overlay */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#f8ecf8",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>
            {/* YouTube Video Embed */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/DjGxGMxvg4M?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&mute=0&loop=1&playlist=DjGxGMxvg4M"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />

            {/* Video Controls Overlay - floating on video */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                right: "16px",
                height: "28px",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: "8px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}>
              {/* Play/Pause Button */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#808080",
                  borderRadius: "2px",
                }}
              />
              {/* Progress Bar */}
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  backgroundColor: "#d0d0d0",
                  position: "relative",
                }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "#ff6b6b",
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stream Info Bar - White */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #d0d0d0",
              padding: "12px 16px",
              fontSize: "12px",
              color: "#333333",
            }}>
            <div style={{ marginBottom: "6px", fontWeight: "bold", fontSize: "14px", color: "#333333" }}>
              超絶最かわてんしちゃん降臨の儀
            </div>
            <div style={{ color: "#666666", fontSize: "12px", marginBottom: "10px" }}>
              {viewers} viewers - Livestream: DAY {day}
            </div>
            {/* Line with 5 Dots on right */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "10px",
              }}>
              {/* Line takes up most of the row */}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#d0d0d0",
                }}
              />
              {/* 5 Dots on the right */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#b0b0b0",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div
          style={{
            width: "200px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #d0d0d0",
          }}>
          {/* Chat Header - White */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #d0d0d0",
              padding: "8px 12px",
              fontSize: "12px",
              color: "#333333",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <span>チャット</span>
            <span style={{ fontSize: "10px", color: "#666666" }}>▼</span>
          </div>

          {/* Chat Messages - Pink Background */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#f8ecf8",
            }}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "11px",
                  color: "#333333",
                }}>
                {/* Blue Square Avatar */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#7b9bc0",
                    border: "1px solid #5a7ba0",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                />
                <div style={{ flex: 1, wordBreak: "break-word", lineHeight: "1.4" }}>{msg.text}</div>
                {/* Gray Circles */}
                <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#b0b0b0" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#b0b0b0" }} />
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Footer - White with dot and plane icon */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #d0d0d0",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            {/* One gray dot */}
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#b0b0b0",
              }}
            />
            {/* Input area placeholder */}
            <div
              style={{
                flex: 1,
                height: "24px",
                backgroundColor: "#f5f5f5",
                border: "1px solid #e0e0e0",
              }}
            />
            {/* Plane/Send icon */}
            <div
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b0b0b0",
                cursor: "pointer",
              }}>
              <Send size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamApp;
