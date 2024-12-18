import type { ComponentType } from 'svelte';
import { render } from '@testing-library/svelte';

export function renderComponent<Props extends Record<string, any>>(
  Component: ComponentType,
  props?: Props
) {
  return render(Component, { props });
}

export function mockApiResponse<T>(data: T): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function mockApiError(status: number, message: string): Response {
  return new Response(message, { status });
}