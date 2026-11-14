const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Pre-loaded JIMS Network Database
let posts = [{
        id: 1,
        author: 'Placement & Career Cell (Demo)',
        role: 'Official Campus Notice',
        authorType: 'official',
        avatar: 'PC',
        timeAgo: '2 hours ago',
        content: 'Registration is now open for the upcoming Campus Technical Interview Prep Workshop! We will cover Data Structures, System Design basics, and mock HR rounds with visiting alumni mentors.',
        tags: ['Placement', 'Workshop', 'CareerPrep'],
        likes: 42,
        isLiked: false,
        comments: [
            { id: 101, author: 'Sample Student', text: 'Will this workshop be conducted in the main seminar hall?', time: '1 hour ago' },
            { id: 102, author: 'Placement Coordinator', text: 'Yes, Seminar Hall A. Attendance link is in student mail.', time: '45 mins ago' },
        ],
    },
    {
        id: 2,
        author: 'Aarav Sharma (Sample Alumni)',
        role: 'Software Engineer @ Infosys (Batch 2023)',
        authorType: 'alumni',
        avatar: 'AS',
        timeAgo: '5 hours ago',
        content: 'To all 3rd and final year students preparing for campus hiring: make sure your GitHub profile showcases at least two full-stack projects with live deployment links. Feel free to reach out if you need resume reviews!',
        tags: ['AlumniAdvice', 'WebDev', 'Mentorship'],
        likes: 68,
        isLiked: false,
        comments: [
            { id: 201, author: 'Sample Peer', text: 'Thank you for the advice, Aarav bhaiya! Connecting with you.', time: '3 hours ago' },
        ],
    },
    {
        id: 3,
        author: 'Priya Verma (Sample Student)',
        role: 'Coding Club Student Coordinator (MCA)',
        authorType: 'student',
        avatar: 'PV',
        timeAgo: '1 day ago',
        content: 'Kudos to our JIMS team for securing 2nd place in the Inter-College Hackathon! Thank you everyone who supported us during the 24-hour build sprint.',
        tags: ['Hackathon', 'CodingClub', 'StudentAchievement'],
        likes: 85,
        isLiked: false,
        comments: [
            { id: 301, author: 'Faculty Mentor', text: 'Proud of the team! Keep representing JIMS with excellence.', time: '18 hours ago' },
        ],
    },
    {
        id: 4,
        author: 'Rohan Gupta (Sample Alumni)',
        role: 'Product Analyst @ Deloitte (Batch 2022)',
        authorType: 'alumni',
        avatar: 'RG',
        timeAgo: '2 days ago',
        content: 'Our team is actively sourcing candidates for Business Intelligence and Analytics interns. Strong SQL and Excel skills required. Check the Jobs & Internships section for full details!',
        tags: ['Hiring', 'Analytics', 'Referral'],
        likes: 51,
        isLiked: false,
        comments: [
            { id: 401, author: 'Sample Student', text: 'Applied through the portal! Thanks for sharing the opening.', time: '1 day ago' },
        ],
    },
];

let people = [{
        id: 1,
        name: 'Aarav Sharma',
        type: 'Alumni',
        batch: 'Batch 2023',
        department: 'B.Tech CSE',
        position: 'Software Engineer at Infosys',
        location: 'Noida, India',
        mutualConnections: 12,
        avatar: 'AS',
        isConnected: false,
    },
    {
        id: 2,
        name: 'Priya Verma',
        type: 'Student',
        batch: 'Batch 2024-2026',
        department: 'MCA',
        position: 'Coding Club Coordinator',
        location: 'Delhi, India',
        mutualConnections: 18,
        avatar: 'PV',
        isConnected: true,
    },
    {
        id: 3,
        name: 'Rohan Gupta',
        type: 'Alumni',
        batch: 'Batch 2022',
        department: 'BBA & Analytics',
        position: 'Product Analyst at Deloitte',
        location: 'Gurugram, India',
        mutualConnections: 8,
        avatar: 'RG',
        isConnected: false,
    },
    {
        id: 4,
        name: 'Neha Malhotra',
        type: 'Student',
        batch: 'Batch 2023-2027',
        department: 'B.Tech CSE',
        position: 'Web Development Enthusiast',
        location: 'Delhi, India',
        mutualConnections: 15,
        avatar: 'NM',
        isConnected: false,
    },
    {
        id: 5,
        name: 'Kunal Mehta',
        type: 'Alumni',
        batch: 'Batch 2021',
        department: 'BCA',
        position: 'Frontend Lead at TechVentures',
        location: 'Bengaluru (Remote)',
        mutualConnections: 6,
        avatar: 'KM',
        isConnected: false,
    },
    {
        id: 6,
        name: 'Ananya Saxena',
        type: 'Student',
        batch: 'Batch 2024-2027',
        department: 'BBA',
        position: 'Student Council Representative',
        location: 'Delhi, India',
        mutualConnections: 9,
        avatar: 'AS',
        isConnected: false,
    },
];

let internships = [{
        id: 1,
        title: 'Frontend React Developer Intern',
        company: 'TechCorp India (Sample)',
        location: 'Remote',
        type: 'Internship (3 Months)',
        stipend: '₹15,000 / month',
        deadline: 'Nov 15, 2026',
        skills: ['React', 'JavaScript', 'CSS3', 'Git'],
        description: 'Work alongside senior frontend engineers building customer-facing dashboard interfaces in modern React.',
        isApplied: false,
    },
    {
        id: 2,
        title: 'Business Analytics Intern',
        company: 'InsightWave Solutions (Sample)',
        location: 'Gurugram (Hybrid)',
        type: 'Internship (6 Months)',
        stipend: '₹18,000 / month',
        deadline: 'Nov 20, 2026',
        skills: ['SQL', 'Python', 'Power BI', 'Excel'],
        description: 'Assist in designing data pipelines, generating reporting dashboards, and tracking key operational metrics.',
        isApplied: false,
    },
    {
        id: 3,
        title: 'Digital Marketing & Growth Trainee',
        company: 'ScaleUp Media (Sample)',
        location: 'Noida (On-Site)',
        type: 'Internship (3 Months)',
        stipend: '₹12,000 / month',
        deadline: 'Nov 10, 2026',
        skills: ['Content Strategy', 'SEO', 'Social Media', 'Analytics'],
        description: 'Support social campaigns, campus engagement drives, and content creation for educational outreach.',
        isApplied: true,
    },
    {
        id: 4,
        title: 'Junior Python Backend Intern',
        company: 'CloudNova Systems (Sample)',
        location: 'Remote',
        type: 'Internship (4 Months)',
        stipend: '₹20,000 / month',
        deadline: 'Nov 28, 2026',
        skills: ['Python', 'FastAPI / Django', 'REST APIs', 'PostgreSQL'],
        description: 'Build robust REST APIs, handle database migrations, and write automated tests for microservices.',
        isApplied: false,
    },
];

// --- API ROUTES ---

// Get all initial data
app.get('/api/data', (req, res) => {
    res.json({ posts, people, internships });
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const newPost = { id: Date.now(), ...req.body };
    posts = [newPost, ...posts];
    res.json(newPost);
});

// Toggle like on a post
app.patch('/api/posts/:id/like', (req, res) => {
    const postId = Number(req.params.id);
    posts = posts.map((post) => {
        if (post.id === postId) {
            const isLiked = !post.isLiked;
            return {
                ...post,
                isLiked,
                likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
            };
        }
        return post;
    });
    res.json({ success: true });
});

// Toggle connect with alumni/student
app.patch('/api/people/:id/connect', (req, res) => {
    const personId = Number(req.params.id);
    people = people.map((person) =>
        person.id === personId ? {...person, isConnected: !person.isConnected } : person
    );
    res.json({ success: true });
});

// Toggle apply to internship
app.patch('/api/internships/:id/apply', (req, res) => {
    const internshipId = Number(req.params.id);
    internships = internships.map((item) =>
        item.id === internshipId ? {...item, isApplied: !item.isApplied } : item
    );
    res.json({ success: true });
});

app.listen(5000, () => {
    console.log('JIMS Network Backend running on http://localhost:5000');
});