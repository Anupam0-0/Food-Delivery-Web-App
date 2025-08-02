<script>
    import Navbar from "../components/navbar.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
</script>


<div>
    <Navbar/>
	<h1 class="text-4xl">Hello</h1>
    <Button class='' >Click me</Button>

	<a href="/auth/login" class="underline underline-offset-2 text-blue-600">Login</a>
</div>
