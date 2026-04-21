const defaultData = {
  heroTitle: "Сайн уу, би Экүна бна",
  heroText:
    "Орчин үеийн UI, responsive веб сайт, JavaScript суурьтай интерактив шийдлүүдийг бүтээдэг.",
  menu: [
    { name: "Нүүр", link: "#home" },
    { name: "Миний тухай", link: "#about" },
    { name: "Ур чадвар", link: "#skills" },
    { name: "Төсөл", link: "#projects" },
    { name: "Холбоо барих", link: "#contact" }
  ],
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsive Design",
    "GitHub",
    "UI Design"
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "Хувийн танилцуулгын modern responsive веб сайт."
    },
    {
      title: "Car Wash System",
      description: "Авто угаалгын захиалга, тайлан, удирдлагын системийн төсөл."
    },
    {
      title: "Admin Dashboard UI",
      description: "Өгөгдөл удирдах minimalist dashboard интерфэйс."
    }
  ]
};

function getData() {
  const saved = localStorage.getItem("modernPortfolioData");
  if (!saved) {
    localStorage.setItem("modernPortfolioData", JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(saved);
}

function saveData(data) {
  localStorage.setItem("modernPortfolioData", JSON.stringify(data));
}

function getTheme() {
  return localStorage.getItem("portfolioTheme") || "dark";
}

function applyTheme() {
  const theme = getTheme();
  if (theme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
  }
}

function toggleTheme() {
  const currentTheme = getTheme();
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolioTheme", nextTheme);
  applyTheme();
}

function renderNavigation() {
  const navMenu = document.getElementById("navMenu");
  if (!navMenu) return;

  const data = getData();
  navMenu.innerHTML = "";

  data.menu.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
    navMenu.appendChild(li);
  });
}

function renderHomePage() {
  const heroTitle = document.getElementById("heroTitle");
  const heroText = document.getElementById("heroText");
  const skillsGrid = document.getElementById("skillsGrid");
  const projectsGrid = document.getElementById("projectsGrid");
  const projectCount = document.getElementById("projectCount");
  const skillCount = document.getElementById("skillCount");
  const profileName = document.getElementById("profileName");

  if (!heroTitle || !heroText || !skillsGrid || !projectsGrid) return;

  const data = getData();

  heroTitle.textContent = data.heroTitle;
  heroText.textContent = data.heroText;

  if (profileName) {
    profileName.textContent = data.heroTitle.replace("Сайн уу, би ", "");
  }

  skillsGrid.innerHTML = "";
  data.skills.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card glass reveal";
    card.textContent = skill;
    skillsGrid.appendChild(card);
  });

  projectsGrid.innerHTML = "";
  data.projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card glass reveal";
    card.innerHTML = `
      <div class="project-top">
        <span class="project-tag">Project ${index + 1}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-footer">
        <span class="project-link">HTML</span>
        <span class="project-link">CSS</span>
        <span class="project-link">JavaScript</span>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  if (projectCount) projectCount.textContent = `${data.projects.length}+`;
  if (skillCount) skillCount.textContent = `${data.skills.length}+`;

  observeReveal();
}

function handleContactForm() {
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    contactMessage.textContent = "Таны мэдээлэл амжилттай илгээгдлээ.";
    contactForm.reset();
  });
}

function observeReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

function checkAdminSession() {
  return localStorage.getItem("modernAdminLoggedIn") === "true";
}

function renderAdminPage() {
  const loginWrapper = document.getElementById("loginWrapper");
  const adminPanel = document.getElementById("adminPanel");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  if (!loginWrapper || !adminPanel) return;

  function showAdmin() {
    loginWrapper.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    fillHeroInputs();
    renderMenuTable();
    renderSkillTable();
    renderProjectTable();
  }

  function showLogin() {
    loginWrapper.classList.remove("hidden");
    adminPanel.classList.add("hidden");
  }

  if (checkAdminSession()) {
    showAdmin();
  } else {
    showLogin();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "1234") {
        localStorage.setItem("modernAdminLoggedIn", "true");
        loginError.textContent = "";
        showAdmin();
      } else {
        loginError.textContent = "Нэвтрэх нэр эсвэл нууц үг буруу байна.";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("modernAdminLoggedIn");
      location.reload();
    });
  }

  const menuForm = document.getElementById("menuForm");
  if (menuForm) {
    menuForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = getData();
      const name = document.getElementById("menuName").value.trim();
      const link = document.getElementById("menuLink").value.trim();

      if (!name || !link) return;

      data.menu.push({ name, link });
      saveData(data);
      menuForm.reset();
      renderMenuTable();
    });
  }

  const skillForm = document.getElementById("skillForm");
  if (skillForm) {
    skillForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = getData();
      const skill = document.getElementById("skillName").value.trim();

      if (!skill) return;

      data.skills.push(skill);
      saveData(data);
      skillForm.reset();
      renderSkillTable();
    });
  }

  const projectForm = document.getElementById("projectForm");
  if (projectForm) {
    projectForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = getData();
      const title = document.getElementById("projectTitle").value.trim();
      const description = document.getElementById("projectDesc").value.trim();

      if (!title || !description) return;

      data.projects.push({ title, description });
      saveData(data);
      projectForm.reset();
      renderProjectTable();
    });
  }

  const heroForm = document.getElementById("heroForm");
  if (heroForm) {
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = getData();
      const title = document.getElementById("heroTitleInput").value.trim();
      const text = document.getElementById("heroTextInput").value.trim();

      if (!title || !text) return;

      data.heroTitle = title;
      data.heroText = text;
      saveData(data);
      alert("Нүүр хэсгийн мэдээлэл хадгалагдлаа.");
    });
  }
}

function fillHeroInputs() {
  const data = getData();
  const heroTitleInput = document.getElementById("heroTitleInput");
  const heroTextInput = document.getElementById("heroTextInput");

  if (heroTitleInput) heroTitleInput.value = data.heroTitle;
  if (heroTextInput) heroTextInput.value = data.heroText;
}

function renderMenuTable() {
  const tbody = document.getElementById("menuTableBody");
  if (!tbody) return;

  const data = getData();
  tbody.innerHTML = "";

  data.menu.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.link}</td>
      <td><button class="action-btn delete-btn" onclick="deleteMenu(${index})">Устгах</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderSkillTable() {
  const tbody = document.getElementById("skillTableBody");
  if (!tbody) return;

  const data = getData();
  tbody.innerHTML = "";

  data.skills.forEach((skill, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${skill}</td>
      <td><button class="action-btn delete-btn" onclick="deleteSkill(${index})">Устгах</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderProjectTable() {
  const tbody = document.getElementById("projectTableBody");
  if (!tbody) return;

  const data = getData();
  tbody.innerHTML = "";

  data.projects.forEach((project, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${project.title}</td>
      <td>${project.description}</td>
      <td><button class="action-btn delete-btn" onclick="deleteProject(${index})">Устгах</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteMenu(index) {
  const data = getData();
  data.menu.splice(index, 1);
  saveData(data);
  renderMenuTable();
}

function deleteSkill(index) {
  const data = getData();
  data.skills.splice(index, 1);
  saveData(data);
  renderSkillTable();
}

function deleteProject(index) {
  const data = getData();
  data.projects.splice(index, 1);
  saveData(data);
  renderProjectTable();
}

document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  renderNavigation();
  renderHomePage();
  handleContactForm();
  renderAdminPage();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});