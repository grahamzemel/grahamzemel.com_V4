<script>
  import BackgroundBlob from "$lib/components/backgroundBlob.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import Hero from "$lib/components/hero.svelte";
  import Socials from "$lib/components/socials.svelte";
  import AboutSection from "$lib/components/aboutSection.svelte";
  import FeaturedProjects from "$lib/components/featuredProjects.svelte";
  import ResumeSection from "$lib/components/resumeSection.svelte";
  import Blog from "$lib/components/blog.svelte";
  import Work from "$lib/components/work.svelte";
  import Footer from "$lib/components/footer.svelte";
  import GetInTouch from "$lib/components/getInTouch.svelte";
</script>

<BackgroundBlob />
<Navbar />

<main id="top" class="absolute top-0 left-0 z-10 w-full h-full">
  <div
    class="md:max-w-7xl 2xl:mx-auto xl:mx-32 lg:mx-32 md:mx-24 sm:mx-16 mx-6"
  >
    <Hero />
    <Socials />

    <div id="about"><AboutSection /></div>
    <div id="projects"><FeaturedProjects /></div>
    <ResumeSection />
    <div id="blog"><Blog /></div>
    <Work />
    <GetInTouch />

    <Footer />
  </div>
</main>
