// ================================
// Інформація про браузер
// ================================
const browserInfo = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language,
  cookieEnabled: navigator.cookieEnabled,
  screenResolution: `${screen.width}x${screen.height}`
};

localStorage.setItem('browserInfo', JSON.stringify(browserInfo, null, 2));

const browserDataEl = document.getElementById('browserData');
if (browserDataEl) {
  browserDataEl.textContent = JSON.stringify(browserInfo, null, 2);
}

// ================================
// Завантаження коментарів
// ================================
const commentsContainer = document.getElementById('commentsContainer');
const variantNumber = 6; // можна змінити номер поста

if (commentsContainer) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
    .then(res => res.json())
    .then(data => {
      commentsContainer.innerHTML = '';
      data.forEach(comment => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
        commentsContainer.appendChild(div);
      });
    })
    .catch(err => {
      commentsContainer.textContent = 'Не вдалося завантажити коментарі.';
      console.error(err);
    });
}

// ================================
// Модальне вікно
// ================================
const modal = document.getElementById('feedbackModal');
const closeModalBtn = document.getElementById('closeModal');

// Показати модальне вікно через 3 секунди
setTimeout(() => {
  modal.classList.remove('modal--hidden');
}, 3000);

// Закрити модальне вікно
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('modal--hidden');
});

// ================================
// Обробка форми зворотного зв’язку
// ================================
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = feedbackForm.name.value.trim();
  const email = feedbackForm.email.value.trim();
  const message = feedbackForm.message.value.trim();

  if (!name || !email || !message) {
    alert('Будь ласка, заповніть усі поля.');
    return;
  }

  console.log('Надіслано повідомлення:', { name, email, message });
  alert('Дякуємо за ваше повідомлення!');
  feedbackForm.reset();
  modal.classList.add('modal--hidden');
});

// ================================
// Перемикач теми
// ================================
const switcher = document.getElementById('themeSwitcher');

const applyTheme = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  switcher.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Автоматична тема за часом доби
const hour = new Date().getHours();
const autoDark = hour < 7 || hour >= 21;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  applyTheme(autoDark);
}

// Клік по перемикачу теми
switcher.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  applyTheme(isDark);
});
