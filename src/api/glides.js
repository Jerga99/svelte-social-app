
import { db } from "@db/index";
import { Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit } from "firebase/firestore"

async function fetchGlides() {
  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ];

  const q = query(collection(db, "glides"), ...constraints);
  const qSnapshot = await getDocs(q);

  const lastGlideDoc = qSnapshot.docs[qSnapshot.docs.length - 1];
  
  const glides = await Promise.all(qSnapshot.docs.map(async doc => {
    const glide = doc.data();
    const userSnapshot = await getDoc(glide.user);
    glide.user = userSnapshot.data();

    return {...glide, id: doc.id};
  }));

  return {glides, lastGlideDoc};
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
