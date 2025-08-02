<script lang="ts">
	let { children } = $props();
</script>

<div class="grid grid-cols-2 min-h-screen">
    <div class="">{@render children()}</div>
    <div class="bg-orange-500 border-l text-blue-500 text-4xl p-10">
        <a href="/">home</a>
    </div>
</div>

