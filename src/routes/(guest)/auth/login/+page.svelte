<script>
  import { loginUser } from "@api/auth";
  import LoginForm from "@components/forms/LoginForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";

  async function login(formData) {
    await loginUser(formData);
  }

</script>

<AuthLayout title="Get In">
  <LoginForm onFormSubmit={login} />
</AuthLayout>
