import { atom } from "recoil";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  uid: string;
  username: string;
}

const userState = atom<User>({
  key: "userState",
  default: {
    uid: "",
    username: "",
  },
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger === "get") {
        const user = auth.currentUser;
        if (user) {
          setSelf({
            uid: user.uid,
            username: user.displayName || "",
          });
        }
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setSelf({
            uid: user.uid,
            username: user.displayName || "",
          });
        }
      });

      return () => {};
    },
  ],
});

export type { User };
export { userState };
