import { c as create_ssr_component, e as escape } from "../../../../../chunks/ssr.js";
import { g as getToastStore } from "../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const errorStore = getToastStore();
  if (data.error) {
    console.log(data.error);
    errorStore.trigger({
      message: "Invalid Game ID " + data.gameId,
      background: "variant-filled-error"
    });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0">${data.error ? `<a class="btn btn-md variant-filled-surface" href="/" data-svelte-h="svelte-1u1uj9r">Return to Home Page</a>` : ``} ${data.game ? `<h1 class="h1">Hello from ${escape(data.game.id)}</h1>` : ``}</section>`;
});
export {
  Page as default
};
