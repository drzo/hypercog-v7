<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import PreferencesForm from '$lib/components/settings/PreferencesForm.svelte';
  import ProfileForm from '$lib/components/settings/ProfileForm.svelte';
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<div class="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
  <h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
  
  <div class="space-y-6">
    <Card title="Profile">
      <ProfileForm />
    </Card>
    
    <Card title="Preferences">
      <PreferencesForm />
    </Card>
  </div>
</div>