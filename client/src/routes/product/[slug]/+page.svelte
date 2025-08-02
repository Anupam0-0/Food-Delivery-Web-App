
<script lang="ts">
    import { page } from '$app/stores';
    let slug = $page.params.slug
</script>

<div>
    <h2>URL Params</h2>
    <h1>{slug   }</h1>
</div>