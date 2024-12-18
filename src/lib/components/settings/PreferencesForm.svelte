<script lang="ts">
  import { settings } from '$lib/stores/settings';
  import Form from '$lib/components/ui/form/Form.svelte';
  import FormField from '$lib/components/ui/form/FormField.svelte';
  import Button from '$lib/components/ui/form/Button.svelte';
  
  let loading = false;
  
  const handleSubmit = async (event: CustomEvent<{ [key: string]: string }>) => {
    loading = true;
    await settings.updatePreferences(event.detail);
    loading = false;
  };
</script>

<Form on:submit={handleSubmit} {loading}>
  <FormField
    id="theme"
    label="Theme"
    type="select"
    options={[
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' }
    ]}
    value={$settings.preferences.theme}
  />
  
  <FormField
    id="emailNotifications"
    label="Email Notifications"
    type="checkbox"
    value={$settings.preferences.emailNotifications}
  />
  
  <FormField
    id="language"
    label="Language"
    type="select"
    options={[
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' }
    ]}
    value={$settings.preferences.language}
  />
  
  <Button type="submit" disabled={loading}>
    {loading ? 'Saving...' : 'Save Preferences'}
  </Button>
</Form>