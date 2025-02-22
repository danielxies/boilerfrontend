import { handleAuth } from '@auth0/nextjs-auth0';

const handler = handleAuth();

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler; 