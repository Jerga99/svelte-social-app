<script>
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import { app } from "@db/index";

  console.log(app);
</script>

<AuthLayout title="Create Account">
  <RegisterForm />
</AuthLayout>
