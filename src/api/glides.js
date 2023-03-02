
import { db } from "@db/index";
import { Timestamp, doc, collection, getDocs, query, addDoc } from "firebase/firestore"

async function fetchGlides() {
  const q = query(collection(db, "glides"));
  const qSnapshot = await getDocs(q);

  const glides = qSnapshot.docs.map(doc => {
    const glide = doc.data();
    return {...glide, id: doc.id};
  });

  return {glides};
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

export { createGlide, fetchGlides };
