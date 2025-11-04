// script.js — simple OOP structure for portfolio
class Project {
  constructor(opts){
    this.id = opts.id;
    this.title = opts.title;
    this.subtitle = opts.subtitle || '';
    this.description = opts.description || '';
    this.tech = opts.tech || [];
    this.image = opts.image || 'https://via.placeholder.com/800x400.png?text=Project';
    this.live = opts.live || '#';
    this.code = opts.code || '#';
  }

  renderCard(){
    const el = document.createElement('article');
    el.className = 'project-card';
    el.setAttribute('data-id', this.id);
    el.innerHTML = `
      <img src="${this.image}" alt="${this.title} screenshot" />
      <h3>${this.title}</h3>
      <div class="project-meta">${this.subtitle}</div>
      <p class="project-excerpt">${this.description.slice(0,120)}${this.description.length>120?'…':''}</p>
      <div class="project-actions">
        <a class="btn-mini link" data-action="open" href="#" role="button">Details</a>
        <a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${this.live}">Live</a>
        <a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${this.code}">Code</a>
      </div>
    `;
    return el;
  }
}

class Portfolio {
  constructor(selector){
    this.container = document.querySelector(selector);
    this.modal = document.getElementById('project-modal');
    this.modalTitle = this.modal.querySelector('#modal-title');
    this.modalLead = this.modal.querySelector('.modal-lead');
    this.modalMeta = this.modal.querySelector('.modal-meta');
    this.modalLinks = this.modal.querySelector('.modal-links');
    this.modalPreview = this.modal.querySelector('.modal-preview');
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

  openModal(id){
    const p = this.projects.find(x=>x.id===id);
    if(!p) return;
    this.modalTitle.textContent = p.title;
    this.modalLead.textContent = p.subtitle;
    this.modalMeta.innerHTML = `<strong>Tech:</strong> ${p.tech.join(', ')}`;
    this.modalLinks.innerHTML = `<a class="btn-mini link" target="_blank" rel="noopener noreferrer" href="${p.live}">Live Demo</a>
                                 <a class="btn-mini" target="_blank" rel="noopener noreferrer" href="${p.code}">Source Code</a>`;
    this.modalPreview.innerHTML = `<img src="${p.image}" alt="${p.title} preview">`;
    this.modal.setAttribute('aria-hidden','false');
    // lock scroll
    document.documentElement.style.overflow = 'hidden';
  }

  closeModal(){
    this.modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
  }
}

// Instantiate portfolio and projects
const portfolio = new Portfolio('#projects-grid');

portfolio.addProject(new Project({
  id:'oater-site',
  title: 'The Oater — Marketing Website',
  subtitle: 'Marketing site & responsive front-end',
  description: 'Design and implementation of a marketing website for The Oater. Built with semantic HTML, responsive CSS and small JS interactions. Focus on accessibility and performance.',
  tech:['HTML','CSS','Vanilla JS','Responsive','a11y'],
  image:'https://via.placeholder.com/1200x700.png?text=The+Oater+Website',
  live:'https://the-oater.example.com',
  code:'https://github.com/yourusername/the-oater'
}));

portfolio.addProject(new Project({
  id:'oater-touch',
  title: 'The Oater — Touchscreen UI',
  subtitle: 'Touchscreen Interface Design & Frontend',
  description: 'Touch-friendly UI for a Hafermilch machine. Prototype to production: Figma → HTML/CSS/JS. Optimised for large touch targets and offline use.',
  tech:['HTML','CSS','JS','UX','Touch UI'],
  image:'https://via.placeholder.com/1200x700.png?text=Touch+UI',
  live:'#',
  code:'https://github.com/yourusername/oater-touchscreen'
}));

portfolio.addProject(new Project({
  id:'kidicap-app',
  title: 'KIDICAP — Organisation App',
  subtitle: 'Organisation & scheduling app (prototype)',
  description: 'UX case and frontend prototype for KIDICAP organization app. Includes onboarding flows, calendars and responsive lists. Built as a progressive web prototype.',
  tech:['HTML','CSS','JavaScript','PWA','UX'],
  image:'https://via.placeholder.com/1200x700.png?text=KIDICAP+App',
  live:'#',
  code:'https://github.com/yourusername/kidicap'
}));

portfolio.addProject(new Project({
  id:'client-sites',
  title: 'Client Websites — Small businesses',
  subtitle: 'Custom sites for friends & clients (example)',
  description: 'Several brochure websites and small projects for clients and friends. Example: a childcare therapy site with clear UX and CMS-friendly structure.',
  tech:['HTML','CSS','JS','SEO','Responsive'],
  image:'https://via.placeholder.com/1200x700.png?text=Client+Work',
  live:'https://kita-traumatherapie.de',
  code:'https://github.com/yourusername/client-sites'
}));

portfolio.render();
