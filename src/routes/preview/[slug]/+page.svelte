<script>
  import { page } from '$app/stores';

  $: slug = $page.params.slug;
  $: netlifyUrl = `https://${slug}-site.netlify.app`;
</script>

<svelte:head>
  <title>{slug} — Preview</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  </style>
</svelte:head>

<iframe
  src={netlifyUrl}
  title="{slug} preview"
  style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"
></iframe>
