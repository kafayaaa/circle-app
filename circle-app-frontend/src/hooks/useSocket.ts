import { io } from "socket.io-client";
import { store, type AppDispatch } from "@/redux/store";
import {
  addThreadFromSocket,
  updateThreadLikeFromSocket,
} from "@/redux/slices/threadSlice";
import { addReplyFromSocket } from "@/redux/slices/replySlice";
import {
  addFollowFromSocket,
  removeFollowFromSocket,
} from "@/redux/slices/followSlice";
import {
  addFollowCountFromSocket,
  removeFollowCountFromSocket,
} from "@/redux/slices/authSlice";

const socket = io("http://localhost:3000");
let listenerInitialized = false;

export const setupSocketListeners = (dispatch: AppDispatch) => {
  if (listenerInitialized) return;
  listenerInitialized = true;

  socket.on("new_thread", (thread) => {
    const currentUser = store.getState().auth.user;

    if (thread.created_by === currentUser?.id) return;
    dispatch(addThreadFromSocket(thread));
  });

  socket.on("new_reply", (reply) => {
    const currentUser = store.getState().auth.user;

    if (reply.user_id === currentUser?.id) return;

    if (reply.created_by === currentUser?.id) return;
    dispatch(addReplyFromSocket(reply));
  });

  socket.on("like_updated", (like) => {
    dispatch(updateThreadLikeFromSocket(like));
  });

  socket.on("follow_event", (data) => {
    console.log("SOCKET FOLLOW EVENT:", data);

    if (data.type === "FOLLOWER_ADD" || data.type === "FOLLOWING_ADD") {
      dispatch(addFollowFromSocket({ type: data.type, data: data }));
      dispatch(addFollowCountFromSocket({ type: data.type }));
    }

    if (data.type === "FOLLOWER_REMOVE" || data.type === "FOLLOWING_REMOVE") {
      dispatch(removeFollowFromSocket({ type: data.type, data: data.data }));
      dispatch(removeFollowCountFromSocket({ type: data.type }));
    }
  });
};

export default socket;
