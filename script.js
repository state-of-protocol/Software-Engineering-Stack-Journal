/**
 * NEO OS - Engineering Journal Engine
 * Version: 3.0.0 (Zero-Error Hardened Edition)
 * 
 * Penambahbaikan Utama:
 * - Halaman permulaan menggunakan 'isi_kandungan.md' (dashboard jurnal).
 * - Pengecaman hari belum tersedia secara automatik.
 * - Caching respons untuk navigasi sepantas kilat.
 * - Mengingat kembali fail terakhir dibuka selepas refresh.
 */

const CONFIG = {
    initialFile: 'isi_kandungan.md',      // <-- Dashboard jurnal
    themeKey: 'neo_os_theme',
    lastFileKey: 'neo_last_opened_file',
    totalPlannedDays: 30,                 // Boleh dinaikkan mengikut keperluan
};

// Simpan cache parsed HTML (prestasi)
const contentCache = new Map();

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('markdown-content')) {
        console.error("CRITICAL ERROR: Element #markdown-content not found in HTML!");
        return;
    }

    initTheme();
    initDaysList();
    updateClock();
    setInterval(updateClock, 1000);

    // Pulihkan fail terakhir yang dibuka, jika ada
    const lastFile = sessionStorage.getItem(CONFIG.lastFileKey);
    loadMarkdownFile(lastFile || CONFIG.initialFile);
});

/**
 * Muatkan dan papar fail Markdown dengan caching & error mesra.
 * @param {string} filename - Nama fail .md
 */
async function loadMarkdownFile(filename) {
    const contentDiv = document.getElementById('markdown-content');
    const pathEl = document.getElementById('breadcrumb-path');

    if (!contentDiv) return;

    // Gunakan cache jika ada
    if (contentCache.has(filename)) {
        renderContent(filename, contentCache.get(filename));
        return;
    }

    contentDiv.style.opacity = '0.5';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await fetch(`${filename}?v=${Date.now()}`);
        
        if (!response.ok) {
            // Jika fail hari ke-N tetapi status 404, ia BELUM dicipta
            const isDayFile = /^daily_task_day\d+\.md$/.test(filename);
            if (response.status === 404 && isDayFile) {
                throw new Error('🚧 Hari Pembangunan Ini Belum Tersedia');
            }
            throw new Error(`Fail tidak dijumpai: ${filename}`);
        }

        const text = await response.text();
        let html;
        try {
            html = marked.parse(text);
        } catch (parseErr) {
            console.error("Markdown Parse Error:", parseErr);
            html = `<div class="error-box">⚠️ Ralat memproses fail Markdown. Sila semak sintaks.</div>`;
        }

        // Simpan dalam cache & papar
        contentCache.set(filename, html);
        renderContent(filename, html);

        // Simpan jejak fail terakhir dibuka
        sessionStorage.setItem(CONFIG.lastFileKey, filename);

        // Highlight nav-item yang aktif
        document.querySelectorAll('.nav-item, .day-link').forEach(el => {
            el.classList.remove('active');
        });
        const activeLink = document.querySelector(`[onclick*="${filename}"]`);
        if (activeLink) activeLink.classList.add('active');

    } catch (error) {
        console.error("System Error:", error);
        const isFutureDay = error.message.includes('Belum Tersedia');
        contentDiv.innerHTML = `
            <div style="background-color: #fff3cd; border: 1px solid #ffecb5; padding: 25px; border-radius: 8px; color: #856404; text-align:center;">
                <h3>${isFutureDay ? '📅' : '🛑'} ${error.message}</h3>
                <p>${isFutureDay ? 'Fail ini akan dijana mengikut jadual pembangunan NEO OS.' : 'Sila pastikan fail wujud dalam repositori.'}</p>
                <small>${filename}</small>
            </div>
        `;
    } finally {
        contentDiv.style.opacity = '1';
    }
}

/**
 * Render kandungan ke skrin & kemas kini UI.
 */
function renderContent(filename, html) {
    const contentDiv = document.getElementById('markdown-content');
    const pathEl = document.getElementById('breadcrumb-path');
    const titleEl = document.getElementById('journal-title');

    if (contentDiv) contentDiv.innerHTML = html;
    if (pathEl) {
        pathEl.innerText = `NEO OS / ${filename.replace('.md', '').replace(/_/g, ' ')}`;
    }
    if (titleEl) {
        let cleanTitle = filename === CONFIG.initialFile 
            ? "NEO OS: Dashboard Engineering" 
            : filename.replace('.md', '');
        titleEl.innerText = cleanTitle;
    }
    document.title = `NEO OS | ${filename}`;
}

// ---------------------------
//  Theme Management
// ---------------------------
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem(CONFIG.themeKey) || 'light';
    applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(CONFIG.themeKey, newTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

// ---------------------------
//  Daily Log Sidebar
// ---------------------------
function initDaysList() {
    const listContainer = document.getElementById('days-list');
    if (!listContainer) return;

    // Kosongkan jika ada sebelumnya (elak duplikasi)
    listContainer.innerHTML = '';

    for (let i = 1; i <= CONFIG.totalPlannedDays; i++) {
        const dayFile = `daily_task_day${i}.md`;
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'day-link';
        link.setAttribute('data-file', dayFile);
        link.innerHTML = `<span>Day ${i}</span>`;
        
        // Tandakan fail yang mungkin belum wujud (tidak dapat dipastikan, tetapi kita biarkan)
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
        const text = link.innerText.toLowerCase();
        link.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// ---------------------------
//  Clock Utility
// ---------------------------
function updateClock() {
    const clockEl = document.getElementById('current-date');
    if (clockEl) {
        clockEl.innerText = new Date().toLocaleString('ms-MY', {
            dateStyle: 'full',
            timeStyle: 'medium'
        });
    }
}
