// src/stores.js
import { writable } from 'svelte/store';

export const roleSubmitting = writable(false);
export const statusSubmitting = writable(false);
export const anyAbilitySubmitting = writable(false);
