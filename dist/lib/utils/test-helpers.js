import { render } from '@testing-library/svelte';
export function renderComponent(Component, props) {
    return render(Component, { props });
}
export function mockApiResponse(data) {
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
export function mockApiError(status, message) {
    return new Response(message, { status });
}
