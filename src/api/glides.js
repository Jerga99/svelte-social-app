
import { db } from "@db/index";
import { onSnapshot, Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit, startAfter, where, setDoc, updateDoc, increment } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


async function getGlidesFromDocuments(qSnapshot) {
  return await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data();
    const userSnapshot = await getDoc(glide.user);
    glide.user = userSnapshot.data();

    return {...glide, id: doc.id, lookup: doc.ref.path};
  }));
}

async function uploadImage(image) {
  const storage = getStorage();
  const storageRef = ref(storage, image.name);

  const uploadResult = await uploadBytes(storageRef, image.buffer);
  const downloadUrl = await getDownloadURL(uploadResult.ref);
  return downloadUrl;
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

async function fetchSubglides(lastGlideDoc, glideLookup) {
  
  const ref = doc(db, glideLookup);
  const glidesCollection = collection(ref, "glides");

  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ];

  if (lastGlideDoc) {
    constraints.push(startAfter(lastGlideDoc));
  }

  const q = query(glidesCollection, ...constraints);
  const qSnapshot = await getDocs(q);

  const _lastGlideDoc = qSnapshot.docs[qSnapshot.docs.length - 1];
  const glides = await getGlidesFromDocuments(qSnapshot);

  return {
    glides,
    lastGlideDoc: _lastGlideDoc
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

function getGlideCollection(glideLookup) {
  let glideCollection;

  if (glideLookup) {
    const ref = doc(db, glideLookup);
    glideCollection = collection(ref, "glides");
  } else {
    glideCollection = collection(db, "glides");
  }

  return glideCollection;
}

async function createGlide(glideData, glideLookup) {
  const userRef = doc(db, "users", glideData.uid);
  const glide = {
    ...glideData,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now()
  };

  const glideCollection = getGlideCollection(glideLookup);
  const added = await addDoc(glideCollection, glide);

  if (glideLookup) {
    const ref = doc(db, glideLookup);
    await updateDoc(ref, {
      subglidesCount: increment(1)
    })
  }

  const userGlideRef = doc(userRef, "glides", added.id);
  await setDoc(userGlideRef, {lookup: added})
  
  return {...glide, id: added.id, lookup: added.path};
}

export { 
  createGlide, 
  fetchGlides, 
  onGlidesSnapshot, 
  fetchGlide, 
  fetchSubglides,
  uploadImage
};
