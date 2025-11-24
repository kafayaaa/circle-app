import { io } from "socket.io-client";
import { store, type AppDispatch } from "@/redux/store";
import {
  addThreadFromSocket,
  updateThreadLikeFromSocket,
} from "@/redux/slices/threadSlice";
import { addReplyFromSocket } from "@/redux/slices/replySlice";
// import { addLikeFromSocket } from "@/redux/slices/likeSlice";

const socket = io("http://localhost:3000");
let listenerInitialized = false;

export const setupSocketListeners = (dispatch: AppDispatch) => {
  if (listenerInitialized) return;
  listenerInitialized = true;

  socket.on("new_thread", (thread) => {
    const currentUser = store.getState().auth.user; // ambil user realtime

    if (thread.created_by === currentUser?.id) return;
    dispatch(addThreadFromSocket(thread));
  });

  socket.on("new_reply", (reply) => {
    const currentUser = store.getState().auth.user; // realtime juga

    if (reply.user_id === currentUser?.id) return;

    if (reply.created_by === currentUser?.id) return;
    dispatch(addReplyFromSocket(reply));
  });

  socket.on("like_updated", (like) => {
    dispatch(updateThreadLikeFromSocket(like));
  });
};

export default socket;
