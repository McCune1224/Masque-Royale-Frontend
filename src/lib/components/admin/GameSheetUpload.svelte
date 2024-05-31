<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { csvSchema } from '$lib/types/csv';

	export let data;

	const { form, enhance, errors } = superForm(data.form, {
		validators: zodClient(csvSchema)
	});

	const file = fileProxy(form, 'image');
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input type="file" name="image" accept="image/png, image/jpeg" bind:files={$file} />
	{#if $errors.image}<span>{$errors.image}</span>{/if}
	<button>Submit</button>
</form>
