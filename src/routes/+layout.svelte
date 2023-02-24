<script>
  import AuthContext from "@components/context/auth/AuthContext.svelte";
  import UiContext from "@components/context/UI/UIContext.svelte";
  import "../app.css";
</script>

<UiContext>
  <AuthContext>
    <slot />
  </AuthContext>
</UiContext>
