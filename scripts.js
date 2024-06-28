document.getElementById('linkForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const originalUrl = this.originalUrl.value.trim();
  const selectedSubdomain = this.subdomainSelect.value.trim();
  const newSubdomain = this.newSubdomain.value.trim();

  let shortLink;
  if (newSubdomain !== '') {
    shortLink = `https://${newSubdomain}.short.link/${Math.random().toString(36).substring(2, 6)}`;
  } else if (selectedSubdomain !== '') {
    shortLink = `https://${selectedSubdomain}.short.link/${Math.random().toString(36).substring(2, 6)}`;
  } else {
    shortLink = `https://short.link/${Math.random().toString(36).substring(2, 6)}`;
  }

  // Kirim permintaan ke Cloudflare Worker
  const response = await fetch('https://your-worker-url.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ originalUrl, shortLink })
  });

  const result = await response.json();
  if (response.ok) {
    shortenedLinks.push({ originalUrl, shortLink: result.shortLink });
    updateLinksList();
  } else {
    console.error('Failed to shorten link:', result);
  }
});
