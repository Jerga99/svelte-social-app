
import { db } from "@db/index";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

async function followUser(followerUid, followingUid) {
  console.log(`User with uid: ${followerUid}, should follow user with uid: ${followingUid}`);
}

async function fetchUsers(loggedInUser) {
  const usersQuery = query(
    collection(db, "users"),
    where("uid", "!=", loggedInUser.uid)
  );

  const usersSnap = await getDocs(usersQuery);
  return usersSnap.docs.map(doc => doc.data());
}

async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export { getUser, fetchUsers, followUser }
