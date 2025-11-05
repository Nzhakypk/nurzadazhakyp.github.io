class Project {
  constructor(opts){
    this.id = opts.id;
    this.title = opts.title;
    this.subtitle = opts.subtitle || '';
    this.description = opts.description || '';

    this.features = opts.features || [];
    this.role = opts.role || '';
    this.year = opts.year || '';
    this.duration = opts.duration || '';
    this.challenges = opts.challenges || '';
    this.results = opts.results || '';

    this.tech = opts.tech || [];
    this.image = opts.image || 'https://via.placeholder.com/800x400.png?text=Project';
    this.live = opts.live || '';
    this.code = opts.code || '';
    this.figma = opts.figma || null;
    this.notice = opts.notice || '';
  }

  renderCard() {
    const el = document.createElement('article');
    el.className = 'project-card';
    el.setAttribute('data-id', this.id);
    el.innerHTML = `
  <img src="${this.image}" alt="${this.title} screenshot" />
  <h3>${this.title}</h3>
  <div class="project-meta">${this.subtitle}</div>
  <p class="project-excerpt">${this.description.slice(0, 120)}${this.description.length > 120 ? '…' : ''}</p>
  <div class="project-actions">
  <a class="btn-mini link" data-action="open" href="#" role="button">Details</a>
  ${this.live ? `<a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${this.live}">Live</a>` : ''}
  ${this.figma ? `<a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${this.figma}">Figma-Design</a>` : ''}
  

</div>

`;
    return el;
  }
}

class Portfolio {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.modal = document.getElementById('project-modal');
    this.modalTitle = this.modal.querySelector('#modal-title');
    this.modalLead = this.modal.querySelector('.modal-lead');
    this.modalMeta = this.modal.querySelector('.modal-meta');
    this.modalLinks = this.modal.querySelector('.modal-links');
    this.modalPreview = this.modal.querySelector('.modal-preview');
    this.modalDescription = this.modal.querySelector('.modal-description');
    this.closeBtn = this.modal.querySelector('.modal-close');
    this.projects = [];
    this._bind();
  }

  addProject(proj){
    this.projects.push(proj);
  }

  render(){
    this.container.innerHTML = '';
    this.projects.forEach(p =>{
      this.container.appendChild(p.renderCard());
    });
  }

  _bind(){
    document.addEventListener('click', (e)=>{
      const open = e.target.closest('[data-action="open"]');
      if(open){
        e.preventDefault();
        const card = open.closest('.project-card');
        const id = card.getAttribute('data-id');
        this.openModal(id);
      }
    });

    this.closeBtn.addEventListener('click', ()=> this.closeModal());
    this.modal.addEventListener('click', (e)=>{
      if(e.target === this.modal) this.closeModal();
    });

    document.addEventListener('keydown',(e)=>{
      if(e.key === 'Escape') this.closeModal();
    });
  }

  openModal(id) {
    const p = this.projects.find(x => x.id === id);
    if (!p) return;

    // --- Populate modal dynamically ---
    this.modalTitle.textContent = p.title;
    this.modalLead.textContent = p.subtitle;
    this.modalMeta.innerHTML = `
      ${p.year ? `<p><strong>Jahr:</strong> ${p.year}</p>` : ''}
      <p><strong>Tags:</strong> ${p.tech.join(', ')}</p>
      ${p.role ? `<p><strong>Rolle:</strong> ${p.role}</p>` : ''}
      ${p.duration ? `<p><strong>Dauer:</strong> ${p.duration}</p>` : ''}
    `;
    this.modalDescription.innerHTML = `
      <p>${p.description}</p>
      ${p.features.length ? `<h4>Zentrale Funktionen:</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
      ${p.challenges ? `<h4>Challenges:</h4><p>${p.challenges}</p>` : ''}
      ${p.results ? `<h4>Ergebnisse:</h4><p>${p.results}</p>` : ''}
    `;

    this.modalLinks.innerHTML = `
  ${p.live?.trim() ? `<a class="btn-mini link" target="_blank" href="${p.live}">Live Demo</a>` 
                  : p.notice?.trim() ? `<span class="btn-mini notice">${p.notice}</span>` 
                  : ''}

  ${p.code?.trim() ? `<a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${p.code}">Github Repo anschauen</a>` : ''}

  ${p.figma ? `<a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${p.figma}">Figma-Design</a>` : ''}
`;

    this.modalPreview.innerHTML = `<img src="${p.image}" alt="${p.title} preview">`;

    this.modal.setAttribute('aria-hidden', 'false');
    // document.documentElement.style.overflow = 'hidden';
  }

  closeModal(){
    this.modal.setAttribute('aria-hidden','true');
    // document.documentElement.style.overflow = '';
  }
}

// Instantiate portfolio and projects
const portfolio = new Portfolio('#projects-grid');

// --- Project: The Oater Website ---
portfolio.addProject(new Project({
  id: 'oater-site',
  title: 'The Oater — Website',
  year: '2023',
  subtitle: 'Marketing-Website & responsives Frontend',
  description:
    'Design und Umsetzung der offiziellen Marketing-Website für The Oater, ein nachhaltiges Hafermilch-Startup. Entwickelt mit Astro und Tailwind CSS mit Fokus auf Performance, Accessibility und minimalistisches Design.',
  tech: ['Astro', 'Tailwind CSS', 'HTML', 'Responsive', 'SEO'],
  features: [
    'Schnelle statische Generierung mit Astro',
    'Responsive Komponenten und Layoutsystem mit Tailwind CSS',
    'Optimierte Bilder und SEO-Tags für bessere Performance',
    'Shopify-Magazin Integration',
  ],
  role: 'Frontend & UX Developer',
  duration: '9 Wochen (Konzept bis Deployment)',
  challenges:
    'Integration dynamischer Inhalte in eine statische Site, Design Balance zwischen Minimalismus und Markenidentität, Performance-Optimierung.',
  results:
    'Die Website erzielte eine Lighthouse-Bewertung von 96/100, wurde für das Produkt-Launch-Event eingesetzt und stärkte die Online-Präsenz des Startups.',
  image: 'images/the_oater.png',
  live: 'https://oater.de/',
}));

// --- Project: The Oater Machine ---
portfolio.addProject(new Project({
  id: 'oater-touch',
  title: 'The Oater — Touchscreen UI',
  subtitle: 'Touchscreen Interface Design & Frontend',
  year: '2023-2024',
  description:
    'Touch-friendly UI für eine Hafermilchmaschine. Von Prototyp bis Produktion: Figma → HTML/CSS/JS. Optimiert für große Touchflächen und Offline-Nutzung. Das Backend wurde mit TouchGFX in Zusammenarbeit mit einem Entwicklerteam implementiert.',
  tech: ['UX-UI Design', 'HTML', 'CSS', 'JavaScript', 'Touchscreen', 'Prototyping', 'Figma', 'TouchGFX'],

  features: [
    'Touch-optimierte Benutzeroberfläche für einfache Bedienung',
    'Offline-fähige Funktionen für unterbrechungsfreie Nutzung',
    'Prototyping von Figma zu HTML/CSS/JS umgesetzt',
    'Intuitive Navigation und klar strukturierte Menüführung',
    'Barrierefreiheit und klare visuelle Rückmeldungen',
  ],
  role: 'Frontend & UX Developer',
  duration: '12 Wochen',
  challenges:
    'Die Umsetzung einer intuitiven Touch-Bedienung auf kleinem Display, Optimierung der Performance für Offline-Nutzung, enge Abstimmung mit dem Backend-Team für TouchGFX-Integration und Sicherstellung einer konsistenten User Experience unter realen Maschinenbedingungen.',
  results:
    'Erfolgreiche Implementierung der Touch-Benutzeroberfläche auf der Hafermilchmaschine, reibungslose Offline-Nutzung, positive Rückmeldungen vom Testpersonal und nahtlose Zusammenarbeit mit dem Backend-Team für stabile TouchGFX-Integration.',
  image: 'images/machine.png',
  live: 'https://oater.de/the-oater-maschine',
  figma: 'https://www.figma.com/design/TWfjpCCY5X877Ye464tyr6/the-Oater-Interface-Design?node-id=0-1&t=AmXXlAm7sQZEI04t-1',
}));


// --- Project: KIDICAP ---
portfolio.addProject(new Project({
  id: 'kidicap-app',
  title: 'KIDICAP — Organisation App',
  subtitle: 'Plattform für effiziente Personal- und Stellenverwaltung',
  year: '2024-2025',
  description:
    'KIDICAP ist eine interne Plattform für die Organisation von Personal, Stellen und Jobs in Unternehmen. Entwickelt in einem Team von 6 Personen während meines dualen Studiums bei der GIP GmbH. Ich war als Junior Full-Stack Entwicklerin tätig und habe zudem Java Integrationstests mit Mockito umgesetzt. Die Plattform nutzt Neo4J als graphische Datenbank, um Arbeitgeber, Stellen und Stellenverwaltung effizient zu verknüpfen. Die Lizenzierung startet im Januar 2026.',
  tech: ['Java', 'Integrationstest', 'Mockito', 'Frontend', 'React', 'Neo4J', 'Graph-Datenbank'],
  features: [
    'Effiziente Personalverwaltung über grafische Darstellung in Neo4J',
    'Frontend-Entwicklung mit React für eine intuitive Bedienoberfläche',
    'Integrationstests in Java mit Mockito zur Sicherstellung stabiler Abläufe',
    'Stellenplanung und Zuordnung von Jobs und Arbeitgebern',
    'Optimierung von Workflows für interne Prozesse',
  ],
  role: 'Junior Full-Stack Entwicklerin',
  duration: '12 Monate',
  challenges:
    'Sicherstellung von Barrierefreiheit, Umsetzung einer mobilen Version, enge Abstimmung mit Kund:innen und Teamkoordination innerhalb von 6 Personen.',
  results:
    'Erfolgreiche Umsetzung der Plattform im Team, stabile Integration von Backend und Frontend, Vorbereitung auf den Launch der Lizenzversion im Januar 2026.',
  image: 'images/kidicap.png',
  notice: 'Aus Unternehmensgründen kann weder der Code noch die UI oder eine Demo-Version gezeigt werden.',
}));


// --- Project: Shans Edu ---
portfolio.addProject(new Project({
  id: 'shans-edu',
  title: 'Shans Edu — Bildungsplattform',
  subtitle: 'Online-Lernplattform zur Vorbereitung auf das nationale Abitur (ORT) in Kirgisistan',
  year: '2022',
  description:
    'Shans Edu ist eine kirgisische Online-Bildungsplattform zur Vorbereitung auf das nationale Abitur (ORT). Das Projekt wurde 2022 in einem Startup im Team von sieben Personen innerhalb von drei Monaten entwickelt. Ich war für die Frontend-Entwicklung verantwortlich und setzte das responsive Layout und die Benutzeroberflächen mit HTML, CSS und JavaScript um. Die Plattform bietet Videokurse, Tests und Lernmaterialien in kirgisischer und russischer Sprache zu zentralen Schulfächern wie Mathematik, Biologie, Geometrie, Kirgisisch und Russisch.',
  tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX', 'Bildungsplattform'],
  features: [
    'Online-Zugang zu Videolektionen und Tests in mehreren Fächern',
    'Zweisprachige Benutzeroberfläche (Kirgisisch und Russisch)',
    'Responsives Design für Desktop und Mobilgeräte',
    'Kontakt- und Registrierungsformulare für Schüler:innen',
    'Übersicht über Lehrkräfte, FAQ- und Rabattsektionen',
  ],
  role: 'Frontend-Entwicklerin',
  duration: '3 Monate',
  challenges:
    'Gestaltung einer zweisprachigen Oberfläche, Optimierung der Frontend-Performance für Regionen mit schwacher Internetverbindung, enge Zusammenarbeit mit Designer:innen und Backend-Team, Sicherstellung einer klaren und zugänglichen Nutzerführung.',
  results:
    'Die Plattform wurde 2022 erfolgreich veröffentlicht und wird von Schüler:innen in Kirgisistan zur Prüfungsvorbereitung genutzt.',
  image: 'images/shans.png',
  figma: 'https://www.figma.com/design/bIpAzyQpkor9HlrbN7Fu9B/Shans_prototype?node-id=27-2&t=kd2UkJ5zR7muAPOn-1',
  live: 'https://www.shans.edu.kg/',
}));

// --- Project: Personal Portfolio ---
portfolio.addProject(new Project({
  id: 'portfolio-site',
  title: 'Persönliches Portfolio',
  subtitle: 'Eigene Website zur Präsentation von Projekten und Fähigkeiten',
  year: '2023 (wird ständig aktualisiert)',
  description:
    'Dieses Portfolio wurde von mir selbst konzipiert, gestaltet und entwickelt. Es dient als digitale Visitenkarte und Präsentationsplattform für meine Projekte, mein Designverständnis und meine technische Umsetzungskompetenz. Die Seite wurde vollständig mit HTML, CSS und JavaScript umgesetzt.',
  tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX', 'Portfolio'],
  features: [
    'Klares, minimalistisches Design mit Fokus auf Lesbarkeit und Struktur',
    'Responsive Layout für verschiedene Bildschirmgrößen',
    'Interaktive Projektgalerie mit Modal-Ansicht',
    'Dark/Light Mode Umschaltung',
  ],
  role: 'Frontend-Entwicklerin & Designerin',
  duration: '1 Woche',
  challenges:
    'Gestaltung einer klaren, konsistenten visuellen Sprache; Entwicklung einer flexiblen Struktur für zukünftige Projekterweiterungen; saubere Umsetzung ohne Frameworks.',
  results:
    'Das Projekt ist auf GitHub veröffentlicht und dient als Grundlage für zukünftige Erweiterungen.',
  image: 'images/portfolio.png',
  code: 'https://github.com/Nzhakypk/nurzadazhakyp.github.io', 
}));

// === Theme toggle ===
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.querySelector('.icon').textContent = '☀️';
} else {
  themeToggle.querySelector('.icon').textContent = '🌙';
}


themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.querySelector('.icon').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// ===== Animate skill bars on scroll =====
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".progress span");
  const skillsSection = document.querySelector(".skills-section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.transition = "width 1.2s ease-out";
            bar.style.width = width;
          }, 150);
        });
        observer.unobserve(skillsSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
});

portfolio.render();
