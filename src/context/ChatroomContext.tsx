import { DocumentData } from 'firebase/firestore';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Rooms } from '../constants';

type ChatroomState = {
  messages: DocumentData[];
  room: string;
  setMessages: Dispatch<SetStateAction<DocumentData[]>>;
  setRoom: Dispatch<SetStateAction<string>>;
};

type ChatroomProviderProps = {
  children: ReactNode;
};

export const ChatroomContext = createContext<ChatroomState | undefined>(
  undefined
);

const ChatroomProvider = ({ children }: ChatroomProviderProps) => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [room, setRoom] = useState<string>(Rooms.GENERAL);

  return (
    <ChatroomContext.Provider value={{ messages, room, setMessages, setRoom }}>
      {children}
    </ChatroomContext.Provider>
  );
};

export const useChatroomContext = () => {
  const context = useContext(ChatroomContext);

  if (context === undefined) {
    throw new Error('this context cannot be undefined');
  }

  return context;
};

export default ChatroomProvider;
