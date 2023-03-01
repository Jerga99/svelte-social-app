<script>
  import LoginForm from "@components/forms/LoginForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import { createAuthStore } from "@stores/createAuthStore";

  const { authUser, loading } = createAuthStore("login");

  async function login(formData) {
    authUser(formData);
  }

</script>

<AuthLayout title="Get In">
  <LoginForm 
    onFormSubmit={login} 
    loading={$loading}
  />
</AuthLayout>
