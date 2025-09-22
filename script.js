// Hard-coded demo accounts
const accounts = [
  { username: "user1", password: "123", progress: {}, achievements: [] },
  { username: "user2", password: "abc", progress: {}, achievements: [] },
  { username: "user3", password: "xyz", progress: {}, achievements: [] },
];

let currentUser = null;

// Login function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = accounts.find(a => a.username === username && a.password === password);

  const msg = document.getElementById('login-msg');
  if (user) {
    currentUser = user;
    msg.textContent = "Login successful!";
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  } else {
    msg.textContent = "Invalid username or password.";
  }
}

// Set skill level
function setSkill(level) {
  localStorage.setItem('skillLevel', level);
  alert(`Skill level set to ${level}`);
}

// Populate lessons
function loadLessons() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') || 'html';
  const skill = localStorage.getItem('skillLevel') || 'beginner';
  const lessonList = document.getElementById('lesson-list');

  const sampleLessons = [
    { title: `Intro to ${lang.toUpperCase()}`, content: `This is a ${skill} lesson.` },
    { title: `Advanced ${lang.toUpperCase()} Topic`, content: `This is a ${skill} advanced lesson.` }
  ];

  lessonList.innerHTML = '';
  sampleLessons.forEach((l, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${l.title}</h3><p>${l.content}</p><button onclick="completeLesson('${l.title}')">Mark as Complete</button>`;
    lessonList.appendChild(div);
  });
}

// Complete lesson
function completeLesson(title) {
  if (currentUser) {
    currentUser.progress[title] = true;
    alert(`Lesson "${title}" completed!`);
    unlockAchievement(title);
  } else {
    alert("Log in to track progress!");
  }
}

// Unlock achievements
function unlockAchievement(title) {
  if (currentUser && !currentUser.achievements.includes(title)) {
    currentUser.achievements.push(title);
  }
}

// Run code (simple JS sandbox)
function runCode() {
  const code = document.getElementById('code').value;
  const output = document.getElementById('output');
  try {
    output.textContent = eval(code);
  } catch (e) {
    output.textContent = e;
  }
}

// Load profile info
function loadProfile() {
  if (!currentUser) return;
  const container = document.getElementById('user-info');
  container.innerHTML = `<h2>${currentUser.username}</h2>
    <p>Progress:</p>
    <pre>${JSON.stringify(currentUser.progress, null, 2)}</pre>`;
}

// Load achievements
function loadAchievements() {
  if (!currentUser) return;
  const container = document.getElementById('achievements-list');
  container.innerHTML = '';
  currentUser.achievements.forEach(a => {
    const div = document.createElement('div');
    div.textContent = a;
    container.appendChild(div);
  });
}

// Initialize lessons/profile/achievements pages
if (document.getElementById('lesson-list')) loadLessons();
if (document.getElementById('user-info')) loadProfile();
if (document.getElementById('achievements-list')) loadAchievements();
