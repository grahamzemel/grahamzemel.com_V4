<script>
  import BackgroundBlob from "$lib/components/backgroundBlob.svelte";
  import Hero from "$lib/components/hero.svelte";
  import Socials from "$lib/components/socials.svelte";
  import AboutSection from "$lib/components/aboutSection.svelte";
  import FeaturedProjects from "$lib/components/featuredProjects.svelte";
  import Blog from "$lib/components/blog.svelte";
  import Work from "$lib/components/work.svelte";
  import Footer from "$lib/components/footer.svelte";
  import GetInTouch from "$lib/components/getInTouch.svelte";
</script>

<BackgroundBlob />

<main class="absolute top-0 left-0 z-10 w-full h-full">
  <div
    class="md:max-w-7xl 2xl:mx-auto xl:mx-32 lg:mx-32 md:mx-24 sm:mx-16 mx-10"
  >
    <Hero />
    <Socials />

    <AboutSection />
    <FeaturedProjects />
    <Blog />
    <Work />
    <GetInTouch />

    <Footer />
  </div>
</main>
