
import { db } from "@db/index";
import { doc, getDoc, collection, getDocs, query, where, updateDoc, increment, arrayUnion } from "firebase/firestore";

async function followUser(followerUid, followingUid) {
  const followerRef = doc(db, "users", followerUid);
  const followingRef = doc(db, "users", followingUid);

  await updateDoc(followerRef, {
    following: arrayUnion(followingRef),
    followingCount: increment(1)
  });

  await updateDoc(followingRef, {
    followers: arrayUnion(followerRef),
    followersCount: increment(1)
  });
  
  return followingRef;
}

async function fetchUsers(loggedInUser) {
  const usersQuery = query(
    collection(db, "users"),
    where("uid", "!=", loggedInUser.uid)
  );

  const usersSnap = await getDocs(usersQuery);
  return usersSnap.docs
    .map(doc => doc.data())
    .filter(user => {
      const hasFollowing = loggedInUser.following.filter(following => following.id === user.uid).length > 0;
      return !hasFollowing;
    });
}

async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export { getUser, fetchUsers, followUser }
