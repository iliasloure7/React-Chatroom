import { Rooms } from '../../../constants';
import { useChatroomContext } from '../../../context/ChatroomContext';

function SelectRoom() {
  const { setRoom } = useChatroomContext();

  return (
    <select
      className='bg-white cursor-pointer text-purple-600 px-3 py-1 rounded-full hover:bg-slate-100'
      onChange={(e) => setRoom(e.target.value)}
    >
      <option value={Rooms.GENERAL}>general</option>
      <option value={Rooms.MUSIC}>music</option>
      <option value={Rooms.GAMING}>gaming</option>
    </select>
  );
}

export default SelectRoom;
