
import { db } from "@db/index";
import { Timestamp, doc } from "firebase/firestore"


async function createGlide(glideData) {
  const userRef = doc(db, "users", glideData.uid);

  const glide = {
    ...glideData,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now()
  }

  console.log(glide);
  return glide;
}

export { createGlide };
