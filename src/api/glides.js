
import { db } from "@db/index";
import { onSnapshot, Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit, startAfter, where } from "firebase/firestore"


async function getGlidesFromDocuments(qSnapshot) {
  return await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data();
    const userSnapshot = await getDoc(glide.user);
    glide.user = userSnapshot.data();

    return {...glide, id: doc.id};
  }));
}


function onGlidesSnapshot(loggedInUser) {
  const watchCollection = collection(db, "glides");

  const constraints = [
    where("date", ">", Timestamp.now()),
    where("user", "in", loggedInUser.following)
  ];

  const q = query(watchCollection, ...constraints);

  onSnapshot(q, async (qSnapshot) => {
    const glides = await getGlidesFromDocuments(qSnapshot);

    console.log(glides);
  })
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

async function createGlide(glideData) {
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
  
  return {...glide, id: added.id};
}

export { createGlide, fetchGlides, onGlidesSnapshot };
