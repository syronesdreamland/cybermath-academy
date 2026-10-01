import type { Lesson } from "./lesson-types";

// ============================================================
// Track ML Dicoding 184 — batch 1 (Section 2 + Section 3): 9 lesson
// Rewrite internal dari materi "Belajar Machine Learning untuk Pemula"
// (parafrase + contoh sendiri, bukan salinan). Link sumber asli dicantumkan.
// ============================================================

const SRC = "Dicoding — Belajar Machine Learning untuk Pemula";

export const ML_LESSONS: Lesson[] = [
  {
    slug: "ml-01",
    tid: "8318",
    title: "Apa Itu Machine Learning?",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8318" },
    untukApa: [
      "Sebelum menyentuh algoritma apa pun, kamu butuh satu jawaban kerja: apa yang sebenarnya berbeda antara program biasa dan machine learning — karena semua materi selanjutnya bertumpu di beda itu.",
      "Jawaban ini juga yang menjelaskan posisi ML di dalam AI, neural network, dan Gen AI — istilah yang sering tertukar di mana-mana.",
    ],
    sections: [
      {
        h: "Definisi kerja",
        p: [
          '"A field of study that gives computers the ability to learn without being explicitly programmed" — Arthur Samuel, 1959.',
          "Kuncinya kata EXPLICITLY: pada pemrograman tradisional, manusia menulis semua aturan (if/else). Pada ML, manusia menyediakan DATA + JAWABANNYA, lalu mesin yang menemukan aturannya sendiri.",
        ],
        code: "# Paradigma tradisional: aturan ditulis manusia\nif kecepatan < 4:   aktivitas = 'BERJALAN'\nelif kecepatan < 8: aktivitas = 'JOGING'\nelse:               aktivitas = 'BERLARI'\n# Kaku: berlari lambat? bawa beban? -> salah terus\n\n# Paradigma ML: data + label -> model menemukan aturan\n# input:  [kecepatan, detak jantung, langkah/menit] (data)\n# output: ['BERJALAN' | 'JOGING' | 'BERLARI']       (label)\n# model = f(data, label)  ->  aturan hasil BELAJAR, bukan tulisan tangan",
        callout: "ML membalik panah: tradisional = aturan+data → jawaban. ML = data+jawaban → aturan. Inilah kenapa ML bisa menangkap pola yang tidak terpikir oleh penulis aturan.",
      },
      {
        h: "Peta istilah: AI ⊃ ML ⊃ NN/DL; Gen AI cabang sendiri",
        table: {
          head: ["Istilah", "Definisi", "Contoh nyata"],
          rows: [
            ["AI", "Payung besar: mesin mengerjakan tugas yang butuh kecerdasan manusia", "Aturan if/else canggih pun termasuk AI"],
            ["Machine Learning", "Cabang AI: belajar pola dari data tanpa diprogram eksplisit", "Filter spam Gmail"],
            ["Neural Network", "Model matematis terinspirasi jaringan saraf, lapisan-lapisan neuron", "Pengenal gambar"],
            ["Deep Learning", "ML dengan NN BANYAK lapisan (DNN) — representasi makin abstrak", "Pengenalan wajah, ChatGPT"],
            ["Gen AI", "Cabang AI yang MENGHASILKAN konten baru (teks, gambar, musik, video)", "Image generator, LLM"],
          ],
        },
      },
      {
        h: "Data vs label — kosakata wajib",
        p: [
          "DATA = informasi yang dimiliki (fitur: kecepatan, detak jantung). LABEL = hal yang ingin diprediksi (jenis aktivitas).",
          "Model belajar mencocokkan data → label dari contoh. Makin banyak contoh yang relevan, makin baik aturan yang ditemukannya.",
        ],
      },
    ],
    lab: {
      title: "Beda paradigma dengan tangan sendiri",
      intro: "Rasakan batas aturan-manusia sebelum menyelam ke model.",
      steps: [
        "Tulis detektor aktivitas berbasis if/else: <4 km/jam berjalan, 4–8 jogging, >8 berlari.",
        "Uji dengan data aneh: 7.5 km/jam sambil bawa tas berat (seharusnya jogging berat?), 9.9 di turunan (bukan berlari).",
        "Catat minimal 3 kasus yang salah klasifikasi — itu batas aturan statis.",
        "Jawab: data apa yang seharusnya dikumpulkan supaya model ML bisa membedakan kasus itu? (hint: bukan cuma kecepatan).",
        "Cek pemahaman istilah: filter spam itu ML, DL, atau Gen AI? (ML klasik — klasifikasi teks).",
      ],
      hint: "Semakin banyak aturan if/else yang kamu butuhkan untuk kasus edge, semakin jelas itu pekerjaan untuk model — bukan untuk tanganmu.",
    },
    quiz: [
      {
        q: "Perbedaan inti ML dari pemrograman tradisional:",
        options: [
          "ML selalu lebih cepat dieksekusi",
          "ML menemukan aturan dari data+jawaban; tradisional aturan ditulis manusia",
          "ML tidak membutuhkan data",
          "Tradisional tidak bisa dipakai di produksi",
        ],
        answer: 1,
        why: "Paradigma ML: data + label masuk, aturan (model) yang keluar. Tradisional: aturan + data masuk, jawaban yang keluar. Kecepatan bukan pembedanya.",
      },
      {
        q: "ChatGPT dan image generator termasuk...",
        options: ["Deep Learning", "Gen AI", "Machine Learning klasik", "AI berbasis aturan"],
        answer: 1,
        why: "Gen AI = cabang AI yang menghasilkan konten baru. Deep learning adalah teknik di baliknya, tapi kategorinya Gen AI karena output-nya konten.",
      },
      {
        q: "Hubungan taksonomi yang benar:",
        options: [
          "DL ⊃ ML ⊃ AI",
          "AI ⊃ ML ⊃ DL, dengan Gen AI sebagai cabang tersendiri",
          "AI dan ML tidak berhubungan",
          "ML ⊃ AI ⊃ DL",
        ],
        answer: 1,
        why: "AI payung terluas, ML cabangnya, DL = ML dengan neural network berlapis banyak. Gen AI cabang AI yang fokus menghasilkan konten.",
      },
      {
        q: "Dalam konteks ML, 'label' adalah...",
        options: [
          "Nama kolom di dataset",
          "Hal yang ingin diprediksi / jawaban dari tiap contoh",
          "Versi library yang dipakai",
          "Jenis chart di visualisasi",
        ],
        answer: 1,
        why: "Label (target) = jawaban yang dipelajari model dari tiap contoh. Fitur = input-nya. Tanpa label di data latih, kamu tidak sedang melakukan supervised learning.",
      },
    ],
  },
  {
    slug: "ml-02",
    tid: "8326",
    title: "8 Komponen Utama ML",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8326" },
    untukApa: [
      "Ini peta seluruh perjalanan ML — dari bahan mentah sampai model hidup di produksi. Setiap fase track ini akan membedah satu dari komponen-komponen ini.",
      "Punya peta = tahu di mana dirimu berada dan apa langkah berikutnya, tidak tersesat di tengah project.",
    ],
    sections: [
      {
        h: "Peta lengkap",
        table: {
          head: ["Komponen", "Apa itu", "Contoh konkret"],
          rows: [
            ["Data", "Bahan dasar: fitur (input) + label (target); harus bersih & representatif", "Gambar iris berlabel spesies"],
            ["Algoritma", "Prosedur yang menentukan CARA model belajar dari data", "Gradient Descent, pohon keputusan"],
            ["Model", "HASIL belajar: aturan matematis yang siap memprediksi", "File model spam-vs-ham"],
            ["Feature engineering", "Mengubah data mentah jadi fitur yang lebih informatif", "Frekuensi kata dari teks email"],
            ["Training", "Proses model menyesuaikan parameter memakai data latih", "Fit(model, X_train, y_train)"],
            ["Evaluation", "Menilai kinerja di data yang TIDAK dilatih", "Confusion matrix, akurasi, MAE"],
            ["Hyperparameter tuning", "Menyetel konfigurasi di LUAR model (tidak dipelajari saat training)", "n_estimators di Random Forest"],
            ["Deployment", "Model dipasang ke aplikasi nyata untuk dipakai user", "API Flask melayani prediksi"],
          ],
        },
        callout: "Urutan yang nanti kamu jalankan persis mengikuti tabel ini: data → fitur → algoritma → training → evaluasi → tuning → deployment. Rangkuman Workflow (ml-09) menyambungkan semuanya.",
      },
      {
        h: "Tiga pasangan yang sering tertukar",
        list: [
          "Algoritma vs model: algoritma = RESEP (cara belajar); model = MASAKAN hasilnya (bisa dipakai prediksi).",
          "Data vs fitur: data mentah masih kotor; fitur = kolom bersih siap dimakan model.",
          "Parameter vs hyperparameter: parameter dipelajari model saat training (bobot); hyperparameter disetel manusia SEBELUM training (jumlah pohon).",
        ],
      },
    ],
    lab: {
      title: "Bedah satu use case ke 8 komponen",
      intro: "Ambil kasus nyata dan pecah jadi komponen — latihan memetakan yang dipakai tiap project ML.",
      steps: [
        "Pilih kasus: deteksi transaksi kartu curang (fraud).",
        "Tuliskan Data-nya: fitur apa saja? (nominal, lokasi, jam, device...) label-nya apa? (fraud/bukan).",
        "Algoritma apa yang masuk akal? Kenapa klasifikasi, bukan regresi?",
        "Feature engineering: fitur baru apa bisa dibuat? (mis. jarak antar transaksi 5 menit).",
        "Evaluation: metrik apa? Kenapa akurasi saja berbahaya kalau fraud cuma 0.1% data?",
        "Hyperparameter + deployment: satu contoh hyperparameter, dan model ini dipasang di mana?",
      ],
      hint: "Kalau jawaban evaluasimu 'akurasi tinggi = bagus', pikirkan ulang: model yang selalu menjawab 'bukan fraud' mendapat 99.9% akurasi dan 0% guna. Metrik pentingnya nanti di ml-07.",
    },
    quiz: [
      {
        q: "Beda algoritma dan model dalam ML:",
        options: [
          "Sama, hanya beda istilah",
          "Algoritma = prosedur cara belajar; model = hasil belajar yang siap prediksi",
          "Algoritma berjalan di GPU; model di CPU",
          "Model ditulis manusia; algoritma belajar sendiri",
        ],
        answer: 1,
        why: "Algoritma adalah resep/prosedur (mis. gradient descent); model adalah hasilnya — kumpulan aturan/parameter terlatih yang bisa memprediksi.",
      },
      {
        q: "Hyperparameter adalah...",
        options: [
          "Parameter yang dipelajari model selama training",
          "Konfigurasi di luar model yang disetel manusia sebelum/di luar training",
          "Nilai bobot hasil training",
          "Jenis grafik evaluasi",
        ],
        answer: 1,
        why: "Hyperparameter (mis. jumlah pohon, learning rate) TIDAK dipelajari dari data — ia disetel manual atau lewat pencarian otomatis. Parameter (bobot) yang dipelajari training.",
      },
      {
        q: "Proses mengubah teks email mentah menjadi frekuensi kata adalah contoh...",
        options: ["Deployment", "Feature engineering", "Hyperparameter tuning", "Data collecting"],
        answer: 1,
        why: "Feature engineering = mengubah data mentah menjadi fitur yang lebih relevan/informatif untuk model. Teks mentah tidak bisa dihitung; frekuensi kata bisa.",
      },
      {
        q: "Tahap terakhir supaya model bisa dikonsumsi user nyata:",
        options: ["Training", "Evaluation", "Deployment", "Feature engineering"],
        answer: 2,
        why: "Deployment mengintegrasikan model terlatih ke aplikasi/sistem produksi (API, web app, edge device) — tanpa ini model cuma file di notebook.",
      },
    ],
  },
  {
    slug: "ml-03",
    tid: "8382",
    title: "4 Jenis Machine Learning",
    minutes: 14,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8382" },
    untukApa: [
      "Pertanyaan pertama di setiap project ML: dataku berlabel atau tidak, berlabel penuh atau sebagian? Jawabannya menentukan jenis pembelajaran — dan algoritma yang cocok.",
      "Empat jenis ini adalah kerangka klasifikasi untuk hampir semua teknik yang akan kamu pelajari di sisa track.",
    ],
    sections: [
      {
        h: "Supervised learning — belajar dengan kunci jawaban",
        p: [
          "Data dilatih LENGKAP: tiap contoh punya input (fitur) dan output (label). Model belajar hubungan fitur → label, lalu memprediksi label data baru.",
          "Analogi guru-murid: murid (model) belajar dari soal-soal yang sudah ada kunci jawabannya (data berlabel).",
          "Dua anak cabang: klasifikasi (label kategori: spam/ham) dan regresi (label angka kontinu: harga rumah).",
        ],
        code: "# data latih: fitur -> label\n# 140 m2, 3 kamar, Jakarta -> Rp 1.2 M\n# 90 m2, 2 kamar, Depok   -> Rp 650 jt\n# model belajar pola, lalu:\n# 120 m2, 3 kamar, Bogor  -> prediksi: ...?",
      },
      {
        h: "Unsupervised learning — mencari pola tanpa kunci jawaban",
        p: [
          "Data TANPA label — hanya fitur. Model mencari struktur tersembunyi: pengelompokan (clustering), asosiasi, reduksi dimensi.",
          "Contoh: data mobil (merek, tahun, jarak tempuh) tanpa label → model mengelompokkan sendiri: kelompok Toyota jarak rendah, Ford jarak tinggi, dst. Kelompok hasil clustering lalu bisa jadi label baru.",
        ],
        callout: "Uji cepat: kalau kamu BISA menyebut jawaban benar tiap contoh = supervised. Kalau kamu justru INGIN menemukan kelompok/anomali = unsupervised.",
      },
      {
        h: "Semi-supervised learning — sedikit berlabel, banyak tidak",
        p: [
          "Realita lapangan: melabel mahal (butuh manusia/ahli), data mentah murah. SSL memanfaatkan keduanya: sedikit data berlabel + banyak data tak berlabel.",
          "Contoh klasik: beberapa foto berlabel 'anjing/kucing' + ribuan foto tanpa label → model belajar lebih baik daripada memakai sedikit data berlabel saja.",
        ],
      },
      {
        h: "Reinforcement learning — belajar dari imbalan",
        p: [
          "Tidak ada dataset statis: ada AGENT, LINGKUNGAN, AKSI, dan REWARD. Agent belajar strategi (policy) dengan mencoba aksi dan menerima reward/penalty.",
          "Contoh: bot main game (reward = skor), robot berjalan (reward = jarak, penalty = jatuh), optimasi tata letak iklan.",
        ],
      },
      {
        h: "Peta keputusan memilih jenis",
        table: {
          head: ["Kondisimu", "Jenis", "Contoh algoritma"],
          rows: [
            ["Punya data + label, label kategori", "Supervised — klasifikasi", "KNN, Decision Tree, SVM, Naive Bayes"],
            ["Punya data + label, label angka", "Supervised — regresi", "Linear Regression, SVR"],
            ["Data tanpa label, cari kelompok", "Unsupervised — clustering", "K-Means, DBSCAN, HC"],
            ["Sedikit label + banyak data mentah", "Semi-supervised", "Self-training, label propagation"],
            ["Interaksi sequential + reward", "Reinforcement", "Q-learning, DQN"],
          ],
        },
      },
    ],
    lab: {
      title: "Klasifikasi 10 kasus",
      intro: "Latihan kerangka berpikir: untuk tiap kasus, tentukan jenis ML-nya dan alasannya.",
      steps: [
        "Deteksi spam email (ada folder spam bawaan yang bisa jadi label).",
        "Kelompokkan pelanggan mall berdasarkan perilaku belanja (tidak ada kategori bawaan).",
        "Prediksi harga saham besok (harga = angka).",
        "Bot navigasi labirin (skor naik saat sampai tujuan).",
        "Anomali transaksi bank tanpa data fraud historis.",
        "Diagnosis X-ray dengan 500 foto berlabel dokter + 50.000 foto tanpa label.",
        "Untuk tiap kasus tulis: jenisnya apa, dan SATU kalimat alasannya.",
      ],
      hint: "Kasus 2 dan 5: tidak ada label → unsupervised (clustering/anomaly detection). Kasus 6: sedikit label + banyak mentah → semi-supervised.",
    },
    quiz: [
      {
        q: "Model dilatih dengan data rumah yang sudah ada harganya untuk memprediksi harga rumah baru. Ini...",
        options: ["Unsupervised", "Supervised — regresi", "Semi-supervised", "Reinforcement"],
        answer: 1,
        why: "Label-nya harga (angka kontinu) dan tersedia di data latih = supervised regresi. Klasifikasi jika label kategori (spam/ham).",
      },
      {
        q: "Ciri khas unsupervised learning:",
        options: [
          "Data berlabel lengkap",
          "Data tanpa label; model mencari struktur/pola sendiri",
          "Ada reward dan punishment",
          "Butuh GPU besar",
        ],
        answer: 1,
        why: "Tanpa label, model menemukan struktur tersembunyi (clustering, asosiasi, reduksi dimensi). Reward/punishment adalah ranah reinforcement learning.",
      },
      {
        q: "Bank punya data transaksi normal melimpah tapi data fraud yang berlabel sangat sedikit. Pendekatan paling tepat:",
        options: [
          "Unsupervised murni, buang semua label",
          "Semi-supervised: manfaatkan sedikit label + banyak data tak berlabel",
          "Reinforcement learning",
          "Tidak bisa dikerjakan",
        ],
        answer: 1,
        why: "Kondisi 'sedikit berlabel + banyak tak berlabel' adalah definisi masalah semi-supervised — melabel mahal, data mentah murah.",
      },
      {
        q: "Di reinforcement learning, yang membuat agent belajar adalah...",
        options: [
          "Dataset besar berlabel",
          "Reward/penalty dari lingkungan atas aksi yang dilakukan",
          "K-Means clustering",
          "Random state yang konsisten",
        ],
        answer: 1,
        why: "Agent mencoba aksi di lingkungan, menerima reward/penalty, dan menyesuaikan strateginya (policy) untuk memaksimalkan reward jangka panjang.",
      },
    ],
  },
  {
    slug: "ml-04",
    tid: "8537",
    title: "Use Case ML Sehari-hari",
    minutes: 8,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8537" },
    untukApa: [
      "Teori menempel kalau kamu bisa MENAMAI jenis ML di balik aplikasi yang kamu pakai tiap hari — ini latihan intuisi termurah dan paling sering terpakai.",
      "Saat interview/diskusi project, kemampuan memetakan masalah → jenis ML → contoh nyata terlihat langsung matang atau tidaknya.",
    ],
    sections: [
      {
        h: "Sepuluh use case, satu tabel",
        table: {
          head: ["Use case", "Apa yang dipelajari model", "Jenis dominan"],
          rows: [
            ["Rekomendasi (Netflix/Amazon)", "Preferensi dari riwayat tontonan/beli, dicocokkan ke user serupa", "Supervised + unsupervised"],
            ["Filter spam (Gmail)", "Pola kata di email yang ditandai spam vs tidak", "Supervised (klasifikasi)"],
            ["Asisten suara (Siri)", "Percakapan berlabel + pemahaman konteks data suara", "Supervised + unsupervised"],
            ["Face detection (tag foto)", "Fitur wajah dari foto berlabel nama orang", "Supervised"],
            ["Deteksi fraud (bank)", "Pola transaksi normal vs mencurigakan", "Unsupervised + supervised (jika ada label)"],
            ["Chatbot layanan", "Percakapan berlabel untuk menjawab pertanyaan", "Supervised + unsupervised"],
            ["Analisis sentimen", "Teks berlabel positif/negatif/netral", "Supervised (klasifikasi)"],
            ["Sistem anti-maling (alarm)", "Perilaku normal rumah → deteksi penyimpangan", "Unsupervised (anomali)"],
            ["Estimasi harga", "Hubungan fitur produk → harga", "Supervised (regresi)"],
            ["Prediksi kesehatan (X-ray)", "Gambar berlabel kondisi medis → pola penyakit", "Supervised (klasifikasi)"],
          ],
        },
      },
      {
        h: "Pola yang bisa dibawa pulang",
        list: [
          "Ada data historis BERLABEL → hampir selalu supervised; tinggal pilih klasifikasi (kategori) atau regresi (angka).",
          "Tidak ada label tapi butuh kelompok/anomali → unsupervised.",
          "Banyak produk nyata CAMPURAN: rekomendasi Netflix = supervised (rating) + unsupervised (user serupa).",
          "'Unusual activity' di akunmu = deteksi anomali: model mempelajari pola normalmu, lalu memberi alarm saat menyimpang.",
        ],
      },
    ],
    lab: {
      title: "Hunt ML di HP-mu",
      intro: "Buka 5 aplikasi yang paling sering kamu pakai dan temukan ML-nya.",
      steps: [
        "Pilih 5 aplikasi: musik, belanja, bank, medsos, maps — bebas.",
        "Untuk tiap aplikasi tulis: fitur apa yang terasa 'pintar'? (rekomendasi, filter, deteksi).",
        "Tebak jenis ML-nya: supervised/unsupervised/campuran? label-nya apa (kalau supervised)?",
        "Cek kebalikannya: fitur mana yang JELAS bukan ML? (mis. countdown timer — aturan murni).",
        "Satu kalimat kesimpulan: pola apa yang membuatmu yakin suatu fitur adalah ML?",
      ],
      hint: "Pembeda cepat: kalau perilakunya BERUBAH seiring datamu bertambah (makin lama makin akurat/menaik) itu ML. Kalau tetap sama selamanya, itu aturan.",
    },
    quiz: [
      {
        q: "Gmail memfilter email baru berdasarkan pola email yang sebelumnya ditandai spam. Jenis ML:",
        options: ["Supervised — klasifikasi", "Unsupervised — clustering", "Reinforcement", "Semi-supervised"],
        answer: 0,
        why: "Ada label eksplisit (spam / bukan) dari email yang ditandai user — model klasifikasi belajar dari data berlabel itu.",
      },
      {
        q: "Bank mendeteksi transaksi mencurigakan tanpa memiliki label fraud historis. Pendekatannya:",
        options: [
          "Supervised — regresi",
          "Unsupervised — deteksi anomali dari pola normal",
          "Reinforcement — reward dari nasabah",
          "Gen AI",
        ],
        answer: 1,
        why: "Tanpa label, model mempelajari pola transaksi normal lalu menandai penyimpangan sebagai anomali (unsupervised). Supervised dipakai bila label fraud tersedia.",
      },
      {
        q: "Sistem rekomendasi Netflix dicontohkan memakai teknik...",
        options: [
          "Supervised saja",
          "Unsupervised saja",
          "Supervised (dari rating/riwayat) dan/atau unsupervised (user serupa)",
          "Reinforcement murni",
        ],
        answer: 2,
        why: "Riwayat tontonan/rating yang berlabel = supervised; mencocokkan preferensi antar user serupa = pola unsupervised. Produk nyata sering campuran.",
      },
      {
        q: "Ciri paling andal suatu fitur adalah produk ML (bukan aturan tetap):",
        options: [
          "Tampilannya bagus",
          "Perilakunya menyesuaikan seiring bertambahnya data/penggunaan",
          "Dibuat oleh perusahaan besar",
          "Berjalan di server",
        ],
        answer: 1,
        why: "Inti ML adalah belajar dari data: performa/perilaku berubah saat data bertambah. Fitur berbasis aturan tetap identik terlepas dari datamu.",
      },
    ],
  },
  {
    slug: "ml-05",
    tid: "8467",
    title: "Merumuskan Masalah ML (SMART)",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8467" },
    untukApa: [
      "Kegagalan project ML paling sering BUKAN di algoritma, tapi di rumusan masalah yang kabur — target tidak terukur, data tidak dicek dari awal.",
      "Langkah ini yang membedakan 'iseng latihan notebook' dengan project yang bisa dipertanggungjawabkan.",
    ],
    sections: [
      {
        h: "Langkah 1: tujuan bisnis dengan SMART",
        table: {
          head: ["Huruf", "Makna", "Contoh buruk → baik"],
          rows: [
            ["S — Specific", "Jelas apa, kenapa, siapa, di mana", "'naikkan penjualan' → 'naikkan retensi pelanggan XYZ dengan turunkan churn 15%'"],
            ["M — Measurable", "Ada metrik + angka target", "'berkurangi churn' → 'churn rate 20% → 17%, diukur bulanan'"],
            ["A — Achievable", "Realistis dengan sumber daya", "'churn 0%' → '15% dengan pelatihan tim support + anggaran'"],
            ["R — Relevant", "Nyambung ke strategi jangka panjang", "'model keren' → 'retensi lebih murah daripada akuisisi'"],
            ["T — Time-bound", "Ada tenggat", "'suatu saat' → 'dalam 12 bulan, evaluasi bulanan'"],
          ],
        },
      },
      {
        h: "Langkah 2: pahami data yang tersedia",
        list: [
          "Inventarisasi: daftar SEMUA sumber data — internal (database operasional, laporan) dan eksternal (data pasar, mitra, publik).",
          "Cek kualitas: bersih? relevan? cukup? Data kotor/tidak relevan = model tidak andal sejak awal (garbage in, garbage out).",
          "Contoh: target churn → butuh riwayat transaksi, interaksi pelanggan, data demografis. Kalau salah satu tidak ada, target harus disesuaikan SEKARANG, bukan saat model sudah jadi.",
        ],
      },
      {
        h: "Langkah 3: terjemahkan bisnis → pertanyaan ML",
        p: [
          "Konversi tujuan bisnis menjadi pertanyaan yang bisa dijawab model: prediksi apa? klasifikasi apa? kelompok apa?",
          "Contoh pemetaan: turunkan churn → 'prediksi pelanggan yang akan churn bulan depan' (klasifikasi). Kurangi kerugian fraud → 'deteksi transaksi anomali' (anomali/klasifikasi). Estimasi harga → regresi.",
          "Pada titik ini kamu juga memilih jenis pembelajaran (ml-03) — semuanya nyambung.",
        ],
        callout: "Ukuran project yang sehat: satu kalimat pertanyaan ML yang bisa dijawab YA/TIDAK atau ANGKA — bukan 'buat AI yang canggih'.",
      },
    ],
    lab: {
      title: "Rumuskan project-mu sendiri",
      intro: "Ambil satu ide project ML (bisa untuk skripsi/portfolio) dan loloskan gerbang SMART.",
      steps: [
        "Tulis tujuan mentahmu dalam satu kalimat (mis. 'memprediksi apa pun').",
        "Ubah ke SMART lengkap: spesifik apa, metrik + angka, realistis dengan apa, relevan kenapa, tenggat kapan.",
        "Inventarisasi data: 3 sumber data yang bisa kamu akses SEKARANG (publik pun boleh — Kaggle, data.go.id).",
        "Cek kualitas: kolom apa ada, label-nya ada atau tidak, kira-kira berapa baris.",
        "Tulis pertanyaan ML finalnya: 'Dengan data X, prediksi Y (klasifikasi/regresi/clustering)' — satu kalimat.",
      ],
      hint: "Kalau langkah 4 gagal (data tidak bisa diakses atau tanpa label), kembali revise SMART-mu sekarang. Lebih murah daripada bongkar model nanti.",
    },
    quiz: [
      {
        q: "Tujuan 'meningkatkan penjualan perusahaan' dalam kerangka SMART terutama gagal pada...",
        options: ["Specific dan Measurable", "Time-bound saja", "Relevant saja", "Achievable saja"],
        answer: 0,
        why: "Tidak spesifik (apa, di mana, siapa?) dan tidak terukur (naik berapa %?). Versi SMART: 'naikkan konversi X dari 2% ke 3% dalam 6 bulan'.",
      },
      {
        q: "Urutan logis merumuskan masalah ML:",
        options: [
          "Pilih algoritma → kumpulkan data → tentukan tujuan",
          "Tujuan bisnis (SMART) → cek data → terjemahkan ke pertanyaan ML",
          "Terjemahkan ke pertanyaan ML → pilih tujuan → cek data",
          "Cek data → deploy → evaluasi",
        ],
        answer: 1,
        why: "Tujuan memandu semuanya; data yang tersedia membatasi apa yang bisa dicapai; pertanyaan ML adalah jembatan keduanya sebelum menyentuh algoritma.",
      },
      {
        q: "Tujuan 'kurangi churn 15% dalam 12 bulan' paling tepat diterjemahkan ke pertanyaan ML:",
        options: [
          "Clustering semua pelanggan",
          "Prediksi pelanggan yang akan churn (klasifikasi) supaya bisa diberi retensi lebih awal",
          "Regresi harga produk",
          "Reinforcement learning",
        ],
        answer: 1,
        why: "Mencegah churn = tahu SIAPA yang akan churn sebelum dia pergi → klasifikasi biner (churn/tidak) per pelanggan. Clustering bisa jadi pelengkap, bukan inti target.",
      },
      {
        q: "Mengapa pemahaman data harus dilakukan SEBELUM membangun model?",
        options: [
          "Supaya notebook terlihat rapi",
          "Data yang tidak cukup/tidak relevan membuat target tidak tercapai — lebih murah disadari di awal",
          "Karena model tidak boleh melihat data",
          "Tidak penting, model bisa memperbaiki data sendiri",
        ],
        answer: 1,
        why: "Garbage in, garbage out. Data yang kotor, tidak lengkap, atau tidak relevan tidak bisa diselamatkan oleh algoritma secanggih apa pun — keputusan terbaiknya di fase perumusan.",
      },
    ],
  },
  {
    slug: "ml-06",
    tid: "8472",
    title: "ML Workflow: Peta End-to-End",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8472" },
    untukApa: [
      "Workflow adalah 'peta perjalanan' dari buku Hands-On ML (Aurélien Géron): rangkaian tahap dari masalah mentah sampai model hidup di produksi.",
      "Tiga lesson berikutnya (collecting→loading→cleaning) adalah penjelasan dalam dari tahap-tahap awal peta ini — halaman ini kerangkanya.",
    ],
    sections: [
      {
        h: "Peta workflow",
        table: {
          head: ["Tahap", "Inti pekerjaan", "Lesson detail"],
          rows: [
            ["1. Definisi masalah", "Tujuan bisnis + pertanyaan ML (SMART)", "ml-05"],
            ["2. Data collecting", "Kumpulkan data dari database/API/publik/web", "ml-07"],
            ["3. Data loading", "Muat ke DataFrame (pandas)", "ml-08"],
            ["4. Cleaning & transformation", "Missing values, duplikat, encoding, scaling", "ml-08"],
            ["5. EDA", "Statistik deskriptif + visualisasi, temukan pola/anomali", "ml-08"],
            ["6. Data splitting", "Pisah train/val/test — jaga integritas evaluasi", "ml-08"],
            ["7. Modelling", "Pilih algoritma, latih, evaluasi", "ml-08"],
            ["8. Deployment & monitoring", "Sajikan via API/web app; pantau degradasi", "ml-08"],
          ],
        },
        callout: "Workflow ini ITERATIF bukan garis lurus: hasil evaluasi sering mengembalikanmu ke cleaning atau bahkan collecting. Itu normal — bukan tanda gagal.",
      },
      {
        h: "Kenapa tahapan tidak boleh dilompati",
        list: [
          "Lompat EDA → kamu tidak tahu distribusi/outlier, model jadi kotak hitam yang salah diam-diam.",
          "Lompat splitting → evaluasi menipu diri: model menguji dirinya sendiri dengan data yang sudah dihafal (overfitting tak terdeteksi).",
          "Lompat cleaning → garbage in garbage out; 3 dari 5 data scientist melaporkan habis-habisan waktu di pembersihan data (CrowdFlower 2016).",
          "Deployment bukan akhir: data berubah (data drift) → model perlu monitoring dan retraining berkala.",
        ],
      },
      {
        h: "Struktur data yang dihadapi",
        p: [
          "Structured: tabel/spreadsheet/CSV — baris = contoh, kolom = fitur. Ini bahan utama kelas ini.",
          "Unstructured: teks bebas, gambar, audio — butuh perlakuan khusus (dan masuk ranah deep learning nanti).",
          "Semi-structured: JSON, log — punya struktur tapi fleksibel.",
        ],
      },
    ],
    lab: {
      title: "Gambar ulang peta workflow versimu",
      intro: "Peta yang kamu tulis sendiri lebih menempel daripada yang dibacakan.",
      steps: [
        "Ambil project dari ml-05 (SMART-mu).",
        "Tuliskan 8 tahap workflow sebagai daftar bernomor dengan SATU kalimat nyata per tahap untuk project-mu.",
        "Tandai tahap yang menurutmu PALING banyak makan waktu — kebanyakan orang menjawab cleaning; apakah juga begitu?",
        "Identifikasi titik iterasi: kalau evaluasi buruk, ke tahap mana kamu kembali? Tuliskan dua skenario.",
        "Simpan hasilnya — ini kerangka laporan/proyekmu nanti.",
      ],
      hint: "Skenario iterasi yang sehat: (1) evaluasi buruk + pola belum kelihatan → balik EDA; (2) evaluasi buruk + data banyak noise → balik cleaning.",
    },
    quiz: [
      {
        q: "Urutan tahap workflow yang benar:",
        options: [
          "Modelling → collecting → cleaning → splitting",
          "Definisi masalah → collecting → loading → cleaning → EDA → splitting → modelling → deployment",
          "EDA → deployment → cleaning → modelling",
          "Splitting → collecting → modelling → EDA",
        ],
        answer: 1,
        why: "Alur Géron: pahami masalah, kumpulkan, muat, bersihkan, eksplorasi, pisah, latih, deploy. Setiap tahap menyiapkan input tahap berikutnya.",
      },
      {
        q: "Kenapa EDA dilakukan SEBELUM modelling?",
        options: [
          "Supaya model punya banyak fitur",
          "Untuk memahami distribusi, pola, dan anomali — model tanpa pemahaman data = kotak hitam berisiko",
          "Karena wajib oleh scikit-learn",
          "Agar visualisasi terlihat bagus di laporan",
        ],
        answer: 1,
        why: "EDA (statistik deskriptif + visualisasi) membangun intuisi data: outlier, korelasi, ketimpangan. Tanpa itu, keputusan model tidak berpijak pada pemahaman.",
      },
      {
        q: "Model yang menguji dirinya dengan data yang sama dari yang ia belajar akan mengalami...",
        options: ["Data leakage yang sehat", "Evaluasi menipu — overfitting tak terdeteksi", "Underfitting", "Error langsung"],
        answer: 1,
        why: "Itulah fungsi data splitting: test set HARUS belum pernah dilihat model. Menguji dengan data latih = menghafal soal lalu uji pakai soal yang sama.",
      },
      {
        q: "Kenapa workflow disebut iteratif?",
        options: [
          "Karena bisa diulang pakai template",
          "Hasil evaluasi/monitoring sering memaksa kembali ke tahap lebih awal (cleaning, collecting, bahkan definisi masalah)",
          "Karena hyperparameter diulang 100 kali",
          "Karena data selalu bertambah otomatis",
        ],
        answer: 1,
        why: "Setiap tahap bisa membuka temuan yang mengubah keputusan tahap sebelumnya. Workflow nyata berputar, bukan garis lurus sekali jalan.",
      },
    ],
  },
  {
    slug: "ml-07",
    tid: "11946",
    title: "Data Collecting: Fondasi Segalanya",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/11946" },
    untukApa: [
      '"Data is the new oil" (Clive Humby) — berharga tapi harus diolah dulu. Tahap collecting menentukan batas atas kualitas model: model secanggih apa pun tidak bisa menghidupkan data yang buruk.',
      "Tiga jalur pengumpulan di lesson ini mencakup 90% kebutuhan praktis: unduh dataset publik, kumpulkan sendiri, atau gabungkan keduanya.",
    ],
    sections: [
      {
        h: "Garbage in, garbage out",
        p: [
          "Kualitas dan kuantitas data menentukan performa model — data penuh noise/outlier mengaburkan pola sebenarnya.",
          "Tiga risiko yang dicegah oleh collecting yang baik: akurasi rendah (data kurang relevan), bias (data tidak lengkap/tidak seimbang antar kategori), dan model yang tidak general (contoh terlalu sempit).",
        ],
      },
      {
        h: "Tiga jalur pengumpulan",
        table: {
          head: ["Jalur", "Kapan dipakai", "Contoh"],
          rows: [
            ["Dataset terbuka", "Masalah umum, latihan, baseline", "Kaggle, data.go.id, UCI, Google Dataset Search"],
            ["Kumpulan sendiri", "Data spesifik perusahaan/domainmu", "Database, API internal, sensor, form"],
            ["Web scraping", "Data ada di web tapi tidak tersedia sebagai file", "Skrip mengekstrak halaman (Beautiful Soup)"],
          ],
        },
        callout: "Di latihan kelas ini kita memakai jalur 1 (dataset terbuka). Scraping menyenangkan tapi memakan waktu — masuk materi kelas lanjutan.",
      },
      {
        h: "Struktur data yang akan kamu temui",
        list: [
          "Structured (CSV/Excel/database): baris = contoh, kolom = fitur — paling mudah, bahan utama kelas ini.",
          "Unstructured (teks, gambar, audio): kaya informasi tapi butuh preprocessing khusus.",
          "Semi-structured (JSON, log): fleksibel, perlu dirapikan dulu sebelum masuk DataFrame.",
        ],
      },
      {
        h: "Ceklis sebelum memilih dataset",
        list: [
          "Relevan: kolomnya benar-benar berkaitan dengan pertanyaan ML-mu (ml-05)?",
          "Berkualitas: missing values, duplikat, inkonsistensi — seberapa banyak?",
          "Cukup: jumlah baris dan keseimbangan kelas (100 baris untuk 10 kelas = gagal).",
          "Legal: lisensi memperbolehkan pemakaianmu?",
        ],
      },
    ],
    lab: {
      title: "Hunt dataset pertamamu",
      intro: "Latihan memilih dataset dengan disiplin ceklis, bukan asal unduh.",
      steps: [
        "Buka kaggle.com/datasets dan cari topik dari SMART-mu (mis. 'churn', 'house price', 'fraud').",
        "Pilih 3 kandidat, untuk tiap kandidat catat: jumlah baris, jumlah kolom, ada tidaknya missing value (lihat di tab Data).",
        "Loloskan ketiganya lewat ceklis 4 poin di atas — skor tiap kandidat.",
        "Pilih juaranya dan tulis SATU kalimat: 'dataset ini cocok untuk pertanyaan ML [X] karena [Y]'.",
        "Unduh CSV-nya — simpan untuk lesson berikutnya (data loading).",
      ],
      hint: "Dataset kecil tapi bersih sering lebih berguna daripada besar tapi bocor: missing value 60% dan kelas timpang akan memakan waktumu di fase cleaning.",
    },
    quiz: [
      {
        q: '"Garbage In Garbage Out" dalam konteks ML berarti...',
        options: [
          "Model harus dihapus jika error",
          "Kualitas output model sebatas kualitas data yang dilatihkan",
          "CSV harus dibuang setelah dipakai",
          "Python tidak bisa memproses data kotor",
        ],
        answer: 1,
        why: "Tidak ada algoritma yang bisa menghidupkan data buruk — noise, bias, dan ketidaklengkapan akan ikut dipelajari model dan keluar sebagai prediksi buruk.",
      },
      {
        q: "Dataset transaksi berisi 99% transaksi normal dan 1% fraud. Risiko terbesarnya:",
        options: [
          "File terlalu besar",
          "Model cenderung mengabaikan kelas minoritas — selalu menjawab 'normal' tetap dapat akurasi 99%",
          "CSV tidak bisa di-load pandas",
          "Tidak ada risiko",
        ],
        answer: 1,
        why: "Ketidakseimbangan kelas membuat akurasi menipu: model buta yang selalu menjawab kelas mayoritas sudah tampak 'akurat'. Solusinya nanti: metrik selain akurasi + teknik resampling (SMOTE, fase feature engineering).",
      },
      {
        q: "Data ada di halaman web tapi tidak tersedia sebagai file unduhan. Jalur paling tepat:",
        options: [
          "Ketik manual semua datanya",
          "Web scraping — skrip mengekstrak data dari halaman",
          "Buang proyeknya",
          "Reinforcement learning",
        ],
        answer: 1,
        why: "Web scraping (mis. dengan Beautiful Soup) mengotomatisasi ekstraksi data dari halaman web — jalur sah ketika data publik tapi tidak tersedia rapi.",
      },
      {
        q: "Ceklis memilih dataset yang PALING menentukan kecocokan dengan projectmu:",
        options: [
          "Nama dataset keren",
          "Kolomnya relevan dengan pertanyaan ML dan kualitas/keseimbangannya layak",
          "Formatnya JSON",
          "Ukurannya paling besar",
        ],
        answer: 1,
        why: "Relevansi kolom ke pertanyaan + kualitas + keseimbangan menentukan apakah data BISA menjawab pertanyaanmu. Ukuran besar tanpa relevan = boros waktu.",
      },
    ],
  },
  {
    slug: "ml-08",
    tid: "8334",
    title: "Data Loading dengan Pandas",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8334" },
    untukApa: [
      "Data yang sudah terkumpul harus masuk ke lingkungan kerja — pandas DataFrame adalah meja kerjanya: struktur tabular yang semua tahap berikutnya (cleaning, EDA, training) bekerja di atasnya.",
      "Memahami loading juga berarti memverifikasi data: tipe kolom benar? ada missing? — kesalahan di sini meracuni semua tahap setelahnya.",
    ],
    sections: [
      {
        h: "Apa itu loading",
        p: [
          "Loading = mengimpor data dari sumber eksternal (file CSV/Excel, database, API) ke struktur data di program — di Python: pandas DataFrame.",
          "Tiga kenapa loading penting: langkah awal tanpa itu tidak ada training; momen verifikasi integritas (tipe kolom, data hilang); mempersiapkan tahap berikutnya.",
        ],
        code: "import pandas as pd\n\ndf = pd.read_csv('train.csv')\ndf.head()        # intip 5 baris pertama\ndf.info()        # tipe data per kolom + jumlah non-null\ndf.shape         # (baris, kolom)",
      },
      {
        h: "Format file yang didukung pandas",
        table: {
          head: ["Format", "Ekstensi", "Cara load"],
          rows: [
            ["CSV", ".csv", "pd.read_csv('file.csv')"],
            ["Excel", ".xls, .xlsx", "pd.read_excel('file.xlsx')"],
            ["JSON", ".json", "pd.read_json('file.json')"],
            ["HTML (tabel web)", ".html", "pd.read_html('file.html')"],
            ["SQL database", "—", "pd.read_sql_query('SELECT ...', conn)"],
            ["Parquet", ".parquet", "pd.read_parquet('file.parquet')"],
            ["HDF5", ".h5", "pd.read_hdf('file.h5')"],
          ],
        },
        callout: "Untuk kelas ini kuasai dua yang paling sering: CSV dan Excel. Parquet masuk saat berurusan dengan big data (kolom-terkompresi, efisien).",
      },
      {
        h: "Verifikasi setelah loading — kebiasaan wajib",
        list: [
          "df.info(): tipe data per kolom — cari kejanggalan (angka terdeteksi object/string?).",
          "df.describe(): statistik deskriptif (mean, median, std, min/max) — deteksi outlier dan nilai mustahil (umur = 250?).",
          "df.isnull().sum(): berapa missing value per kolom — bahan keputusan cleaning.",
          "df.duplicated().sum(): duplikat baris.",
        ],
      },
    ],
    lab: {
      title: "Load + verifikasi dataset unduhanmu",
      intro: "Pakai CSV dari ml-07, masukkan ke pandas, dan audit dengan 4 pemeriksaan wajib.",
      steps: [
        "Upload CSV-mu ke Google Colab (atau taruh di folder yang sama di lokal).",
        "Load: df = pd.read_csv('namadataset.csv') — pastikan tidak error.",
        "Jalankan keempat verifikasi: info(), describe(include='all'), isnull().sum(), duplicated().sum().",
        "Catat temuan: kolom apa yang tipenya salah, kolom apa paling banyak missing, ada duplikat?",
        "Eksperimen: pd.read_csv(..., nrows=100) untuk load sebagian — berguna saat file besar.",
      ],
      hint: "Kalau CSV-mu pakai pemisah titik-koma, tambahkan sep=';'. Error 'ParserError' hampir selalu soal delimiter atau encoding — coba encoding='latin1'.",
    },
    quiz: [
      {
        q: "Struktur data utama pandas untuk data tabular:",
        options: ["list", "dictionary", "DataFrame", "tuple"],
        answer: 2,
        why: "DataFrame = tabel 2 dimensi (baris = contoh, kolom = fitur) — bentuk yang dimakan seluruh ekosistem data science Python.",
      },
      {
        q: "Perintah pertama yang paling efektif memverifikasi tipe data + missing value per kolom:",
        options: ["df.plot()", "df.info()", "df.sort_values()", "df.drop()"],
        answer: 1,
        why: "info() menampilkan tipe tiap kolom dan jumlah nilai non-null sekaligus — dua informasi terpenting di detik pertama audit data.",
      },
      {
        q: "File .parquet dibanding CSV unggul dalam...",
        options: [
          "Keterbacaan manusia",
          "Efisiensi penyimpanan data kolumnar untuk big data",
          "Kemudahan diedit di Notepad",
          "Tidak ada bedanya",
        ],
        answer: 1,
        why: "Parquet menyimpan per kolom terkompresi — jauh lebih efisien untuk dataset besar; CSV unggul di keterbacaan dan kesederhanaan.",
      },
      {
        q: "Setelah load, df.isnull().sum() berguna untuk...",
        options: [
          "Menghitung total baris",
          "Menghitung missing value per kolom — bahan keputusan cleaning",
          "Mengurutkan kolom",
          "Menghapus kolom kosong",
        ],
        answer: 1,
        why: "Menjumlahkan nilai null per kolom memperlihatkan seberapa bocor tiap kolom — input langsung untuk strategi cleaning (isi mean/median/modus atau hapus).",
      },
    ],
  },
  {
    slug: "ml-09",
    tid: "8342",
    title: "Data Cleaning & Transformation: Missing Value, Encoding, Scaling",
    minutes: 22,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8342" },
    untukApa: [
      "Fakta lapangan: 3 dari 5 data scientist menghabiskan SEBAGIAN BESAR waktunya di sini (CrowdFlower 2016). Ini tahap paling makan waktu DAN paling menentukan kualitas model.",
      "Empat operator inti di lesson ini — missing values, encoding, scaling, splitting (bonus EDA) — adalah 80% pekerjaan preprocessing nyata.",
    ],
    sections: [
      {
        h: "Missing values: dua jalan keluar",
        p: [
          "Jalan 1 — HAPUS baris/kolom: cepat dan aman jika yang hilang sedikit / tidak signifikan secara statistik. Bahaya jika pola hilangnya tidak acak (bias).",
          "Jalan 2 — ISI (imputation): angka → mean/median (median lebih tahan outlier); kategori → modus atau label 'Unknown'.",
        ],
        code: "df.dropna()                          # buang baris ber-NaN\ndf['umur'].fillna(df['umur'].median()) # isi median\ndf['kota'].fillna(df['kota'].mode()[0]) # isi modus",
        callout: "Keputusan hapus vs isi tergantung SEBERAPA banyak dan MENGAPA hilang. 5% acak → isi cukup; 60% di satu kolom → pertimbangkan buang kolomnya.",
      },
      {
        h: "Encoding: kategorik → numerik",
        p: [
          "Model ML menghitung angka — kolom 'cerah/berawan/hujan' tidak bisa diproses sebelum jadi angka. Dua teknik inti:",
          "Label/ordinal encoding: tiap kategori → satu angka. Cocok untuk kategori BERURUTAN (pendidikan: SD=0, SMP=1, ...). Untuk kategori tanpa urutan ini berbahaya: model mengira 'Jeruk=3 lebih besar dari Apel=1'.",
          "One-hot encoding: tiap kategori → kolom biner sendiri (warna → is_merah, is_biru, ...). Aman untuk kategori tanpa urutan; korban: jumlah kolom membengkak.",
        ],
        code: "# ordinal: ada urutan\ndf['pendidikan_enc'] = df['pendidikan'].map({'SD':0,'SMP':1,'SMA':2,'S1':3})\n\n# one-hot: tanpa urutan\ndf = pd.get_dummies(df, columns=['cuaca'])",
      },
      {
        h: "Scaling: samakan arena perbandingan",
        p: [
          "Algoritma berbasis JARAK (KNN, K-Means, SVM) didominasi oleh fitur berskala besar: gaji (jutaan) akan menenggelamkan umur (puluhan) — padahal belum tentu lebih penting.",
          "Normalisasi (MinMaxScaler): geser semua nilai ke rentang 0–1. Standardisasi (StandardScaler): rata-rata 0, standar deviasi 1.",
        ],
        code: "from sklearn.preprocessing import MinMaxScaler, StandardScaler\n\ndata = [[10], [2], [30], [40], [50]]\n\nprint(MinMaxScaler().fit_transform(data))     # 0..1\nprint(StandardScaler().fit_transform(data))   # mean 0, std 1",
      },
      {
        h: "EDA singkat: exploratory vs explanatory",
        table: {
          head: ["Aspek", "EDA (exploratory)", "ExDA (explanatory)"],
          rows: [
            ["Tujuan", "Menemukan pola/anomali, membangun hipotesis", "MENGOMUNIKASIKAN temuan ke audiens"],
            ["Audiens", "Dirimu sendiri / tim data", "Stakeholder, klien, eksekutif"],
            ["Alat", "describe(), histogram, scatter, heatmap", "Chart bersih + narasi"],
            ["Sifat", "Iteratif, tidak ada hipotesis tetap", "Terarah ke kesimpulan"],
          ],
        },
        p: ["Dua teknik analisis: univariate (satu variabel) dan multivariate (≥2 variabel; dua variabel = bivariate)."],
      },
      {
        h: "Data splitting + training: gerbang menuju model",
        p: [
          "Splitting memisahkan data SEBELUM training supaya evaluasi jujur: tanpa itu model menguji diri dengan soal yang ia hafal (overfitting tak terdeteksi).",
          "Dua kubu: 2-way (train/test, rasio 70:30 atau 80:20) dan 3-way (train/val/test, 60:20:20) — validation set dipakai untuk tuning hyperparameter.",
          "train_test_split dengan random_state → hasil terbagi konsisten antar eksekusi (reproducible). stratify=y menjaga proporsi kelas (wajib saat kelas timpang).",
        ],
        code: "from sklearn.model_selection import train_test_split\n\nX = df.drop(columns=['SalePrice'])\ny = df['SalePrice']\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=1)",
        callout: "Setelah split, modelling = pilih algoritma sesuai masalah (regresi utk angka, klasifikasi utk kategori, K-Means/DBSCAN utk clustering), latih dgn fit(X_train, y_train), evaluasi di test set. Hasilnya bisa disimpan: joblib.dump(model, 'model.joblib') lalu dimuat lagi saat deployment.",
      },
      {
        h: "Peta keputusan cleaning",
        table: {
          head: ["Temuan", "Tindakan", "Catatan"],
          rows: [
            ["Missing < 5%, acak", "Isi mean/median/modus", "Median lebih aman utk data skew"],
            ["Missing > 50% di satu kolom", "Pertimbangkan buang kolom", "Dokumentasikan alasannya"],
            ["Kategorik berurutan", "Ordinal/label encoding", "Simpan urutannya eksplisit"],
            ["Kategorik tanpa urutan", "One-hot encoding", "Awas ledakan jumlah kolom"],
            ["Fitur beda skala jauh + algoritma jarak", "Normalisasi/standardisasi", "Tree-based jarang butuh scaling"],
            ["Kelas timpang", "stratify saat split; resampling (SMOTE) nanti", "Akurasi saja menipu"],
          ],
        },
      },
    ],
    lab: {
      title: "Cleaning lengkap dataset unduhanmu",
      intro: "Satu pipeline: audit → isi missing → encode → scale → split. Inilah kerangka proyek nyata.",
      steps: [
        "Audit: info(), isnull().sum(), describe() — daftar kolom bermasalah.",
        "Missing: isi kolom numerik dengan median, kategorik dengan modus — buktikan isnull().sum() jadi nol.",
        "Encoding: kolom kategorik berurutan pakai map(), tanpa urutan pakai get_dummies().",
        "Scaling: StandardScaler ke kolom numerik — bandingkan describe() sebelum/sesudah.",
        "Split: train_test_split(test_size=0.2, random_state=1) — catat bentuk X_train vs X_test.",
        "Bonus: latih model pertama (fit) dengan satu algoritma apapun lalu cek .score() di test set.",
      ],
      hint: "Scaling SEBAIKNYA dilakukan SETELAH split (fit scaler hanya di train) — kalau kamu fit scaler sebelum split, informasi test set bocor ke transformasi (data leakage). Untuk kelas pemula pola ini cukup dipahami, nanti dipraktikkan di fase intermediate.",
    },
    quiz: [
      {
        q: "Kolom 'pendidikan' berisi SD, SMP, SMA, S1. Encoding paling tepat:",
        options: [
          "One-hot encoding",
          "Ordinal/label encoding yang menjaga urutan tingkatan",
          "Hapus kolomnya",
          "Isi dengan median",
        ],
        answer: 1,
        why: "Tingkat pendidikan BERURUTAN — ordinal encoding (SD=0 ... S1=3) mempertahankan informasi urutan itu. One-hot membuang informasi urutan dan menambah kolom sia-sia.",
      },
      {
        q: "Kenapa 'Jeruk=3' dari label encoding berbahaya untuk kategori tanpa urutan?",
        options: [
          "Angka 3 tidak valid di Python",
          "Model mengira jeruk 'lebih besar dari' apel (=1) — memunculkan hubungan palsu",
          "Encoding gagal jalan",
          "Karena kolom jadi terlalu panjang",
        ],
        answer: 1,
        why: "Angka membawa urutan implisit. Model berbasis jarak/perkalian akan memperlakukan kategori seolah ada hierarki — padahal tidak ada. One-hot memecahkan ini dengan kolom biner terpisah.",
      },
      {
        q: "Algoritma KNN dengan fitur gaji (jutaan) dan umur (puluhan) tanpa scaling akan...",
        options: [
          "Jalan normal, hasilnya adil",
          "Didominasi gaji karena selisih skalanya menenggelamkan umur dalam perhitungan jarak",
          "Error karena skala beda",
          "Otomatis menyeimbangkan diri",
        ],
        answer: 1,
        why: "KNN menghitung jarak: selisih gaji 5 juta jauh melampaui selisih umur 30 tahun. Scaling (normalisasi/standardisasi) menyetarakan kontribusi tiap fitur.",
      },
      {
        q: "Rasio split yang disebut umum di materi:",
        options: ["50:50", "70:30 atau 80:20 (2-way), 60:20:20 (3-way)", "99:1", "30:70"],
        answer: 1,
        why: "Train butuh porsi terbesar agar model cukup belajar; test/val cukup untuk evaluasi stabil. Tidak ada aturan baku — konsistensi & mencegah leakage yang utama.",
      },
      {
        q: "Fungsi random_state dalam train_test_split:",
        options: [
          "Mempercepat training",
          "Menjaga pembagian data KONSISTEN setiap kali kode dijalankan (reproducible)",
          "Menghapus outlier",
          "Menambah data",
        ],
        answer: 1,
        why: "random_state mengunci seed pengacakan → split yang sama tiap eksekusi → eksperimen bisa direproduksi dan dibandingkan secara adil.",
      },
      {
        q: "EDA (exploratory) berbeda dari ExDA (explanatory) karena EDA...",
        options: [
          "Dibuat untuk stakeholder",
          "Bertujuan menemukan pola & membangun hipotesis — audiensnya dirimu/tim, sifatnya iteratif",
          "Hanya untuk data besar",
          "Wajib memakai chart 3D",
        ],
        answer: 1,
        why: "EDA = eksplorasi terbuka untuk memahami data (deskriptif + visual). ExDA = penyajian temuan EDA dengan chart bersih + narasi untuk audiens luas.",
      },
    ],
  },
];
