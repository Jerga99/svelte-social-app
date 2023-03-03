
<script>
  import { fetchUsers } from "@api/users";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import { onMount } from "svelte";
  import UserItem from "./UserItem.svelte";

  let users = [];
  let loading = true;

  onMount(loadUsers);

  async function loadUsers() {
    try {
      users = await fetchUsers();
    } catch(e) {
      console.log(e.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <CenteredDataLoader />
{:else if users.length > 0}
  {#each users as user (user.uid)}
    <UserItem {user} />
  {/each}
{/if}
