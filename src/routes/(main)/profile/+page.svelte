<script>
  import { fetchUsers } from "@api/users";
  import { getAuthContext } from "@components/context/auth";
  import UserList from "@components/users/UserList.svelte";
  import { pageStore } from "@stores/pageStore";
  import { onMount } from "svelte";

  const {auth} = getAuthContext();
  pageStore.title.set("Profile"); 

  let users = [];
  let loading = false;

  onMount(loadUsers);

  async function loadUsers() {
    loading = true;
    try {
      users = await fetchUsers();
    } catch(e) {
      console.log(e.message);
    } finally {
      loading = false;
    }
  }

</script>

<div class="flex-it py-1">
  <div class="mt-6 pb-6 border-b border-gray-600">
    <div class="flex-it flex-row items-center px-4">
      <img
        alt=""
        class="rounded-full h-24 mr-4"
        src={$auth.user?.avatar}
      />
      <div class="mr-6">
        <div class="text-2xl font-bold">{$auth.user?.fullName}</div>
        <div class="text-gray-400">{$auth.user?.nickName}</div>
      </div>
      <div class="mr-6">
        <div class="text-lg font-bold">Followers</div>
        <div class="text-gray-400">{$auth.user?.followersCount}</div>
      </div>
      <div>
        <div class="text-lg font-bold">Following</div>
        <div class="text-gray-400">{$auth.user?.followingCount}</div>
      </div>
    </div>
  </div>
  <UserList {users} />
</div>
