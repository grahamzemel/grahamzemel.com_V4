export async function GET() {
    return new Response(null, {
        status: 302,
        headers: {
            location: 'https://github.com/grahamzemel/AppleWalletBusinessCard/raw/main/grahamzemel.pkpass'
        }
    });
}
