
<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let isLoading = writable(true);
  let isAuthenticated = writable(false, (set) => {
    setTimeout(() => {
      set(true); // isAuthenticated setter
      isLoading.set(false);
    }, 2000);
  });

  setContext(key, {
    isAuthenticated, isLoading
  })

</script>


<slot />
