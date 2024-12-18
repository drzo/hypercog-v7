<script lang="ts">
  import LoginForm from '$lib/components/auth/LoginForm.svelte';
  import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>
    
    <Card>
      <LoginForm />
    </Card>
  </div>
</div>