
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

      if ($auth.user.following.filter(following => following.id === followingUser.uid).length > 0) {
        throw new Error("You already follow this user!");
      }

      const followingRef = await api.followUser($auth.user.uid, followingUser.uid);

      updateUser({
        followingCount: $auth.user.followingCount + 1,
        following: [followingRef, ...$auth.user.following]
      });

      users = users.filter(user => user.uid !== followingUser.uid);

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
{:else}
  <div class="flex-it">
    <div class="bg-yellow-500 mt-6 p-2 rounded-lg mx-4">
      You follow all users in the world...
    </div>
  </div>
{/if}
