import { browser } from '$app/environment';
import { initializeCore } from '$lib/features/core';

export const load = async () => {
  if (browser) {
    initializeCore();
  }
  
  return {};
};