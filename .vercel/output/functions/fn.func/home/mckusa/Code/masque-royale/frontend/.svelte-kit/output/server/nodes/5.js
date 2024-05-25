import * as server from '../entries/pages/games/_slug_/join/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_slug_/join/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/games/[slug]/join/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BPEjdBzq.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.C5qq0cey.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.BUHJqjdN.js","_app/immutable/chunks/index.DJ8iOWEq.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.Cirlo5Z8.css"];
export const fonts = [];
