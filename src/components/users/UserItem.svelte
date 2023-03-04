
<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let user;
  export let followingInProgress;

</script>

<div class="flex-it p-4">
  <div class="flex-it flex-row">
    <div class="flex-it mr-4">
      <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
        <img alt="" class="rounded-full" src={user.avatar} />
      </div>
    </div>
    <article class="flex-it flex-grow flex-shrink">
      <div class="flex-it justify-center flex-grow mb-1">
        <div class="flex-it justify-between flex-row w-full">
          <div class="flex-it justify-center">
            <span class="font-bold">{user.nickName}</span>
          </div>
          <div class="flex-it w-32 mt-3 cursor-pointer">
            <button
              on:click={() => {
                dispatch("followClick", user);
              }}
              disabled={followingInProgress}
              type="button"
              class="
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
            >
              <div class="flex-it flex-row text-sm font-bold text-white items-start justify-center">
                <span>Follow</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</div>
