import type { Lesson } from "./lesson-types";

// ============================================================
// AWS Cloud — Modul 1: Pengantar ke Amazon Web Services
// Ditulis ulang gaya Alif: problem-first, padat, hands-on.
// ============================================================

export const AWS_M1: Lesson[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "aws-01-01",
    tid: "12987",
    title: "Pengantar ke AWS & Peta Kelas",
    minutes: 8,
    untukApa: [
      "Biar kamu tahu peta perjalanan kelas ini dan dua kata kunci yang jadi fondasi SEMUA materi AWS: on-demand dan pay-as-you-go.",
      "Kalau dua konsep ini nempel, sisa kelas tinggal detail.",
    ],
    sections: [
      {
        h: "Masalah yang diselesaikan AWS",
        p: [
          "Bayangkan kamu mau bikin aplikasi versi awal. Cara lama: beli server fisik (puluhan juta), sewa ruangan, pasang AC, bayar listrik, hire orang untuk rawat — semua itu BELUM ada user-nya. Kalau app gagal, semua asset jadi barang mati.",
          "AWS (Amazon Web Services) menawarkan jalan lain: sewa sumber daya IT (server, storage, database) lewat internet, pakai sebanyak apa pun yang kamu butuhkan, kapan pun, dan bayar hanya sesuai pemakaian. AWS sendiri memelihara ratusan layanan dan data center-nya di seluruh dunia.",
        ],
        callout:
          "Dua kata kunci: ON-DEMAND = sumber daya tersedia saat diminta, tanpa kontrak jangka panjang. PAY-AS-YOU-GO = bayar hanya untuk yang kamu konsumsi (per jam, per GB, per request).",
      },
      {
        h: "Peta kelas ini",
        list: [
          "Modul 1 (ini): konsep cloud, model penerapan, manfaat.",
          "Modul 2: Komputasi — EC2, tipe instance, auto scaling, load balancing.",
          "Modul 3: Infrastruktur global & jaringan — Region, AZ, VPC.",
          "Modul 4: Storage & database — S3, EBS, RDS, DynamoDB.",
          "Modul 5: Keamanan — IAM, shared responsibility.",
          "Modul 6: Monitoring, harga, dukungan.",
          "Modul 7+: Migrasi, framework arsitektur, Gen AI di AWS.",
        ],
        p: [
          "Materi kelas ini paralel dengan kurikulum resmi AWS Cloud Practitioner Essentials — artinya yang kamu pelajari di sini adalah bekal langsung untuk ujian sertifikasi CCP.",
        ],
      },
      {
        h: "Analogi yang dipakai di seluruh kelas: laundry kiloan",
        p: [
          "Bandingkan dua dunia. MEMBELI MESIN CUCI untuk rumah = beli server fisik: mahal di muka, kapasitas tetap, kamu yang rawat rusak. MEMBAWA CUCIAN KE LAUNDRY = cloud: datang saat butuh (on-demand), bayar per kilo (pay-as-you-go), mesin bukan urusanmu.",
          "Kalau ada acara besar dan cucian melimpah? Laundry tetap sanggup — kapasitas mereka jauh di atas kebutuhanmu, dan itu bukan biaya kamu. Inilah kenapa startup kecil bisa pakai infrastruktur yang sama dengan korporasi raksasa.",
        ],
      },
    ],
    lab: {
      title: "Lab 1 — Sadar cloud di sekitar kamu",
      intro:
        "Tujuannya bikin konsep 'cloud' turun dari istilah abstrak jadi benda sehari-hari.",
      steps: [
        "Tulis 5 layanan digital yang kamu pakai tiap hari (contoh: Netflix, Tokopedia, WhatsApp).",
        "Untuk tiap layanan, tebak: mana yang butuh server raksasa? kira-kira datanya seberapa besar? traffic-nya rata atau naik-turun?",
        "Pilih 1 layanan yang traffic-nya paling naik-turun — ini contoh terbaik kenapa sewa kapasitas (on-demand) lebih masuk akal daripada beli server untuk puncak beban.",
      ],
      hint: "Netflix jalan di AWS. Ya, kompetitor Amazon pun.",
    },
    quiz: [
      {
        q: "Apa arti model harga pay-as-you-go?",
        options: [
          "Bayar di muka untuk kapasitas setahun penuh",
          "Bayar hanya untuk sumber daya yang benar-benar dikonsumsi",
          "Bayar flat per bulan tanpa peduli pemakaian",
          "Gratis untuk pengguna baru",
        ],
        answer: 1,
        why: "Pay-as-you-go = biaya mengikuti konsumsi. Berhenti pakai, berhenti bayar — beda dengan beli server fisik yang biayanya sudah keluar di muka.",
      },
      {
        q: "Yang dimaksud on-demand pada komputasi cloud adalah…",
        options: [
          "Sumber daya IT bisa didapat saat dibutuhkan tanpa persiapan fisik",
          "Layanan hanya aktif saat jam kerja",
          "Harus menghubungi sales dulu untuk provisioning",
          "Kapasitas harus disiapkan sendiri oleh pelanggan",
        ],
        answer: 0,
        why: "On-demand = butuh 300 server virtual pun bisa dalam hitungan menit, tanpa beli/instal apa pun secara fisik.",
      },
      {
        q: "Mengapa beli server fisik untuk startup dianggap boros?",
        options: [
          "Server fisik lebih lambat dari server cloud",
          "Biaya besar di muka untuk kapasitas yang belum tentu terpakai",
          "Server fisik tidak bisa diakses lewat internet",
          "AWS melarang penggunaan server sendiri",
        ],
        answer: 1,
        why: "Masalah utamanya biaya muka + menebak kapasitas: kurang = aplikasi down saat ramai, lebih = uang terbakar untuk server menganggur.",
      },
      {
        q: "Sertifikasi entry-level AWS yang materinya paralel dengan kelas ini adalah…",
        options: [
          "AWS Solutions Architect Professional",
          "AWS DevOps Engineer",
          "AWS Certified Cloud Practitioner",
          "AWS Machine Learning Specialty",
        ],
        answer: 2,
        why: "CCP (Cloud Practitioner) adalah sertifikasi paling dasar — memvalidasi pemahaman konsep cloud, layanan inti, keamanan, dan model harga AWS.",
      },
    ],
  },

  // ---------------------------------------------------------- 02
  {
    slug: "aws-01-02",
    tid: "12997",
    title: "Model Client-Server",
    minutes: 10,
    untukApa: [
      "Semua interaksi internet berbasis client-server — dan istilah 'server' di AWS nanti konkret jadi EC2 instance. Ini bahasa dasarnya.",
    ],
    sections: [
      {
        h: "Cara kerjanya",
        p: [
          "CLIENT = pihak yang meminta: browser kamu, aplikasi mobile, bahkan program lain. SERVER = pihak yang melayani: menerima request, memvalidasi, memproses, lalu mengembalikan response.",
          "Contoh: kamu buka berita di HP. Browser (client) kirim request HTTP ke server berita. Server cek request-nya sah, ambil artikel dari database, kirim balik HTML — HP kamu merender jadi halaman.",
        ],
        list: [
          "Streaming video? Client minta potongan video, server kirim chunk berurutan.",
          "Login app? Client kirim kredensial, server validasi dan kirim token.",
          "Cek skor match? Client polling endpoint, server balas data JSON.",
        ],
      },
      {
        h: "Terhubung ke AWS",
        p: [
          "Di AWS, 'server' itu bukan mesin baja yang kamu sentuh — melainkan SERVER VIRTUAL bernama Amazon EC2 instance. Kamu menyewa satu instance (atau ratusan), dia terlihat sebagai komputer dengan CPU, RAM, dan disk, tapi fisiknya ada di data center AWS.",
          "Alur laundry-nya: pelanggan (client) datang ke kasir (server) dengan permintaan; kasir validasi (sudah bayar?); jika sah, cucian diproses di mesin; hasil dikembalikan. Aplikasi web: request → validasi → proses → response.",
        ],
        callout:
          "Satu aplikasi nyata hampir selalu = BANYAK jenis request berbeda. Buka DevTools → tab Network → reload halaman ini nanti di lab: satu halaman bisa memicu puluhan request.",
      },
    ],
    lab: {
      title: "Lab 2 — Melihat client-server secara nyata",
      steps: [
        "Buka browser → tekan F12 (DevTools) → pilih tab Network.",
        "Reload halaman apa pun, perhatikan daftar request yang muncul.",
        "Klik request pertama (biasanya dokumen HTML) — lihat kolom Method (GET/POST) dan Status (200).",
        "Hitung total request satu halaman. Itulah berapa kali 'client bertanya ke server' hanya untuk satu tampilan.",
      ],
      hint: "Coba juga buka web kamu sendiri (portofolio!) dan bandingkan jumlah request-nya.",
    },
    quiz: [
      {
        q: "Dalam model client-server, peran client adalah…",
        options: [
          "Menyimpan seluruh data aplikasi secara permanen",
          "Membuat permintaan ke server dan menerima respons",
          "Memvalidasi semua permintaan dari internet",
          "Mengelola listrik data center",
        ],
        answer: 1,
        why: "Client = pihak yang meminta (browser/aplikasi). Server yang menerima, memvalidasi, dan merespons.",
      },
      {
        q: "Server virtual di AWS yang akan sering kamu pakai bernama…",
        options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "AWS Lambda"],
        answer: 0,
        why: "EC2 = Elastic Compute Cloud, server virtual (instance). S3 = storage, RDS = database terkelola, Lambda = kode tanpa server.",
      },
      {
        q: "Saat server menerima request, langkah yang logis dilakukan server adalah…",
        options: [
          "Langsung kirim semua data tanpa cek",
          "Validasi permintaan, proses, lalu kirim respons",
          "Menutup koneksi",
          "Menyalin request ke semua client",
        ],
        answer: 1,
        why: "Validasi dulu (sah? berhak?), lalu proses, lalu respons — persis kasir laundry cek struk sebelum menerima cucian.",
      },
      {
        q: "Contoh komunikasi client-server di kehidupan nyata…",
        options: [
          "Menyalin file lewat flashdisk",
          "Mencetak dokumen lewat kabel USB",
          "Browser meminta halaman dari web server",
          "Menyimpan file di hardisk eksternal",
        ],
        answer: 2,
        why: "Flashdisk/USB/hardisk eksternal = akses lokal, tanpa request-response. Browser ↔ web server adalah contoh klasiknya.",
      },
    ],
  },

  // ---------------------------------------------------------- 03
  {
    slug: "aws-01-03",
    tid: "13002",
    title: "Komputasi Cloud: Definisi Kerja",
    minutes: 12,
    untukApa: [
      "Ini DEFINISI RESMI yang paling sering keluar di ujian: cloud computing = on-demand delivery of IT resources over the internet with pay-as-you-go pricing.",
    ],
    sections: [
      {
        h: "Bedah definisi (3 potongan)",
        table: {
          head: ["Potongan definisi", "Artinya", "Contoh konkret"],
          rows: [
            [
              "On-demand",
              "Sumber daya tersedia saat diminta, tanpa persiapan fisik",
              "Butuh 300 server virtual? Beberapa klik, menit kemudian jalan",
            ],
            [
              "Over the internet",
              "Diakses via web/API dari mana saja",
              "Konsol AWS dari laptop di Pekanbaru mengelola server di Singapura",
            ],
            [
              "Pay-as-you-go",
              "Biaya = pemakaian",
              "Berhenti instance, berhenti bayar komputasinya",
            ],
          ],
        },
      },
      {
        h: "Masalah dunia sebelum cloud",
        p: [
          "Perusahaan harus menebak kapasitas SEBELUM aplikasi launch. Tebakannya salah dua arah:",
        ],
        list: [
          "KURANG → traffic naik tiba-tiba, server kewalahan, pengalaman user hancur (dan revenue ikut).",
          "LEBIH → bayar server idle yang menyala 24 jam untuk traffic yang tak pernah datang.",
          "Dengan cloud, kapasitas mengikuti kebutuhan: naik saat ramai (scale out), turun saat sepi (scale in). Dan server EC2 bisa dimatikan kapan saja — biaya ikut berhenti.",
        ],
      },
      {
        h: "Konsep kunci: undifferentiated heavy lifting",
        p: [
          "Pertanyaan reflektif: apakah kemampuan perusahaanmu menginstal MySQL membuatmu lebih unggul dari kompetitor? Kemungkinan besar tidak. Yang membedakan adalah DATA dan LOGIKA BISNIS-mu, bukan pekerjaan instalasi ulang yang sama yang semua orang lakukan.",
          "Pekerjaan IT generik yang tidak menambah nilai diferensiasi — instal OS, patch keamanan, ganti disk rusak — disebut undifferentiated heavy lifting. AWS mengambil alih bagian ini, kamu fokus ke yang membedakan bisnismu.",
        ],
        callout:
          "Jebakan pemahaman: 'cloud itu selalu lebih murah'. Tidak selalu — untuk beban kerja konstan 24/7 bertahun-tahun, on-premise bisa kompetitif. Nilai utama cloud adalah ELASTISITAS dan kecepatan, bukan sekadar harga.",
      },
    ],
    lab: {
      title: "Lab 3 — Aritmetika: beli vs sewa",
      steps: [
        "Asumsikan server fisik: Rp 40 juta unit + Rp 3 juta/bulan (listrik, AC, ISP, admin).",
        "Kasus A: aplikasi butuh 2 server selama 12 bulan lalu mati total. Hitung total biaya.",
        "Kasus B: EC2 on-demand sekitar $0.046/jam untuk tipe kecil (2 instance). Hitung biaya 12 bulan (1 USD ≈ Rp 15.800).",
        "Bandingkan. Lalu pertanyaan reflektif: kalau aplikasi jalan terus 5 tahun, apakah kesimpulannya berubah? Apa yang membuatnya berubah?",
      ],
      hint: "Kasus A: 2×40jt + 12×2×3jt = 152 juta. Kasus B: 2×0.046×24×365×15.800 ≈ 12,7 juta. Elasticity bukan sekadar kenyamanan.",
    },
    quiz: [
      {
        q: "Definisi resmi cloud computing (versi AWS) menekankan…",
        options: [
          "Kepemilikan perangkat keras secara penuh oleh pelanggan",
          "Pengiriman sumber daya IT on-demand lewat internet dengan harga pay-as-you-go",
          "Virtualisasi yang hanya bisa dijalankan on-premises",
          "Kontrak minimal satu tahun",
        ],
        answer: 1,
        why: "Tiga kuncinya: on-demand + lewat internet + bayar sesuai pakai. Lengkapnya itulah yang membedakan dari sewa server tradisional.",
      },
      {
        q: "Contoh undifferentiated heavy lifting adalah…",
        options: [
          "Merancang logika rekomendasi unik produkmu",
          "Memutakhirkan sistem operasi server mingguan",
          "Menganalisis data pelanggan untuk strategi baru",
          "Merancang UX khas aplikasimu",
        ],
        answer: 1,
        why: "Patch/upgrade OS = pekerjaan generik yang semua orang lakukan tanpa membedakan bisnis. AWS ambil alih, kamu fokus yang membedakan.",
      },
      {
        q: "Risiko 'menebak kapasitas' pada infrastruktur tradisional adalah…",
        options: [
          "Terlalu kecil = down saat ramai; terlalu besar = bayar kapasitas menganggur",
          "Selalu lebih murah dari cloud",
          "Tidak berpengaruh pada pengalaman pengguna",
          "Hanya berlaku untuk database",
        ],
        answer: 0,
        why: "Dua arah rugi: kekurangan kapasitas merusak pengalaman user saat paling penting, kelebihan kapasitas membakar uang diam-diam.",
      },
      {
        q: "Dalam terminologi scaling, menambah kapasitas saat traffic naik disebut…",
        options: ["Scale in", "Scale out", "Scale up only", "Scale off"],
        answer: 1,
        why: "Scale out = menambah. Scale in = mengurangi. Cloud memungkinkan keduanya otomatis mengikuti permintaan.",
      },
    ],
  },

  // ---------------------------------------------------------- 04
  {
    slug: "aws-01-04",
    tid: "13007",
    title: "3 Model Penerapan Cloud",
    minutes: 8,
    untukApa: [
      "Ujian sangat suka memberi skenario lalu minta kamu pilih model: cloud-based, on-premises, atau hybrid. Kuasai pembedanya.",
    ],
    sections: [
      {
        h: "Tiga model dalam satu tabel",
        table: {
          head: ["Model", "Ciri", "Kapan dipilih"],
          rows: [
            [
              "Cloud-based",
              "Seluruh aplikasi berjalan di cloud",
              "Aplikasi baru, atau migrasi penuh. Mulai dari infrastruktur mentah (VM) atau layanan terkelola",
            ],
            [
              "On-premises (private cloud)",
              "Virtualisasi di data center milik sendiri",
              "Kontrol penuh + regulasi/kompleksitas yang memaksa tetap lokal",
            ],
            [
              "Hybrid",
              "Cloud + on-premises terhubung",
              "Aplikasi lama belum pindah, atau aturan mengharuskan data tertentu di lokal",
            ],
          ],
        },
      },
      {
        h: "Pembeda cepat",
        list: [
          "Semua komponen (server, DB, jaringan) di cloud → cloud-based.",
          "Semua komponen di data center sendiri, tapi memakai virtualisasi → on-premises / private cloud.",
          "Campuran, ada koneksi antara keduanya → hybrid. Kata kunci: KONEKSI ANTARA DUA DUNIA.",
        ],
        callout:
          "Konteks Indonesia: bank dan instansi pemerintah sering diwajibkan regulasi menyimpan data tertentu di dalam negeri / di infrastruktur sendiri. Solusinya bukan menolak cloud, tapi hybrid — data sensitif lokal, layanan elastis di cloud.",
      },
    ],
    lab: {
      title: "Lab 4 — Klasifikasi skenario",
      steps: [
        "Skenario 1: startup baru, nol legacy system, mau cepat rilis.",
        "Skenario 2: perusahaan dengan data center 10 tahun berisi aplikasi core yang terlalu berisiko dimigrasi, tapi mau pakai AI/ML di cloud.",
        "Skenario 3: lembaga yang regulasinya melarang data keluar dari gedung sendiri.",
        "Tentukan model penerapan untuk tiap skenario, tulis alasannya satu kalimat.",
      ],
      hint: "1 = cloud-based, 2 = hybrid, 3 = on-premises. Alasanmu yang menentukan skor ujian, bukan tebakan.",
    },
    quiz: [
      {
        q: "Perusahaan menjalankan aplikasi lama di data center sendiri sambil memakai layanan analitik di cloud, keduanya saling terhubung. Modelnya?",
        options: ["Cloud-based", "On-premises", "Hybrid", "Serverless"],
        answer: 2,
        why: "Ada dua dunia + koneksi di antaranya = hybrid. Kombinasi inilah definisi intinya.",
      },
      {
        q: "On-premises deployment tetap disebut 'private cloud' karena…",
        options: [
          "Menggunakan internet publik untuk semua traffic",
          "Memakai teknologi virtualisasi di infrastruktur milik sendiri",
          "Menyewa kapasitas dari penyedia cloud",
          "Selalu lebih murah",
        ],
        answer: 1,
        why: "Kata 'cloud'-nya datang dari virtualisasi & self-service; kata 'private'-nya dari kepemilikan infrastrukturnya.",
      },
      {
        q: "Startup baru tanpa beban legacy paling wajar memilih…",
        options: ["On-premises", "Cloud-based", "Hybrid", "Tanpa server fisik sama sekali"],
        answer: 1,
        why: "Tanpa legacy dan tanpa regulasi yang mengikat, cloud-based penuh memberi kecepatan rilis dan biaya awal nol besar.",
      },
      {
        q: "Alasan paling sah memilih hybrid adalah…",
        options: [
          "Hybrid selalu paling murah",
          "Aplikasi lama lebih baik dikelola lokal dan/atau regulasi mensyaratkan data di lokal",
          "Hybrid tidak butuh keamanan",
          "AWS tidak menyediakan layanan lengkap",
        ],
        answer: 1,
        why: "Hybrid dipilih karena KETERBATASAN nyata (teknis legacy atau kepatuhan), bukan karena selalu lebih murah.",
      },
    ],
  },

  // ---------------------------------------------------------- 05
  {
    slug: "aws-01-05",
    tid: "13012",
    title: "6 Manfaat Komputasi Cloud",
    minutes: 10,
    untukApa: [
      "Enam manfaat ini hampir pasti muncul di ujian dalam bentuk skenario. Pola soalnya: 'perusahaan X menghemat Y → manfaat apa?'",
    ],
    sections: [
      {
        h: "Enam manfaat + cara mengenali di soal",
        table: {
          head: ["Manfaat", "Inti", "Sinyal di soal ujian"],
          rows: [
            [
              "Trade upfront → variable expense",
              "Tidak perlu investasi besar di muka",
              "'mengurangi biaya awal', 'tidak ingin membeli server'",
            ],
            [
              "Stop spending on DC maintenance",
              "Tidak lagi rawat DC fisik",
              "'tidak ingin mengelola rak, listrik, AC'",
            ],
            [
              "Stop guessing capacity",
              "Kapasitas mengikuti permintaan",
              "'tidak yakin traffic', 'scale sesuai kebutuhan'",
            ],
            [
              "Economies of scale",
              "Harga per unit turun karena skema ratusan ribu pelanggan",
              "'harga lebih murah dari membangun sendiri'",
            ],
            [
              "Speed & agility",
              "Sumber daya siap dalam menit, bukan minggu",
              "'cepat bereksperimen', 'time to market'",
            ],
            [
              "Go global in minutes",
              "Deploy di region dekat user di belahan dunia lain",
              "'pengguna global', 'latensi rendah untuk user di mana saja'",
            ],
          ],
        },
      },
      {
        h: "Bedah dua yang paling sering tertukar",
        p: [
          "Variable expense vs economies of scale: yang pertama soal KAPAN uang keluar (di muka vs sesuai pakai); yang kedua soal BERAPA besar per unit (murah karena AWS belanja raksasa untuk ratusan ribu pelanggan, dan itu diteruskan ke kamu).",
          "Speed & agility vs go global: yang pertama soal SECEPAT APA resource siap untuk tim; yang kedua soal MENJANGKAU pengguna dunia dengan deploy multi-region dalam menit.",
        ],
        callout:
          "Latihan mental: untuk setiap berita startup ('X berhasil uji pasar dalam 2 minggu'), coba tebak kombinasi manfaat mana yang berperan. Dua minggu untuk uji pasar = speed & agility + variable expense (tidak ada capex).",
      },
    ],
    lab: {
      title: "Lab 5 — Match manfaat ke studi kasus",
      steps: [
        "Kasus: waralana kopi mau buka aplikasi pemesanan; mereka takut investasi server, tidak tahu traffic-nya (bisa viral bisa sepi), dan penggemarnya ada di 4 negara.",
        "Tuliskan: manfaat # mana saja yang relevan, dan mapping ke kekhawatiran mana.",
        "Skenario ekstra: bisnisnya GAGAL bulan ke-3. Bandingkan nasib asetnya jika mereka membeli server fisik vs pakai cloud. Manfaat mana yang menyelamatkan dompet mereka?",
      ],
      hint: "Viral → stop guessing capacity. Global → go global in minutes. Gagal bulan 3 → variable expense menyelamatkan: tidak ada aset mati Rp 100 juta.",
    },
    quiz: [
      {
        q: "Perusahaan tidak perlu lagi memprediksi kebutuhan kapasitas server di muka. Manfaat?",
        options: [
          "Economies of scale",
          "Stop guessing capacity",
          "Go global in minutes",
          "Increase speed and agility",
        ],
        answer: 1,
        why: "Stop guessing capacity = kapasitas naik-turun (scale out/in) mengikuti permintaan nyata, bukan tebakan.",
      },
      {
        q: "Harga per jam EC2 yang lebih murah daripada biaya operasional server sendiri terjadi karena…",
        options: [
          "AWS memberi diskon agar pengguna loyal",
          "Economies of scale dari ratusan ribu pelanggan",
          "Server AWS lebih lemah",
          "Kualitas hardware lebih rendah",
        ],
        answer: 1,
        why: "Skala pembelian AWS (hardware, listrik, jaringan) menekan biaya per unit — dan skema pay-as-you-go meneruskannya ke pelanggan.",
      },
      {
        q: "Tim riset bisa mencoba ide baru berulang kali tanpa menunggu pengadaan server berminggu-minggu. Manfaat?",
        options: [
          "Go global in minutes",
          "Trade upfront expense",
          "Increase speed and agility",
          "Economies of scale",
        ],
        answer: 2,
        why: "Sumber daya dalam hitungan menit = eksperimen murah dan cepat → inilah speed & agility.",
      },
      {
        q: "Aplikasi e-commerce ingin latensi rendah untuk pengguna di 3 benua. Manfaat cloud yang paling relevan?",
        options: [
          "Stop spending on data center",
          "Go global in minutes",
          "Variable expense",
          "Stop guessing capacity",
        ],
        answer: 1,
        why: "Deploy replika aplikasi di region dekat pengguna dalam hitungan menit — tanpa membangun DC fisik di tiap benua.",
      },
    ],
  },

  // ---------------------------------------------------------- 06
  {
    slug: "aws-01-06",
    tid: "13017",
    title: "Ikhtisar & Konsolidasi",
    minutes: 6,
    untukApa: [
      "Mengunci Modul 1 ke memori jangka panjang: satu halaman ringkas + istilah wajib hafal + cara lanjut belajar mandiri (whitepaper).",
    ],
    sections: [
      {
        h: "Rangkuman 4 baris",
        list: [
          "Cloud = sumber daya IT on-demand, via internet, bayar per pakai (pay-as-you-go).",
          "Semua interaksi web = client-server; di AWS server-nya = EC2 instance (virtual).",
          "3 model penerapan: cloud-based (penuh di cloud), on-premises/private cloud (sendiri), hybrid (terhubung keduanya).",
          "6 manfaat: variable expense, no DC maintenance, no capacity guessing, economies of scale, speed & agility, go global in minutes.",
        ],
      },
      {
        h: "Checklist istilah wajib",
        table: {
          head: ["Istilah", "Satu kalimat definisi"],
          rows: [
            ["On-demand", "Sumber daya tersedia saat diminta tanpa persiapan fisik"],
            ["Pay-as-you-go", "Biaya mengikuti konsumsi"],
            ["EC2 instance", "Server virtual di AWS"],
            ["Cloud-based", "Semua komponen aplikasi berjalan di cloud"],
            ["Private cloud", "Virtualisasi di data center milik sendiri (on-premises)"],
            ["Hybrid", "Cloud dan on-premises terhubung sebagai satu sistem"],
            ["Scale out / in", "Menambah / mengurangi kapasitas sesuai permintaan"],
            ["Undifferentiated heavy lifting", "Pekerjaan IT generik tanpa nilai diferensiasi — diambil alih AWS"],
          ],
        },
      },
      {
        h: "Belajar mandiri: whitepaper resmi",
        p: [
          "Sumber lanjutan yang paling worth it: whitepaper 'Overview of Amazon Web Services' dan AWS Glossary — keduanya gratis dan JADI SUMBER SOAL ujian. Kebiasaan bagus: tiap selesai modul, cari istilah modul itu di glossary dan baca definisi aslinya satu kali.",
        ],
        callout:
          "Cara tahu kamu siap lanjut: bisa menjelaskan beda cloud-based vs hybrid vs on-premises ke teman dalam 60 detik tanpa buka catatan.",
      },
    ],
    lab: {
      title: "Lab 6 — Mindmap satu halaman",
      steps: [
        "Ambil kertas/whiteboard. Pusat: 'Cloud Computing'.",
        "Cabang: definisi (3 potongan), client-server, 3 model penerapan, 6 manfaat.",
        "Tiap cabang tulis 1 contoh nyata dari hidupmu sendiri (bukan contoh dari materi).",
        "Foto hasilnya — ini jadi cheat sheet Modul 1 kamu.",
      ],
      hint: "Contoh dari kehidupanmu sendiri = tanda kamu paham, bukan hafal.",
    },
    quiz: [
      {
        q: "Rumus definisi cloud computing yang benar:",
        options: [
          "virtual + lokal + bayar di muka",
          "on-demand + lewat internet + pay-as-you-go",
          "hybrid + offline + kontrak tahunan",
          "server fisik + internet + langganan",
        ],
        answer: 1,
        why: "Tiga elemen resminya: on-demand delivery, over the internet, pay-as-you-go pricing.",
      },
      {
        q: "EC2 instance adalah…",
        options: [
          "Layanan penyimpanan objek",
          "Server virtual yang bisa kamu sewa dan kendalikan",
          "Database terkelola",
          "Jaringan privat di AWS",
        ],
        answer: 1,
        why: "EC2 = compute/server virtual. Penyimpanan objek = S3, database = RDS, jaringan privat = VPC (modul-modul berikutnya).",
      },
      {
        q: "Regulasi mewajibkan data nasabah tetap di data center internal, tapi tim data science butuh GPU elastis untuk training. Solusi arsitektur paling tepat?",
        options: [
          "Migrasi penuh ke cloud-based",
          "Tetap on-premises murni dan abaikan kebutuhan GPU",
          "Hybrid: data di on-premises, beban komputasi di cloud",
          "Hapus data nasabah",
        ],
        answer: 2,
        why: "Hybrid menyelesaikan dua kebutuhan yang bertabrakan: kepatuhan (data lokal) + elastisitas (kompute di cloud).",
      },
      {
        q: "Pasangan manfaat yang paling sering tertukar, beserta pembedanya:",
        options: [
          "Speed & agility (seberapa cepat resource siap) vs go global (menjangkau user dunia)",
          "Variable expense vs pay-as-you-go — berbeda konsep",
          "Economies of scale vs on-demand — sama saja",
          "Capacity vs maintenance — sama-sama soal biaya fisik",
        ],
        answer: 0,
        why: "Speed = kecepatan resource untuk TIM; go global = jangkauan ke PENGGUNA dunia lewat multi-region. Pembeda siapa yang diuntungkan.",
      },
    ],
  },

  // ---------------------------------------------------------- 07
  {
    slug: "aws-01-07",
    tid: "13022",
    title: "Knowledge Check — Simulasi 6 Soal",
    minutes: 10,
    untukApa: [
      "Simulasi Knowledge Check Modul 1 dengan gaya soal ujian. Target: 6/6 sebelum lanjut Modul 2.",
    ],
    sections: [
      {
        h: "Cara pakai",
        list: [
          "Kerjakan tanpa membuka materi dulu — ini mengukur, bukan menghafal.",
          "Salah? Baca penjelasannya, catat istilahnya, kerjakan ulang sampai 6/6.",
          "Pool soal di KC asli acak — jadi pahami KONSEP, jangan pola jawaban.",
        ],
      },
    ],
    lab: {
      title: "Lab 7 — Ajarkan balik (Feynman)",
      steps: [
        "Buka chat Hermes Learning.",
        "Jelaskan ke saya: (1) apa itu cloud computing versi kamu, (2) kapan perusahaan harus hybrid, (3) kenapa variable expense mengubah cara startup bergerak.",
        "Saya koreksi dan gali bagian yang masih goyah.",
      ],
      hint: "Kalau kamu bisa menjelaskan tanpa membuka materi ini, kamu siap Modul 2: EC2.",
    },
    quiz: [
      {
        q: "Apa yang dimaksud komputasi cloud?",
        options: [
          "Menyewa server fisik di data center penyedia jasa",
          "On-demand delivery of IT resources over the internet with pay-as-you-go pricing",
          "Membeli server lalu memvirtualisasinya sendiri",
          "Menyimpan data di perangkat mobile",
        ],
        answer: 1,
        why: "Definisi inti: on-demand + internet + pay-as-you-go. Menyewa server fisik berjangka = colocation, bukan cloud.",
      },
      {
        q: "Perusahaan ingin memindahkan seluruh aplikasi baru ke cloud tanpa infrastruktur lokal. Model penerapan?",
        options: ["On-premises", "Hybrid", "Cloud-based", "Private cloud"],
        answer: 2,
        why: "Semua komponen berjalan di cloud = cloud-based deployment.",
      },
      {
        q: "Startup tidak ingin investasi besar untuk server sebelum tahu pasar menerima produknya. Manfaat cloud yang paling relevan?",
        options: [
          "Trade upfront expense for variable expense",
          "Economies of scale",
          "Go global in minutes",
          "Increase speed and agility",
        ],
        answer: 0,
        why: "Kata kunci 'investasi besar di muka' = upfront expense → diubah jadi biaya variabel mengikuti pakai.",
      },
      {
        q: "Saat traffic turun, kapasitas server dikurangi agar biaya ikut turun. Ini contoh…",
        options: ["Scale out", "Scale in", "Scale up fisik", "Provisioning"],
        answer: 1,
        why: "Mengurangi kapasitas = scale in. Menambah = scale out. Dua-duanya otomatis bisa di cloud.",
      },
      {
        q: "Buku (client) di perpustakaan digital meminta file ke server; server memvalidasi lalu mengirim file. Di AWS, peran server ini paling tepat diwakili…",
        options: ["Amazon S3 saja", "Amazon EC2 instance", "AWS IAM", "Amazon Route 53"],
        answer: 1,
        why: "Server yang memproses request = compute = EC2. (S3 bisa menyajikan objek statis, tapi konsep 'server virtual' di modul ini = EC2.)",
      },
      {
        q: "Manfaat 'economies of scale' berarti…",
        options: [
          "Kamu membeli hardware lebih banyak agar murah",
          "Harga lebih rendah karena AWS membeli dalam skala masif untuk semua pelanggan",
          "Diskon untuk pelanggan yang membayar setahun di muka",
          "Biaya turun saat traffic naik",
        ],
        answer: 1,
        why: "Skala pembelian AWS menekan biaya per unit; manfaat ini diteruskan ke pelanggan lewat harga pay-as-you-go yang kompetitif.",
      },
    ],
  },
];
