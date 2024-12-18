import { Router } from './router';
import { logger } from '$lib/utils/logger';
export async function handleRequest(request, env, ctx) {
    try {
        const router = new Router();
        return await router.handle(request, env, ctx);
    }
    catch (error) {
        logger.error('Request failed', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
