/**
 * NEO OS - Engineering Journal Engine
 * Version: 4.0.0 (Ekosistem 10 Tunggak)
 * 
 * Penambahbaikan Utama:
 * - Halaman utama (welcome screen) dipaparkan secara lalai.
 * - Navigasi 10 Tunggak + Log Harian + Laporan Debug.
 * - Mod gelap/cerah disimpan secara kekal.
 * - Penunjuk kemajuan membaca & butang kembali ke atas.
 * - Sidebar responsif untuk peranti mudah alih.
 * - Caching respons untuk prestasi pantas.
 * - Pulihkan fail terakhir dibuka selepas refresh.
 */

// =================== KONFIGURASI ===================
const CONFIG = {
    initialFile: null,                    // null = papar welcome screen
    themeKey: 'neo_os_theme',
    lastFileKey: 'neo_last_opened_file',
    totalPlannedDays: 30,                 // Bilangan hari pembangunan yang dirancang
    totalDebugWeeks: 30,                  // Bilangan minggu laporan debug
};

// Cache untuk kandungan Markdown yang telah diproses
const contentCache = new Map();

// =================== FUNGSI UTAMA ===================

/**
 * Muatkan fail Markdown dan paparkannya.
 * @param {string} filePath - Laluan fail .md
 * @param {HTMLElement} [element] - Elemen navigasi yang diklik (pilihan)
 */
async function loadMarkdownFile(filePath, element) {
    const contentDiv = document.getElementById('markdown-content');
    const pathEl = document.getElementById('breadcrumb-path');
    const titleEl = document.getElementById('journal-title');

    if (!contentDiv) return;

    // Serlahkan item navigasi yang aktif
    setActiveNav(element);

    // Sembunyikan welcome screen jika ada
    const welcomeScreen = document.querySelector('.welcome-screen');
    if (welcomeScreen) welcomeScreen.style.display = 'none';

    // Gunakan cache jika tersedia
    if (contentCache.has(filePath)) {
        renderContent(filePath, contentCache.get(filePath));
        return;
    }

    // Tunjuk kesan loading
    contentDiv.style.opacity = '0.5';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await fetch(`${filePath}?v=${Date.now()}`);

        if (!response.ok) {
            const isDayFile = /^daily_task_day\d+\.md$/.test(filePath);
            if (response.status === 404 && isDayFile) {
                throw new Error('🚧 Hari Pembangunan Ini Belum Tersedia');
            }
            throw new Error(`Fail tidak dijumpai: ${filePath}`);
        }

        const text = await response.text();
        let html;
        try {
            html = marked.parse(text);
        } catch (parseErr) {
            console.error("Ralat memproses Markdown:", parseErr);
            html = `<div class="error-box">⚠️ Ralat memproses fail Markdown. Sila semak sintaks.</div>`;
        }

        // Simpan dalam cache
        contentCache.set(filePath, html);
        renderContent(filePath, html);

        // Simpan jejak fail terakhir dibuka
        sessionStorage.setItem(CONFIG.lastFileKey, filePath);

    } catch (error) {
        console.error("Ralat Sistem:", error);
        const isFutureDay = error.message.includes('Belum Tersedia');
        contentDiv.innerHTML = `
            <div style="background-color: #fff3cd; border: 1px solid #ffecb5; padding: 25px; border-radius: 8px; color: #856404; text-align:center;">
                <h3>${isFutureDay ? '📅' : '🛑'} ${error.message}</h3>
                <p>${isFutureDay ? 'Fail ini akan dijana mengikut jadual pembangunan NEO OS.' : 'Sila pastikan fail wujud dalam repositori.'}</p>
                <small>${filePath}</small>
            </div>
        `;
    } finally {
        contentDiv.style.opacity = '1';
    }
}

/**
 * Render HTML ke dalam kandungan utama.
 */
function renderContent(filePath, html) {
    const contentDiv = document.getElementById('markdown-content');
    const pathEl = document.getElementById('breadcrumb-path');
    const titleEl = document.getElementById('journal-title');

    if (contentDiv) contentDiv.innerHTML = html;
    if (pathEl) {
        let cleanPath = filePath.replace('.md', '').replace(/_/g, ' ');
        pathEl.textContent = `NEO OS / ${cleanPath}`;
    }
    if (titleEl) {
        let cleanTitle = filePath.replace('.md', '');
        titleEl.textContent = cleanTitle;
    }
    document.title = `NEO OS | ${filePath}`;

    // Skrol ke atas kandungan
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =================== NAVIGASI & UI ===================

/**
 * Menetapkan item navigasi yang aktif dan menutup sidebar pada mudah alih.
 */
function setActiveNav(element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    // Tutup sidebar pada peranti mudah alih selepas navigasi
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

/**
 * Menogol sidebar (untuk mudah alih).
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

// =================== TEMA ===================

/**
 * Memuatkan tema yang disimpan, atau guna 'dark' sebagai lalai.
 */
function loadTheme() {
    const savedTheme = localStorage.getItem(CONFIG.themeKey) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

/**
 * Menukar tema antara gelap dan cerah.
 */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem(CONFIG.themeKey, newTheme);
    updateThemeIcon(newTheme);
}

/**
 * Mengemaskini ikon tema berdasarkan tema semasa.
 */
function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (window.lucide) lucide.createIcons();
    }
}

// =================== SIDEBAR: LOG HARIAN ===================

/**
 * Menjana senarai pautan log harian (day 1 - day N).
 */
function initDaysList() {
    const listContainer = document.getElementById('days-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    for (let i = 1; i <= CONFIG.totalPlannedDays; i++) {
        const dayFile = `daily_task_day${i}.md`;
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-item sub day-item';   // Tambah class 'day-item' untuk carian
        link.setAttribute('data-file', dayFile);
        link.innerHTML = `<i data-lucide="calendar"></i> Hari ${i}`;

        link.onclick = (e) => {
            e.preventDefault();
            loadMarkdownFile(dayFile, link);
        };

        listContainer.appendChild(link);
    }
    // Muat semula ikon Lucide untuk elemen yang baru dicipta
    if (window.lucide) lucide.createIcons();
}

/**
 * Menapis senarai hari berdasarkan input carian.
 */
function filterDays() {
    const searchTerm = document.getElementById('day-search')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('#days-list .day-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// =================== SIDEBAR: LAPORAN DEBUG ===================

/**
 * Menjana senarai pautan laporan debug mingguan.
 */
function generateDebugList() {
    const debugList = document.getElementById('debug-list');
    if (!debugList) return;

    debugList.innerHTML = '';
    for (let i = 1; i <= CONFIG.totalDebugWeeks; i++) {
        const weekFile = `debug_week${i}.md`;
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-item sub debug-item';
        link.setAttribute('data-file', weekFile);
        link.innerHTML = `<i data-lucide="bug"></i> Minggu ${i}`;

        link.onclick = (e) => {
            e.preventDefault();
            loadMarkdownFile(weekFile, link);
        };

        debugList.appendChild(link);
    }
    if (window.lucide) lucide.createIcons();
}

// =================== CIRI ANTARAMUKA TAMBAHAN ===================

/**
 * Penunjuk kemajuan membaca (progress bar di bawah top bar).
 */
function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Butang "Kembali ke Atas" yang muncul selepas skrol jauh.
 */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =================== INISIALISASI ===================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Muatkan tema
    loadTheme();

    // 2. Pasang event listener untuk butang tema
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // 3. Sidebar overlay & butang mudah alih
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);

    // 4. Jana senarai navigasi
    initDaysList();
    generateDebugList();

    // 5. Ciri antara muka
    initReadingProgress();
    initBackToTop();

    // 6. Tarikh semasa (format ringkas)
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        dateElement.textContent = now.toLocaleDateString('ms-MY', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    // 7. Pulihkan fail terakhir yang dibuka (jika ada)
    const lastFile = sessionStorage.getItem(CONFIG.lastFileKey);
    if (lastFile && lastFile !== 'isi_kandungan.md') {
        // Cari elemen navigasi yang sepadan untuk menyerlahkan
        const activeEl = document.querySelector(`[data-file="${lastFile}"]`);
        loadMarkdownFile(lastFile, activeEl);
    } else {
        // Papar halaman utama (welcome screen) jika tiada fail terakhir
        // atau fail terakhir adalah dashboard (isi_kandungan.md)
        const welcomeScreen = document.querySelector('.welcome-screen');
        if (welcomeScreen) welcomeScreen.style.display = 'flex';
    }

    // 8. Log pelancaran di konsol
    console.log('%c🚀 NEO OS Journal v4.0.0 %cDimulakan',
        'background:#0a0a1a;color:#00e5ff;padding:8px 12px;border-radius:4px 0 0 4px;font-weight:bold;',
        'background:#1a1a2e;color:#fff;padding:8px 12px;border-radius:0 4px 4px 0;');
});
