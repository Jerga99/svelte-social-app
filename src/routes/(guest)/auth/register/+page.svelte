<script>
  import { registerUser } from "@api/auth";
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";

  async function register(formData) {
    const { user } = await registerUser(formData);
    console.log(user);
  }

</script>

<AuthLayout title="Create Account">
  <RegisterForm onFormSubmit={register} />
</AuthLayout>
