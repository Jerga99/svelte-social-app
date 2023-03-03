
import { db } from "@db/index";
import { doc, getDoc } from "firebase/firestore";

async function fetchUsers() {
  const users = [
    {avatar: "https://thrangra.sirv.com/Avatar1.png", nickName: "Felipe"},
    {avatar: "https://thrangra.sirv.com/Avatar2.png", nickName: "Anna"},
  ]

  return users;
}

async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export { getUser, fetchUsers }
