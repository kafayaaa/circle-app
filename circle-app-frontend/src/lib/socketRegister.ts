import socket from "@/hooks/useSocket";
import { store } from "@/redux/store";

let lastUserId: number | null = null;

export const registerSocketUser = () => {
  store.subscribe(() => {
    const state = store.getState();
    const user = state.auth.user;

    // kalau user baru login
    if (user && user.id !== lastUserId) {
      lastUserId = user.id;
      console.log("REGISTER SOCKET:", user.id);

      socket.emit("register", user.id);
    }
  });
};
