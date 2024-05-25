

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_slug_/admin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.BCg8UVJb.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.C5qq0cey.js"];
export const stylesheets = [];
export const fonts = [];
