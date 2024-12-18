<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import Form from '$lib/components/ui/form/Form.svelte';
  import FormField from '$lib/components/ui/form/FormField.svelte';
  import Button from '$lib/components/ui/form/Button.svelte';
  import { required, email } from '$lib/utils/validation';
  
  let loading = false;
  let error = '';
  
  const handleSubmit = async (event: CustomEvent<{ [key: string]: string }>) => {
    loading = true;
    error = '';
    
    try {
      await auth.login(event.detail);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Login failed';
    } finally {
      loading = false;
    }
  };
</script>

<Form on:submit={handleSubmit} {loading}>
  <FormField
    id="email"
    label="Email"
    type="email"
    rules={[required, email]}
  />
  
  <FormField
    id="password"
    label="Password"
    type="password"
    rules={[required]}
  />
  
  {#if error}
    <p class="text-red-600 text-sm">{error}</p>
  {/if}
  
  <Button type="submit" disabled={loading}>
    {loading ? 'Logging in...' : 'Login'}
  </Button>
</Form>