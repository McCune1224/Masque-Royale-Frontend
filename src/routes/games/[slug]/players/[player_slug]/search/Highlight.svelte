<script>
	export let text;
	export let term;

	// Function to highlight text based on search term
	function highlightText(text, term) {
		if (!term.trim()) return text;
		const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		const parts = text.split(regex);
		return parts
			.map((part) => {
				if (part.match(regex)) {
					return `<b class="underline font-extrabold decoration-secondary">${part}</b>`;
				} else {
					return part;
				}
			})
			.join('');
	}
</script>

<span>{@html highlightText(text, term)}</span>
