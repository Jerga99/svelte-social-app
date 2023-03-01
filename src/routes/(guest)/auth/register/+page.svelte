<script>
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import { createAuthStore } from "@stores/createAuthStore";

  const { authUser, loading } = createAuthStore("register");

  async function register(formData) {
    authUser(formData);
  }

</script>

<AuthLayout title="Create Account">
  <RegisterForm 
    onFormSubmit={register} 
    loading={$loading}
  />
</AuthLayout>
