const portfolioData = {
  name: 'Kishan Mahankali',
  title: "HELLO, I'M KISHAN MAHANKALI",
  location: 'Engineering Student • Bengaluru',
  intro: 'Curious mind. Creative builder. Future-focused engineer. Exploring technology, turning ideas into projects, and learning something new with every build.',
  about: 'I am a curious and driven engineering student from Bengaluru with a strong interest in technology, creativity, and problem-solving. I enjoy turning ideas into working projects, learning through hands-on experience, and building solutions that have a real impact. My journey blends engineering fundamentals, creative thinking, and a passion for creating meaningful digital experiences.',
  profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  socials: {
    github: 'https://github.com/KishanMahankali',
    linkedin: 'https://www.linkedin.com/in/kishanmahankali',
    instagram: 'https://www.instagram.com/kishanmahankali',
    email: 'kishanmahankali.dev@gmail.com'
  },
  theme: {
    accent: '#A6FF4D',
    secondary: '#A78BFA',
    blue: '#7DD3FC'
  },
  education: [
    {
      year: '2022 - Present',
      title: 'B.E. in Computer Science / Engineering',
      place: 'BGS College of Engineering, Bengaluru',
      details: 'Pursuing engineering with a focus on software, problem-solving, and project-based learning.'
    },
    {
      year: '2020 - 2022',
      title: 'Pre-University / Higher Secondary Education',
      place: 'Previous School / PU College, Bengaluru',
      details: 'Built a strong foundation in science, mathematics, and analytical thinking.'
    }
  ],
  skills: [
    { name: 'C', category: 'Programming' },
    { name: 'Python', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'HTML', category: 'Web Development' },
    { name: 'CSS', category: 'Web Development' },
    { name: 'JavaScript', category: 'Web Development' },
    { name: 'React', category: 'Frameworks' },
    { name: 'Tailwind CSS', category: 'Frameworks' },
    { name: 'SQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'Git', category: 'Tools' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'Problem Solving', category: 'Core Abilities' },
    { name: 'Creative Thinking', category: 'Core Abilities' },
    { name: 'Currently Learning', category: 'Growth' }
  ],
  projects: [
    {
      title: 'Cosmic Portfolio',
      description: 'A futuristic personal portfolio experience built with a cinematic landing page and interactive UI.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1518770660439-463ac1f7b5f1?auto=format&fit=crop&w=900&q=80',
      github: 'https://github.com/KishanMahankali',
      live: '#'
    },
    {
      title: 'Smart Study Planner',
      description: 'A productivity-focused application to track tasks, study goals, and progress across weekly plans.',
      technologies: ['Python', 'SQLite', 'UI/UX'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      github: 'https://github.com/KishanMahankali',
      live: '#'
    },
    {
      title: 'Innovation Dashboard',
      description: 'A dashboard concept for visualizing personal growth, project metrics, and engineering milestones.',
      technologies: ['React', 'CSS', 'Charts'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
      github: 'https://github.com/KishanMahankali',
      live: '#'
    }
  ],
  gallery: [
    { title: 'Profile Shot', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80' },
    { title: 'College Memory', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80' },
    { title: 'Campus Event', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80' },
    { title: 'Workshop', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
    { title: 'Certificate', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
    { title: 'Project Screen', image: 'https://images.unsplash.com/photo-1518770660439-463ac1f7b5f1?auto=format&fit=crop&w=900&q=80' }
  ]
};

window.addEventListener('DOMContentLoaded', async () => {
  const intro = document.getElementById('intro-screen');
  const app = document.getElementById('app-shell');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    setTimeout(() => {
      intro.classList.add('fade-out');
      app.classList.add('visible');
    }, 5600);
  } else {
    intro.style.display = 'none';
    app.classList.add('visible');
  }

  const state = { data: portfolioData };

  const heroName = document.getElementById('hero-name');
  const heroIntro = document.getElementById('hero-intro');
  const heroLocation = document.getElementById('hero-location');
  const aboutText = document.getElementById('about-text');
  const profileImg = document.getElementById('profile-image');
  const themeStyle = document.documentElement.style;

  function setThemeColors(theme = state.data.theme || {}) {
    themeStyle.setProperty('--accent', theme.accent || '#A6FF4D');
    themeStyle.setProperty('--secondary', theme.secondary || '#A78BFA');
    themeStyle.setProperty('--blue', theme.blue || '#7DD3FC');
  }

  function renderEducation() {
    const wrap = document.getElementById('education-list');
    wrap.innerHTML = (state.data.education || []).map((item) => `
      <div class="timeline-item">
        <div class="timeline-year">${item.year || ''}</div>
        <div class="timeline-content">
          <h3>${item.title || ''}</h3>
          <p class="place">${item.place || ''}</p>
          <p>${item.details || ''}</p>
        </div>
      </div>
    `).join('');
  }

  function renderSkills() {
    const wrap = document.getElementById('skills-grid');
    const grouped = {};
    (state.data.skills || []).forEach((skill) => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill.name);
    });

    wrap.innerHTML = Object.entries(grouped).map(([category, names]) => `
      <div class="skill-card">
        <p class="skill-category">${category}</p>
        <div class="skill-tags">
          ${names.map((name) => `<span>${name}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderProjects() {
    const wrap = document.getElementById('projects-grid');
    wrap.innerHTML = (state.data.projects || []).map((project) => `
      <article class="project-card">
        <div class="project-visual">
          <img src="${project.image || ''}" alt="${project.title || 'Project preview'}" />
        </div>
        <div class="project-body">
          <h3>${project.title || ''}</h3>
          <p>${project.description || ''}</p>
          <div class="tech-stack">
            ${(project.technologies || []).map((tech) => `<span>${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.github || '#'}" target="_blank" rel="noreferrer">GitHub</a>
            <a href="${project.live || '#'}" target="_blank" rel="noreferrer">Live Demo</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderGallery() {
    const wrap = document.getElementById('gallery-grid');
    wrap.innerHTML = (state.data.gallery || []).map((item) => `
      <div class="gallery-item">
        <img src="${item.image || ''}" alt="${item.title || 'Gallery'}" />
      </div>
    `).join('');
  }

  function renderSocials() {
    const github = document.getElementById('github-link');
    const linkedin = document.getElementById('linkedin-link');
    const instagram = document.getElementById('instagram-link');
    const emailLink = document.getElementById('email-link');
    const mail = state.data.socials || {};
    github.href = mail.github || '#';
    linkedin.href = mail.linkedin || '#';
    instagram.href = mail.instagram || '#';
    emailLink.href = `mailto:${mail.email || ''}`;
  }

  function renderProfile() {
    heroName.textContent = state.data.name || 'Kishan Mahankali';
    heroLocation.textContent = state.data.location || 'Engineering Student • Bengaluru';
    heroIntro.textContent = state.data.intro || '';
    aboutText.textContent = state.data.about || '';
    profileImg.src = state.data.profilePhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80';
    setThemeColors(state.data.theme || {});
  }

  function renderEverything() {
    renderProfile();
    renderEducation();
    renderSkills();
    renderProjects();
    renderGallery();
    renderSocials();
  }

  try {
    const response = await fetch('/api/portfolio');
    if (response.ok) {
      state.data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
  }

  renderEverything();

  const adminButton = document.getElementById('admin-toggle');
  const adminPanel = document.getElementById('admin-panel');
  const closeAdmin = document.getElementById('close-admin');

  adminButton.addEventListener('click', () => {
    adminPanel.classList.add('open');
    populateAdminForm(state.data);
  });

  closeAdmin.addEventListener('click', () => adminPanel.classList.remove('open'));

  function populateAdminForm(data) {
    document.getElementById('admin-name').value = data.name || '';
    document.getElementById('admin-title').value = data.title || '';
    document.getElementById('admin-location').value = data.location || '';
    document.getElementById('admin-intro').value = data.intro || '';
    document.getElementById('admin-about').value = data.about || '';
    document.getElementById('admin-profile-photo').value = data.profilePhoto || '';
    document.getElementById('admin-email').value = data.socials?.email || '';
    document.getElementById('admin-github').value = data.socials?.github || '';
    document.getElementById('admin-linkedin').value = data.socials?.linkedin || '';
    document.getElementById('admin-instagram').value = data.socials?.instagram || '';
    document.getElementById('admin-accent').value = data.theme?.accent || '#A6FF4D';
    document.getElementById('admin-secondary').value = data.theme?.secondary || '#A78BFA';
    document.getElementById('admin-blue').value = data.theme?.blue || '#7DD3FC';
    document.getElementById('admin-education').value = JSON.stringify(data.education || [], null, 2);
    document.getElementById('admin-skills').value = JSON.stringify(data.skills || [], null, 2);
    document.getElementById('admin-projects').value = JSON.stringify(data.projects || [], null, 2);
    document.getElementById('admin-gallery').value = JSON.stringify(data.gallery || [], null, 2);
  }

  document.getElementById('admin-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nextPortfolio = {
      name: document.getElementById('admin-name').value,
      title: document.getElementById('admin-title').value,
      location: document.getElementById('admin-location').value,
      intro: document.getElementById('admin-intro').value,
      about: document.getElementById('admin-about').value,
      profilePhoto: document.getElementById('admin-profile-photo').value,
      socials: {
        email: document.getElementById('admin-email').value,
        github: document.getElementById('admin-github').value,
        linkedin: document.getElementById('admin-linkedin').value,
        instagram: document.getElementById('admin-instagram').value
      },
      theme: {
        accent: document.getElementById('admin-accent').value,
        secondary: document.getElementById('admin-secondary').value,
        blue: document.getElementById('admin-blue').value
      },
      education: JSON.parse(document.getElementById('admin-education').value || '[]'),
      skills: JSON.parse(document.getElementById('admin-skills').value || '[]'),
      projects: JSON.parse(document.getElementById('admin-projects').value || '[]'),
      gallery: JSON.parse(document.getElementById('admin-gallery').value || '[]')
    };

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextPortfolio)
      });

      if (!response.ok) throw new Error('Save failed');
      state.data = nextPortfolio;
      renderEverything();
      adminPanel.classList.remove('open');
    } catch (error) {
      alert('There was an issue saving the portfolio. Please review the JSON values and try again.');
    }
  });

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      alert(result.message || 'Message sent.');
      contactForm.reset();
    } catch (error) {
      alert('Unable to send message right now.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});
