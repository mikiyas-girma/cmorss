import React, { useEffect, useState } from "react";
import { chatIcon } from "../../assets";
import Button from "../common/Button";
import { Message } from "../../types";
import Messages from "./Messages";
import { useAppState } from "../../hooks/useAppState";
import { useSocket } from "../../hooks/useSocket";
import { useParams } from "react-router-dom";

/**
 * ChatBox
 * @returns
 */
const ChatBox = () => {
  const { app } = useAppState();
  const [showChatBox, setShowChatBox] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { socket } = useSocket();
  const { id } = useParams();

  //   Handle send message
  const handleSendMessage = async () => {
    if (text.length < 1) return;
    const msg: Message = {
      name: app.user?.pseudo || "Player",
      text,
      time: new Date().toISOString(),
    };

    socket?.emit("sendMessage", { message: msg, roomId: id });

    setMessages((prev) => {
      return [...prev, msg];
    });
    setText("");
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("messageSent", (message: Message, user: string) => {
      if (user === socket?.id) return;
      setMessages((prev) => [...prev, message]);
      setShowChatBox(true);
    });

    socket.on("error", (error: { message: string }) => {
      console.error("SENDING MESSAGE ERROR: ", error.message);
    });

    return () => {
      socket.off("messageSent");
      socket.off("error");
    };
  }, [socket]);

  //   Return JSX
  return (
    <div className="absolute bottom-3 right-5 font-poppins flex flex-col">
      {/* Chat Box Content */}

      <div
        className={`bg-primary-green backdrop-blur-md bg-opacity-60 px-4 pt-2 rounded-md relative  transition-all duration-500 ease-in-out ${
          showChatBox
            ? "opacity-100 w-[92%] self-end sm:w-[400px] translate-x-0"
            : "opacity-0  translate-x-[100%]"
        }`}
      >
        <p
          className="text-xs  text-white text-right cursor-pointer hover:opacity-65"
          onClick={() => setShowChatBox(false)}
        >
          Close
        </p>
        {/* Message Component */}
        {showChatBox && <Messages messages={messages} />}

        {/* Input and Button */}

        <div className="flex justify-center items-center w-full ">
          <input
            type="text"
            value={text}
            name="message"
            id="message"
            autoComplete="off"
            placeholder="Enter message here"
            className="p-2 pl-4 rounded-md w-[90%] outline-none text-[13px] sm:text-[16px]"
            onKeyDown={handleEnterKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
          <Button
            text="Send"
            onClick={handleSendMessage}
            size="content-fit"
            color="green"
            className="py-2 px1 text-xs sm:text-base text-center"
          />
        </div>
      </div>

      <div
        className="self-end cursor-pointer"
        onClick={() => setShowChatBox(!showChatBox)}
      >
        <img
          src={chatIcon}
          alt="ChatBox"
          className="w-14 sm:w-20 hover:scale-90 transition-all active:opacity-50 duration-500"
        />
      </div>
    </div>
  );
};

export default ChatBox;
