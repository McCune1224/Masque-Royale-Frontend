import { b as subscribe } from "../../chunks/lifecycle.js";
import { c as create_ssr_component, a as add_attribute, e as escape, d as each } from "../../chunks/ssr.js";
import { g as getToastStore } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import "../../chunks/stores.js";
import { s as superForm } from "../../chunks/formData.js";
import "just-clone";
import "ts-deepmerge";
import "../../chunks/index.js";
import "devalue";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { data } = $$props;
  let { actData } = $$props;
  getToastStore();
  const { form, errors, enhance } = superForm(data.form);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.actData === void 0 && $$bindings.actData && actData !== void 0)
    $$bindings.actData(actData);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<section class="container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0"> <h1 class="h1 text-6xl text-center" data-svelte-h="svelte-1q68r41">Masque Royale</h1> <div class="bg-zinc-800 p-4 text-token"><h2 class="h2 text-center" data-svelte-h="svelte-1wgmtvy">New Game</h2> <form class="flex flex-col" method="POST"><label class="label" for="name">Name
				<input class="input" type="text" name="name"${add_attribute("value", $form.name, 0)}></label> ${$errors.name ? `<span class="invalid bg-error-700">${escape($errors.name)}</span>` : ``} <button class="btn btn-lg variant-glass-primary" data-svelte-h="svelte-1vk1606">Submit</button></form></div> ${data.games ? `<div class="bg-zinc-800"><h2 class="h2 text-center bg-zinc-800 py-3" data-svelte-h="svelte-1oodst0">Current Games</h2> <div class="flex flex-col gap-4">${each(data.games, (game) => {
    return `<div class="flex flex-col gap-1 text-center"><div><h4 class="h4">${escape(game.name)}</h4> <p class="text-md">${escape(game.player_ids ?? 0)} Players</p></div> <a class="btn btn-sm variant-glass-primary"${add_attribute("href", `games/${game.id}/join`, 0)} rel="noreferrer">Join Game</a> <a class="btn btn-sm variant-glass-primary"${add_attribute("href", `games/${game.id}/admin`, 0)} rel="noreferrer">Admin Join</a> </div>`;
  })}</div></div>` : ``}</section>`;
});
export {
  Page as default
};
