// NOTE: Import fail from Superforms, not from @sveltejs/kit!
import type { Actions } from '@sveltejs/kit';
import { superValidate, fail, message, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { csvSchema } from '$lib/types';
import type { PageServerLoad } from './$types';
import { ApiClient } from '$lib/api/client';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(csvSchema))
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(csvSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Do something with the csv
		console.log(form.data.csv);
		const client = new ApiClient();
		//WARNING: This is a hack to get the id
		const id = +(params.slug as string);
		try {
			//blob vs base64
			const base64 = await form.data.csv.arrayBuffer();
			console.log(base64);


			const response = await client.adminApi.uploadRolesCSV(id, base64);

			console.log(response);
			return message(form, `File uploaded successfully`);
		} catch (error) {
			console.log(error);
			return setError(form, 'csv', 'File is not valid');
		}
	}
} satisfies Actions;
