import { atom } from "recoil";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AppUser {
  uid: string;
  username: string;
}

const userState = atom<AppUser | null>({
  key: "userState",
  default: null,
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

export type { AppUser as User };
export { userState };
