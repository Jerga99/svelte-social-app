<script>
  import { registerUser } from "@api/auth";
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";

  function register(formData) {
    registerUser(formData);
  }

</script>

<AuthLayout title="Create Account">
  <RegisterForm onFormSubmit={register} />
</AuthLayout>
