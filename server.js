const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const uploadsDir = path.join(rootDir, 'uploads');
const dataDir = path.join(rootDir, 'data');
const portfolioPath = path.join(dataDir, 'portfolio.json');

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

const defaultPortfolio = {
  name: 'Kishan Mahankali',
  title: "HELLO, I'M KISHAN MAHANKALI",
  location: 'Engineering Student • Bengaluru',
  intro:
    'Curious mind. Creative builder. Future-focused engineer. Exploring technology, turning ideas into projects, and learning something new with every build.',
  about:
    'I am a curious and driven engineering student from Bengaluru with a strong interest in technology, creativity, and problem-solving. I enjoy turning ideas into working projects, learning through hands-on experience, and building solutions that have a real impact. My journey blends engineering fundamentals, creative thinking, and a passion for creating meaningful digital experiences.',
  profilePhoto:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
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

function ensurePortfolioFile() {
  if (!fs.existsSync(portfolioPath)) {
    fs.writeFileSync(portfolioPath, JSON.stringify(defaultPortfolio, null, 2));
  }
}

ensurePortfolioFile();

function readPortfolio() {
  const file = fs.readFileSync(portfolioPath, 'utf8');
  return JSON.parse(file);
}

function savePortfolio(data) {
  fs.writeFileSync(portfolioPath, JSON.stringify(data, null, 2));
}

app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(rootDir, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const safeName = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
    cb(null, `${Date.now()}-${safeName}${ext}`);
  }
});
const upload = multer({ storage });

app.get('/api/portfolio', (req, res) => {
  res.json(readPortfolio());
});

app.post('/api/portfolio', (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ message: 'Invalid portfolio payload.' });
  }

  const existing = readPortfolio();
  const merged = { ...existing, ...payload };
  savePortfolio(merged);
  res.json({ success: true, message: 'Portfolio updated successfully.', portfolio: merged });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, url });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please complete all fields.' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `${name} <${smtpUser}>`,
        to: process.env.RECIPIENT_EMAIL || 'kishanmahankali.dev@gmail.com',
        subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p>${message}</p>`
      });

      return res.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Email send failed:', error);
      return res.status(500).json({ message: 'Message could not be sent. Please try again later.' });
    }
  }

  console.log('Portfolio contact form submission:', { name, email, subject, message });
  return res.json({
    success: true,
    message: 'Thanks for reaching out. Your message was captured successfully. Configure SMTP environment variables to enable real email delivery.'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
