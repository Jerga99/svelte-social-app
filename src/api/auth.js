import { firebaseAuth, db } from "@db/index";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function logoutUser() {
  return signOut(firebaseAuth);
}

async function registerUser(form) {
  const { user: registeredUser } = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);

  const user = {
    uid: registeredUser.uid,
    fullName: form.fullName,
    nickName: form.nickName,
    email: form.email,
    avatar: form.avatar,
    followers: [],
    following: [],
    followersCount: 0,
    followingCount: 0
  };

  const userDoc = doc(db, "users", registeredUser.uid);
  await setDoc(userDoc, user);
  return registeredUser;
}

export { registerUser, logoutUser }
