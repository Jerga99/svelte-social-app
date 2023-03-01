import { authenticate } from "@api/auth";


export function createAuthStore(authType) {
  async function authUser(form) {
    const firebaseUser = await authenticate(form, authType);
    console.log(firebaseUser);
    return firebaseUser;
  }

  return {
    authUser
  }
}
