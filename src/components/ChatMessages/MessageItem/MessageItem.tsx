import { DocumentData } from 'firebase/firestore';

function MessageItem({ message: { name, message } }: DocumentData) {
  return (
    <li className='bg-white my-4 px-4 py-3 rounded-md'>
      <span className='font-bold'>{name}: </span>
      <span>{message}</span>
    </li>
  );
}

export default MessageItem;
