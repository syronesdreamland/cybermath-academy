import type { Lesson } from "./lesson-types";

// ============================================================
// PortSwigger — Access Control (track /acl)
// Ditulis ulang gaya Alif: problem-first, padat, hands-on.
// Sumber di-link di tiap lesson; konten tetap parafrase, bukan salinan.
// ============================================================

export const ACL_LESSONS: Lesson[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "acl-01",
    tid: "ps-acl-main",
    title: "Access Control: Bug Bounty Berkelas #1",
    minutes: 10,
    source: {
      label: "PortSwigger — Access control vulnerabilities",
      url: "https://portswigger.net/web-security/access-control",
    },
    untukApa: [
      "Broken access control adalah kategori bug paling SERING ditemukan di real world — dan favorit di bug bounty (termasuk program yang sedang kamu kejar).",
      "Setelah auth (siapa kamu), access control menjawab: KAMU BOLEH APA. Beda track dari /auth — jangan tertukar.",
    ],
    sections: [
      {
        h: "Tiga lapis yang bekerja bersama",
        table: {
          head: ["Lapis", "Menjawab pertanyaan", "Contoh gagal"],
          rows: [
            ["Authentication", "Siapa kamu?", "Attacker login sebagai orang lain (track /auth)"],
            ["Session management", "Request berikutnya dari siapa?", "Session ID dicuri/diprediksi"],
            ["Access control", "Boleh apa kamu?", "User biasa DELETE akun user lain"],
          ],
        },
        p: [
          "Access control = pemberian constraint atas siapa/apa yang BOLEH melakukan aksi atau mengakses resource. Kalau dua lapis pertama benar tapi lapis ketiga salah, user yang sah bisa melakukan hal yang tidak seharusnya — itu broken access control.",
        ],
        callout:
          "Kenapa bug ini rajin muncul? Karena access control itu keputusan BISNIS (siapa boleh apa) yang diterjemahkan ke kode secara manual, per-endpoint, dan terus berubah. Semakin kompleks app, semakin mudah satu endpoint terlewat.",
      },
      {
        h: "Tiga model pembatasan",
        list: [
          "Vertical — batasi FITUR berdasarkan tipe user: admin boleh hapus akun siapa saja, user biasa tidak boleh sama sekali. (Naik level = vertical escalation)",
          "Horizontal — batasi RESOURCE berdasarkan kepemilikan: kamu boleh lihat transaksi akunmu, bukan transaksi akun orang lain. (Ambil milik orang lain = horizontal escalation)",
          "Context-dependent — batasi URUTAN: setelah bayar, isi keranjang tidak boleh diubah lagi.",
        ],
      },
      {
        h: "Peta serangan (big picture track ini)",
        list: [
          "Vertical escalation: fungsi sensitif tanpa proteksi (URL tersembunyi ≠ aman), role dari parameter/cookie yang bisa dipalsukan, mismatch front-end vs back-end.",
          "Horizontal escalation: parameter id milik user, IDOR, referensi objek langsung ke file/database.",
          "Kombinasi: horizontal → vertical — ambil akun admin lewat celah horizontal (password reset milik admin, misalnya).",
          "Variasi lain: multi-step yang hanya diperiksa di langkah awal, kepercayaan pada header Referer, pembatasan berbasis lokasi (geoblock).",
        ],
      },
    ],
    lab: {
      title: "Lab 0 — Kalibrasi mindset IDOR",
      intro: "Sebelum masuk lab PortSwigger, luruskan dulu cara melihat aplikasi.",
      steps: [
        "Buka aplikasi apa pun yang kamu punya akunnya (bukan production orang lain). Cari URL/endpoint yang membawa parameter identitas (id=123, /user/wiener, /order/8817).",
        "Pertanyaan refleksi: kalau angka itu diganti, apa yang mencegah server membalas dengan data orang lain? Tulis jawabanmu — kebanyakan app menjawab 'apa pun', dan itulah kenapa IDOR melimpah.",
      ],
      hint: "Access control yang benar harus dieksekusi SERVER-SIDE pada setiap request — bukan mengandalkan UI yang menyembunyikan tombol/link.",
    },
    quiz: [
      {
        q: "Kamu user biasa tapi bisa membuka halaman hapus-akun milik admin. Ini eskalasi…",
        options: ["Horizontal", "Vertical", "Context-dependent", "Bukan access control"],
        answer: 1,
        why: "Vertical escalation = mendapat FUNGSI di luar tingkat hakmu (user biasa → fungsi admin). Horizontal = mendapat RESOURCE user lain pada level yang sama.",
      },
      {
        q: "Kenapa 'URL admin yang tidak diketahui orang' BUKAN access control?",
        options: [
          "Karena URL bisa di-brute-force dengan wordlist, bocor via robots.txt/JS, dan tebakannya kadang mungkin",
          "Karena URL harus pakai HTTPS",
          "Karena URL hanya untuk admin",
          "Karena itu best practice",
        ],
        answer: 0,
        why: "Security by obscurity bukan kontrol. URL tersembunyi bisa bocor dari robots.txt, JavaScript yang membangun UI, atau wordlist. Keputusan harus dibuat server-side dari identitas & role.",
      },
      {
        q: "Horizontal escalation bisa jadi vertical escalation ketika…",
        options: [
          "Targetnya user lain dengan role lebih tinggi (mis. admin) — akses horizontal membuka jalan ke fungsi admin",
          "Dilakukan dua kali",
          "Parameter id-nya angka",
          "Responsnya redirect ke login",
        ],
        answer: 0,
        why: "IDOR ke akun admin = dapat halaman/fungsi admin. Serangan horizontal 'naik kelas' jadi vertical karena korban berhak lebih.",
      },
    ],
  },

  // ---------------------------------------------------------- 02
  {
    slug: "acl-02",
    tid: "ps-acl-admin-unprotected",
    title: "Lab Anatomy: Fungsi Admin Tanpa Proteksi",
    minutes: 8,
    source: {
      label: "PortSwigger — Lab: Unprotected admin functionality",
      url: "https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality",
    },
    untukApa: [
      "Lab Apprentice pertama track ini: vertical escalation paling murni — fungsi admin yang tidak pernah memeriksa siapa pemanggilnya.",
      "Melatih refleks recon dasar: robots.txt adalah langkah WAJIB saat recon setiap target.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Ada panel admin di /administrator-panel yang TIDAK memeriksa role sama sekali. Siapa pun yang tahu (atau menebak) URL-nya langsung dapat fungsi admin — termasuk hapus user.",
          "Panel itu tidak di-link dari UI user biasa — 'tersembunyi'. Tapi penyembunyian bukan kontrol: path bocor lewat robots.txt.",
        ],
        callout:
          "robots.txt dipakai crawler, dan developer sering menaruh 'Disallow: /administrator-panel' di sana dengan niat baik. Efeknya: peta fungsi rahasia dibagikan gratis ke attacker.",
      },
      {
        h: "Alur serangan",
        list: [
          "Cek /robots.txt di root lab URL → baca baris Disallow.",
          "Path yang disebut di sana = path panel admin.",
          "Buka path itu langsung dari browser → panel admin terbuka TANPA login.",
          "Eksekusi aksi admin (hapus user carlos) → lab solved.",
        ],
        p: [
          "Pelajaran arsitektur: keputusan 'boleh akses /admin?' tidak pernah dieksekusi. Satu-satunya 'proteksi' adalah kerahasiaan path — dan kerahasiaan path bukan autentikasi.",
        ],
      },
      {
        h: "Variasi lain yang sering ditemui di bounty",
        list: [
          "URL admin dikonstruksi di JavaScript (script UI terbaca semua user, termasuk non-admin).",
          "Panel diberi nama tidak umum untuk 'menyembunyikan' — masih bisa ditemukan via wordlist brute (dirsearch/ffuf).",
          "Fungsi sensitif hanya disembunyikan dari menu, tapi endpoint-nya hidup dan merespons POST langsung.",
        ],
      },
    ],
    lab: {
      title: "Lab — Unprotected admin functionality",
      steps: [
        "Start lab → buka {lab-url}/robots.txt.",
        "Catat path yang disebut di baris Disallow.",
        "Buka {lab-url}/{path-tersebut} → pastikan panel admin terbuka tanpa autentikasi.",
        "Hapus user carlos dari panel → lab solved.",
      ],
      hint: "Tidak butuh Burp untuk lab ini — murni observasi. Fokus pada 'mengapa ini bisa': tidak ada SATU PUN pemeriksaan role di endpoint itu.",
    },
    quiz: [
      {
        q: "File yang paling sering membocorkan path fungsi tersembunyi…",
        options: ["sitemap.xml", "robots.txt", "favicon.ico", "style.css"],
        answer: 1,
        why: "Developer menaruh Disallow untuk path sensitif di robots.txt — informasi yang justru membantu attacker memetakan fungsi tersembunyi.",
      },
      {
        q: "Root cause dari 'unprotected admin functionality'…",
        options: [
          "Password admin lemah",
          "Endpoint sensitif tidak melakukan pemeriksaan hak akses sama sekali",
          "Panel tidak responsif",
          "Cookie tidak di-encrypt",
        ],
        answer: 1,
        why: "Fungsi admin ada dan berfungsi, tapi tidak ada authorization check di server. Penyembunyian path bukan substitusi otorisasi.",
      },
      {
        q: "Di bounty nyata, cara sistematis menemukan endpoint tersembunyi…",
        options: [
          "Menebak satu per satu sambil berdoa",
          "Recon: robots.txt, JS bundle (link yang dikonstruksi), wordlist dir-brute pada path umum (/admin, /panel, /dashboard)",
          "Hanya mencoba /admin",
          "Membaca semua source code yang tidak kamu punya",
        ],
        answer: 1,
        why: "Kombinasi robots.txt + analisa JS bundle + dir-brute dengan wordlist adalah standard recon untuk mengungkap fungsi yang tidak di-link dari UI.",
      },
    ],
  },

  // ---------------------------------------------------------- 03
  {
    slug: "acl-03",
    tid: "ps-acl-role-param",
    title: "Lab Anatomy: Role di Cookie yang Bisa Dipalsukan",
    minutes: 9,
    source: {
      label: "PortSwigger — Lab: User role controlled by request parameter",
      url: "https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter",
    },
    untukApa: [
      "Kesalahan desain klasik: keputusan 'apakah kamu admin?' disimpan di tempat yang dikontrol USER (cookie/parameter).",
      "Melatih teknik response interception di Burp — skill yang dipakai terus untuk manipulasi state login.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Panel admin ada di /admin. Server menentukan 'apakah peminta admin?' dari cookie Admin — nilai yang di-SET server saat login, tapi isinya false/true polos tanpa tanda tangan atau binding ke sesi.",
          "Attacker biasa login (cookie Admin=false ter-set), lalu cukup mengubah nilainya jadi true. Server percaya begitu saja.",
        ],
        callout:
          "Prinsip: keputusan hak akses boleh DIKOMUNIKASIKAN via cookie, tapi tidak boleh DIAMBIL dari data yang bisa diedit klien tanpa verifikasi integritas (signature/HMAC) dan binding ke akun.",
      },
      {
        h: "Alur serangan",
        list: [
          "Buka /admin tanpa manipulasi → ditolak (buktikan ada proteksi).",
          "Login sebagai dirimu (wiener:peter).",
          "Aktifkan response interception di Burp Proxy → intercept respons dari POST /login.",
          "Ubah Set-Cookie: Admin=false → Admin=true → forward.",
          "Buka /admin → panel terbuka. Hapus carlos → lab solved.",
        ],
        p: [
          "Detail penting: bug-nya bukan di /admin-nya saja, tapi di KESELURUHAN rantai — server menaruh keputusan di lokasi yang bisa diedit, lalu memercayainya mentah-mentah di request berikutnya.",
        ],
      },
      {
        h: "Varian 'parameter-based' lain yang perlu kamu kenal",
        table: {
          head: ["Varian", "Wujud di lapangan"],
          rows: [
            ["Query string saat login", "/login/home.jsp?admin=true — role dari URL yang bisa diedit"],
            ["Cookie role", "Admin=true / role=1 — persis lab ini"],
            ["Hidden field form", "<input type=hidden name=role value=user> — ganti value saat submit"],
            ["Claim JWT tanpa verifikasi", "Payload JWT berisi role, tapi signature tidak dicek di backend"],
          ],
        },
      },
    ],
    lab: {
      title: "Lab — User role controlled by request parameter",
      steps: [
        "Start lab → buka /admin → pastikan ditolak.",
        "Login dengan wiener:peter sambil Proxy Interception ON (response interception juga).",
        "Di respons login, temukan Set-Cookie: Admin=false → edit jadi Admin=true → forward semua request.",
        "Buka /admin → hapus user carlos → lab solved.",
      ],
      hint: "Response interception: Proxy → Intercept → klik tombol 'Response to this request' saat request login lewat. Kalau kelewat, logout dan ulangi.",
    },
    quiz: [
      {
        q: "Kenapa cookie 'Admin=true' polos tidak layak jadi dasar keputusan akses?",
        options: [
          "Karena cookie terlalu kecil",
          "Karena klien bisa mengubahnya bebas dan server tidak memverifikasi integritas/kepemilikan",
          "Karena cookie hanya untuk sesi",
          "Karena harus pakai localStorage",
        ],
        answer: 1,
        why: "Semua yang datang dari klien adalah input tidak tepercaya. Keputusan role harus berbasis state server-side (sesi) atau data bertanda tangan yang terverifikasi.",
      },
      {
        q: "Fitur Burp yang dipakai untuk mengubah nilai Set-Cookie saat login…",
        options: ["Intruder", "Response interception di Proxy", "Decoder", "Comparer"],
        answer: 1,
        why: "Request interception menahan request; untuk mengedit respons (Set-Cookie), aktifkan response interception lalu edit sebelum di-forward ke browser.",
      },
      {
        q: "Fix yang benar untuk bug ini…",
        options: [
          "Ganti nama cookie jadi yang sulit ditebak",
          "Role disimpan server-side (sesi) dan cookie hanya membawa session ID opaque",
          "Cookie di-encode base64",
          "Tambahkan captcha di /admin",
        ],
        answer: 1,
        why: "Hak akses adalah state server. Klien hanya membawa pengenal sesi opaque; setiap keputusan akses dievaluasi server-side per request.",
      },
    ],
  },

  // ---------------------------------------------------------- 04
  {
    slug: "acl-04",
    tid: "ps-acl-idor",
    title: "Lab Anatomy: IDOR — Bug Paling Sering Kamu Temukan di Bounty",
    minutes: 10,
    source: {
      label: "PortSwigger — Lab: User ID controlled by request parameter",
      url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter",
    },
    untukApa: [
      "IDOR adalah bug dengan ROI tertinggi untuk hunter pemula: mudah diuji, sering terjadi, dampaknya jelas (data user lain).",
      "Track record program BB yang kamu incar punya kategori ini sebagai penyumbang report terbanyak.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Halaman akun diakses via /myaccount?id=wiener — parameter id menentukan data SIAPA yang dikembalikan, tapi server tidak mengecek apakah id itu milik sesi yang meminta.",
          "Ganti id=carlos → data akun carlos (termasuk API key) terbalas ke kamu. Horizontal privilege escalation murni.",
        ],
        callout:
          "Definisi IDOR: aplikasi memakai input dari user untuk mengakses objek SECARA LANGSUNG (baris DB, file, endpoint), dan input itu bisa diubah untuk menunjuk objek milik orang lain. Nama lain: insecure direct object reference.",
      },
      {
        h: "Alur serangan",
        list: [
          "Login (wiener:peter) → buka halaman akunmu → amati parameter id di URL.",
          "Kirim request GET /myaccount?id=wiener ke Burp Repeater.",
          "Ganti id=carlos → kirim → respons memuat data + API key milik carlos.",
          "Submit API key sebagai jawaban lab → solved.",
        ],
        p: [
          "Skenario nyata di bounty: id bisa jadi angka berurutan (123, 124, …), email, username, atau UUID. Angka berurutan = paling mudah ditemukan. UUID = lebih sulit, tapi sering bocor lewat jalur lain (response API lain, halaman publik, email).",
        ],
      },
      {
        h: "Recon IDOR di target nyata",
        table: {
          head: ["Langkah", "Yang dicari"],
          rows: [
            ["Peta fitur berbasis objek", "Profil, invoice, dokumen, pesanan, pesan — semua yang punya 'milik'"],
            ["Kumpulkan referensi id milikmu", "Dari semua endpoint & respons API saat kamu memakai app normal"],
            ["Bandingkan: milikmu vs milik akun uji kedua", "Buat 2 akun → id A dicoba dari sesi B"],
            ["Cek respons, bukan cuma UI", "Kadang UI tidak menampilkan, tapi body respons memuat data (redirect pun bisa bocor)"],
            ["Cek metode lain", "GET bocor? coba PATCH/DELETE ke id orang lain (dengan hati-hati & dalam scope)"],
          ],
        },
        callout:
          "Etika bounty: uji pembacaan dulu (GET). Untuk mutasi (edit/hapus data orang lain), gunakan objek milik akun uji kedua yang kamu kontrol sendiri — bukan data user asli.",
      },
    ],
    lab: {
      title: "Lab — User ID controlled by request parameter",
      steps: [
        "Start lab → login wiener:peter → buka halaman akunmu, catat format parameter id.",
        "Kirim GET /my-account?id=wiener ke Repeater.",
        "Ganti nilai id menjadi carlos → kirim.",
        "Ambil API key carlos dari respons → submit di halaman lab → solved.",
      ],
      hint: "Kalau halaman akun tidak memuat id di URL, periksa request lain di HTTP history — parameter identitas sering pindah ke endpoint API terpisah.",
    },
    quiz: [
      {
        q: "Definisi paling tepat IDOR…",
        options: [
          "Server tidak mengenkripsi data",
          "Parameter dari user dipakai untuk mengakses objek langsung, tanpa cek kepemilikan → ganti nilai = akses objek orang lain",
          "Password disimpan dalam plaintext",
          "API dikirim tanpa HTTPS",
        ],
        answer: 1,
        why: "IDOR = insecure DIRECT object reference: input user menunjuk objek (baris DB/file) secara langsung dan otorisasi level-objek tidak dieksekusi.",
      },
      {
        q: "Mengapa UUID tidak otomatis mengamankan endpoint?",
        options: [
          "Karena UUID bisa diurutkan",
          "Karena UUID sering bocor dari jalur lain (respons API lain, halaman publik, email) — dan setelah terlihat, otorisasi tetap tidak ada",
          "Karena UUID terlalu panjang",
          "Karena UUID tidak dipakai di database",
        ],
        answer: 1,
        why: "GUID menyulitkan penebakan, tapi itu bukan kontrol akses. Kalau UUID korban terlihat di mana pun, endpoint tanpa otorisasi tetap terbuka.",
      },
      {
        q: "Di bounty nyata, urutan uji yang paling aman…",
        options: [
          "Langsung DELETE data user lain untuk membuktikan dampak",
          "Dua akun uji milik sendiri: id akun A diakses dari sesi B, mulai dari GET (read) sebelum mutasi",
          "Hanya baca source code",
          "Brute-force semua id dengan 1000 thread",
        ],
        answer: 1,
        why: "Buktikan bug dengan data milikmu sendiri (dua akun uji) → dampak jelas tanpa menyentuh data user asli. Mutasi ke data asli = pelanggaran program.",
      },
    ],
  },

  // ---------------------------------------------------------- 05
  {
    slug: "acl-05",
    tid: "ps-acl-url-bypass",
    title: "Lab Anatomy: Front-end Block vs Back-end Reality",
    minutes: 9,
    source: {
      label: "PortSwigger — Lab: URL-based access control can be circumvented",
      url: "https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented",
    },
    untukApa: [
      "Arsitektur nyata punya BANYAK lapisan (front-end proxy, WAF, back-end app). Bug muncul ketika dua lapisan berbeda cara 'membaca' request.",
      "Teknik header rewriting di lab ini (X-Original-URL) adalah keluarga teknik yang masih hidup di target nyata.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "/admin diblokir oleh FRONT-END system (path dibaca dari request line). Tapi back-end framework membaca URL dari header X-Original-URL — header yang dikontrol klien.",
          "Hasilnya: request dengan request line '/' + header X-Original-URL: /admin melewati blokir front-end, dan back-end menjalankan fungsi admin.",
        ],
        callout:
          "Pola umum: kontrol akses dieksekusi di lapisan yang MEMBACA REQUEST SECARA BERBEDA dari lapisan yang EKSEKUSI. Setiap perbedaan parsing = celah bypass (request smuggling adalah versi ekstremnya).",
      },
      {
        h: "Alur serangan",
        list: [
          "Akses /admin → diblokir dengan respons 'polos' — petunjuk blok berasal dari front-end, bukan app.",
          "Kirim request ke Repeater: request line diganti '/' dan tambahkan header X-Original-URL: /invalid → respons 'not found' dari back-end → konfirmasi header dipakai untuk routing.",
          "Ubah X-Original-URL: /admin → halaman admin terbuka.",
          "Untuk aksi hapus: path di header → /admin/delete, query ?username=carlos ditempel di request line asli → carlos terhapus → solved.",
        ],
        p: [
          "Poin subtill di langkah 4: front-end memperbolehkan karena request line hanya '/…?username=carlos' — query string tidak termasuk path yang diblokir.",
        ],
      },
      {
        h: "Keluarga header & mismatch lain untuk dikenali",
        table: {
          head: ["Teknik", "Kapan relevan"],
          rows: [
            ["X-Original-URL / X-Rewrite-URL", "Back-end membaca URL dari header khusus (umum di stack tertentu)"],
            ["Override header (X-Forwarded-Host, dsb.)", "Back-end mempercayai header proxy untuk membangun URL/redirect"],
            ["Path normalization mismatch", "/admin vs /admin/ vs /./admin vs //admin — satu lapis normalisasi beda"],
            ["Suffix/encoding mismatch", "/admin.json, /admin%2f, trailing dot — satu lapis mem-parsing beda"],
            ["Method mismatch", "Blok GET, lolos POST (atau sebaliknya) pada path yang sama"],
          ],
        },
      },
    ],
    lab: {
      title: "Lab — URL-based access control can be circumvented",
      steps: [
        "Start lab → buka /admin → catat respons blokir yang 'terlalu polos'.",
        "Kirim request / ke Repeater, tambah header X-Original-URL: /invalid → kirim, amati 'not found' dari back-end.",
        "Ganti header jadi X-Original-URL: /admin → kirim → halaman admin muncul.",
        "Hapus carlos: header menjadi /admin/delete dan request line membawa ?username=carlos → lab solved.",
      ],
      hint: "Query string tetap di REQUEST LINE (setelah '/'), bukan di header — back-end menggabungkan keduanya saat routing ke fungsi hapus.",
    },
    quiz: [
      {
        q: "Root cause bug ini…",
        options: [
          "Admin lupa logout",
          "Front-end dan back-end membaca target URL dari tempat berbeda — kontrol di satu lapis bisa dilewati lewat lapis lain",
          "Password admin bocor",
          "Cookie tidak HttpOnly",
        ],
        answer: 1,
        why: "Blokir dieksekusi front-end dari request line; eksekusi back-end memakai X-Original-URL. Mismatch parsing antar lapisan = bypass.",
      },
      {
        q: "Petunjuk bahwa blokir berasal dari front-end (bukan app)…",
        options: [
          "Respons berisi HTML lengkap halaman login",
          "Respons terlalu polos/generik, tidak khas aplikasi",
          "Status codenya 200",
          "Respons memakai JSON",
        ],
        answer: 1,
        why: "Halaman blokir generik yang tidak mirip gaya aplikasi mengindikasikan lapisan jaringan/proxy — dan jarak antara blok dan app adalah tempat bypass hidup.",
      },
      {
        q: "Prinsip pencegahan yang tepat menurut checklist PortSwigger…",
        options: [
          "Deny by default + satu mekanisme kontrol aplikasi-wide di level kode, dengan audit & test menyeluruh",
          "Blokir hanya di WAF",
          "Sembunyikan URL admin lebih dalam",
          "Ganti nama path tiap minggu",
        ],
        answer: 0,
        why: "Defense-in-depth: deny by default, satu mekanisme enforcement application-wide (dideklarasikan per resource di kode), lalu audit/test. Jangan andalkan satu lapis jaringan atau obscurity.",
      },
    ],
  },

  // ---------------------------------------------------------- 06
  {
    slug: "acl-06",
    tid: "ps-acl-methodology",
    title: "Cheat Sheet & Metodologi ACL untuk Bug Bounty",
    minutes: 12,
    source: {
      label: "PortSwigger — Access control vulnerabilities (rangkuman topik)",
      url: "https://portswigger.net/web-security/access-control",
    },
    untukApa: [
      "Menyatukan 4 pola lab jadi satu prosedur audit yang bisa dieksekusi di target mana pun (dalam scope!).",
      "Access control adalah kategori bug dengan signal-to-noise terbaik untuk pemula: tidak butuh payload eksotis, cuma disiplin pengujian.",
    ],
    sections: [
      {
        h: "Peta audit access control",
        table: {
          head: ["Permukaan", "Uji apa", "Sinyal bug"],
          rows: [
            ["Fungsi admin/tersembunyi", "robots.txt, JS bundle, dir-brute path umum", "Endpoint hidup tanpa cek role"],
            ["Role di klien", "Cookie/param/hidden field yang menentukan role", "Ganti nilai → fitur terbuka"],
            ["Objek milik user (IDOR)", "Parameter id/ref/email pada GET dulu", "Data akun uji lain terbalas"],
            ["Multi-step proses", "Lompat ke step terakhir langsung", "Step akhir dieksekusi tanpa validasi step awal"],
            ["Referer-based check", "Request langsung tanpa/ dengan Referer palsu", "Aksi lolos hanya dengan header"],
            ["Geoblock", "Dari IP/region lain (proxy)", "Konten/fungsi terbuka"],
          ],
        },
      },
      {
        h: "Prosedur eksekusi per target (dalam scope program!)",
        list: [
          "Buat 2 akun (A, B). Kumpulkan SEMUA endpoint yang menyentuh 'milik' user saat memakai app normal sebagai A.",
          "Replay endpoint itu dari sesi B → ganti identitas objek (id/uuid/email). Mulai dari read-only. Beda respons = kandidat bug.",
          "Petakan fitur ber-role: cari endpoint admin (robots.txt, JS, wordlist) → akses sebagai user biasa.",
          "Periksa state di klien: cookie/param/hidden field yang menentukan hak → edit → lihat apakah server percaya.",
          "Multi-step: tangkap seluruh request per step → replay step terakhir langsung (skip step tengah).",
          "Catat setiap anomali: request, respons, kenapa itu bug, dampak bisnisnya — itu inti report-mu.",
        ],
        callout:
          "Signal khas ACL bug: respons SUKSES untuk sesuatu yang seharusnya DITOLAK. Tidak ada crash, tidak ada error — justru karena terlalu lancar, bug ini lolos dari pengujian normal developer.",
      },
      {
        h: "Checklist pertahanan (untuk laporan fix recommendation)",
        list: [
          "Deny by default: resource publik saja yang terbuka; sisanya butuh deklarasi hak eksplisit.",
          "Satu mekanisme enforcement application-wide (middleware/policy tunggal), bukan cek manual per endpoint.",
          "Deklarasikan akses di level kode per resource; bukan obscurity, bukan front-end saja.",
          "Otorisasi level-objek: setiap query yang menyentuh data user menyertakan pemiliknya di kondisi WHERE (server-side).",
          "Audit & test: matriks role × endpoint dijalankan otomatis (CI) agar perubahan tidak diam-diam membuka celah.",
        ],
        p: [
          "Sudah siap lanjut? Track berikutnya (XSS) menyerang sisi yang berbeda: bukan 'bokeh akses apa', tapi 'kode apa yang berjalan di browser korban'.",
        ],
      },
    ],
    lab: {
      title: "Simulasi mini — susun rencana audit ACL",
      intro: "Drill keputusan, kerjakan dengan tulisanmu sendiri dulu sebelum melihat hint.",
      steps: [
        "Skenario: target bounty (dalam scope) punya dashboard user, fitur upload dokumen, dan halaman admin. Tulis urutan auditmu 6 langkah dengan akun uji yang kamu punya.",
        "Tentukan sinyal positif untuk tiap langkah (respons sukses? data terbalas? fitur terbuka?).",
        "Tentukan batas: mana yang read-only, mana yang butuh akun uji kedua, dan apa yang kamu jangan lakukan (mass enumeration, data user asli).",
      ],
      hint: "Urutan sehat: map endpoint milik user → replay lintas akun (read) → cari endpoint ber-role → uji state klien → uji multi-step → dokumentasi. Semua mutasi hanya pada objek milik akun ujimu.",
    },
    quiz: [
      {
        q: "Sinyal paling khas broken access control…",
        options: [
          "Error 500 di respons",
          "Respons sukses untuk aksi yang seharusnya ditolak bagi role-mu",
          "Halaman 404",
          "Redirect ke login",
        ],
        answer: 1,
        why: "ACL bug halus: request 'biasa' dijawab sukses padahal seharusnya ditolak. Tidak ada error yang membangkitkan perhatian — itulah kenapa butuh pengujian sistematis.",
      },
      {
        q: "Prinsip pencegahan ACL versi checklist PortSwigger yang PALING sering dilanggar di lapangan…",
        options: [
          "Never rely on obfuscation alone",
          "Deny by default",
          "Satu mekanisme enforcement aplikasi-wide",
          "Semua di atas — tapi yang paling sering dilanggar: mengandalkan obscurity & cek manual per endpoint",
        ],
        answer: 3,
        why: "Polanya: fungsi 'tersembunyi' tanpa cek (obscurity) dan autorisasi di-copy-paste manual per endpoint sehingga satu endpoint terlewat. Keduanya akar dari 4 lab di track ini.",
      },
      {
        q: "Saat menemukan IDOR di bounty, report terbaik memuat…",
        options: [
          "Data pribadi korban yang kamu ambil sebanyak-banyaknya sebagai bukti",
          "Reproduksi dengan akun ujimu sendiri: request/respons, parameter yang menentukan objek, dampak bisnis, dan fix recommendation",
          "Hanya judul bug",
          "Script brute-force untuk semua id",
        ],
        answer: 1,
        why: "Report berkualitas = reproduksi bersih (pakai akun uji), bukti request/respons, dampak dijelaskan bisnis, plus rekomendasi fix (otorisasi level-objek). Data user asli tidak disentuh.",
      },
    ],
  },
];
