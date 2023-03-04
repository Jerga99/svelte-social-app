
<script>
  import { onAuthStateChanged } from "firebase/auth";
  import Loader from "@components/utils/Loader.svelte";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";
  import { firebaseAuth } from "@db/index";
  import { getUser } from "@api/users";

  let isLoading = writable(true);
  let auth = writable({
    isAuthenticated: false,
    user: null
  });

  setContext(key, {
    auth, isLoading, updateUser
  })

  onMount(listenToAuthChanges);

  function updateUser(userData) {
    auth.update(authState => ({...authState, user: {...authState.user, ...userData}}));
  }

  function listenToAuthChanges() {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const gliderUser = await getUser(user.uid);
        auth.set({isAuthenticated: true, user: gliderUser});
      } else {
        auth.set({isAuthenticated: false, user: null});
      }

      isLoading.set(false);
    })
  }

</script>

{#if $isLoading}
  <Loader size={150} />
{:else}
  <slot />
{/if}

