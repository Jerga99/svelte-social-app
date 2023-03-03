
import { db } from "@db/index";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

async function fetchUsers() {
  const usersCollection = collection(db, "users");
  const usersSnap = await getDocs(usersCollection);
  return usersSnap.docs.map(doc => doc.data());
}

async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export { getUser, fetchUsers }
