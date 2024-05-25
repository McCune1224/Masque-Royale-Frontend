import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BdIn-FV4.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.C5qq0cey.js","_app/immutable/chunks/each.Aa86rT4B.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.BUHJqjdN.js","_app/immutable/chunks/index.DJ8iOWEq.js","_app/immutable/chunks/entry.VIbE_Nhl.js","_app/immutable/chunks/stores.C6SO5lWG.js"];
export const stylesheets = ["_app/immutable/assets/2.Crp_yK76.css","_app/immutable/assets/ProgressBar.Cirlo5Z8.css"];
export const fonts = [];
