import { db } from "../../config";
import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const addMessageDoc = async (
  name: string,
  message: string,
  room: string
) => {
  try {
    await addDoc(collection(db, "messages"), {
      name,
      message,
      room,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    toast.error("Could not add message document. Something went wrong!");
  }
};

export const fetchMessages = (
  room: string,
  setMessages: Dispatch<SetStateAction<DocumentData[]>>
): Unsubscribe => {
  let q = query(
    collection(db, "messages"),
    where("room", "==", room),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages: DocumentData[] = [];
    snapshot.forEach((doc) => messages.push({ ...doc.data(), id: doc.id }));
    setMessages(messages);
  });
};
