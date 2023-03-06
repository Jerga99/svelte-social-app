<script>
  import { getUIContext } from "@components/context/UI";
  import Popup from "@components/utils/Popup.svelte";
  import TiSocialFlickr from "svelte-icons/ti/TiSocialFlickr.svelte";
  import TiBrush from "svelte-icons/ti/TiBrush.svelte";
  import { navLinks } from "./navLinks";
  import { getAuthContext } from "@components/context/auth";
  import Modal from "@components/utils/Modal.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { pageStore } from "@stores/pageStore";

  const { isXl } = getUIContext();
  const { auth } = getAuthContext();
  const { activeGlide, onGlidePosted } = pageStore;

  $: user = $auth?.user;

</script>

<header class="lg:flex-grow flex-it items-end">
  <div class="xl:w-80 w-20 flex-it">
    <div class="h-full fixed flex-it top-0">
      <div class="flex-it h-full xl:w-80 w-20 overflow-y-auto px-3 justify-between">
        <div class="flex-it items-start">
          <div
            class="p-3 pt-4 xl:pb-3 pb-0 xl:text-2xl text-sm font-bold transition duration-200 hover:opacity-80"
          >
            <a href="/">
              <h1>Glider</h1>
            </a>
          </div>
          <div class="my-1 w-full flex-it">
            <nav class="flex-it items-start">
              {#each navLinks as link}
                <a class="flex-it items-start flex-grow w-full" href="{link.href}">
                  <div
                    class="p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200"
                  >
                    <div class="flex-it">
                      <div class="icon">
                        <svelte:component this={link.icon} />
                      </div>
                    </div>
                    <div class="mx-4 text-2xl truncate xl:block hidden">
                      <span class="truncate">{link.name}</span>
                    </div>
                  </div>
                </a>
              {/each}
            </nav>
          </div>

          <Modal 
            let:openModal={openModal}
            let:closeModal={closeModal}
          >
            <button 
              slot="opener" 
              on:click|stopPropagation={openModal}
              class="my-1 flex-it w-10/12 cursor-pointer"
            >
              <div
                class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition"
              >
                <div
                  class="flex-it flex-row text-xl font-bold text-white items-start justify-center truncate duration-200"
                >
                  {#if $isXl}
                    <div>Glide It</div>
                  {:else}
                    <div class="icon"><TiBrush /></div>
                  {/if}
                </div>
              </div>
            </button>
            <div slot="modal-content">
              <Messenger 
                glideLookup={$activeGlide?.lookup}
                onGlidePosted={(glide) => {
                  $onGlidePosted(glide);
                  closeModal();
                }}
              />
            </div> 
          </Modal>
        </div>
        <!-- PROFILE MENU -->
        <div class="flex-it hover:cursor-pointer">
          <Popup>
            <div class="flex-it items-center flex-row p-3 rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200 cursor-pointer">
              <div class="flex-it">
                <div class="w-10 h-10 overflow-visible">
                  <img
                    alt=""
                    class="rounded-full"
                    src={user?.avatar}
                  />
                </div>
              </div>
              <div class="flex-it xl:flex hidden flex-grow flex-row justify-between items-center">
                <div class="flex-it mx-3 font-bold">{user?.nickName}</div>
                <div class="flex-it">
                  <div class="icon">
                    <TiSocialFlickr />
                  </div>
                  <!-- <FiMoreHorizontal /> -->
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  </div>
</header>
