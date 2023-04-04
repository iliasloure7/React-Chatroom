import { useChatroomContext } from "../../../context/ChatroomContext";
import MessageItem from "../MessageItem";
import { DocumentData } from "firebase/firestore";

function MessageList() {
  const { messages } = useChatroomContext();
  return (
    <ul className="bg-slate-200 p-4 my-6 rounded-md h-96 overflow-auto">
      {messages.reverse().map((message: DocumentData) => {
        return <MessageItem key={message.id} message={message} />;
      })}
    </ul>
  );
}

export default MessageList;
