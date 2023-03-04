
<script>
  import * as api from "@api/users";
  import { getAuthContext } from "@components/context/auth";
  import { getUIContext } from "@components/context/UI";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import { onMount } from "svelte";
  import UserItem from "./UserItem.svelte";

  const { auth, updateUser } = getAuthContext();
  const { addSnackbar } = getUIContext();

  let users = [];
  let loading = true;
  let followingInProgress = false;

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

  async function followUser(followingUser) {
    followingInProgress = true;
    try {
      const followingRef = await api.followUser($auth.user.uid, followingUser.uid);

      console.log("Before Update: ");
      console.log(JSON.stringify($auth.user));

      updateUser({
        followingCount: $auth.user.followingCount + 1,
        following: [followingRef, ...$auth.user.following]
      });

      console.log("After Update: ");
      console.log(JSON.stringify($auth.user));

      addSnackbar(`You started following ${followingUser.nickName}`, "success");
    } catch(e) {
      addSnackbar(e.message, "error");
    } finally {
      followingInProgress = false;
    }
  }

</script>

{#if loading}
  <CenteredDataLoader />
{:else if users.length > 0}
  {#each users as user (user.uid)}
    <UserItem
      on:followClick={(e) => followUser(e.detail)} 
      {user} 
      {followingInProgress}
    />
  {/each}
{/if}
