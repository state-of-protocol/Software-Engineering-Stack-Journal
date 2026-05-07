/**
 * NEO OS - Engineering Journal Engine
 * Version: 2.0.1 (Hardened Edition)
 */

const CONFIG = {
    initialFile: 'NEO_OS.md',
    themeKey: 'neo_os_theme'
};

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan elemen utama wujud sebelum mula
    if (!document.getElementById('markdown-content')) {
        console.error("CRITICAL ERROR: Element #markdown-content not found in HTML!");
        return;
    }
    initTheme();
    initDaysList();
    loadMarkdownFile(CONFIG.initialFile);
    updateClock();
    setInterval(updateClock, 1000);
});

async function loadMarkdownFile(filename) {
    const contentDiv = document.getElementById('markdown-content');
    const titleEl = document.getElementById('journal-title'); // Ini mungkin null jika header-bar hilang
    const pathEl = document.getElementById('breadcrumb-path');

    if (!contentDiv) return;

    contentDiv.style.opacity = '0.5';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await fetch(filename + '?v=' + new Date().getTime());
        if (!response.ok) throw new Error(`Fail tidak dijumpai: ${filename}`);

        const text = await response.text();
        contentDiv.innerHTML = marked.parse(text);
        
        // Update Breadcrumb (Hanya jika element wujud)
        if (pathEl) {
            pathEl.innerText = `NEO OS / ${filename.replace('.md', '').replace(/_/g, ' ')}`;
        }

        // Update Title (Hanya jika element wujud)
        if (titleEl) {
            let cleanTitle = filename === 'NEO_OS.md' ? "NEO OS: Strategic Planning" : filename.replace('.md', '');
            titleEl.innerText = cleanTitle;
        }
        document.title = `NEO OS | ${filename}`;

    } catch (error) {
        console.error("System Error:", error);
        contentDiv.innerHTML = `
            <div style="background-color: #fff0f0; border: 1px solid #ffcccb; padding: 20px; border-radius: 8px; color: #d9534f;">
                <h3>🛑 Ralat Pemuatan Sistem</h3>
                <p>${error.message}</p>
                <small>Sila pastikan fail <b>${filename}</b> wujud di GitHub.</small>
            </div>
        `;
    } finally {
        contentDiv.style.opacity = '1';
    }
}

function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem(CONFIG.themeKey) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.themeKey, newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

function initDaysList() {
    const listContainer = document.getElementById('days-list');
    if (!listContainer) return;

    for (let i = 1; i <= 30; i++) {
        const dayFile = `daily_task_day${i}.md`;
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'day-link';
        link.innerText = `Day ${i}`;
        link.onclick = (e) => {
            e.preventDefault();
            loadMarkdownFile(dayFile);
        };
        listContainer.appendChild(link);
    }
}

function filterDays() {
    const searchInput = document.getElementById('day-search');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const links = document.querySelectorAll('.day-link');
    links.forEach(link => {
        link.style.display = link.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

function updateClock() {
    const clockEl = document.getElementById('current-date');
    if (clockEl) clockEl.innerText = new Date().toLocaleString('ms-MY');
}
