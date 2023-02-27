
<script>
  import { formHandlerStore } from "@stores/formHandler";
  const { validate, setForm, form } = formHandlerStore;

  const loginFormData = {
    email: "",
    password: ""
  }

  console.log($form);
  // setForm(loginFormData);

  function submitForm() {
    alert(JSON.stringify($form));
  }

</script>


<form class="flex-it">
  <div class="flex-it overflow-hidden sm:rounded-md">
    <div class="flex-it">
      <div class="flex-it">
        <div class="flex-it py-2">
          <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
          <input
            bind:value={$form.email}
            use:validate={[1]}
            type="email"
            name="email"
            id="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
            Error Error Beep Beep!
          </div>
        </div>
        <div class="flex-it py-2">
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <input
            bind:value={$form.password}
            use:validate={[2]}
            type="password"
            name="password"
            id="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
    <div class="text-sm text-gray-600 pb-4">
      No Account Yet?{" "}
      <a class="hover:underline" href="/auth/register"> Create a new account </a>
    </div>
    <div class="flex-it py-2">
      <button
        on:click={submitForm}
        type="button"
        class="
              bg-blue-400 hover:bg-blue-500
              inline-flex focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-400 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-offset-2"
      >
        Login
      </button>
    </div>
  </div>
</form>
