import 'dotenv/config';
import * as assert from 'node:assert';

assert(!!process.env.OPENAI_API_KEY, 'OPENAI_API_KEY is required')
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY;

assert(!!process.env.GOOGLE_SEARCH_API_KEY, 'GOOGLE_SEARCH_API_KEY is required')
export const GOOGLE_SEARCH_API_KEY: string = process.env.GOOGLE_SEARCH_API_KEY;

assert(!!process.env.GOOGLE_SEARCH_ENGINE_ID, 'GOOGLE_SEARCH_ENGINE_ID is required')
export const GOOGLE_SEARCH_ENGINE_ID: string = process.env.GOOGLE_SEARCH_ENGINE_ID