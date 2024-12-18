<script lang="ts">
  import { settings } from '$lib/stores/settings';
  import Form from '$lib/components/ui/form/Form.svelte';
  import FormField from '$lib/components/ui/form/FormField.svelte';
  import Button from '$lib/components/ui/form/Button.svelte';
  import { required, email } from '$lib/utils/validation';
  
  let loading = false;
  let avatarFile: File | null = null;
  
  const handleSubmit = async (event: CustomEvent<{ [key: string]: string }>) => {
    loading = true;
    const data = {
      ...event.detail,
      avatar: avatarFile || undefined
    };
    await settings.updateProfile(data);
    loading = false;
  };
  
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      avatarFile = target.files[0];
    }
  };
</script>

<Form on:submit={handleSubmit} {loading}>
  <FormField
    id="name"
    label="Name"
    type="text"
    rules={[required]}
  />
  
  <FormField
    id="email"
    label="Email"
    type="email"
    rules={[required, email]}
  />
  
  <div class="space-y-2">
    <label for="avatar" class="block text-sm font-medium text-gray-700">Avatar</label>
    <input
      id="avatar"
      type="file"
      accept="image/*"
      on:change={handleFileChange}
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </div>
  
  <Button type="submit" disabled={loading}>
    {loading ? 'Saving...' : 'Update Profile'}
  </Button>
</Form>