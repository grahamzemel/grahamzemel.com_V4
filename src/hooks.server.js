const ADMIN_TOKEN = "gz_admin_a8f3e7c2d1b9";

export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith("/admin")) {
    const cookies = event.request.headers.get("cookie") || "";
    const match = cookies.match(/gz_admin=([^;]+)/);
    const token = match ? match[1] : null;

    if (token !== ADMIN_TOKEN) {
      return new Response(null, {
        status: 302,
        headers: { location: "/" },
      });
    }
  }

  return resolve(event);
}
