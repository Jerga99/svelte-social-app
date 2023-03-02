<script>
  import { createGlide } from "@api/glides";
  import { getAuthContext } from "@components/context/auth";
  import { getUIContext } from "@components/context/UI";
  import TiImageOutline from "svelte-icons/ti/TiImageOutline.svelte";

  const { auth } = getAuthContext();
  const { addSnackbar } = getUIContext();

  export let onGlidePosted;

  let form = { content: "" };
  let loading = false;

  $: user = $auth?.user;
  $: sendDisabled = loading || form.content === "";

  async function submitGlide() {
    loading = true;
    
    // Making request to store the glide to FS
    const glideData = {
      ...form,
      uid: user.uid
    };

    try {
      const glide = await createGlide(glideData);
      console.log(glide);
      onGlidePosted(glideData);
      addSnackbar("Glide Created!", "success");
      form.content = "";
    } catch(e) {
      addSnackbar(e.message, "error");
    } finally {
      loading = false;
    }
  }
  
</script>

<div class="flex-it py-1 px-4 flex-row">
  <div class="flex-it mr-4">
    <div
      class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80"
    >
      <img
        alt=""
        class="rounded-full"
        src={user?.avatar}
      />
    </div>
  </div>
  <div class="flex-it flex-grow">
    <div class="flex-it">
      <textarea
        bind:value={form.content}
        name="content"
        rows="1"
        id="glide"
        class="bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0"
        placeholder={"What's new?"}
      />
    </div>
    <div class="flex-it mb-1 flex-row xs:justify-between items-center">
      <div
        class="flex-it mt-3 mr-3 cursor-pointer text-white hover:text-blue-400 transition"
      >
        <div class="upload-btn-wrapper">
          <div class="icon">
            <TiImageOutline />
          </div>
          <input type="file" name="myfile" />
        </div>
      </div>
      <div class="flex-it w-32 mt-3 cursor-pointer">
        <button
          on:click={submitGlide}
          disabled={sendDisabled}
          type="button"
          class="
          disabled:cursor-not-allowed disabled:bg-gray-400
          bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
        >
          <div
            class="flex-it flex-row text-sm font-bold text-white items-start justify-center"
          >
            <span>Glide It</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
