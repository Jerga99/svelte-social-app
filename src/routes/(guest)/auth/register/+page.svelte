<script>
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import { getUsers } from "@db/index";

  getUsers();
</script>

<AuthLayout title="Create Account">
  <RegisterForm />
</AuthLayout>
