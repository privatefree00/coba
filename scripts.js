// Simulasi penyimpanan subdomain
let subdomains = ['example1', 'example2', 'example3'];

// Simulasi penyimpanan link yang sudah dishorten
let shortenedLinks = [];

// Form untuk menambahkan link
const linkForm = document.getElementById('linkForm');
linkForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const originalUrl = this.originalUrl.value.trim();
  const subdomain = this.newSubdomain.value.trim();

  const response = await fetch('/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: originalUrl, subdomain })
  });

  const result = await response.json();
  shortenedLinks.unshift({ originalUrl, shortLink: result.shortUrl });
  updateLinksList();
  this.reset();
});

// Tombol untuk menambahkan subdomain baru
const addNewSubdomainButton = document.getElementById('addNewSubdomain');
addNewSubdomainButton.addEventListener('click', function(event) {
  event.preventDefault();
  const newSubdomain = document.getElementById('newSubdomain').value.trim();

  if (newSubdomain !== '') {
    // Tambahkan subdomain baru ke dalam daftar
    subdomains.push(newSubdomain);
    updateSubdomainSelect();
    document.getElementById('newSubdomain').value = '';
  }
});

// Fungsi untuk memperbarui daftar link yang sudah dishorten
function updateLinksList() {
  const linksList = document.getElementById('linksList');
  linksList.innerHTML = ''; // Kosongkan daftar sebelum menambahkan lagi

  // Tampilkan hasil dari shortlink secara terbalik (dari yang terbaru ke yang lebih lama)
  shortenedLinks.forEach((link, index) => {
    const li = document.createElement('li');
    li.textContent = `${link.shortLink} -> ${link.originalUrl}`;

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.addEventListener('click', function() {
      // Fungsi untuk menyalin ke clipboard (harus disesuaikan dengan browser)
      navigator.clipboard.writeText(link.shortLink)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    });

    li.appendChild(copyButton);
    linksList.appendChild(li);
  });

  // Update pilihan subdomain di form
  updateSubdomainSelect();
}

// Fungsi untuk memperbarui pilihan subdomain di form
function updateSubdomainSelect() {
  const subdomainSelect = document.getElementById('subdomainSelect');
  subdomainSelect.innerHTML = '<option value="">None</option>';
  subdomains.forEach(subdomain => {
    const option = document.createElement('option');
    option.value = subdomain;
    option.textContent = subdomain;
    subdomainSelect.appendChild(option);
  });
}
