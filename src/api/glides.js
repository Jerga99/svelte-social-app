
import { db } from "@db/index";
import { Timestamp, doc, collection, addDoc } from "firebase/firestore"


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

export { createGlide };
