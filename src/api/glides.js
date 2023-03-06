
import { db } from "@db/index";
import { onSnapshot, Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit, startAfter, where, setDoc } from "firebase/firestore"


async function getGlidesFromDocuments(qSnapshot) {
  return await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data();
    const userSnapshot = await getDoc(glide.user);
    glide.user = userSnapshot.data();

    return {...glide, id: doc.id, lookup: doc.ref.path};
  }));
}


function onGlidesSnapshot(loggedInUser, callback) {
  const watchCollection = collection(db, "glides");

  const constraints = [
    where("date", ">", Timestamp.now()),
    where("user", "in", loggedInUser.following)
  ];

  const q = query(watchCollection, ...constraints);

  return onSnapshot(q, async (qSnapshot) => {
    const glides = await getGlidesFromDocuments(qSnapshot);
    callback(glides);
  })
}

async function fetchGlide(uid, id) {
  const userDocRef = doc(db, "users", uid);
  const userGlideRef = doc(userDocRef, "glides", id);

  const userGlideSnap = await getDoc(userGlideRef);
  const userGlide = userGlideSnap.data();

  const glideSnap = await getDoc(userGlide.lookup);
  const userSnap = await getDoc(userDocRef);;

  const glide = {
    ...glideSnap.data(),
    user: userSnap.data(),
    id: glideSnap.id,
    lookup: glideSnap.ref.path
  }

  return glide;
}

async function fetchSubglides() {
  console.log("Fetching subglides!");

  return {
    glides: [],
    lastGlide: null
  }
}

async function fetchGlides(lastGlideDoc, loggedInUser) {
  const _loggedInUserRef = doc(db, "users", loggedInUser.uid);

  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ];

  if (loggedInUser.following.length > 0) {
    constraints.push(where("user", "in", [...loggedInUser.following, _loggedInUserRef]));
  } else {
    constraints.push(where("user", "==", _loggedInUserRef));
  }

  if (lastGlideDoc) {
    constraints.push(startAfter(lastGlideDoc));
  }

  const q = query(collection(db, "glides"), ...constraints);
  const qSnapshot = await getDocs(q);

  const _lastGlideDoc = qSnapshot.docs[qSnapshot.docs.length - 1];
  
  const glides = await getGlidesFromDocuments(qSnapshot);

  return {glides, lastGlideDoc: _lastGlideDoc};
}

async function createGlide(glideData, glideLookup) {

  console.log("Glide should be added to: " + glideLookup);

  const userRef = doc(db, "users", glideData.uid);

  const glide = {
    ...glideData,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now()
  };

  const glideCollection = collection(db, "glides");
  const added = await addDoc(glideCollection, glide);

  const userGlideRef = doc(userRef, "glides", added.id);
  await setDoc(userGlideRef, {lookup: added})
  
  return {...glide, id: added.id, lookup: added.path};
}

export { createGlide, fetchGlides, onGlidesSnapshot, fetchGlide, fetchSubglides };
