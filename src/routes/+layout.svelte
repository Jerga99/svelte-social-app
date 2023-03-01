<script>
  import AuthContext from "@components/context/auth/AuthContext.svelte";
  import UiContext from "@components/context/UI/UIContext.svelte";
  import SnackbarContainer from "@components/snackbar/SnackbarContainer.svelte";
  import "../app.css";
</script>

<UiContext>
  <AuthContext>
    <SnackbarContainer />
    <slot />
  </AuthContext>
</UiContext>
