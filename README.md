# titoms.github.io

<h2>
    Hey 👋, here is my personal website
</h2>

<p align="center">
  <a href="https://github.com/DenverCoder1/readme-typing-svg"><img src="https://readme-typing-svg.herokuapp.com?color=2962FF&center=true&lines=ReactJS+Personal+Website;&width=500&height=50""></a>
</p>

## Newsletter API configuration

The custom newsletter form posts to `POST /api/newsletter/subscribe`, implemented in `src/worker.ts` as a Cloudflare Worker route. The browser never receives the beehiiv API key.

Set these Worker environment variables in Cloudflare:

- `BEEHIIV_API_KEY`: beehiiv API key with subscription write access.
- `BEEHIIV_PUBLICATION_ID`: publication ID for AI Clarity Newsletter.
- `BEEHIIV_API_BASE_URL`: optional, defaults to `https://api.beehiiv.com`.
- `DEBUG_BEEHIIV`: optional, set to `true` only while troubleshooting.
- `BEEHIIV_CUSTOM_FIELDS_ENABLED`: optional, set to `true` only after beehiiv fields exist.

Cloudflare setup path:

1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Select the `fullstackchris` Worker.
4. Open Settings, then Variables and Secrets.
5. Add `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` for Production and Preview as needed.
6. Redeploy the Worker so the route receives the new variables.

Do not prefix these values with `PUBLIC_`. `PUBLIC_` variables are exposed to frontend code by Astro.

The endpoint sends the minimal beehiiv payload first with `send_welcome_email: false`. If beehiiv custom fields are used, create `Interest` and `Source` manually in beehiiv before setting `BEEHIIV_CUSTOM_FIELDS_ENABLED=true`.
