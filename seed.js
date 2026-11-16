require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
const Internship = require('./models/Internship');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jims_network';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Internship.deleteMany({});
    console.log('Cleared existing collections.');

    // Default password hash
    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('password123', salt);

    // 1. Seed Users (Students, Alumni, Official)
    const users = await User.insertMany([
      {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@alumni.jims.edu',
        password: defaultPassword,
        role: 'alumni',
        batch: 'Batch 2023',
        department: 'B.Tech CSE',
        position: 'Software Engineer at Infosys',
        location: 'Noida, India',
        avatar: 'AS',
        bio: 'JIMS Alumni working on full-stack web applications and microservices. Open to mentoring MCA & B.Tech juniors.',
        skills: ['React', 'Node.js', 'System Design', 'Docker'],
      },
      {
        name: 'Priya Verma',
        email: 'priya.verma@student.jims.edu',
        password: defaultPassword,
        role: 'student',
        batch: 'Batch 2024-2026',
        department: 'MCA',
        position: 'Coding Club Coordinator',
        location: 'Delhi, India',
        avatar: 'PV',
        bio: 'First year MCA student passionate about Data Structures and MERN Stack development.',
        skills: ['JavaScript', 'React', 'MongoDB', 'Python'],
      },
      {
        name: 'Rohan Gupta',
        email: 'rohan.gupta@alumni.jims.edu',
        password: defaultPassword,
        role: 'alumni',
        batch: 'Batch 2022',
        department: 'BBA & Analytics',
        position: 'Product Analyst at Deloitte',
        location: 'Gurugram, India',
        avatar: 'RG',
        bio: 'Business Intelligence and product analytics specialist. Helping students break into analytics.',
        skills: ['SQL', 'Excel', 'Power BI', 'Product Strategy'],
      },
      {
        name: 'Neha Malhotra',
        email: 'neha.malhotra@student.jims.edu',
        password: defaultPassword,
        role: 'student',
        batch: 'Batch 2023-2027',
        department: 'B.Tech CSE',
        position: 'Web Development Enthusiast',
        location: 'Delhi, India',
        avatar: 'NM',
        bio: 'Frontend enthusiast exploring Tailwind CSS and React 19.',
        skills: ['HTML5', 'CSS3', 'React', 'Git'],
      },
      {
        name: 'Kunal Mehta',
        email: 'kunal.mehta@alumni.jims.edu',
        password: defaultPassword,
        role: 'alumni',
        batch: 'Batch 2021',
        department: 'BCA',
        position: 'Frontend Lead at TechVentures',
        location: 'Bengaluru (Remote)',
        avatar: 'KM',
        bio: 'Tech lead with 4+ years of industry experience building scale-ready web apps.',
        skills: ['React', 'TypeScript', 'Next.js', 'CI/CD'],
      },
    ]);
    console.log(`✅ Seeded ${users.length} Users.`);

    // 2. Seed Posts
    const posts = await Post.insertMany([
      {
        author: 'Placement & Career Cell',
        role: 'Official Campus Notice',
        authorType: 'official',
        avatar: 'PC',
        content: 'Registration is now open for the upcoming Campus Technical Interview Prep Workshop! We will cover Data Structures, System Design basics, and mock HR rounds with visiting alumni mentors.',
        tags: ['Placement', 'Workshop', 'CareerPrep'],
        likesCount: 42,
        comments: [
          { author: 'Priya Verma', text: 'Will this workshop be conducted in the main seminar hall?' },
          { author: 'Placement Coordinator', text: 'Yes, Seminar Hall A. Attendance link is in student mail.' },
        ],
      },
      {
        author: 'Aarav Sharma',
        role: 'Software Engineer @ Infosys (Batch 2023)',
        authorType: 'alumni',
        avatar: 'AS',
        content: 'To all 3rd and final year students preparing for campus hiring: make sure your GitHub profile showcases at least two full-stack projects with live deployment links. Feel free to reach out if you need resume reviews!',
        tags: ['AlumniAdvice', 'WebDev', 'Mentorship'],
        likesCount: 68,
        comments: [
          { author: 'Priya Verma', text: 'Thank you for the advice, Aarav bhaiya! Connecting with you.' },
        ],
      },
      {
        author: 'Priya Verma',
        role: 'Coding Club Student Coordinator (MCA)',
        authorType: 'student',
        avatar: 'PV',
        content: 'Kudos to our JIMS team for securing 2nd place in the Inter-College Hackathon! Thank you everyone who supported us during the 24-hour build sprint.',
        tags: ['Hackathon', 'CodingClub', 'StudentAchievement'],
        likesCount: 85,
        comments: [
          { author: 'Faculty Mentor', text: 'Proud of the team! Keep representing JIMS with excellence.' },
        ],
      },
      {
        author: 'Rohan Gupta',
        role: 'Product Analyst @ Deloitte (Batch 2022)',
        authorType: 'alumni',
        avatar: 'RG',
        content: 'Our team is actively sourcing candidates for Business Intelligence and Analytics interns. Strong SQL and Excel skills required. Check the Jobs & Internships section for full details!',
        tags: ['Hiring', 'Analytics', 'Referral'],
        likesCount: 51,
        comments: [
          { author: 'Neha Malhotra', text: 'Applied through the portal! Thanks for sharing the opening.' },
        ],
      },
    ]);
    console.log(`✅ Seeded ${posts.length} Posts.`);

    // 3. Seed Internships
    const internships = await Internship.insertMany([
      {
        title: 'Frontend React Developer Intern',
        company: 'TechCorp India',
        location: 'Remote',
        type: 'Internship (3 Months)',
        stipend: '₹15,000 / month',
        deadline: 'Dec 15, 2026',
        skills: ['React', 'JavaScript', 'CSS3', 'Git'],
        description: 'Work alongside senior frontend engineers building customer-facing dashboard interfaces in modern React.',
        applicants: [],
      },
      {
        title: 'Business Analytics Intern',
        company: 'InsightWave Solutions',
        location: 'Gurugram (Hybrid)',
        type: 'Internship (6 Months)',
        stipend: '₹18,000 / month',
        deadline: 'Dec 20, 2026',
        skills: ['SQL', 'Python', 'Power BI', 'Excel'],
        description: 'Assist in designing data pipelines, generating reporting dashboards, and tracking key operational metrics.',
        applicants: [],
      },
      {
        title: 'Digital Marketing & Growth Trainee',
        company: 'ScaleUp Media',
        location: 'Noida (On-Site)',
        type: 'Internship (3 Months)',
        stipend: '₹12,000 / month',
        deadline: 'Dec 10, 2026',
        skills: ['Content Strategy', 'SEO', 'Social Media', 'Analytics'],
        description: 'Support social campaigns, campus engagement drives, and content creation for educational outreach.',
        applicants: [],
      },
      {
        title: 'Junior Python Backend Intern',
        company: 'CloudNova Systems',
        location: 'Remote',
        type: 'Internship (4 Months)',
        stipend: '₹20,000 / month',
        deadline: 'Dec 28, 2026',
        skills: ['Python', 'FastAPI / Django', 'REST APIs', 'PostgreSQL'],
        description: 'Build robust REST APIs, handle database migrations, and write automated tests for microservices.',
        applicants: [],
      },
    ]);
    console.log(`✅ Seeded ${internships.length} Internships.`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDatabase();
