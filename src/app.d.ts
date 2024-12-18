// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: import('$lib/features/auth').User;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};