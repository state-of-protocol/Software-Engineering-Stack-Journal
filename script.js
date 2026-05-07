/**
 * NEO OS - Professional Journal Logic
 * Version: 1.0.0
 */

// 1. Konfigurasi Fail Permulaan
const INITIAL_FILE = 'NEO_OS.md';

/**
 * Fungsi Utama: Memuatkan fail Markdown dan menukarkannya ke HTML
 * @param {string} filename - Nama fail .md yang hendak dipaparkan
 */
async function loadMarkdownFile(filename) {
    const contentDiv = document.getElementById('markdown-content');
    const titleEl = document.getElementById('journal-title');

    // Berikan maklum balas visual semasa memuat
    contentDiv.style.opacity = '0.5';
    
    // Skrol ke atas setiap kali tukar fail
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        // Fetch sumber fail .md (tambah cache breaker '?v=' untuk data terkini)
        const response = await fetch(filename + '?v=' + new Date().getTime());
        
        if (!response.ok) {
            throw new Error(`Kernel Error: Gagal mencapai [${filename}]`);
        }

        const markdownText = await response.text();

        // Menggunakan Marked.js untuk menukarkan Markdown ke HTML
        // Pastikan marked.js sudah dimuatkan di index.html
        if (typeof marked !== 'undefined') {
            contentDiv.innerHTML = marked.parse(markdownText);
        } else {
            contentDiv.innerHTML = "<p style='color:red;'>Ralat: Marked.js tidak dijumpai.</p>";
        }

        // --- Logik Kemaskini Tajuk UI ---
        updateUITitle(filename, markdownText, titleEl);

    } catch (error) {
        console.error("NEO OS System Error:", error);
        displayErrorMessage(contentDiv, filename, error);
    } finally {
        contentDiv.style.opacity = '1';
    }
}

/**
 * Mengemaskini tajuk halaman dan bar tajuk secara dinamik
 */
function updateUITitle(filename, text, titleEl) {
    let cleanTitle = "";

    if (filename === 'NEO_OS.md') {
        cleanTitle = "NEO OS: Strategic Planning";
    } else if (filename.includes('daily_task')) {
        // Contoh: daily_task_day1.md -> Day 1 Log
        const dayPart = filename.split('_').pop().replace('.md', '').toUpperCase();
        cleanTitle = `NEO OS Log: ${dayPart}`;
    } else {
        // Cuba ambil header # pertama dari markdown jika ada
        const firstLine = text.trim().split('\n')[0];
        if (firstLine.startsWith('# ')) {
            cleanTitle = firstLine.replace('# ', '').trim();
        } else {
            cleanTitle = filename.replace('.md', '').toUpperCase();
        }
    }

    titleEl.innerText = cleanTitle;
    document.title = `NEO OS | ${cleanTitle}`;
}

/**
 * Paparan Ralat Sekiranya Fail Gagal Dimuat
 */
function displayErrorMessage(container, filename, error) {
    container.innerHTML = `
        <div style="background-color: #fff0f0; border: 1px solid #ffcccb; padding: 25px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d9534f; margin-top: 0;">🛑 Ralat Pemuatan Sistem</h3>
            <p>Sistem gagal memaparkan fail: <strong>${filename}</strong></p>
            <p style="font-size: 0.9rem;"><strong>Punca Berkemungkinan:</strong></p>
            <ul style="font-size: 0.9rem;">
                <li>Fail belum di-upload/commit ke GitHub.</li>
                <li>Ejaan nama fail di menu navigasi tidak sama dengan nama fail di folder.</li>
                <li>Masalah sambungan rangkaian atau cache browser.</li>
            </ul>
            <hr style="border: 0; border-top: 1px solid #ffcccb; margin: 15px 0;">
            <p style="font-size: 0.8rem; color: #666;"><em>Trace: ${error.message}</em></p>
            <button onclick="location.reload()" style="padding: 5px 15px; cursor: pointer;">Cuba Lagi</button>
        </div>
    `;
}

// 2. Jalankan pemuatan fail pertama sebaik sahaja DOM sedia
document.addEventListener('DOMContentLoaded', () => {
    loadMarkdownFile(INITIAL_FILE);
});
