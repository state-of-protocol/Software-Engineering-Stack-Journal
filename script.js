/**
 * NEO OS - Engineering Journal Engine
 * Version: 2.0.0 (Overhaul Edition)
 */

const CONFIG = {
    initialFile: 'NEO_OS.md',
    totalPlannedDays: 912, // 2 tahun 6 bulan
    themeKey: 'neo_os_theme'
};

// State Management
let currentFile = '';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDaysList();
    loadMarkdownFile(CONFIG.initialFile);
    updateClock();
    setInterval(updateClock, 1000);
});

/**
 * 1. Theme Management
 */
function initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.themeKey) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.themeKey, newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
    lucide.createIcons();
}

/**
 * 2. Dynamic Daily Logs List
 */
function initDaysList() {
    const listContainer = document.getElementById('days-list');
    // Kita jana pautan untuk 30 hari pertama dahulu untuk prestasi, 
    // atau anda boleh set jumlah tertentu.
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
    const query = document.getElementById('day-search').value.toLowerCase();
    const links = document.querySelectorAll('.day-link');
    
    links.forEach(link => {
        const text = link.innerText.toLowerCase();
        link.style.display = text.includes(query) ? 'block' : 'none';
    });
}

/**
 * 3. Markdown Loading Engine
 */
async function loadMarkdownFile(filename) {
    const contentDiv = document.getElementById('markdown-content');
    const pathEl = document.getElementById('breadcrumb-path');
    
    // Update Active State in Nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(filename)) item.classList.add('active');
    });

    contentDiv.innerHTML = '<div class="loader">Accessing Kernel Data...</div>';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await fetch(filename + '?v=' + new Date().getTime());
        if (!response.ok) throw new Error(`File Not Found: ${filename}`);

        const text = await response.text();
        contentDiv.innerHTML = marked.parse(text);
        
        // Update Breadcrumb
        pathEl.innerText = `NEO OS / ${filename.replace('.md', '').replace(/_/g, ' ')}`;
        document.title = `NEO OS | ${filename}`;

    } catch (error) {
        contentDiv.innerHTML = `
            <div style="color: #d9534f; padding: 20px; border: 1px solid #ffcccb; border-radius: 8px; background: #fff0f0;">
                <h3>🛑 System Error</h3>
                <p>${error.message}</p>
                <small>Pastikan fail ${filename} wujud di repositori.</small>
            </div>
        `;
    }
}

/**
 * 4. Utility functions
 */
function updateClock() {
    const now = new Date();
    document.getElementById('current-date').innerText = now.toLocaleString('ms-MY');
}
