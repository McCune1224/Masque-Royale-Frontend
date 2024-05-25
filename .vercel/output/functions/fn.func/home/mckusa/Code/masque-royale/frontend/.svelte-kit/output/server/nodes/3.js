

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BWqxCOs_.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.C5qq0cey.js"];
export const stylesheets = [];
export const fonts = [];
