<script>
  import { getAuthContext } from "@components/context/auth";
  import UserList from "@components/users/UserList.svelte";
  import { pageStore } from "@stores/pageStore";

  const {auth} = getAuthContext();
  pageStore.title.set("Profile"); 

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
  <UserList />
</div>
