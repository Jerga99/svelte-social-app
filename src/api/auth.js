import { firebaseAuth } from "@db/index";
import { createUserWithEmailAndPassword } from "firebase/auth";

function registerUser(form) {
  return createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);
}

export { registerUser }
