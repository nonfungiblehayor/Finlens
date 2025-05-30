import { Message, messageType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const MessageContext = createContext<messageType>(null)
export const useMessage = () => useContext(MessageContext)
export const MessageProvider = ({children}: {children: ReactNode}) => {
    const [messages, setMessages] = useState<Message[]>(
        [
        {
          content: "Hello! I'm your data analysis assistant. I've analyzed your data and I'm ready to answer your questions. What would you like to know?",
          isUser: false,
          timestamp: new Date()
        }
      ]
    )
    const addMessage = (msgData: Message) => {
        setMessages(prev => [...prev, msgData]);
    }
    const values = {
        message: messages,
        setMessage: addMessage
    }
    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageProvider
