
// Dark mode toggle with localStorage
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ root.classList.add('dark'); }
})();

function toggleTheme(){
  const root = document.documentElement;
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
}

// Simple blog data (can be replaced with CMS later)
const BLOG_DATA = [
  {
    slug:'tips-perawatan-mesin-pabrik',
    title:'Tips Perawatan Mesin Pabrik Agar Minim Downtime',
    date:'2025-07-12',
    excerpt:'Langkah praktis untuk meningkatkan reliability peralatan dan mengurangi biaya tak terduga.',
    content:`<p>Perawatan preventif membantu perusahaan menekan biaya downtime tak terencana. Mulai dari inspeksi berkala, pelumasan tepat, alignment-presisi, hingga pencatatan histori aset.</p>
    <ul>
      <li>Susun jadwal preventive & predictive.</li>
      <li>Gunakan checklist inspeksi K3.</li>
      <li>Analisa vibrasi & balancing pada rotating equipment.</li>
      <li>Dokumentasikan setiap pekerjaan.</li>
    </ul>`
  },
  {
    slug:'memilih-material-untuk-fabrikasi',
    title:'Memilih Material Fabrikasi: SS304 vs SS316 vs CS',
    date:'2025-06-03',
    excerpt:'Kapan menggunakan stainless 304/316 atau carbon steel pada aplikasi industri proses.',
    content:`<p>Pemilihan material mempertimbangkan korosi, temperatur, tekanan, dan biaya. Material SS316 unggul pada korosi chloride, SS304 ekonomis, Carbon Steel kuat dan hemat untuk non-korosif.</p>`
  }
];

// Render list on blog.html
function renderBlogList(){
  const list = document.querySelector('#blog-list');
  if(!list) return;
  BLOG_DATA.sort((a,b)=> new Date(b.date)-new Date(a.date));
  list.innerHTML = BLOG_DATA.map(p => `
    <article class="card">
      <div class="kicker">${new Date(p.date).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</div>
      <h3><a href="post.html?slug=${p.slug}">${p.title}</a></h3>
      <p>${p.excerpt}</p>
      <a class="btn outline" href="post.html?slug=${p.slug}">Baca Selengkapnya</a>
    </article>
  `).join('');
}

// Render single post on post.html
function renderPost(){
  const wrap = document.querySelector('#post');
  if(!wrap) return;
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const post = BLOG_DATA.find(p => p.slug === slug) || BLOG_DATA[0];
  wrap.innerHTML = `
    <div class="kicker">${new Date(post.date).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</div>
    <h1 style="margin:6px 0 12px">${post.title}</h1>
    <div>${post.content}</div>
  `;
}

// Job listings mock
const JOBS = [
  {title:'Welder SMAW/GTAW', type:'Full-time', location:'Kota ABC', posted:'2025-07-01'},
  {title:'Drafter Mechanical', type:'Contract', location:'Kota ABC', posted:'2025-06-20'},
  {title:'QC Inspector', type:'Full-time', location:'Kota ABC', posted:'2025-05-30'},
];

function renderJobs(){
  const tbody = document.querySelector('#jobs');
  if(!tbody) return;
  tbody.innerHTML = JOBS.map(j => `
    <tr>
      <td>${j.title}</td>
      <td>${j.type}</td>
      <td>${j.location}</td>
      <td>${new Date(j.posted).toLocaleDateString('id-ID')}</td>
      <td><a class="btn outline" href="mailto:hrd@stkbarokah.co.id?subject=Lamaran%20${encodeURIComponent(j.title)}">Lamar</a></td>
    </tr>
  `).join('');
}

// Simple active nav
function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav]').forEach(a => {
    if(a.getAttribute('href') === path){ a.style.color = '#ff0000ff'; }
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  renderBlogList();
  renderPost();
  renderJobs();
  setActiveNav();
});
