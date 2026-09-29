import type { Lesson } from "./lesson-types";

// ============================================================
// PortSwigger — Cross-site scripting (track /xss)
// Ditulis ulang gaya Alif: problem-first, padat, hands-on.
// Sumber di-link di tiap lesson; konten tetap parafrase, bukan salinan.
// ============================================================

export const XSS_LESSONS: Lesson[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "xss-01",
    tid: "ps-xss-main",
    title: "XSS: Kode Kamu Berjalan di Browser Orang Lain",
    minutes: 10,
    source: {
      label: "PortSwigger — Cross-site scripting (XSS)",
      url: "https://portswigger.net/web-security/cross-site-scripting",
    },
    untukApa: [
      "XSS = kerentanan web paling BANYAK ditemukan di dunia. Kamu akan menyentuhnya di praktis setiap target bounty.",
      "Pemahaman CONTEXT (di mana payload mendarat) adalah inti semua pengujian XSS — bukan hafalan payload.",
    ],
    sections: [
      {
        h: "Masalah yang diselesaikan attacker",
        p: [
          "Same-origin policy dipikirkan untuk memisahkan situs-situs. XSS memutarbalikkannya: situs yang rentan DIBUAT mengembalikan JavaScript milik attacker ke browser korban — dan karena kode itu 'berasal dari' situs tersebut, ia berjalan penuh dalam sesi korban.",
          "Saat payload dieksekusi, attacker bisa melakukan APAPUN yang bisa dilakukan korban: aksi apa pun, baca data apa pun yang bisa diakses user, curi kredensial, tampilkan konten palsu (virtual defacement), atau suntik fungsionalitas trojan.",
        ],
        callout:
          "Cara verifikasi standar: injeksi payload yang memanggil alert() di browsermu. Catatan: sejak Chrome 92, alert() diblokir di cross-origin iframe — gunakan print() pada lab yang terdampak. PortSwigger menandai lab yang mendukung print().",
      },
      {
        h: "Tiga tipe XSS — peta besarnya",
        table: {
          head: ["Tipe", "Sumber payload", "Contoh"],
          rows: [
            ["Reflected", "Request HTTP saat ini", "Parameter pencarian direfleksikan mentah ke halaman hasil"],
            ["Stored (persistent)", "Database situs", "Komentar blog berisi script — dieksekusi di semua pengunjung"],
            ["DOM-based", "Kode client-side itu sendiri", "JS membaca location.search/hash lalu menulisnya ke DOM tanpa aman"],
          ],
        },
        p: [
          "Peta tipe menentukan STRATEGI: reflected & stored diuji lewat respons server (Burp), DOM-based diuji di browser DevTools (sink & source).",
        ],
      },
      {
        h: "Dampak: skala tergantung konteks",
        list: [
          "Situs brosur, semua user anonim, data publik → dampak minimal.",
          "App berisi data sensitif (banking, email, rekam medis) → dampak serius.",
          "Korban punya hak istimewa (admin) → critical: attacker bisa mengambil alih app dan semua data seluruh user.",
        ],
        p: [
          "Untuk bug bounty: XSS di akun admin atau halaman privileged = naik kelas. Selalu jelaskan SIAPA yang kena di report-mu.",
        ],
      },
    ],
    lab: {
      title: "Lab 0 — Kenali 3 konteks injeksi",
      intro: "Sebelum lab resmi, kalibrasi matamu pada 'di mana payload mendarat'.",
      steps: [
        "Buka situs apa pun dengan form (search/komentar). Masukkan string penanda unik tanpa karakter khusus, mis. zzMarkerX99, lalu submit.",
        "Cari string itu di respons (Ctrl+U / DevTools). Perhatikan KONTEKSnya: teks HTML mentah? dalam atribut tag? dalam <script> JS? dalam URL?",
        "Pertanyaan refleksi: untuk keluar dari masing-masing konteks itu, karakter apa yang WAJIB kamu kontrol? (masing-masing punya 'pintu keluar' berbeda: <> untuk teks, \" untuk atribut, </script> untuk blok script).",
      ],
      hint: "Ini prinsip #1 track XSS: payload mengikuti KONTEKS. Payload yang sama tidak selalu bekerja di dua konteks berbeda.",
    },
    quiz: [
      {
        q: "Inti dari XSS adalah…",
        options: [
          "Menyerang server dengan query SQL",
          "Membuat situs rentan mengembalikan JavaScript attacker sehingga dieksekusi di browser korban dalam sesinya",
          "Menebak password user",
          "Memblokir situs dengan request massal",
        ],
        answer: 1,
        why: "XSS memutarbalik kepercayaan: kode attacker berjalan karena 'datang dari' situs yang dipercaya korban — melewati same-origin policy.",
      },
      {
        q: "XSS di mana payload tersimpan di database dan menyerang semua pengunjung halaman…",
        options: ["Reflected", "Stored", "DOM-based", "Self-XSS"],
        answer: 1,
        why: "Stored (persistent) XSS: data tidak tepercaya disimpan lalu dirender kembali tanpa aman ke respons lain — korban tidak perlu klik link apa pun.",
      },
      {
        q: "Dampak XSS paling berat terjadi ketika…",
        options: [
          "Situsnya brosur statis",
          "Korban punya hak istimewa (admin) — attacker bisa menguasai app dan seluruh data user",
          "Payload-nya panjang",
          "Situsnya tidak punya CSP",
        ],
        answer: 1,
        why: "Dampak mengikuti HAK korban. XSS ke admin = pindah tangan seluruh aplikasi; XSS ke user anonim di situs brosur nyaris tanpa dampak.",
      },
    ],
  },

  // ---------------------------------------------------------- 02
  {
    slug: "xss-02",
    tid: "ps-xss-reflected",
    title: "Reflected XSS: Serangan Lewat Link",
    minutes: 10,
    source: {
      label: "PortSwigger — Reflected cross-site scripting",
      url: "https://portswigger.net/web-security/cross-site-scripting/reflected",
    },
    untukApa: [
      "Reflected XSS adalah tipe termudah untuk ditemukan dan titik mulai semua latihan lab XSS.",
      "Mekanisme 'payload di request → refleksi di respons' adalah template berpikir yang dipakai di banyak kelas bug lain.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "App menerima data dari request (biasanya parameter) dan memasukkannya KE respons SEGERA tanpa pengamanan. Contoh klasik: halaman hasil pencarian menampilkan kembali kata yang dicari.",
          "Attacker tidak bisa memaksa korban mengunjungi URL jahat — tapi bisa MENGGODA: link berisi payload, email, pesan chat. Korban klik → payload ikut → eksekusi dalam sesi korban.",
        ],
        callout:
          "Reflected = hidup di request. Payload tidak tersimpan; setiap serangan butuh korban memicu request itu sendiri. Itulah kenapa pengiriman link adalah bagian dari serangan.",
      },
      {
        h: "Anatomi refleksi (contoh mental model)",
        p: [
          "Request: /status?message=Semua+aman → respons berisi <p>Status: Semua aman.</p>",
          "Request: /status?message=<script>...jahat...</script> → respons berisi <p>Status: <script>...jahat...</script></p> — browser korban mengeksekusinya karena bagian dari HTML situs.",
          "Catatan verifikasi: gunakan alert(1) untuk membuktikan eksekusi. Di lab yang berjalan dalam cross-origin iframe pada Chrome, gunakan print() — portswigger menyediakan opsi ini di lab terkait.",
        ],
      },
      {
        h: "Cara menemukannya (metode dasar)",
        list: [
          "Suntik string penanda unik ke SETIAP entry point (param URL, body, header yang direfleksikan).",
          "Cari di mana penanda muncul kembali di respons — catat KONTEKS tiap kemunculan.",
          "Uji konteks satu per satu: bisa keluar dari konteks? karakter apa yang di-encode/diblok?",
          "Jika ada encoding/filter: cari variasi payload yang lolos (tag alternatif, event handler, casing, encoding).",
        ],
      },
    ],
    lab: {
      title: "Lab — Reflected XSS into HTML context with nothing encoded",
      intro: "Lab paling dasar: refleksi murni tanpa encoding apa pun. Tujuannya membuktikan eksekusi.",
      steps: [
        "Start lab → ketik string penanda di kotak search → submit.",
        "Ctrl+U (view source) → temukan penandamu. Perhatikan: ia mendarat di TEKS HTML polos, tanpa encoding.",
        "Kirim payload: <script>alert(1)</script> di kotak search.",
        "Popup muncul → lab solved.",
      ],
      hint: "Jika popup tidak muncul, periksa apakah penandamu mendarat di konteks berbeda (atribut/JS) — sesuaikan payload dengan pintu keluar konteks itu.",
    },
    quiz: [
      {
        q: "Yang membedakan reflected dari stored XSS…",
        options: [
          "Reflected datang dari request saat ini; stored dari data yang tersimpan (database)",
          "Reflected lebih berbahaya",
          "Stored hanya di browser",
          "Reflected tidak butuh korban",
        ],
        answer: 0,
        why: "Reflected hidup di request (butuh korban memicu/membuka link); stored tersimpan dan menyerang setiap pengunjung tanpa aksi khusus.",
      },
      {
        q: "Langkah pertama metode manual menemukan reflected XSS…",
        options: [
          "Langsung kirim <script>alert(1)</script> ke semua tempat",
          "Suntik string penanda unik ke semua entry point, lalu petakan di mana ia muncul kembali dan dalam konteks apa",
          "Scan port server",
          "Cek robots.txt",
        ],
        answer: 1,
        why: "String penanda aman untuk semua input dan membantu memetakan konteks refleksi. Payload penyerangan baru dibuat SETELAH konteks diketahui.",
      },
      {
        q: "Kenapa print() dipakai menggantikan alert() di sebagian lab…",
        options: [
          "print lebih cepat",
          "Chrome ≥92 memblokir alert() di cross-origin iframe, dan lab berjalan dalam iframe itu",
          "alert sudah deprecated",
          "print menulis ke file",
        ],
        answer: 1,
        why: "Sejak Chrome 92 (Juli 2021), cross-origin iframe tidak boleh memanggil alert(). PortSwigger menandai lab yang bisa diselesaikan dengan print().",
      },
    ],
  },

  // ---------------------------------------------------------- 03
  {
    slug: "xss-03",
    tid: "ps-xss-stored",
    title: "Stored XSS: Satu Injeksi, Semua Pengunjung Kena",
    minutes: 10,
    source: {
      label: "PortSwigger — Stored cross-site scripting",
      url: "https://portswigger.net/web-security/cross-site-scripting/stored",
    },
    untukApa: [
      "Stored XSS adalah tipe dengan dampak bisnis terbesar: korban datang sendiri tanpa link jahat.",
      "Di bounty, stored XSS di area yang dilihat user/admin lain biasanya dihargai lebih tinggi daripada reflected.",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "App menerima data tidak tepercaya (komentar, nama tampilan, detail pesanan — bahkan dari email/support yang masuk ke panel internal), MENYIMPANNYA, lalu memasukkannya tanpa aman ke respons BERIKUTNYA.",
          "Bedanya dengan reflected: jarak antara injeksi dan korban. Payload menunggu di database; korban yang mengeksekusinya hanyalah siapa pun yang membuka halaman tempat payload dirender.",
        ],
        callout:
          "Sumber data 'tidak tepercaya' lebih luas dari yang kamu kira: input user lain, data dari sistem eksternal (email, feed, API pihak ketiga), bahkan data yang dulu dianggap 'internal' (nama file upload, metadata).",
      },
      {
        h: "Anatomi serangan",
        list: [
          "Attacker menulis konten berpayload ke fitur yang menyimpan data (komentar/blog).",
          "Server menyimpan apa adanya (tidak ada sanitasi/encoding saat menyimpan ATAU saat merender).",
          "Setiap pengunjung halaman itu menerima payload sebagai bagian HTML → eksekusi di browser masing-masing.",
          "Attacker bisa berhenti di situ (bukti alert) atau melanjutkan: curi sesi, aksi atas nama korban, keylogger ringan.",
        ],
      },
      {
        h: "Strategi pencarian di target nyata",
        table: {
          head: ["Langkah", "Detail"],
          rows: [
            ["Map semua input yang TERSIMPAN", "Profil, komentar, review, nama file, field address — semua yang muncul lagi nanti"],
            ["Tandai semua tempat data itu dirender", "Halaman publik? panel admin? email? export PDF? — tiap lokasi = konteks berbeda"],
            ["Uji dengan penanda per konteks", "Bukan satu payload untuk semua — sesuaikan dengan konteks render"],
            ["Cek siapa yang melihat", "XSS yang dirender di panel admin = horizontal → vertical (korban berhak tinggi)"],
          ],
        },
      },
    ],
    lab: {
      title: "Lab — Stored XSS into HTML context with nothing encoded",
      intro: "Komentar blog tanpa encoding. Semua pembaca postingan akan mengeksekusi payload-mu.",
      steps: [
        "Start lab → buka satu blog post → isi form komentar.",
        "Di kolom komentar masukkan: <script>alert(1)</script> → isi name/email/website bebas → Post comment.",
        "Halaman post di-reload → popup alert muncul → lab solved.",
        "Buka halaman post dari sesi/penyamaran lain → popup muncul lagi — bukti sifat 'stored'.",
      ],
      hint: "Perhatikan: payload TIDAK PERLU di klik siapa pun. Ia berjalan begitu halaman dibuka — itulah beda dampaknya dengan reflected.",
    },
    quiz: [
      {
        q: "Kenapa stored XSS dianggap berdampak paling besar…",
        options: [
          "Karena payload-nya lebih panjang",
          "Karena satu injeksi mengeksekusi di browser SEMUA pengunjung halaman, tanpa perlu link jahat",
          "Karena menyentuh database",
          "Karena sulit dihapus",
        ],
        answer: 1,
        why: "Distribusi otomatis: setiap render halaman adalah eksekusi payload. Korban tidak perlu dijebak membuka link apa pun.",
      },
      {
        q: "Mana yang BUKAN sumber data tidak tepercaya untuk stored XSS…",
        options: [
          "Komentar user lain",
          "Metadata file yang di-upload",
          "ID sesi yang di-generate server secara acak",
          "Data yang masuk dari sistem eksternal/email",
        ],
        answer: 2,
        why: "Data yang di-generate server dari nilai acak krypto dan tidak berasal dari input tidak tepercaya bukan vektor XSS. Semua yang lain (termasuk metadata, feed eksternal) tetap tidak tepercaya.",
      },
      {
        q: "Stored XSS yang dirender di PANEL ADMIN berarti…",
        options: [
          "Dampaknya sama dengan halaman publik",
          "Horizontal → vertical escalation: kode berjalan di sesi admin, membuka fungsi/data istimewa",
          "Tidak bisa dieksploitasi",
          "Hanya bekerja untuk admin",
        ],
        answer: 1,
        why: "Korban admin = kode berjalan dengan hak admin. Ini jalur klasik eskalasi: stored XSS low-privilege area → takeover akun admin.",
      },
    ],
  },

  // ---------------------------------------------------------- 04
  {
    slug: "xss-04",
    tid: "ps-xss-dom",
    title: "DOM-based XSS: Serangan yang Tidak Pernah Sampai ke Server",
    minutes: 11,
    source: {
      label: "PortSwigger — DOM-based cross-site scripting",
      url: "https://portswigger.net/web-security/cross-site-scripting/dom-based",
    },
    untukApa: [
      "DOM XSS hidup sepenuhnya di client-side — WAF dan log server tidak melihatnya. Metode pengujian berbeda dari reflected/stored.",
      "Konsep source → sink di sini adalah fondasi mengaudit SPA modern (termasuk Next.js app yang sedang kamu pakai).",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Client-side JavaScript mengambil data dari SOURCE tidak tepercaya (location.search, location.hash, postMessage, referrer, storage) dan menuliskannya ke SINK berbahaya tanpa aman.",
          "Contoh sink klasik: document.write, innerHTML, eval, dan pemilih jQuery $() dengan string dinamis. Server tidak pernah tahu — payload tidak dikirim ke sana.",
        ],
        callout:
          "Mental model source→sink: jika ada JALUR dari data yang dikontrol user menuju eksekusi/tulis-DOM tanpa pembersihan, itu DOM XSS — apapun seberapa canggih backend-nya.",
      },
      {
        h: "Dua wajah DOM XSS",
        table: {
          head: ["Wajah", "Wujud"],
          rows: [
            ["Payload dari URL", "location.search / location.hash dibaca lalu ditulis ke DOM → serangan lewat link, mirip reflected"],
            ["Payload dari storage/state", "localStorage/postMessage/JSON konfigurasi → serangan butuh mekanisme penyisipan lain, kadang bertahan lama"],
          ],
        },
      },
      {
        h: "Metode pengujian",
        list: [
          "Suntik penanda unik ke parameter/hash → JANGAN lihat view-source: gunakan DevTools → Elements/Search DOM untuk menemukan di mana penanda mendarat.",
          "Analisa konteks DOM: di dalam elemen? atribut? string JS?",
          "Temukan sink: baca JS halaman (atau bundle) → cari document.write/innerHTML/$()/eval dan telusuri datanya.",
          "Rancang payload yang keluar dari konteks (break-out) → uji eksekusi.",
        ],
        p: [
          "Perbedaan penting dengan reflected: di DOM XSS, permintaan HTTP bisa terlihat 100% normal. Itulah kenapa scanner berbasis respons sering melewatkan — pengujian harus di browser.",
        ],
      },
    ],
    lab: {
      title: "Lab — DOM XSS in document.write sink using location.search",
      intro: "Sink: document.write. Source: location.search. Payload harus keluar dari atribut img.",
      steps: [
        "Start lab → ketik string penanda acak di search → submit.",
        "Inspect elemen hasil → temukan penandamu di dalam atribut src sebuah <img> (ditulis oleh document.write).",
        "Rancang break-out dari atribut: tutup kutip & tag lalu muat payload → kirim \"><svg onload=alert(1)> di search.",
        "Popup muncul → lab solved.",
      ],
      hint: "Konteksnya ATRIBUT, bukan teks HTML — makanya payload dimulai dengan \" untuk menutup atribut sebelum memasukkan tag baru.",
    },
    quiz: [
      {
        q: "Definisi pasangannya: source adalah… dan sink adalah…",
        options: [
          "source = server, sink = database",
          "source = data tidak tepercaya yang dibaca JS (URL/hash/…); sink = lokasi berbahaya tempat data ditulis (document.write/innerHTML/eval)",
          "source = WAF, sink = WAF",
          "source = payload, sink = korban",
        ],
        answer: 1,
        why: "DOM XSS = jalur dari source (data dikontrol user yang dibaca client-side) menuju sink (penulisan/eksekusi berbahaya) tanpa sanitasi.",
      },
      {
        q: "Kenapa DOM XSS sering terlewat oleh scanner berbasis respons…",
        options: [
          "Karena scanner lambat",
          "Karena payload tidak pernah muncul di respons server — seluruh serangan terjadi di browser",
          "Karena WAF memblokir scanner",
          "Karena payload harus di-encode",
        ],
        answer: 1,
        why: "Eksekusi terjadi murni client-side dari data URL/hash yang diproses JS. Respons HTTP bisa terlihat normal — pengujian harus dilakukan di DOM browser.",
      },
      {
        q: "Untuk menemukan di mana penandamu mendarat di DOM XSS, alat yang tepat…",
        options: [
          "View-source (Ctrl+U)",
          "DevTools → Elements / Search di DOM hidup",
          "curl -I",
          "Dig DNS lookup",
        ],
        answer: 1,
        why: "DOM dimodifikasi SETELAH halaman jalan — view-source hanya menunjukkan HTML awal. DevTools Elements menampilkan DOM hidup tempat sink bekerja.",
      },
    ],
  },

  // ---------------------------------------------------------- 05
  {
    slug: "xss-05",
    tid: "ps-xss-jquery",
    title: "Lab Anatomy: DOM XSS via jQuery Selector + Hash",
    minutes: 10,
    source: {
      label: "PortSwigger — Lab: DOM XSS in jQuery selector sink (hash change)",
      url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event",
    },
    untukApa: [
      "Versi DOM XSS yang lebih jeli: sink-nya pemilih jQuery $(), source-nya location.hash, dan korban adalah 'auto-scroll' antar post.",
      "Lab ini mengajarkan pola serangan yang butuh DELIVERY: kamu tidak cukup memicu di browser sendiri — kamu harus mengantarkan payload ke korban (bot).",
    ],
    sections: [
      {
        h: "Kondisi kerentanan",
        p: [
          "Home page memakai $() jQuery untuk scroll otomatis ke post yang judulnya diambil dari location.hash. Pemilih jQuery dengan input tidak tepercaya = sink XSS (dulu versi jQuery lama melewatkan HTML di pemilih).",
          "location.hash TIDAK dikirim ke server — serangan murni client-side dan butuh korban membuka URL dengan hash tertentu, lalu hash-change terpicu.",
        ],
        callout:
          "Karena hash tidak pernah menyentuh server, satu-satunya cara mengantarkan payload ke korban adalah halaman yang KAMU kontrol yang memicu perubahan hash di frame target — di situlah exploit server lab berperan (iframe).",
      },
      {
        h: "Mekanika serangan",
        list: [
          "Amati kode di home page: pemilih $() dipakai dengan data dari hash → sink terkonfirmasi.",
          "Buka exploit server lab → buat halaman berisi iframe yang menunjuk ke home page target.",
          "onload iframe mengubah src dengan menambahkan #<payload> → memicu hashchange di target → $() memproses payload.",
          "Payload dipilih agar memanggil print() (versi aman untuk iframe cross-origin).",
          "Store + View exploit → simulasi korban membuka halamanmu → print() terpanggil di browser bot → solved.",
        ],
        p: [
          "Pola 'iframe + hash manipulation' adalah template delivery umum untuk semua bug yang hidup di hash/fragment.",
        ],
      },
      {
        h: "Variasi keluarga sink jQuery lain yang perlu dikenali",
        list: [
          "$('…' + userInput) — pemilih dinamis (lab ini).",
          ".html(userInput) — penulisan HTML langsung, sink klasik.",
          ".attr('href', userInput) → javascript: URL untuk link yang diklik.",
          "$.globalEval / eval dengan data tidak tepercaya.",
        ],
      },
    ],
    lab: {
      title: "Lab — DOM XSS in jQuery selector sink (hash-change)",
      intro: "Target: buat korban (bot lab) mengeksekusi print() lewat iframe + hash.",
      steps: [
        "Start lab → periksa kode home page (DevTools) → temukan pemilih $() yang memakai location.hash.",
        "Buka exploit server dari banner lab.",
        "Di Body, tulis iframe yang menunjuk home page lab dan memicu payload saat onload: iframe → onload mengubah src menambahkan '#<img src=x onerror=print()>'.",
        "Store → View exploit → bot membuka halamanmu → print() terpanggil → lab solved.",
      ],
      hint: "Jangan uji payload di tab kamu sendiri dan berhenti di situ — lab ini mensyaratkan DELIVERY ke korban. Uji akhir selalu lewat View exploit.",
    },
    quiz: [
      {
        q: "Kenapa serangan lab ini butuh iframe/exploit server padahal reflected tidak…",
        options: [
          "Karena payload terlalu panjang untuk URL",
          "Karena hash tidak pernah dikirim ke server dan hash-change harus DIPICU — korban butuh mekanisme pemicu dari halaman attacker",
          "Karena jQuery tidak mendukung URL",
          "Karena lab-nya susah",
        ],
        answer: 1,
        why: "Tidak ada request server yang membawa payload (hash tidak dikirim). Serangan butuh halaman milik attacker yang memicu perubahan hash di konteks target (iframe).",
      },
      {
        q: "Sink di lab ini adalah…",
        options: ["document.write", "Pemilih $() jQuery dengan input dari hash", "innerHTML pada div", "eval pada JSON"],
        answer: 1,
        why: "Kode home page memakai $() untuk mencari post berdasarkan judul dari location.hash — pemilih dinamis jQuery = sink XSS.",
      },
      {
        q: "Variasi sink jQuery lain yang juga berbahaya…",
        options: [".html(userInput)", ".text(userInput)", ".css('color','red')", "$('.a') statis"],
        answer: 0,
        why: ".html() menulis HTML mentah ke DOM = sink klasik. .text() aman (encoding teks), .css() statis dan pemilih tanpa input dinamis tidak mengeksekusi string.",
      },
    ],
  },

  // ---------------------------------------------------------- 06
  {
    slug: "xss-06",
    tid: "ps-xss-prevent",
    title: "Mencegah XSS: Encode di Konteks yang Tepat + CSP",
    minutes: 10,
    source: {
      label: "PortSwigger — How to prevent XSS attacks",
      url: "https://portswigger.net/web-security/cross-site-scripting#how-to-prevent-xss-attacks",
    },
    untukApa: [
      "Fix recommendation yang tepat menaikkan kualitas report bounty-mu — dan 'encode output' saja sering salah kaprah.",
      "Kamu juga sedang membangun web app (tracker ini): prinsip di sini berlaku langsung ke kodemu.",
    ],
    sections: [
      {
        h: "Empat lapis pencegahan (kombinasi, bukan pilih satu)",
        table: {
          head: ["Lapis", "Inti", "Catatan praktis"],
          rows: [
            ["Filter input saat masuk", "Validasi ketat sesuai yang diharapkan (tipe/format/panjang)", "Bukan pengganti encoding — hanya mengurangi permukaan"],
            ["Encode data saat keluar", "Konteks output menentukan encoding: HTML, atribut, JS, URL, CSS", "Lapis PALING penting; salah konteks = tetap bocor"],
            ["Header respons", "Content-Type benar + X-Content-Type-Options: nosniff", "Cegah browser menerka konten aktif"],
            ["Content Security Policy", "Pembatasan sumber script; last line of defense", "Mengurangi dampak jika XSS tetap terjadi"],
          ],
        },
        callout:
          "Kesalahan klasik: HTML-encode data yang mendarat di konteks ATRIBUT JS, atau JS-encode data di teks HTML. Encoding yang salah konteks = tidak melindungi apa-apa. Tanya dulu: data ini mendarat DI MANA?",
      },
      {
        h: "Encode di konteks yang benar",
        list: [
          "Teks HTML → HTML entity (&lt; &gt; &amp;).",
          "Nilai atribut → HTML-encode + selalu pakai kutip (tanpa kutip = mudah break-out).",
          "String dalam <script> → JS unicode escape (\\u…), bukan HTML entity.",
          "URL → URL-encode; validasi skema (jangan biarkan javascript:).",
          "CSS → hindari input user di CSS; jika perlu, CSS-encode ketat.",
        ],
      },
      {
        h: "CSP dalam 3 kalimat",
        p: [
          "CSP = header/instruksi meta yang membatasi DARI MANA script boleh berasal dan gaya eksekusi apa yang diizinkan (inline? eval?).",
          "CSP kuat (nonce/hash, tanpa unsafe-inline) mematahkan mayoritas eksploit XSS — payload dari injeksi tidak cocok nonce → tidak dieksekusi.",
          "CSP TIDAK menggantikan encoding: ia mengurangi dampak, bukan memperbaiki akarnya. (Materi bypass CSP ada di lab lanjutan PortSwigger.)",
          "Untuk developer Next.js/React yang membaca ini: React default-nya escape output — bahaya justru di tempat kamu memakai dangerouslySetInnerHTML, href dari input user, atau data dari markdown renderer.",
        ],
      },
    ],
    lab: {
      title: "Lab 0 — Audit konteks output di app sendiri",
      steps: [
        "Pilih satu app-mu (atau template Next.js). Cari semua pemakaian dangerouslySetInnerHTML / innerHTML / href={userInput}.",
        "Untuk tiap lokasi: tentukan konteksnya dan apa encoding yang diterapkan (bukti di kode, bukan asumsi).",
        "Cek header respons app-mu: apakah Content-Type tepat + nosniff aktif? Apakah ada CSP? (curl -I).",
        "Tulis 3 temuan + rekomendasi konkret untuk masing-masing.",
      ],
      hint: "Markdown renderer adalah sumber stored XSS klasik di app modern — cek apakah HTML-nya dibersihkan (sanitizer) sebelum dirender.",
    },
    quiz: [
      {
        q: "Langkah paling fundamental mencegah XSS…",
        options: [
          "Filter input saja cukup",
          "Encode data saat output SESUAI KONTEKS (HTML/atribut/JS/URL), dikombinasikan validasi input, header tepat, dan CSP sebagai lapis terakhir",
          "CSP saja cukup",
          "Matikan JavaScript",
        ],
        answer: 1,
        why: "Kombinasi dengan encode-on-output sebagai inti. Filter input mengurangi, CSP mengurangi dampak — tapi konteks encoding yang memutus jalur injeksi.",
      },
      {
        q: "Data user akan dirender dalam nilai atribut HTML. Encoding yang benar…",
        options: [
          "Tidak perlu encode asal pakai kutip",
          "HTML-encode nilai atribut DAN selalu gunakan kutip ganda pada atribut",
          "URL-encode",
          "Base64",
        ],
        answer: 1,
        why: "Atribut butuh HTML-encoding nilai + kutipan pembatas. Tanpa kutip, spasi/karakter tertentu memungkinkan break-out atribut.",
      },
      {
        q: "Hubungan CSP dengan XSS…",
        options: [
          "CSP memperbaiki akar XSS",
          "CSP adalah lapis terakhir yang membatasi eksekusi script — mengurangi dampak saat XSS tetap terjadi",
          "CSP hanya untuk CSS",
          "CSP membuat XSS mustahil",
        ],
        answer: 1,
        why: "CSP membatasi sumber/mode eksekusi script sehingga payload yang lolos sering gagal dieksekusi — tapi ia bukan perbaikan akar (encoding) dan bisa di-bypass dalam kondisi tertentu.",
      },
    ],
  },

  // ---------------------------------------------------------- 07
  {
    slug: "xss-07",
    tid: "ps-xss-methodology",
    title: "Cheat Sheet & Metodologi XSS untuk Bug Bounty",
    minutes: 12,
    source: {
      label: "PortSwigger — Cross-site scripting (rangkuman topik)",
      url: "https://portswigger.net/web-security/cross-site-scripting",
    },
    untukApa: [
      "Menyatukan 3 tipe + pencegahan jadi prosedur eksekusi per target — checklist yang dipakai berulang di bounty.",
      "XSS juga gerbang ke serangan lanjutan (CSRF assist, account takeover chains) — kualitas report-mu naik saat kamu bisa menjelaskan rantainya.",
    ],
    sections: [
      {
        h: "Peta audit XSS",
        table: {
          head: ["Permukaan", "Uji apa", "Sinyal bug"],
          rows: [
            ["Semua param/field input", "String penanda → map konteks refleksi", "Penanda muncul tanpa encoding di konteks aktif"],
            ["Fitur yang menyimpan", "Penanda tersimpan lalu dirender di mana saja (termasuk panel admin)", "Render ulang memuat penanda mentah"],
            ["Client-side JS", "Source (search/hash/postMessage) → sink (write/innerHTML/$/eval)", "Penanda mendarat di DOM hidup dekat sink"],
            ["Upload file", "Nama file/metadata/SVG/HTML", "Konten aktif dirender di origin situs"],
            ["Header refleksi", "User-Agent/Referer/X-Forwarded-* dirender di halaman error/panel", "Header mentah masuk HTML"],
            ["CSP", "Baca header CSP → cari unsafe-inline/wildcard", "Kebijakan lemah = eskalasi dampak"],
          ],
        },
      },
      {
        h: "Prosedur eksekusi per target (dalam scope!)",
        list: [
          "Recon entry point: semua param, form, upload, header yang direfleksikan, hash yang diproses JS.",
          "Suntik penanda unik ke semuanya → kumpulkan peta konteks (HTML/atribut/JS/URL).",
          "Untuk tiap konteks, buat payload break-out minimal → verifikasi eksekusi (alert/print).",
          "Untuk fitur stored: uji siklus simpan→render, catat SIAPA yang melihat (publik/admin) untuk skala dampak.",
          "Untuk DOM: baca bundle JS → daftar sink → telusuri jalur data → payload konteks-spesifik.",
          "Cek CSP & header: kebijakan lemah = catatan eskalasi di report.",
          "Susun report: lokasi, konteks, payload, bukti, dampak (siapa korban), fix recommendation (encode konteks + CSP).",
        ],
        callout:
          "Etika bounty: gunakan alert/print — bukan payload eksploitasi nyata (exfil data, keylogger) kecuali program eksplisit mengizinkan dan kamu tahu batasnya. Self-XSS di akunmu sendiri biasanya bukan bug; dampaknya muncul saat bisa diantarkan ke korban.",
      },
      {
        h: "Payload cheat mini (per konteks)",
        table: {
          head: ["Konteks", "Pola break-out"],
          rows: [
            ["Teks HTML", "<svg onload=alert(1)> / <script>alert(1)</script>"],
            ["Dalam atribut (\" )", "\" onmouseover=alert(1) x=\" atau \"><svg onload=alert(1)>"],
            ["Dalam blok <script> string", "</script><svg onload=alert(1)>"],
            ["Dalam atribut img src", "\"><svg onload=alert(1)> (lihat lab document.write)"],
            ["URL/href", "javascript:alert(1) (jika skema tak divalidasi)"],
          ],
        },
        p: [
          "Payload di atas hanya PINTU — kuncinya tetap membaca konteks. Setelah track ini, kamu siap ke topik advanced (CSP bypass, dangling markup, mXSS) di lab lanjutan PortSwigger.",
        ],
      },
    ],
    lab: {
      title: "Simulasi mini — susun rencana audit XSS",
      intro: "Drill keputusan: tulis jawabanmu dulu, baru cek hint.",
      steps: [
        "Skenario: target bounty (dalam scope) punya search, komentar blog, profil publik (dengan nama tampilan), dan halaman admin yang menampilkan laporan dari data user. Tulis 7 langkah audit XSS-mu.",
        "Untuk tiap langkah: konteks apa yang kamu petakan, dan payload break-out apa yang relevan.",
        "Tentukan dampak terbaik yang realistis untuk report: XSS mana yang menyerang admin, dan apa artinya bagi program.",
      ],
      hint: "Mata rantai terbaik biasanya: stored XSS di data user → dirender di panel admin → aksi atas nama admin. Search reflected = temuan, profil stored = eskalasi.",
    },
    quiz: [
      {
        q: "Urutan kerja XSS yang benar per target…",
        options: [
          "Hafal payload → kirim semua → selesai",
          "Recon entry point → penanda unik → petakan konteks → payload spesifik konteks → cek CSP → report dengan dampak",
          "Langsung CSP bypass",
          "Brute-force path admin",
        ],
        answer: 1,
        why: "XSS adalah pekerjaan konteks: penanda memetakan DI MANA, konteks menentukan APA payloadnya, CSP & korban menentukan seberapa besar dampaknya.",
      },
      {
        q: "Payload berada di dalam string di blok <script>. Break-out yang benar…",
        options: [
          "\"><svg onload=alert(1)>",
          "</script><svg onload=alert(1)>",
          "javascript:alert(1)",
          "../admin",
        ],
        answer: 1,
        why: "Di dalam string JS di blok script, satu-satunya pintu keluar HTML adalah menutup blok script-nya sendiri (</script>), lalu membuka tag baru.",
      },
      {
        q: "Report XSS terbaik memuat…",
        options: [
          "Payload saja",
          "Lokasi + konteks + payload + bukti eksekusi + SIAPA korban yang terdampak + dampak bisnis + fix (encode konteks, CSP)",
          "Screenshot popup saja",
          "Link ke payload online",
        ],
        answer: 1,
        why: "Kualitas report = reproduksi bersih + dampak dijelaskan (korban admin >> anonim) + rekomendasi fix konkret. Itu yang membuat triage cepat dan rating naik.",
      },
    ],
  },
];
