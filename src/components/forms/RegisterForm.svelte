
<script>
  import { 
    createFormStore, 
    minLengthValidator,
    firstUppercaseLetter,
    requiredValidator,
    compareWithValidator
  } from "@stores/createFormStore";
  import FormErrors from "./FormErrors.svelte";
  
  const { validate, submitForm, errors, setValue } = createFormStore({
    fullName: "",
    nickName: "",
    email: "",
    avatar: "",
    password: "",
    passwordConfirmation: "",
  });

  export let onFormSubmit;
  export let loading;

</script>

<form class="flex-it">
  <div class="flex-it overflow-hidden sm:rounded-md">
    <div class="flex-it">
      <div class="flex-it">
        <div class="flex-it py-2">
          <label for="fullName" class="block text-sm font-medium text-gray-700"> Full Name </label>
          <input
            on:input={setValue}
            use:validate={[
              requiredValidator, 
              (ele) => minLengthValidator(ele, 5), 
              firstUppercaseLetter
            ]}
            type="text"
            name="fullName"
            id="fullName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.fullName} />
        </div>

        <div class="flex-it py-2">
          <label for="nickName" class="block text-sm font-medium text-gray-700"> Nick Name </label>
          <input
            on:input={setValue}
            use:validate={[
              requiredValidator, 
              (ele) => minLengthValidator(ele, 3), 
            ]}
            type="text"
            name="nickName"
            id="nickName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.nickName} />
        </div>

        <div class="flex-it py-2">
          <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
          <input
            on:input={setValue}
            use:validate={[requiredValidator]}
            type="text"
            name="email"
            id="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.email} />
        </div>

        <div class="flex-it py-2">
          <label for="avatar" class="block text-sm font-medium text-gray-700"> Avatar </label>
          <input
            on:input={setValue}
            use:validate={[requiredValidator]}
            type="text"
            name="avatar"
            id="avatar"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.avatar} />
        </div>

        <div class="flex-it py-2">
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <input
            on:input={setValue} 
            use:validate={[requiredValidator]}
            type="password"
            name="password"
            id="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.password} />
        </div>

        <div class="flex-it py-2">
          <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700">
            Password Confirmation
          </label>
          <input
            on:input={setValue}
            use:validate={[
              requiredValidator,
              (ele) => compareWithValidator(ele, "password")
            ]}
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FormErrors errors={$errors.passwordConfirmation} />
        </div>
      </div>
    </div>
    <div class="text-sm text-gray-600 pb-4">
      Already Registered?{" "}
      <a class="hover:underline" href="/auth/login"> Go to Login </a>
    </div>
    <div class="flex-it py-2">
      <button
        on:click={submitForm(onFormSubmit)}
        disabled={loading}
        type="button"
        class="
              bg-blue-400 hover:bg-blue-500 focus:ring-0
              disabled:cursor-not-allowed disabled:bg-gray-400
              inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-offset-2"
      >
        Register
      </button>
    </div>
  </div>
</form>
