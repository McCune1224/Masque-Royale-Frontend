<script lang="ts">
	//get pblic key from env
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const response = await fetch(PUBLIC_BACKEND_URL + '/api/games/1/admin/sync-roles-csv', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();
		console.log(result);
	};
</script>

<form class="flex flex-row gap-4 p-4" on:submit={handleSubmit} enctype="multipart/form-data">
	<p>File uploaded successfully</p>
	<label>
		<input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" />
	</label>
	<button class="btn btn-accent" type="submit">Submit</button>
</form>
