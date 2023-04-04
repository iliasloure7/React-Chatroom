import MessageList from '../../components/ChatMessages/MessageList';
import { FormEvent, useState, useEffect } from 'react';
import { addMessageDoc, fetchMessages } from '../../api/messages';
import { useChatroomContext } from '../../context/ChatroomContext';
import { useAuth } from '../../context/AuthContext';

function Chatroom() {
  const [text, setText] = useState<string>('');
  const { room, setMessages } = useChatroomContext();
  const { user } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (text.length === 0) {
      alert('Message cannot be empty...');
      return;
    }

    addMessageDoc(user?.displayName!, text, room);
    setText('');
  };

  useEffect(() => {
    const unsubscribe = fetchMessages(room, setMessages);
    return () => unsubscribe();
  }, [room]);

  return (
    <section className='p-6'>
      <div className='container max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-center'>
          {room.toUpperCase()} ROOM
        </h1>
        <MessageList />
        <form className='flex items-center gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter your message'
            className='form-input'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type='submit' className='btn btn-primary'>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default Chatroom;
