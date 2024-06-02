// src/stores.js
import { writable } from 'svelte/store';
// import type { Player } from '$lib/api/types';

export const roleSubmitting = writable(false);
export const statusSubmitting = writable(false);
export const anyAbilitySubmitting = writable(false);
