import type { Lesson } from "./lesson-types";

// ============================================================
// PortSwigger — Authentication (track /auth)
// Ditulis ulang gaya Alif: problem-first, padat, hands-on.
// Sumber di-link di tiap lesson; konten tetap parafrase, bukan salinan.
// ============================================================

export const AUTH_LESSONS: Lesson[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "auth-01",
    tid: "ps-auth-main",
    title: "Authentication: Pintu Depan yang Sering Lupa Dikunci",
    minutes: 10,
    source: {
      label: "PortSwigger — Authentication vulnerabilities",
      url: "https://portswigger.net/web-security/authentication",
    },
    untukApa: [
      "Authentication = pintu masuk semua akun. Satu bypass di sini = akses penuh data + fungsi akun korban, dan jadi pijakan serangan lanjutan.",
      "Bug auth hampir selalu rated tinggi di bug bounty karena dampaknya jelas: orang lain masuk akun tanpa izin.",
    ],
    sections: [
      {
        h: "Bedakan dulu: authentication vs authorization",
        p: [
          "Authentication = memverifikasi KAMU SIAPA (apakah yang login sebagai carlos123 benar-benar pemilik akun itu). Authorization = memverifikasi KAMU BOLEH APA (setelah login, boleh apa saja yang ia lakukan).",
          "Cara mengingat: auth-N = identity (siapa), auth-Z = permission (boleh). Bug di auth-N = track ini; bug di auth-Z = track Access Control berikutnya.",
        ],
        callout:
          "Confusion auth-N vs auth-Z adalah sumber kebingungan #1 pemula. Track ini (auth) = memalsukan identitas; track berikutnya (ACL) = memakai identitas yang benar untuk akses yang salah.",
      },
      {
        h: "Tiga faktor autentikasi",
        table: {
          head: ["Faktor", "Contoh", "Nama teknis"],
          rows: [
            ["Something you know", "Password, jawaban security question", "Knowledge factor"],
            ["Something you have", "HP (OTP), security token", "Possession factor"],
            ["Something you are/do", "Biometrik, pola perilaku", "Inherence factor"],
          ],
        },
        p: [
          "Password-only = 1 faktor. MFA menggabungkan faktor berbeda — yang benar (mis. password + OTP), bukan 2x faktor yang sama (password + security question = tetap knowledge dobel).",
        ],
      },
      {
        h: "Dua cara kerentanan auth muncul",
        list: [
          "Mekanisme terlalu lemah — gagal melindungi diri dari brute-force (tidak ada rate limit, lock logic bolong).",
          "Logic flaw / kode buruk — mekanisme bisa di-BYPASS total (kasus klasik: 'broken authentication').",
        ],
        p: [
          "Poin penting: di area lain, logic flaw kadang cuma bikin app berperilaku aneh. Di auth, logic flaw hampir selalu jadi isu keamanan — karena auth adalah fungsi paling kritis di web app.",
        ],
      },
      {
        h: "Dampak: kenapa kategorinya 'critical'",
        p: [
          "Akun yang ditembus = attacker dapat SEMUA data dan fungsi akun itu. Akun high-privilege (admin) = bisa kompromikan seluruh organisasi.",
          "Bahkan akun low-privilege pun berbahaya: bisa membocorkan info sensitif bisnis, atau membuka attack surface lain (halaman internal, fungsi tersembunyi).",
        ],
      },
    ],
    lab: {
      title: "Lab 0 — Kalibrasi Burp Suite",
      intro:
        "Semua lab di track ini butuh Burp Suite. Kalibrasi dulu sebelum masuk materi serangan.",
      steps: [
        "Install Burp Suite Community + sertifikat CA-nya di browser (foxyproxy / konfigurasi manual).",
        "Buka https://portswigger.net/web-security/authentication, klik 'View all authentication labs', start 1 lab apa saja, pastikan traffic lab terlihat di Proxy > HTTP history.",
        "Catat 1 request login di HTTP history — perhatikan struktur POST-nya (parameter username, password, csrf token).",
      ],
      hint: "Kalau request tidak muncul di history, 90% masalahnya sertifikat CA belum ter-install atau proxy browser belum menunjuk ke 127.0.0.1:8080.",
    },
    quiz: [
      {
        q: "Perbedaan inti authentication vs authorization?",
        options: [
          "Authentication = verifikasi identitas (siapa kamu); authorization = verifikasi hak akses (boleh apa kamu)",
          "Authentication untuk web, authorization untuk API",
          "Sama saja, hanya beda istilah",
          "Authentication = login, authorization = logout",
        ],
        answer: 0,
        why: "Auth-N menjawab 'siapa kamu', auth-Z menjawab 'apa yang boleh kamu lakukan'. Bug auth-N = identitas dipalsukan; bug auth-Z = identitas benar tapi akses melampaui hak.",
      },
      {
        q: "Mana kombinasi yang BUKAN MFA yang benar?",
        options: [
          "Password + kode OTP dari HP",
          "Password + fingerprint",
          "Password + security question ('nama hewan pertama Anda')",
          "Password + push approval di HP",
        ],
        answer: 2,
        why: "MFA sejati menggabungkan faktor BERBEDA. Password dan security question sama-sama knowledge factor — jadi tetap effectively 1 faktor.",
      },
      {
        q: "Dua sumber utama kerentanan authentication adalah…",
        options: [
          "SSL lemah dan cookie tanpa HttpOnly",
          "Proteksi brute-force yang gagal, dan logic flaw yang memungkinkan bypass",
          "Server lambat dan database tidak terenkripsi",
          "Input tidak divalidasi dan output tidak di-escape",
        ],
        answer: 1,
        why: "PortSwigger merangkum dua jalurnya: (1) mekanisme lemah terhadap brute-force, (2) logic flaw yang mem-bypass mekanisme sepenuhnya ('broken authentication').",
      },
    ],
  },

  // ---------------------------------------------------------- 02
  {
    slug: "auth-02",
    tid: "ps-auth-bruteforce",
    title: "Brute-Force: Bukan Tebak Acak, Tapi Tebak Cerdas",
    minutes: 12,
    source: {
      label: "PortSwigger — Vulnerabilities in password-based login",
      url: "https://portswigger.net/web-security/authentication/password-based",
    },
    untukApa: [
      "Brute-force auth adalah serangan paling mendasar di track ini — dan menjadi fondasi untuk memahami kenapa proteksi anti-brute-force yang bolong itu mudah ditembus.",
      "Mental model 'educated guessing' ini kamu pakai terus di bug bounty: wordlist bukan tentang banyak, tapi tentang TEPAT.",
    ],
    sections: [
      {
        h: "Masalahnya",
        p: [
          "Password-based login: keamanan seluruh akun bergantung pada SATU rahasia. Kalau attacker bisa memperoleh atau MENEBAK kredensial user lain, keamanan app runtuh.",
          "Brute-force = trial & error terhadap kredensial, diotomasi dengan wordlist username/password. Tapi kunci efektivitasnya bukan jumlah percobaan — melainkan kualitas tebakan.",
        ],
        callout:
          "Brute-force cerdas ≠ mengulang semua kombinasi huruf. Ini 'educated guessing': pakai logika + pengetahuan publik untuk menebak yang paling MUNGKIN.",
      },
      {
        h: "Brute-forcing usernames: pola yang bisa ditebak",
        list: [
          "Format email korporat: firstname.lastname@company.com — sangat umum dan bisa diprediksi.",
          "Username publik: profile publik yang terlihat tanpa login sering PERSIS sama dengan username login-nya.",
          "Info profil tersembunyi pun bocor: nama yang muncul di halaman (author, pengirim komentar) sering = username asli.",
        ],
      },
      {
        h: "Brute-forcing passwords: eksploitasi perilaku manusia",
        p: [
          "Password policy memaksa password kuat (panjang minimal, campuran huruf besar-kecil, karakter khusus). Secara teori ini mencegah brute-force murni.",
          "TAPI manusia memilih sesuatu yang mudah diingat: 'Mypassword1!' — dan saat dipaksa ganti password berkala, mereka cuma ubah minimal: 'Mypassword2!', 'Mypassword1?'.",
          "Pengetahuan perilaku inilah yang bikin brute-force modern jauh lebih efektif daripada iterasi acak: wordlist berisi pola umum manusia, bukan semua kombinasi.",
        ],
      },
      {
        h: "Checklist saat brute-force login page",
        p: [
          "Saat mengotomasi percobaan login, jangan cuma lihat sukses/gagal — perhatikan Pembeda antar respons:",
        ],
        table: {
          head: ["Sinyal", "Kenapa penting"],
          rows: [
            ["Status code", "Mayoritas guess salah → status sama semua. Satu status beda = indikator kuat username-nya BENAR"],
            ["Pesan error", "Best practice: pesan generik identik. Realitanya sering ada perbedaan kecil (panjang string, typo) antara 'username salah' vs 'password salah'"],
            ["Response time", "Mayoritas waktu respons mirip → yang menyimpang menunjukkan proses berbeda di belakang (mis. hash password hanya dijalankan untuk username valid)"],
          ],
        },
        callout:
          "Tiga sinyal ini (status, pesan, waktu) adalah alat deteksi TERUS-MENERUS di semua lab enumerasi track ini. Kalau tiga-tiganya identik untuk semua input, enumerasi tidak mungkin lewat halaman ini.",
      },
    ],
    lab: {
      title: "Lab 0 — Amati 3 sinyal di halaman login mana pun",
      steps: [
        "Buka halaman login lab PortSwigger mana pun (atau demo app lain). Kirim 3 login attempt: username benar+password salah, username salah+password salah, username salah format aneh (dengan ' ).",
        "Bandingkan di Burp: status code, isi body respons, dan panjang waktu respons (bisa lihat di HTTP history kolom Time).",
        "Pertanyaan refleksi: kalau kamu attacker, sinyal mana yang paling berguna untuk membedakan username valid? Kenapa developer sering tidak menyadarinya?",
      ],
      hint: "Username valid + password salah biasanya memicu proses hashing → waktu respons bisa sedikit lebih lama. Itulah timing signal.",
    },
    quiz: [
      {
        q: "Kenapa brute-force modern jauh lebih efektif daripada menebak acak?",
        options: [
          "Karena internet sekarang lebih cepat",
          "Karena wordlist-nya meng eksploitasi pola perilaku manusia yang dapat diprediksi",
          "Karena password policy membuat password lebih lemah",
          "Karena tool otomasi tidak terdeteksi",
        ],
        answer: 1,
        why: "Manusia memilih password yang mudah diingat dan mengubahnya secara minimal/prediktabel. Wordlist yang menangkap pola ini ('educated guessing') jauh lebih efisien daripada iterasi acak.",
      },
      {
        q: "Manakah BUKAN sinyal enumerasi username yang disebut PortSwigger?",
        options: [
          "Perbedaan status code",
          "Perbedaan isi pesan error",
          "Perbedaan response time",
          "Perbedaan jumlah cookie yang di-set",
        ],
        answer: 3,
        why: "Tiga sinyal standar: status code, error message, response time. Cookie count bukan sinyal enumerasi yang biasa dipakai.",
      },
      {
        q: "Kamu mengaudit halaman login. Mana langkah paling bernilai pertama?",
        options: [
          "Langsung nuklir 10.000 password ke satu akun",
          "Cek dulu apakah username bisa dikumpulkan dari sumber publik (profile, nama pengirim konten)",
          "Scan port server",
          "Coba SQL injection",
        ],
        answer: 1,
        why: "Brute-force cerdas dimulai dari daftar kandidat username yang bagus — sering tersedia gratis dari profile publik atau nama yang muncul di konten. Tanpa itu, seluruh percobaan password sia-sia.",
      },
    ],
  },

  // ---------------------------------------------------------- 03
  {
    slug: "auth-03",
    tid: "ps-auth-enum-responses",
    title: "Enumerasi Username via Respons Berbeda (Anatomy Lab 1)",
    minutes: 10,
    source: {
      label: "PortSwigger — Lab: Username enumeration via different responses",
      url: "https://portswigger.net/web-security/authentication/auth-lab-usernames",
    },
    untukApa: [
      "Ini lab Apprentice pertama di track: mengeksekusi konsep '3 sinyal pembeda' dari lesson 02 secara nyata dengan Burp Intruder.",
      "Enumerasi username adalah langkah WAJIB sebelum brute-force password di lab mana pun — dan di real target, selalu menjadi recon pertamamu.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Halaman login menampilkan pesan BERBEDA tergantung input: 'Incorrect username' vs 'Incorrect password'. Kedua pesan itu mengkonfirmasi: username ini ADA (valid).",
          "Dengan kata lain, server membeberkan informasi yang seharusnya dirahasiakan — keberadaan akun — cuma lewat beda string di body respons.",
        ],
        callout:
          "Prinsip best practice: respons untuk username-salah dan password-salah harus IDENTIK 100% (teks, panjang, status). Satu karakter beda saja = perbedaan yang bisa diotomasi.",
      },
      {
        h: "Senjata yang dipakai",
        table: {
          head: ["Tool / bahan", "Peran"],
          rows: [
            ["Burp Intruder (Sniper/Cluster bomb)", "Mengotomasi submit form login berkali-kali"],
            ["Wordlist username kandidat", "PortSwigger sediakan daftar kandidat di halaman auth-lab-usernames"],
            ["Payload position: username", "Password diisi dummy — fokus enumerasi dulu"],
            ["Grep - Extract / match", "Menandai respons yang beda (pesan error yang unik)"],
          ],
        },
      },
      {
        h: "Alur menyerang (big picture)",
        list: [
          "Intercept 1 POST /login → kirim ke Intruder, tandai parameter username sebagai payload position.",
          "Load wordlist kandidat username, set attack type yang tepat, jalankan.",
          "Sortir hasil: baris dengan panjang respons beda / string berbeda = username valid ditemukan.",
          "Baru kemudian serang password-nya untuk username itu (lesson berikutnya).",
        ],
        p: [
          "Kenapa urutan ini penting? Brute-force password butuh username yang VALID sebagai target. Enumerasi dulu = mempersempit jutaan kemungkinan jadi satu-dua target.",
        ],
      },
    ],
    lab: {
      title: "Lab — Username enumeration via different responses",
      intro:
        "Target resmi di PortSwigger. Gunakan wordlist kandidat yang mereka sediakan (bukan dictionary pribadimu).",
      steps: [
        "Start lab → buka halaman login, submit manual 1x dengan username ngawur dan password ngawur. Amati responsnya di Burp.",
        "Coba submit dengan username 'wiener' (akun yang diketahui ada) — bandingkan pesan error-nya dengan percobaan pertama.",
        "Kirim POST /login ke Intruder → tandai §username§ → load wordlist kandidat username dari halaman lab.",
        "Jalankan attack, sortir kolom length / gunakan Grep-Extract pada string error → temukan baris yang beda.",
        "Konfirmasi manual: login dengan username hasil enumerasi + password salah → pesannya harus membedakan dari username salah.",
      ],
      hint: "Fokus dulu murni ke USERNAME. Jangan tergoda brute password sekaligus — pisahkan kedua fase agar data seranganmu bersih dan mudah dibaca.",
    },
    quiz: [
      {
        q: "Inti kerentanan 'username enumeration via different responses' adalah…",
        options: [
          "Server menampilkan pesan berbeda untuk username valid vs tidak valid",
          "Server tidak memakai HTTPS",
          "Cookie login bisa diprediksi",
          "Password di-hash dengan MD5",
        ],
        answer: 0,
        why: "Server mengungkap keberadaan akun lewat perbedaan respons. Best practice: respons identik untuk kedua kasus.",
      },
      {
        q: "Fitur Burp Intruder yang paling membantu membedakan respons saat enumerasi?",
        options: [
          "Payload encoding",
          "Grep - Extract / penanda string di kolom hasil",
          "Resource pool",
          "Request engine threads",
        ],
        answer: 1,
        why: "Grep-Extract / match menandai string unik atau mengekstrak bagian respons, sehingga baris anomali langsung kelihatan tanpa membaca ribuan respons manual.",
      },
      {
        q: "Kenapa enumerasi username dilakukan SEBELUM brute-force password?",
        options: [
          "Supaya lebih cepat saja",
          "Karena brute password butuh target username yang valid; enumerasi mempersempit target",
          "Karena intruder hanya bisa satu payload",
          "Supaya tidak terkena rate limit",
        ],
        answer: 1,
        why: "Serangan password tanpa username valid itu percuma. Enumerasi dulu = jutaan kemungkinan menyusut jadi beberapa target nyata.",
      },
    ],
  },

  // ---------------------------------------------------------- 04
  {
    slug: "auth-04",
    tid: "ps-auth-bruteforce-lab",
    title: "Brute-Force Password + Proteksi yang Bolong (Anatomy Lab 2)",
    minutes: 14,
    source: {
      label: "PortSwigger — Lab: Brute-force passwords (password-based)",
      url: "https://portswigger.net/web-security/authentication/auth-lab-passwords",
    },
    untukApa: [
      "Lab Password brute-force memaksa kamu menggabungkan enumerasi + brute + menghindari proteksi lockout/rate limit dalam satu serangan.",
      "Ini SKILL inti untuk bug bounty: proteksi brute-force di aplikasi nyata hampir selalu ada, dan hampir selalu bisa di-akali kalau logikanya cacat.",
    ],
    sections: [
      {
        h: "Dua proteksi standar — dan kelemahan masing-masing",
        table: {
          head: ["Proteksi", "Cara kerja", "Kelemahan klasik"],
          rows: [
            ["Account locking", "Kunci akun setelah N percobaan gagal", "Tidak melindungi dari serangan 'mencari AKUN APAPUN': brute semua username dgn sedikit password masing2. Juga memicu enumerasi (respons 'locked' = akun valid). Rentan credential stuffing"],
            ["User rate limiting (IP block)", "Blokir IP setelah terlalu banyak request", "Counter sering reset saat login SUKSES → attacker menyelipkan login akunnya sendiri di antara guess. Bisa juga multiple password per request kalau param tidak divalidasi"],
          ],
        },
        callout:
          "Pola emas mengakali counter yang reset saat login sukses: sisipkan kredensial akunmu sendiri SECARA BERATANGGA di dalam wordlist. Tiap kali counter mau mencapai limit, login suksesmu me-reset-nya.",
      },
      {
        h: "Strategi 'spray' melawan account locking",
        p: [
          "Account locking hanya melindungi SATU akun dari serangan TERFOKUS. Attacker yang cukup puas dengan akun siapa saja melakukannya begini:",
        ],
        list: [
          "Susun daftar kandidat username (enumerasi / list umum).",
          "Pilih 2–3 password yang paling mungkin dipakai minimal satu orang — jumlahnya TIDAK BOLEH melebihi batas percobaan sebelum lock.",
          "Pakai Burp Intruder: tiap password dicoba ke SETIAP username. Satu user saja yang pakai salah satu password = akun didapat, lock tidak pernah terpicu.",
          "Sedangkan credential stuffing adalah varian lain: kamus raksasa pasangan username:password asli dari data breach, mengandalkan kebiasaan manusia pakai ulang password.",
        ],
      },
      {
        h: "HTTP Basic Authentication (bonus, sering dilupakan)",
        p: [
          "Format: header 'Authorization: Basic base64(username:password)'. Kredensial yang SAMA dikirim ulang di SETIAP request.",
          "Lemahnya: (1) tanpa HSTS, kredensial bisa dipotret man-in-the-middle; (2) implementasinya sering TANPA brute-force protection — token statis = brutenya nyaman; (3) tidak melindungi dari CSRF; (4) kredensial yang kebaca sering di-reuse di konteks lain yang lebih sensitif.",
        ],
      },
    ],
    lab: {
      title: "Lab — Brute-force passwords with lockout bypass",
      intro:
        "Lab ini menggabungkan semuanya: enumerasi username, spray password, dan mengakali proteksi yang reset saat login sukses.",
      steps: [
        "Start lab. Login manual dulu dengan kredensialmu (wiener:peter) — perhatikan respons sukses vs gagal.",
        "Kirim POST /login ke Intruder. Gunakan attack type Pitchfork / Cluster bomb: username dari wordlist kandidat, password dari wordlist kandidat.",
        "SISIPKAN kredensialmu sendiri (wiener:peter) secara beraturan di antara baris wordlist password — ini counter reset-mu.",
        "Jalankan, lalu cari baris dengan status/length berbeda → itu kombinasi username:password yang valid.",
        "Login dengan kredensial hasil temuan → lab solved.",
      ],
      hint: "Kalau attack berhenti di tengah dengan banyak 302 ke /login atau IP block, berarti penempatan kredensial reset-mu terlalu jarang. Rapatkan intervalnya.",
    },
    quiz: [
      {
        q: "Counter rate-limit reset setiap kali login sukses. Cara paling sederhana mengakalinya?",
        options: [
          "Ganti IP setiap 5 percobaan",
          "Selipkan login sukses (akunmu sendiri) secara berkala di antara percobaan brute",
          "Kirim semua guess sekaligus paralel",
          "Gunakan HTTPS agar tidak terdeteksi",
        ],
        answer: 1,
        why: "Login sukses me-reset counter — jadi kredensialmu sendiri disisipkan secara beratangga dalam wordlist untuk menjaga counter di bawah limit.",
      },
      {
        q: "Kenapa account locking tetap tidak mencegah serangan 'cari akun apa saja'?",
        options: [
          "Karena lock hanya berlaku untuk admin",
          "Karena attacker cukup mencoba sedikit password ke BANYAK username — satu user yang kebetulan pakai salah satu password cukup",
          "Karena lock mudah di-unlock lewat API",
          "Karena lock hanya memblokir 1 menit",
        ],
        answer: 1,
        why: "Spray attack: 2–3 password × banyak username, tidak pernah melebihi batas percobaan per akun. Satu kecocokan = akun didapat tanpa memicu lock.",
      },
      {
        q: "Mana pernyataan yang BENAR tentang HTTP Basic Auth?",
        options: [
          "Aman karena kredensial di-encode base64",
          "Sering tanpa brute-force protection dan rentan CSRF",
          "Aman asalkan pakai HTTPS",
          "Lebih aman daripada form login",
        ],
        answer: 1,
        why: "Base64 bukan enkripsi. Basic auth mengirim kredensial di tiap request, implementasinya sering tanpa proteksi brute-force, dan tidak melindungi dari CSRF.",
      },
    ],
  },

  // ---------------------------------------------------------- 05
  {
    slug: "auth-05",
    tid: "ps-auth-stayloggedin",
    title: "Stay-Logged-In Cookie: Remember-Me yang Mengingat Passwordmu",
    minutes: 12,
    source: {
      label: "PortSwigger — Lab: Brute-forcing a stay-logged-in cookie",
      url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie",
    },
    untukApa: [
      "Cookie 'remember me' adalah jalan pintas melewati SELURUH proses login. Kalau bisa ditebak, tidak perlu password sama sekali.",
      "Lesson ini melatih kebiasaan bounty yang sangat penting: MEMBONGKAR struktur token dari sampel milikmu sendiri.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Fitur 'stay logged in' biasanya diimplementasi dengan token di persistent cookie. Memegang cookie itu = bypass login total. Maka best practice-nya: cookie harus mustahil ditebak.",
          "Masalahnya, banyak developer mengira 'kalau cookie di-ENKRIPSI, pasti aman'. Encoding dua arah sederhana seperti Base64 BUKAN enkripsi — tidak ada kunci, siapa pun bisa decode.",
        ],
        callout:
          "Base64 = encoding, bukan enkripsi. Ada beda tajam: encoding bisa dibalik siapa saja tanpa rahasia; enkripsi butuh kunci. Base64 di cookie 'rahasia' = rahasia palsu.",
      },
      {
        h: "Membongkar struktur dari sampel sendiri",
        p: [
          "Kabar baiknya: attacker tidak butuh akun korban untuk memahami format. Punya AKUN SENDIRI cukup:",
          "Login dengan 'stay logged in' → tangkap cookie-nya → decode Base64 → hasilnya mengikuti pola khas. Di lab ini: base64(username + ':' + md5(password)).",
        ],
        table: {
          head: ["Langkah", "Apa yang terlihat"],
          rows: [
            ["1. Login dgn stay-logged-in", "Cookie stay-logged-in ter-set di browser"],
            ["2. Decode Base64", "Terlihat: username + ':' + 32 karakter hex → terduga MD5"],
            ["3. Verifikasi hipotesis", "Hash ulang passwordmu sendiri → sama dengan 32-char itu → struktur terkonfirmasi"],
            ["4. Generalisasi", "Sekarang bisa direkonstruksi untuk SEMUA user: base64(carlos:md5(password_tebakan))"],
          ],
        },
      },
      {
        p: [
          "Generalisasi inilah senjata: wordlist password → untuk tiap kandidat hitung md5 → susun cookie kandidat → brute-force via Intruder dengan payload 'susunan cookie'.",
          "Skema murni MD5 pun lemah: hash dari password populer bisa di-lookup di tabel hash online (rainbow table) — kadang password cleartext korban malah kelihatan langsung.",
        ],
      },
      {
        h: "Relevansi bounty",
        list: [
          "Target nyata: cookie 'remember me' =/ bukan target utama di program bounty, tapi pola berpikirnya dipakai di mana-mana: JWT tanpa signature check, session ID predictable, reset token terstruktur.",
          "Refleks yang dibangun di sini: selalu REKAYASA BALIK token dari akun sendiri sebelum menyimpulkan apapun tentang keamanannya.",
        ],
      },
    ],
    lab: {
      title: "Lab — Brute-forcing a stay-logged-in cookie",
      intro: "Kredensialmu: wiener:peter. Target: carlos. Selesaikan lewat cookie, bukan form login.",
      steps: [
        "Login dengan centang 'Stay logged in'. Di Burp, periksa cookie stay-logged-in → decode Base64-nya. Catat polanya.",
        "Konfirmasi hipotesis struktur (username:md5(password)) dengan memverifikasi hash password-mu sendiri.",
        "Logout. Siapkan daftar kandidat: untuk tiap password kandidat, hitung md5 lalu susun base64(carlos:hash).",
        "Kirim GET /my-account?id=carlos ke Intruder; payload = cookie kandidat (bisa pakai payload processing: md5 → append/prepend username → base64).",
        "Tandai respons yang berbeda (halaman sukses) → dapat password carlos → login manual → lab solved.",
      ],
      hint: "Burp Intruder bisa melakukan md5→concat→base64 otomatis lewat Payload Processing. Tapi untuk belajar, susun manual beberapa kandidat dulu sampai struktur-nya mantap di kepalamu.",
    },
    quiz: [
      {
        q: "Kenapa Base64 dianggap tidak melindungi cookie?",
        options: [
          "Karena Base64 membuat cookie lebih panjang",
          "Karena Base64 adalah encoding dua arah tanpa kunci — siapa pun bisa decode",
          "Karena Base64 hanya untuk gambar",
          "Karena Base64 menghapus karakter khusus",
        ],
        answer: 1,
        why: "Encoding ≠ enkripsi. Base64 reversible tanpa rahasia; mengamankan data butuh enkripsi dengan kunci (atau lebih baik: token acak high-entropy yang disimpan server-side).",
      },
      {
        q: "Struktur cookie lab ini (setelah decode) adalah…",
        options: [
          "username:md5(password) yang kemudian di-encode Base64",
          "AES(password, kunci server)",
          "JWT bertanda tangan",
          "session ID acak dari server",
        ],
        answer: 0,
        why: "Cookie = base64(username + ':' + md5hash-of-password). Karena md5 password populer bisa di-lookup, struktur ini bruteforce-able dan bahkan bisa membocorkan cleartext password.",
      },
      {
        q: "Refleks bounty yang dibangun dari lesson ini…",
        options: [
          "Selalu brute-force form login dulu sebelum apa pun",
          "Rekayasa balik token/cookie dari akun sendiri untuk memahami strukturnya sebelum menilai keamanannya",
          "Laporkan semua cookie sebagai bug",
          "Matikan cookie di browser",
        ],
        answer: 1,
        why: "Dengan akun sendiri kamu bisa mendekode, memverifikasi hipotesis struktur, lalu menggeneralisasi serangan ke user lain. Ini metode standar menilai token di target nyata.",
      },
    ],
  },

  // ---------------------------------------------------------- 06
  {
    slug: "auth-06",
    tid: "ps-auth-reset-broken",
    title: "Password Reset Broken Logic: Token yang Tidak Pernah Dicek",
    minutes: 12,
    source: {
      label: "PortSwigger — Lab: Password reset broken logic",
      url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic",
    },
    untukApa: [
      "Fitur reset password adalah MEKANISME AUTH KEDUA di setiap situs — dan sering luput dari perhatian developer dibanding halaman login.",
      "Class bug ini (token tidak divalidasi saat submit) terjadi di aplikasi nyata dan hampir selalu berdampak akun-takeover.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Alur reset yang benar: user minta reset → server kirim URL berisi token high-entropy → user buka URL → isi password baru → server memvalidasi LAGI token itu saat form di-submit.",
          "Versi broken: server memvalidasi token saat GENERATE halaman reset, tapi TIDAK memvalidasi lagi (atau tidak mengaitkan token dgn user) saat PERMINTAAN GANTI PASSWORD dikirim.",
        ],
        callout:
          "Aturan emas: keputusan kritis (ganti password) harus divalidasi pada MOMEN aksinya, bukan cuma saat halamannya dibuka. Page load bukan otorisasi.",
      },
      {
        h: "Anatomi serangan di lab",
        table: {
          head: ["Langkah", "Perilaku server yang diamati"],
          rows: [
            ["Minta reset untuk akunmu", "Email berisi link reset + token di query parameter"],
            ["Submit password baru", "POST /forgot-password membawa token (URL + hidden input) + username"],
            ["Eksperimen: HAPUS token", "Reset TETAP BERHASIL → server tidak mengecek token saat submit"],
            ["Eksperimen: ganti username", "username di hidden input yang bisa diedit → target berpindah"],
            ["Eksploitasi final", "Reset milik sendiri, hapus token, ganti username=carlos → password carlos milikmu"],
          ],
        },
        p: [
          "Perhatikan kuncinya: kontrol identitas diangkat dari token (yang seharusnya menentukan siapa yang di-reset) menjadi FIELD BIASA di request yang bisa diedit attacker.",
        ],
      },
      {
        h: "Spektrum lemahnya implementasi reset",
        list: [
          "Mengirim password current/bernama via email — email bukan tempat aman; inbox sinkron lintas device.",
          "URL reset dengan parameter tebakan: /reset-password?user=victim — attacker ganti parameter, langsung ke halaman ganti password akun orang.",
          "Token bagus tapi tidak di-validasi ulang saat submit (lesson ini).",
          "Token bagus tapi tidak expire / tidak dihapus setelah dipakai — hidup terus untuk disalahkan belakangan.",
          "URL reset dinamis dengan header Host tak terkontrol → password reset poisoning (materi lanjutan di sumber).",
        ],
        p: [
          "Yang ideal: token high-entropy, URL tidak membocorkan user, dicek di back-end saat submit, expire cepat, dan hancur setelah dipakai.",
        ],
      },
    ],
    lab: {
      title: "Lab — Password reset broken logic",
      intro: "Kredensialmu: wiener:peter. Target: reset password carlos tanpa akses email-nya.",
      steps: [
        "Jalankan alur reset untuk akunmu sendiri sambil Burp merekam: amati link email, token di URL, dan struktur POST /forgot-password.",
        "Uji hipotesis: kirim ulang POST reset milikmu dengan TOKEN DIHAPUS (di URL dan di body) → kalau sukses, bug konfirmasi.",
        "Masih di Repeater: ubah hidden input username menjadi carlos, isi password baru, kirim.",
        "Login sebagai carlos dengan password barumu → lab solved.",
      ],
      hint: "Kunci eksperimen: buktikan dulu token tidak dicek (dengan akunmu sendiri), BARU angkat kontrol identitas (ganti username). Jangan gabungkan dua langkah sebelum hipotesis terbukti.",
    },
    quiz: [
      {
        q: "Inti bug 'password reset broken logic' di lab ini…",
        options: [
          "Token reset terlalu pendek",
          "Token tidak divalidasi lagi saat form ganti password di-submit",
          "Email reset tidak terkirim",
          "Halaman reset bisa diakses tanpa HTTPS",
        ],
        answer: 1,
        why: "Validasi hanya terjadi di page load. Saat POST ganti password, token diabaikan — dan username justru diambil dari hidden input yang bisa diedit.",
      },
      {
        q: "Kenapa fitur reset sering lebih rapuh daripada halaman login?",
        options: [
          "Karena di-code oleh tim berbeda",
          "Karena developer jarang menerapkan ketelitian keamanan yang sama ke fungsi pendukung login",
          "Karena reset memakai enkripsi lebih lemah",
          "Karena email selalu tidak aman",
        ],
        answer: 1,
        why: "PortSwigger merangkumnya: halaman login biasanya dirawat hati-hati, tapi fungsi terkait (reset, ganti password, remember-me) mudah terlewat dari standar yang sama.",
      },
      {
        q: "Mana ciri implementasi reset yang BENAR?",
        options: [
          "Token di URL hanya dicek saat halaman dibuka",
          "Token dicek di back-end saat submit, expire cepat, dan dihapus setelah dipakai",
          "URL reset memuat username korban supaya mudah",
          "Password baru dikirim via email",
        ],
        answer: 1,
        why: "Token high-entropy + validasi saat submit + expiry pendek + destroyed after use = standar yang benar. URL jangan membocorkan identitas user.",
      },
    ],
  },

  // ---------------------------------------------------------- 07
  {
    slug: "auth-07",
    tid: "ps-auth-secure",
    title: "Cara Mengamankan Auth (Supaya Kamu Tahu Apa yang Dicarang)",
    minutes: 10,
    source: {
      label: "PortSwigger — Securing your authentication mechanisms",
      url: "https://portswigger.net/web-security/authentication/securing",
    },
    untukApa: [
      "Attacker yang baik tahu BENTUK pertahanan yang benar — karena setiap penyimpangan dari bentuk itu adalah celah untuk dicari.",
      "Checklist ini juga kamu pakai saat menulis laporan: rekomendasi fix yang tepat menaikkan kualitas dan kredibilitas report bug bounty-mu.",
    ],
    sections: [
      {
        h: "Checklist pertahanan login",
        list: [
          "Response generik IDENTIK untuk username salah vs password salah — teks, panjang, status, timing semua disamakan.",
          "Rate limiting yang benar: berbasis akun + IP, dengan backoff; counter TIDAK reset hanya karena satu login sukses.",
          "Account locking yang tidak menjadi alat enumerasi (respons lock harus tidak membedakan akun valid).",
          "MFA untuk semua akun high-value — dengan faktor yang BENAR-BENAR berbeda.",
          "Monitoring & alerting: lonjakan percobaan gagal harus memicu sinyal, bukan diam-diam diabaikan.",
        ],
        callout:
          "Kebiasaan audit: baca kebijakan proteksinya, lalu tanyakan 'apa yang TERJADI SAAT login sukses?' — di situ biasanya kelemahan logika tersembunyi (reset counter, unlock otomatis, dsb).",
      },
      {
        h: "Checklist pertahanan token & sesi",
        list: [
          "Remember-me: token acak high-entropy yang dipetakan server-side — BUKAN encoding dari username+hash password.",
          "Reset password: token high-entropy, URL tidak membocorkan user, validasi ulang saat submit, expire pendek, sekali pakai.",
          "Ganti password: selalu minta password current; jangan identitas dari hidden field yang bisa diedit.",
          "Cookie sesi: Secure, HttpOnly, SameSite — dan regenerasi ID setelah login sukses.",
          "Jangan kirim password via email dalam bentuk apa pun.",
        ],
      },
      {
        h: "Checklist pertahanan terhadap brute-force kredensial",
        list: [
          "Password policy yang masuk akal — panjang lebih penting daripada aturan karakter rumit yang memaksa pola prediktabel.",
          "Cek kredensial terhadap daftar breach umum (deny-list password populer).",
          "Credential stuffing: deteksi via kegagalan massal lintas akun, bukan per-akun saja.",
        ],
        p: [
          "Sisi bounty: setiap item di checklist ini adalah PERTANYAAN AUDIT. 'Apakah response identik? Apakah counter reset saat sukses? Apakah token di-validasi ulang saat submit?' — tiga pertanyaan itu sendiri sudah kerangka rekon lengkapmu di track ini.",
        ],
      },
    ],
    quiz: [
      {
        q: "Respons login yang benar untuk username salah vs password salah adalah…",
        options: [
          "Pesan berbeda agar user membantu",
          "Identik sempurna — teks, panjang, status code, dan timing",
          "Identik teks tapi beda status code supaya log rapi",
          "Pesan detail untuk user, generik untuk attacker",
        ],
        answer: 1,
        why: "Enumerasi hidup dari perbedaan apa pun. Best practice: satu pesan generik yang persis sama di semua dimensi, termasuk timing.",
      },
      {
        q: "Desain remember-me yang benar…",
        options: [
          "base64(username:md5(password)) — praktis",
          "Token acak high-entropy yang dipetakan ke sesi di server",
          "Enkripsi username pakai kunci hard-coded",
          "Cookie berisi user ID saja",
        ],
        answer: 1,
        why: "Server menyimpan token acak dan memetakannya ke user. Token tidak membawa data apa pun yang bisa direkayasa balik, dan bisa dicabut server-side.",
      },
      {
        q: "Dalam audit proteksi brute-force, pertanyaan paling tajam adalah…",
        options: [
          "Berapa panjang minimal password?",
          "Apa yang terjadi pada counter saat login SUKSES?",
          "Apakah halaman login pakai HTTPS?",
          "Apakah CAPTCHA dipakai?",
        ],
        answer: 1,
        why: "Logika reset counter saat sukses adalah kelemahan klasik yang membuka jalur bypass. Pertanyaan sejenis (apa yang terjadi saat X sukses?) sering mengungkap logic flaw.",
      },
    ],
  },

  // ---------------------------------------------------------- 08
  {
    slug: "auth-08",
    tid: "ps-auth-methodology",
    title: "Cheat Sheet & Metodologi Auth untuk Bug Bounty",
    minutes: 12,
    source: {
      label: "PortSwigger — Authentication vulnerabilities (rangkuman topik)",
      url: "https://portswigger.net/web-security/authentication",
    },
    untukApa: [
      "Halaman ini merangkum SEMUA lesson sebelumnya jadi prosedur eksekusi yang bisa kamu pakai langsung di target bounty nyata.",
      "Bedanya hacker dan pembaca tutorial: yang satu punya CHECKLIST eksekusi. Ini checklist-mu.",
    ],
    sections: [
      {
        h: "Peta serangan authentication",
        table: {
          head: ["Permukaan", "Apa yang diuji", "Sinyal bug"],
          rows: [
            ["Form login", "Enumerasi (status/pesan/timing), rate limit, lock logic", "Respons beda; counter reset saat sukses"],
            ["Remember-me / stay-logged-in", "Struktur cookie, entropy, prediktabilitas", "Base64/enkripsi lemah, pola username:hash"],
            ["Reset password", "Token di-validasi ulang saat submit? User dari token atau dari field?", "Reset sukses tanpa token; username editable"],
            ["Ganti password", "Password current diminta? Identitas dari mana?", "Tanpa password lama; hidden field bisa diedit"],
            ["HTTP Basic / header auth", "Brute-force protection ada?", "Token statis tanpa proteksi"],
            ["MFA (jika ada)", "Bypass verifikasi, brute kode", "Halaman OTP bisa di-skip; kode tidak expire"],
          ],
        },
      },
      {
        h: "Prosedur eksekusi 15 menit per target (hanya target yang kamu boleh uji!)",
        list: [
          "Buka login page → 4 request percobaan (user benar+pass salah; user salah+pass salah; user salah format aneh; kosong). Bandingkan 3 sinyal.",
          "Buat akun → aktifkan semua fitur (remember me, MFA) → tarik SEMUA cookie & token, dekode satu per satu, hipotesiskan strukturnya.",
          "Jalankan alur reset & ganti password milikmu sambil Burp merekam → map di mana identitas ditentukan (token? hidden field?) dan kapan divalidasi.",
          "Uji logika: hapus/edit token, ganti username, replay saat submit → amati mana validasi yang hilang.",
          "Baru setelah itu pertimbangkan brute/enumerasi terotomasi — dan hanya dalam batas scope program (rate limit yang wajar, tidak menembus proteksi berlebihan).",
        ],
        callout:
          "Etika bounty: otomasi hanya pada target yang mengizinkannya, dengan kecepatan yang tidak mengganggu. Logika flaw (token tak divalidasi) itu temuan; DOS dengan brute massal itu pelanggaran.",
      },
      {
        h: "Wordlist & tool minimum",
        table: {
          head: ["Kebutuhan", "Sumber"],
          rows: [
            ["Kandidat username", "PortSwigger auth-lab-usernames; profil publik target; pola email korporat"],
            ["Kandidat password", "PortSwigger auth-lab-passwords; breach list publik (SecLists / rockyou untuk lab)"],
            ["Payload processing", "Burp Intruder: md5 → concat username → base64 (untuk cookie)"],
            ["Pembeda respons", "Grep-Extract / kolom length di Intruder"],
          ],
        },
        p: [
          "Setelah track ini, lanjutkan dengan Access Control (track /acl) — di sana kamu tetap memakai akun yang benar, tapi menguji apakah haknya bisa dilampaui. Dua-duanya bersama membentuk fondasi 'broken access control & authentication' yang jadi kategori bug paling berdampak di bounty.",
        ],
      },
    ],
    lab: {
      title: "Simulasi mini — pilih urutan seranganmu",
      intro:
        "Bukan lab PortSwigger; ini drill pengambilan keputusan. Kerjakan dengan menulis jawabanmu sendiri dulu, baru cek hint.",
      steps: [
        "Skenario: target bounty (dalam scope) punya login, remember-me cookie, dan fitur reset. Kamu baru punya 1 akun sendiri. Tulis urutan 5 langkah audit yang akan kamu eksekusi.",
        "Tentukan sinyal apa yang mengkonfirmasi tiap hipotesis (mis. 'reset sukses tanpa token' → bug token).",
        "Tentukan batasan: mana yang aman diotomasi, mana yang harus manual, dan di mana kamu berhenti kalau tidak ada temuan.",
      ],
      hint: "Urutan yang sehat: observasi respons login → bongkar cookie → jalankan reset & ganti password milikmu → uji logika (hapus token, ganti username) → OTOMASI hanya jika scope mengizinkan.",
    },
    quiz: [
      {
        q: "Urutan audit yang paling efisien di target baru…",
        options: [
          "Brute-force massal dulu supaya cepat",
          "Observasi manual dulu: respons login, bongkar token milikmu, jalankan alur reset/ganti milikmu → baru otomasi selektif",
          "Lewati login, langsung ke halaman admin",
          "Scan semua endpoint dengan scanner otomatis",
        ],
        answer: 1,
        why: "Logika flaw ditemukan lewat observasi dan eksperimen manual, bukan volume. Otomasi efektif datang SETELAH kamu tahu apa yang harus dicari.",
      },
      {
        q: "Kamu menemukan reset sukses tanpa token. Langkah tepat berikutnya…",
        options: [
          "Langsung submit laporan tanpa bukti tambahan",
          "Verifikasi dampak penuh: buktikan bisa mengganti password user lain (dengan akun uji/kontrol yang sah), dokumentasikan request-responsnya",
          "Eksploitasi ke sebanyak mungkin user sebelum dilaporkan",
          "Hapus log di server",
        ],
        answer: 1,
        why: "Report bounty yang kuat menunjukkan dampak yang terverifikasi + bukti request/response. Eksploitasi melampaui pembuktian dampak adalah pelanggaran program.",
      },
      {
        q: "Rate limit ketat di target bounty. Yang PALING sesuai etika…",
        options: [
          "Naikkan threads sampai limit tembus",
          "Turunkan agresivitas: fokus ke logika flaw yang butuh request sedikit, atau tanyakan batas ke program",
          "Gunakan banyak IP agar tidak ketahuan",
          "Beralih ke target lain diam-diam",
        ],
        answer: 1,
        why: "Proteksi rate limit adalah batas yang dihormati. Cari bug kelas logika (request minim), atau konsultasikan batas dengan program — bukan menembus proteksi.",
      },
    ],
  },
];
