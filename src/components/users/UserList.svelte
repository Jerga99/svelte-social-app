
<script>
  import * as api from "@api/users";
  import { getAuthContext } from "@components/context/auth";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import { onMount } from "svelte";
  import UserItem from "./UserItem.svelte";

  const { auth } = getAuthContext();

  let users = [];
  let loading = true;

  onMount(loadUsers);

  async function loadUsers() {
    try {
      users = await api.fetchUsers($auth.user);
    } catch(e) {
      console.log(e.message);
    } finally {
      loading = false;
    }
  }

  function followUser(followingUser) {
    api.followUser($auth.user.uid, followingUser.uid);
  }

</script>

{#if loading}
  <CenteredDataLoader />
{:else if users.length > 0}
  {#each users as user (user.uid)}
    <UserItem
      on:followClick={(e) => followUser(e.detail)} 
      {user} 
    />
  {/each}
{/if}
