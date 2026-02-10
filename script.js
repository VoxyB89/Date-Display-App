// Theme toggle
const toggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
toggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

toggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  toggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Modal logic (warning + tutorial)
const warningModal = document.getElementById('warningModal');
const tutorialModal = document.getElementById('tutorialModal');

function closeWarningModal() {
  warningModal.classList.remove('show');
  if (document.getElementById('dontShowWarning').checked) localStorage.setItem('hideWarning', 'true');
  if (!localStorage.getItem('hideTutorial')) setTimeout(() => tutorialModal.classList.add('show'), 300);
}

function closeTutorialModal() {
  tutorialModal.classList.remove('show');
  if (document.getElementById('dontShowTutorial').checked) localStorage.setItem('hideTutorial', 'true');
}

document.getElementById('closeWarning').onclick = closeWarningModal;
document.getElementById('closeTutorial').onclick = closeTutorialModal;

if (!localStorage.getItem('hideWarning')) {
  setTimeout(() => warningModal.classList.add('show'), 800);
} else if (!localStorage.getItem('hideTutorial')) {
  setTimeout(() => tutorialModal.classList.add('show'), 800);
}

// Core date logic
const endDateInput = document.getElementById('endDate');
const fullDateDisplay = document.getElementById('fullDateDisplay');
const daysDisplay = document.getElementById('daysDisplay');
const monthsDisplay = document.getElementById('monthsDisplay');
const yearsDisplay = document.getElementById('yearsDisplay');

function getOrdinalSuffix(day) {
  if (day % 10 === 1 && day % 100 !== 11) return 'st';
  if (day % 10 === 2 && day % 100 !== 12) return 'nd';
  if (day % 10 === 3 && day % 100 !== 13) return 'rd';
  return 'th';
}

function generateDates() {
  const endDate = new Date(endDateInput.value);
  const today = new Date();
  today.setHours(0,0,0,0);
  endDate.setHours(0,0,0,0);

  if (!endDateInput.value || isNaN(endDate)) return { error: "Please select a date." };
  if (endDate < today) return { error: "End date must be in the future." };

  const full = [], days = [], months = [], years = [];
  let current = new Date(today);

  while (current <= endDate) {
    const dayOfWeek = current.toLocaleString('default', { weekday: 'long' });
    const month = current.toLocaleString('default', { month: 'long' });
    const dayNum = current.getDate();
    const year = current.getFullYear();
    const ordinal = getOrdinalSuffix(dayNum);

    full.push(`${dayOfWeek}, ${month} ${dayNum}${ordinal}, ${year}`);
    days.push(dayNum);
    if (current.getDate() === 1) {
      months.push(`${current.getMonth() + 1}. ${month}`);
    }
    if (current.getMonth() === 0 && current.getDate() === 1) {
      years.push(year);
    }

    current.setDate(current.getDate() + 1);
  }

  return { full: full.join('\n'), days: days.join('\n'), months: months.join('\n'), years: years.join('\n') };
}

function showResult(type) {
  const data = generateDates();
  const target = { full: fullDateDisplay, days: daysDisplay, months: monthsDisplay, years: yearsDisplay }[type];

  if (data.error) {
    target.textContent = data.error;
  } else {
    target.textContent = data[type] || "No data for this view.";
  }
}

function downloadResult(type, filename) {
  const data = generateDates();
  if (data.error) return alert(data.error);

  const blob = new Blob([data[type]], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Button listeners
document.getElementById('showFullDateBtn').onclick = () => showResult('full');
document.getElementById('showDaysBtn').onclick = () => showResult('days');
document.getElementById('showMonthsBtn').onclick = () => showResult('months');
document.getElementById('showYearsBtn').onclick = () => showResult('years');

document.getElementById('downloadFullDateBtn').onclick = () => downloadResult('full', 'full_dates.txt');
document.getElementById('downloadDaysBtn').onclick = () => downloadResult('days', 'days_only.txt');
document.getElementById('downloadMonthsBtn').onclick = () => downloadResult('months', 'months_list.txt');
document.getElementById('downloadYearsBtn').onclick = () => downloadResult('years', 'years_list.txt');

// Copy helper
function copyToClipboard(elementId) {
  const el = document.getElementById(elementId);
  const text = el.textContent.trim();
  if (!text || text.includes("Please") || text.includes("must")) {
    alert("Nothing useful to copy yet.");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }).catch(() => {
    alert("Copy failed — try selecting the text manually.");
  });
}