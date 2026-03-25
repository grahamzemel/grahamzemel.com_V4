const ADMIN_TOKEN = "gz_admin_a8f3e7c2d1b9";

export async function POST({ request }) {
  const body = await request.json().catch(() => null);
  if (!body || body.key !== "Jetset14#") {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `gz_admin=${ADMIN_TOKEN}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`,
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `gz_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
      "Content-Type": "application/json",
    },
  });
}
