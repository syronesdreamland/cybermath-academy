import type { Lesson } from "./lesson-types";

// ============================================================
// Track ML Dicoding 184 — batch 2 (Section 4 Klasifikasi): 8 lesson
// Rewrite internal dari materi "Belajar Machine Learning untuk Pemula"
// (parafrase + contoh sendiri, bukan salinan). Link sumber asli dicantumkan.
// ============================================================

const SRC = "Dicoding — Belajar Machine Learning untuk Pemula";

export const ML_LESSONS_2: Lesson[] = [
  {
    slug: "ml-10",
    tid: "38708",
    title: "Konsep & Proses Klasifikasi",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38708" },
    untukApa: [
      "Klasifikasi adalah aplikasi supervised learning yang paling sering ketemu dunia nyata: spam filter, deteksi fraud, diagnosis penyakit — semuanya 'pilih kelas'.",
      "Lesson ini memberi kerangka proses 6 langkah yang dipakai berulang untuk SEMUA algoritma klasifikasi yang akan kamu pelajari setelah ini.",
    ],
    sections: [
      {
        h: "Definisi & tujuan",
        p: [
          "Klasifikasi = mengelompokkan data ke kategori/kelas berdasarkan fiturnya, bagian dari supervised learning (data sudah berlabel).",
          "Tujuan: memprediksi kelas data BARU yang belum pernah dilihat, dari pola yang dipelajari data latih. Contoh: fitur ukuran+warna+bentuk buah → apel/pisang/jeruk.",
        ],
      },
      {
        h: "Proses 6 langkah",
        table: {
          head: ["Langkah", "Inti", "Contoh kasus buah"],
          rows: [
            ["1. Pengumpulan data", "Relevan, berkualitas, representatif", "Tabel ukuran/warna/bentuk + label jenis"],
            ["2. Pra-pemrosesan", "Bersihkan + konversi ke numerik", "Warna 'Merah' → 1, 'Kuning' → 2"],
            ["3. Pembagian data", "Pisah train/test (umumnya 70–80% : 20–30%)", "100 buah → 80 latih, 20 uji"],
            ["4. Pemilihan algoritma", "Sesuai jenis data & kompleksitas", "KNN/DT/SVM/RF/Naive Bayes"],
            ["5. Pelatihan model", "Algoritma mempelajari pola dari data latih", "fit(X_train, y_train)"],
            ["6. Evaluasi & deployment", "Uji dengan metrik, lalu pakai di aplikasi", "Akurasi/precision/recall di data uji"],
          ],
        },
        callout: "Proporsi split tidak mutlak: kadang 1–10% saja untuk pengujian kalau datanya sedikit. Yang wajib: test set TIDAK boleh tersentuh saat pelatihan.",
      },
      {
        h: "Kenapa pra-pemrosesan selalu ada",
        p: [
          "Model menghitung angka — kolom teks (warna, bentuk) harus di-encoding dulu (ingat ml-09).",
          "Data kotor (missing, duplikat, inkonsisten) meracuni pola yang dipelajari — langkah 2 melindungi langkah 5.",
        ],
      },
    ],
    lab: {
      title: "Kerangka proyek klasifikasi pertamamu",
      intro: "Jalankan 6 langkah di atas pada satu dataset nyata dari ml-07 — tanpa masih memikirkan algoritma spesifik.",
      steps: [
        "Ambil dataset klasifikasi dari Kaggle (mis. iris, titanic, atau churn dari ml-07).",
        "Langkah 1–2: load dengan pandas, cek missing + kolom kategorik, encode yang perlu.",
        "Langkah 3: split train_test_split(test_size=0.2, random_state=1).",
        "Langkah 4: TULIS dulu alasan pemilihan algoritma sebelum lihat hasil (jenis label? ukuran data? butuh interpretable?)",
        "Langkah 5: latih satu algoritma apa pun (mis. KNeighborsClassifier) — catat .score() di test set.",
        "Refleksi: tahap mana yang paling makan waktu? Kalau jawabanmu bukan pra-pemrosesan, datasetmu terlalu bersih :)",
      ],
      hint: "Urutan langkah 2→3 penting: cleaning sebelum split berisiko data leakage — informasi test set ikut menentukan mean/modus yang dipakai train. Untuk sekarang pola sederhana boleh dulu; versi amannya di fase intermediate.",
    },
    quiz: [
      {
        q: "Tujuan utama klasifikasi:",
        options: [
          "Menambah jumlah data",
          "Memprediksi kelas/label data baru dari pola yang dipelajari data berlabel",
          "Membuat visualisasi menarik",
          "Menghapus outlier",
        ],
        answer: 1,
        why: "Klasifikasi supervised: belajar dari data berlabel, lalu menempelkan kelas ke data baru yang belum pernah dilihat.",
      },
      {
        q: "Urutan proses klasifikasi yang benar:",
        options: [
          "Split → kumpulkan → bersihkan → latih",
          "Kumpulkan → pra-pemrosesan → pembagian → pilih algoritma → latih → evaluasi",
          "Latih → evaluasi → kumpulkan → bersihkan",
          "Pra-pemrosesan → kumpulkan → latih → split",
        ],
        answer: 1,
        why: "Alur baku: data → bersih → pisah → algoritma → training → evaluasi/deployment. Melompati pra-pemrosesan atau pembagian merusak keandalan evaluasi.",
      },
      {
        q: "Di tahap pra-pemrosesan, kolom warna 'Merah/Kuning/Hijau' harus...",
        options: [
          "Dibiarkan apa adanya",
          "Di-encoding ke angka supaya bisa diproses model",
          "Dihapus selalu",
          "Diurutkan alfabetis",
        ],
        answer: 1,
        why: "Model menghitung angka. Kategori teks harus dikonversi (label/ordinal bila berurutan, one-hot bila tidak) sebelum masuk training.",
      },
      {
        q: "Proporsi split yang disebut umum di materi:",
        options: ["50:50", "70–80% latih : 20–30% uji", "99:1", "10:90"],
        answer: 1,
        why: "Latih butuh porsi besar supaya pola cukup dipelajari; uji cukup untuk estimasi yang stabil. Namun tidak mutlak — data sedikit bisa 90:10.",
      },
    ],
  },
  {
    slug: "ml-11",
    tid: "38713",
    title: "Jenis Klasifikasi: Biner, Multikelas, Multilabel",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38713" },
    untukApa: [
      "Satu pertanyaan menentukan arsitektur klasifikasimu: berapa kelas, dan bisa satu data punya lebih dari satu kelas? Salah paham di sini = pilihan algoritma dan metrik salah semua.",
      "Tiga jenis ini mencakup hampir semua masalah klasifikasi yang akan kamu temui.",
    ],
    sections: [
      {
        h: "Tiga jenis",
        table: {
          head: ["Jenis", "Aturan", "Contoh"],
          rows: [
            ["Biner", "Tepat 2 kelas, satu jawaban", "Spam / bukan spam; fraud / bukan; sakit / sehat"],
            ["Multikelas", ">2 kelas, TAPI satu data = SATU kelas", "Gambar: anjing ATAU kucing ATAU katak"],
            ["Multilabel", ">2 label, satu data = BISA BANYAK label", "Artikel berita: 'teknologi' DAN 'bisnis' sekaligus"],
          ],
        },
        callout: "Kunci beda multikelas vs multilabel: multikelas = pilih satu dari banyak (radio button); multilabel = centang semua yang cocok (checkbox).",
      },
      {
        h: "Detail penting per jenis",
        list: [
          "Biner: output bisa keputusan pasti atau PROBABILITAS (70% spam, 30% tidak). Tantangan utama: kelas tidak seimbang → butuh oversampling/undersampling atau penyesuaian threshold.",
          "Multikelas: model belajar fitur pembeda antar kelas (bentuk, tekstur, pola warna). Banyak algoritma mendukung langsung; yang tidak, pakai strategi one-vs-rest.",
          "Multilabel: paling jarang diajarkan tapi nyata — tag video YouTube, genre film, gejala penyakit ganda. Metrik evaluasinya beda (subset accuracy, hamming loss).",
        ],
      },
      {
        h: "Menentukan jenis masalahmu",
        p: [
          "Tanya 1: berapa kelas yang mungkin? (2 = biner).",
          "Tanya 2: bolehkah satu contoh punya beberapa jawaban? (ya = multilabel; tidak = multikelas/biner).",
          "Contoh alur: deteksi email → biner. Jenis buah → multikelas. Tag konten → multilabel.",
        ],
      },
    ],
    lab: {
      title: "Klasifikasikan klasifikasinya",
      intro: "Sepuluh kasus, tentukan jenisnya — kerangka berpikir sebelum menulis kode.",
      steps: [
        "Deteksi transaksi fraud: fraud / bukan.",
        "Pengenalan jenis bunga iris: setosa/versicolor/virginica.",
        "Tagging video: 'edukasi', 'musik', 'gaming' bisa lebih dari satu.",
        "Diagnosis: pasien boleh punya beberapa penyakit sekaligus.",
        "Klasifikasi sentimen komentar: positif/negatif/netral.",
        "Filter pesan: aman / mencurigakan.",
        "Untuk tiap kasus tulis jenisnya + satu alasan. Perhatikan mana yang jebakan multilabel.",
      ],
      hint: "Kasus 3 dan 4 adalah multilabel — kuncinya 'boleh lebih dari satu'. Kasus 5 jebakan klasik: netral membuatnya multikelas (3 kelas), bukan biner.",
    },
    quiz: [
      {
        q: "Model memprediksi gambar: anjing ATAU kucing ATAU katak. Jenisnya:",
        options: ["Biner", "Multikelas — satu gambar satu kelas", "Multilabel", "Reinforcement"],
        answer: 1,
        why: "Lebih dari dua kelas, tapi setiap gambar cuma punya SATU identitas — itu multikelas (radio button), bukan multilabel.",
      },
      {
        q: "Artikel berita bisa ditandai 'teknologi' DAN 'bisnis' sekaligus. Jenisnya:",
        options: ["Biner", "Multikelas", "Multilabel", "Unsupervised"],
        answer: 2,
        why: "Satu contoh boleh membawa banyak label sekaligus = multilabel (checkbox). Contoh lain: genre film, tag konten, gejala ganda.",
      },
      {
        q: "Tantangan khas klasifikasi biner yang disebut materi:",
        options: [
          "Data selalu terlalu besar",
          "Kelas tidak seimbang — butuh oversampling/undersampling atau penyesuaian threshold",
          "Tidak bisa dipakai di dunia nyata",
          "Selalu butuh GPU",
        ],
        answer: 1,
        why: "Biner dengan kelas timpang (fraud 1%) membuat model mengabaikan kelas minoritas — teknik penyeimbangan dan threshold adjustment diperlukan.",
      },
      {
        q: "Output model biner bisa berupa...",
        options: [
          "Hanya keputusan pasti",
          "Keputusan pasti ATAU probabilitas (70% spam, 30% tidak)",
          "Hanya probabilitas",
          "Angka kontinu",
        ],
        answer: 1,
        why: "Tergantung implementasi: sebagian model memberi kelas langsung, sebagian memberi skor probabilitas yang bisa dipotong di threshold yang kamu pilih.",
      },
    ],
  },
  {
    slug: "ml-12",
    tid: "38718",
    title: "Peta 7 Algoritma Klasifikasi",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38718" },
    untukApa: [
      "Sebelum membedah satu per satu, kamu butuh peta besarnya: ada apa saja, cara berpikirnya apa, dan kapan dipilih — supaya lesson deep-dive berikutnya ada tempat tersimpan.",
      "Peta ini juga jawaban cepat untuk pertanyaan interview klasik: 'kenapa memakai algoritma X untuk masalah ini?'",
    ],
    sections: [
      {
        h: "Tujuh algoritma, satu tabel",
        table: {
          head: ["Algoritma", "Cara berpikir inti", "Paling cocok saat"],
          rows: [
            ["KNN", "'Katakan siapa teman terdekatmu' — voting tetangga terdekat", "Data kecil-menengah, pola lokal jelas"],
            ["Decision Tree", "Rantai pertanyaan if/else yang dipelajari data", "Butuh interpretabilitas, aturan eksplisit"],
            ["Random Forest", "Banyak pohon voting — ensemble", "Akurasi stabil, tahan overfitting"],
            ["SVM", "Cari garis/bidang pemisah dengan margin terlebar", "Data terpisah jelas, dimensi tinggi"],
            ["Naive Bayes", "Probabilitas Teorema Bayes, fitur dianggap independen", "Teks: spam, sentimen"],
            ["Logistic Regression", "Prediksi probabilitas kelas (bukan regresi meski namanya begitu!)", "Biner dengan interpretabilitas koefisien"],
            ["Neural Network", "Lapisan neuron meniru otak", "Masalah sangat kompleks: gambar, NLP"],
          ],
        },
      },
      {
        h: "Spectrum yang perlu kamu rasakan",
        list: [
          "Simpel → kompleks: NB/LR/KNN (cepat, mudah) → DT/RF/SVM (butuh tuning) → NN (butuh data besar & komputasi).",
          "Interpretable → black box: DT paling bisa dibaca manusia; RF/SVM sedang; NN paling gelap.",
          "Aturan baku pemilihan: MULAI dari yang paling sederhana sebagai baseline, naik hanya kalau metrik menuntut — bukan sebaliknya.",
        ],
        callout: "Algoritma canggih ≠ selalu lebih baik. Di banyak dataset tabular, Random Forest atau bahkan Logistic Regression mengalahkan deep learning — dengan sebagian kecil biaya.",
      },
    ],
    lab: {
      title: "Cocokkan masalah dengan algoritma",
      intro: "Latihan memakai peta sebelum dibolehkan memakai senjatanya.",
      steps: [
        "Filter spam pada jutaan email teks — algoritma paling efisien?",
        "Model yang harus bisa DIBACAKAN aturannya ke auditor (mis. keputusan kredit) — pilih apa?",
        "Data tabular menengah, butuh akurasi stabil tanpa tuning rumit — pilih apa?",
        "Pengenalan gambar wajah — algoritma mana yang secara alami masuk?",
        "Untuk tiap jawaban, tulis SATU alasan dari kolom 'paling cocok saat' di tabel.",
      ],
      hint: "Jawaban wajar: (1) Naive Bayes/LR untuk teks, (2) Decision Tree, (3) Random Forest, (4) Neural Network/Deep Learning. Yang dinilai alasanmu, bukan tebak-tebakan.",
    },
    quiz: [
      {
        q: "Algoritma yang meski bernama 'regresi' sebenarnya untuk klasifikasi:",
        options: ["Linear Regression", "Logistic Regression", "SVR", "Polynomial Regression"],
        answer: 1,
        why: "Logistic Regression memprediksi PROBABILITAS kelas (lewat fungsi sigmoid) — meski namanya regresi, tugasnya klasifikasi, terutama biner.",
      },
      {
        q: "Random Forest meningkatkan akurasi dengan cara...",
        options: [
          "Satu pohon super dalam",
          "Menggabungkan banyak decision tree (ensemble) via voting/rata-rata",
          "Menghapus semua outlier",
          "Menambah fitur otomatis",
        ],
        answer: 1,
        why: "Ensemble: setiap pohon dilatih di subset data/fitur acak; hasil akhir = voting (klasifikasi) atau rata-rata (regresi) — mengurangi overfitting satu pohon.",
      },
      {
        q: "Naive Bayes sangat populer untuk klasifikasi teks karena...",
        options: [
          "Teks selalu berdistribusi normal",
          "Asumsi independensi fiturnya sederhana tapi cukup kuat & cepat untuk data teks",
          "Teks tidak butuh preprocessing",
          "Ia satu-satunya yang bisa memproses string",
        ],
        answer: 1,
        why: "Asumsi 'naive' (fitur independen) jarang benar, tapi cukup baik di praktik untuk spam/sentimen — dengan komputasi yang murah.",
      },
      {
        q: "Prinsip pemilihan algoritma yang paling sehat:",
        options: [
          "Selalu pilih paling canggih",
          "Mulai dari baseline sederhana, naik kompleksitas hanya jika metrik menuntut",
          "Selalu neural network",
          "Pilih yang paling banyak dipakai di media sosial",
        ],
        answer: 1,
        why: "Baseline sederhana memberi patokan: jika KNN sudah 95%, neural network mungkin tidak perlu — dan kalau perlu, kamu tahu berapa banyak yang ia tambahkan.",
      },
    ],
  },
  {
    slug: "ml-13",
    tid: "38728",
    title: "KNN: Voting Tetangga Terdekat",
    minutes: 18,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38728" },
    untukApa: [
      "KNN adalah algoritma klasifikasi paling intuitif — 'kamu dikenali dari teman dekatmu' — dan menjadi batu pijakan memahami konsep jarak yang dipakai banyak algoritma lain.",
      "Dari lesson ini kamu membawa pulang trade-off terpenting ML: K kecil vs K besar = overfitting vs underfitting. Konsep ini muncul LAGI di decision tree, SVM, dan tuning.",
    ],
    sections: [
      {
        h: "Cara kerja 6 langkah",
        list: [
          "1. Siapkan dataset berlabel (fitur + kelas).",
          "2. Saat prediksi: hitung jarak data baru ke SEMUA titik data latih.",
          "3. Tentukan K (jumlah tetangga yang dipertimbangkan).",
          "4. Ambil K titik terdekat.",
          "5. Voting mayoritas: kelas apa yang paling banyak di antara tetangga.",
          "6. Kelas hasil voting = prediksi.",
        ],
        code: "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.preprocessing import StandardScaler\n\nX_scaled = StandardScaler().fit_transform(X)   # wajib utk KNN!\nknn = KNeighborsClassifier(n_neighbors=5)      # K=5 (default)\nknn.fit(X_train_scaled, y_train)\nprint(knn.score(X_test_scaled, y_test))",
      },
      {
        h: "Parameter utama",
        table: {
          head: ["Parameter", "Default", "Dampak"],
          rows: [
            ["K (n_neighbors)", "5", "K kecil → sensitif noise → overfitting; K besar → terlalu umum → underfitting"],
            ["Metric jarak", "minkowski", "Euclidean (garis lurus), Manhattan (per sumbu), Minkowski (generalisasi, param p), Cosine (teks)"],
            ["Weights", "uniform", "uniform = semua tetangga setara; distance = makin dekat makin berpengaruh"],
            ["p (untuk minkowski)", "2", "p=1 → Manhattan, p=2 → Euclidean"],
          ],
        },
        callout: "KKN TIDAK belajar apa-apa saat .fit() — ia hanya MENGINGAT data. Seluruh kerja terjadi saat predict. Itulah kenapa disebut lazy learner.",
      },
      {
        h: "Kenapa scaling wajib untuk KNN",
        p: [
          "KNN hidup dari jarak. Fitur gaji (jutaan) menenggelamkan umur (puluhan) dalam rumus jarak — padahal belum tentu lebih penting (bukti hitung di ml-09).",
          "Normalisasi/standardisasi menyamakan arena — langkah ini BUKAN opsional untuk KNN.",
        ],
      },
      {
        h: "Kelebihan vs kekurangan",
        table: {
          head: ["Kelebihan", "Kekurangan"],
          rows: [
            ["Simpel & intuitif", "Komputasi berat saat predict (hitung jarak ke SEMUA data)"],
            ["Non-parametrik — tak asumsikan distribusi", "Sensitif noise & fitur tak relevan"],
            ["Efektif untuk dataset kecil", "Memori intensif: simpan seluruh dataset"],
          ],
        },
      },
    ],
    lab: {
      title: "KNN dengan tangan + sklearn",
      intro: "Hitung satu prediksi manual, lalu bandingkan dengan hasil sklearn — pemahaman terdalam datang dari menghitung sendiri.",
      steps: [
        "Buat dataset 2D mini: titik kelas A [(1,1),(1.5,2),(2,1.5)], kelas B [(6,6),(6.5,7),(7,6.5)].",
        "Data baru (2,2): hitung jarak Euclidean ke semua titik dengan math.dist atau manual sqrt((x1-x2)²+(y1-y2)²).",
        "Dengan K=3: kelas apa yang menang voting? Tulis alurmu.",
        "Uji yang sama di sklearn: fit KNeighborsClassifier(n_neighbors=3), predict([[2,2]]) — harus cocok.",
        "Eksperimen K: bandingkan akurasi K=1, 5, 11 di test set — rasakan trade-off noise vs umum.",
        "Buktikan scaling: bandingkan akurasi dengan dan tanpa StandardScaler pada dataset dengan skala kolom jauh beda.",
      ],
      hint: "Sklearn default metric='minkowski', p=2 — itu artinya Euclidean. Mengganti p=1 mengubahnya jadi Manhattan tanpa ganti nama metric.",
    },
    quiz: [
      {
        q: "K=1 dalam KNN membuat model...",
        options: [
          "Lebih stabil dan general",
          "Sangat sensitif noise/outlier — rentan overfitting",
          "Lebih cepat di dataset besar",
          "Tidak butuh scaling",
        ],
        answer: 1,
        why: "Satu tetangga = keputusan dari titik tunggal; satu noise point dekat data baru langsung salah klasifikasi. K kecil = model terlalu mengikuti detail latih.",
      },
      {
        q: "Kenapa KNN disebut lazy learner?",
        options: [
          "Karena lambat diuji",
          "Karena tidak ada proses belajar saat fit — data hanya diingat; kerja penuh terjadi saat predict",
          "Karena hanya bekerja di malam hari",
          "Karena hasilnya selalu kurang akurat",
        ],
        answer: 1,
        why: "fit() KNN hanya menyimpan dataset. Semua komputasi jarak terjadi di predict() — kebalikan eager learner seperti decision tree yang membangun struktur saat fit.",
      },
      {
        q: "weights='distance' berbeda dari 'uniform' karena...",
        options: [
          "Menghapus tetangga jauh",
          "Tetangga lebih dekat memberi kontribusi lebih besar (bobot berbanding terbalik jarak)",
          "Semua tetangga setara",
          "Mengubah jumlah K otomatis",
        ],
        answer: 1,
        why: "Distance weighting menaikkan suara tetangga dekat — berguna saat data rapat; uniform memperlakukan tetangga ke-K terjauh sama dengan terdekat.",
      },
      {
        q: "Scaling (standardisasi/normalisasi) pada KNN adalah...",
        options: [
          "Opsional, hanya estetika",
          "Wajib — KNN berbasis jarak, fitur berskala besar mendominasi perhitungan",
          "Hanya untuk data gambar",
          "Pengganti pemilihan K",
        ],
        answer: 1,
        why: "Tanpa scaling, jarak didikte fitur berskala terbesar (bukti ml-09). Scaling menyamakan kontribusi tiap fitur dalam rumus jarak.",
      },
      {
        q: "Dataset 500 ribu baris — kelemahan KNN yang paling terasa:",
        options: [
          "Tidak bisa diinstall",
          "Setiap prediksi menghitung jarak ke semua 500 ribu titik → komputasi & memori berat",
          "Hanya bisa klasifikasi biner",
          "Tidak mendukung data numerik",
        ],
        answer: 1,
        why: "KNN menyimpan seluruh data dan menghitung jarak ke semuanya saat predict — mahal pada data besar. Solusinya struktur pencarian (KD-Tree/Ball-Tree) atau algoritma lain.",
      },
    ],
  },
  {
    slug: "ml-14",
    tid: "8397",
    title: "Decision Tree & Random Forest",
    minutes: 20,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8397" },
    untukApa: [
      "Decision Tree adalah satu-satunya model yang aturannya bisa DIBACAKAN ke manusia ('jika gaji > 5jt dan umur < 30 → lolos') — berharga saat keputusan harus bisa dipertanggungjawabkan.",
      "Random Forest menjawab kelemahan terbesarnya (overfitting) dengan ensemble — pola 'banyak model lemah = satu model kuat' yang dipakai luas di kompetisi data.",
    ],
    sections: [
      {
        h: "Anatomi decision tree",
        list: [
          "Root node: titik awal, mewakili seluruh dataset.",
          "Decision node: cabang pertanyaan berdasar fitur ('umur > 30?').",
          "Leaf node: ujung pohon = hasil prediksi (kelas atau nilai).",
        ],
        code: "from sklearn.tree import DecisionTreeClassifier\n\ndt = DecisionTreeClassifier(\n    criterion='gini',        # atau 'entropy'\n    max_depth=5,             # batasi kedalaman: cegah overfitting\n    min_samples_split=2,\n    min_samples_leaf=1)\ndt.fit(X_train, y_train)",
      },
      {
        h: "Criterion: bagaimana pohon memilih pertanyaan",
        table: {
          head: ["Kriteria", "Mengukur", "Interpretasi"],
          rows: [
            ["Gini impurity", "Peluang salah klasifikasi jika label dipilih acak", "0 = murni (satu kelas); >0 = campuran"],
            ["Entropy", "Tingkat ketidakpastian/keacakan node", "0 = murni; tinggi = sulit diprediksi"],
          ],
        },
        p: [
          "Keduanya dipakai memilih fitur terbaik untuk split di tiap node: pilih pertanyaan yang membuat node anak SEMAKIN MURNI.",
          "Praktisnya gini (default) dan entropy menghasilkan pohon serupa — gini lebih cepat dihitung.",
        ],
      },
      {
        h: "Parameter penjaga overfitting",
        list: [
          "max_depth (default None = tanpa batas): pohon terlalu dalam menghafal data latih. Batasi 10–20 biasanya cukup.",
          "min_samples_split (default 2): jumlah sampel minimal agar node boleh dipecah — naikkan = pohon lebih sederhana.",
          "min_samples_leaf (default 1): sampel minimal di tiap daun — naikkan supaya keputusan berbasis cukup banyak bukti.",
          "max_features: jumlah fitur yang dipertimbangkan per split.",
        ],
      },
      {
        h: "Random Forest: ensemble dari banyak pohon",
        p: [
          "Masalah satu pohon: overfit — menghafal data latih. Solusi: latih BANYAK pohon, masing-masing pada subset data acak (bootstrap) + subset fitur acak.",
          "Prediksi akhir = voting mayoritas (klasifikasi) atau rata-rata (regresi). Kesalahan tiap pohon saling meniadakan.",
        ],
        code: "from sklearn.ensemble import RandomForestClassifier\n\nrf = RandomForestClassifier(\n    n_estimators=200,     # jumlah pohon (saranku 100-300)\n    max_depth=15,\n    bootstrap=True,       # sampling acak dgn pengembalian\n    random_state=1)\nrf.fit(X_train, y_train)",
        callout: "n_estimators terlalu rendah = model lemah; terlalu tinggi = komputasi boros tanpa tambahan akurasi berarti. 100–300 titik awal yang sehat.",
      },
      {
        h: "Trade-off yang harus kamu kelola",
        table: {
          head: ["Model", "Kelebihan", "Kekurangan"],
          rows: [
            ["Decision Tree", "Interpretable penuh; tanpa scaling; handle campuran tipe data", "Mudah overfit; tidak stabil (data kecil berubah, pohon berubah total)"],
            ["Random Forest", "Akurasi tinggi & stabil; tahan overfitting", "Black box-er; lebih berat komputasi; tetap butuh tuning ringan"],
          ],
        },
      },
    ],
    lab: {
      title: "Satu pohon vs ratusan pohon",
      intro: "Buktikan sendiri kenapa ensemble mengalahkan pohon tunggal.",
      steps: [
        "Ambil dataset klasifikasi dari batch sebelumnya (split sudah jadi).",
        "Latih DecisionTreeClassifier tanpa batasan (max_depth=None) — catat akurasi train vs test. Lihat jurangnya (overfitting).",
        "Latih ulang dengan max_depth=5 — bandingkan jurangnya.",
        "Latih RandomForestClassifier(n_estimators=100) — catat akurasi test.",
        "Bandingkan ketiganya: pohon liar vs pohon dikecam vs hutan.",
        "Buka visualisasi pohon kecilmu (sklearn.tree.plot_tree) dan BACA satu cabang — ini kekuatan unik decision tree.",
      ],
      hint: "Pohon tanpa batas hampir selalu 100% di train set — ia menghafal. Yang menentukan kualitas adalah akurasi TEST; selisih train-test besar = overfitting.",
    },
    quiz: [
      {
        q: "Gini impurity = 0 di sebuah node berarti...",
        options: [
          "Node kosong",
          "Node sepenuhnya murni — semua data satu kelas",
          "Pohon harus dihentikan seluruhnya",
          "Data error",
        ],
        answer: 1,
        why: "Gini 0 = memilih label acak dari node itu tak mungkin salah karena hanya ada satu kelas. Split terbaik = yang mendorong node anak makin mendekati 0.",
      },
      {
        q: "Fungsi utama parameter max_depth:",
        options: [
          "Menentukan jumlah kelas",
          "Membatasi kedalaman pohon → mencegah overfitting",
          "Mempercepat loading data",
          "Mengubah kriteria split",
        ],
        answer: 1,
        why: "Pohon dalam = pertanyaan makin spesifik = menghafal noise. Membatasi kedalaman memaksa pohon berhenti pada pola yang lebih umum (default None = tumbuh bebas).",
      },
      {
        q: "Yang membedakan Random Forest dari satu Decision Tree:",
        options: [
          "RF memakai kernel",
          "RF melatih banyak pohon di subset data+fitur acak lalu voting — mengurangi overfitting",
          "RF hanya untuk regresi",
          "RF tidak butuh data berlabel",
        ],
        answer: 1,
        why: "Ensemble + bootstrap sampling + feature randomness = keragaman antar pohon; voting meratakan kesalahan individual menjadi prediksi stabil.",
      },
      {
        q: "Kelebihan DECISION TREE (bukan RF) yang paling unik:",
        options: [
          "Akurasi tertinggi di semua dataset",
          "Aturannya bisa dibaca & dijelaskan ke manusia (interpretable)",
          "Tidak butuh data latih",
          "Otomatis tahan noise",
        ],
        answer: 1,
        why: "Rantai if/else pohon bisa ditelusuri dan dibacakan — alasan utama memilih DT saat keputusan harus dipertanggungjawabkan (kredit, medis, regulasi).",
      },
      {
        q: "Sarankan nilai awal n_estimators untuk Random Forest:",
        options: ["1–5", "100–300", "10.000", "Tidak boleh diubah"],
        answer: 1,
        why: "Terlalu sedikit = lemah; terlalu banyak = boros komputasi tanpa gain berarti. 100–300 titik mulai yang umum; naikkan bila metrik masih menanjak.",
      },
    ],
  },
  {
    slug: "ml-15",
    tid: "8447",
    title: "SVM: Hyperplane, Kernel Trick & Margin",
    minutes: 18,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/8447" },
    untukApa: [
      "SVM memecahkan pertanyaan fundamental: dari BANYAK garis yang bisa memisahkan dua kelas, mana yang terbaik? Jawabannya — margin terlebar — menjadi salah satu ide paling elegan di ML.",
      "Kernel trick-nya adalah teknik 'naikkan dimensi' yang membuat data tak terpisah garis menjadi terpisah — konsep yang dipakai ulang di banyak tempat.",
    ],
    sections: [
      {
        h: "Hyperplane & margin",
        p: [
          "Hyperplane = garis (2D) / bidang (3D) / generalisasi di dimensi tinggi yang memisahkan kelas. Ada banyak hyperplane yang bisa; SVM mencari yang MARGIN-nya terlebar.",
          "Margin = jarak hyperplane ke titik data terdekat tiap kelas (support vectors). Margin lebar = 'zona aman' tebal = generalisasi lebih baik.",
        ],
        code: "from sklearn.svm import SVC\n\nsvm = SVC(\n    kernel='rbf',     # linear/poly/rbf/sigmoid\n    gamma='scale',\n    C=1.0)\nsvm.fit(X_train_scaled, y_train)",
      },
      {
        h: "Kernel trick: saat garis lurus tidak cukup",
        table: {
          head: ["Kernel", "Karakter", "Dipakai saat"],
          rows: [
            ["linear", "Tanpa pemetaan — apa adanya", "Data terpisah linear; fitur >> sampel (teks ribuan fitur)"],
            ["poly", "Pemetaan polinomial", "Batas kurva berpola polinomial"],
            ["rbf (default)", "Gaussian — pemetaan dimensi sangat tinggi", "Batas non-linear kompleks; pilihan aman umum"],
            ["sigmoid", "Mirip aktivasi neural network", "Perilaku mirip jaringan saraf"],
          ],
        },
        callout: "Kernel trick: menghitung hubungan data SEOLAH sudah dipetakan ke dimensi tinggi — tanpa benar-benar menghitung koordinatnya. Elegan dan efisien.",
      },
      {
        h: "Gamma & C: dua kenop regulasi",
        list: [
          "gamma mengatur pengaruh SATU titik data: gamma tinggi = pengaruh sempit & melengkung mengikuti titik (risiko overfit); gamma rendah = pengaruh luas & batas mulus (risiko underfit).",
          "C (regularization) mengatur toleransi kesalahan: C besar = keras menghukum kesalahan latih (margin sempit, overfit risk); C kecil = toleran (margin lebar, lebih general).",
          "Default aman: gamma='scale' (otomatis dari data) dan C=1.0 — mulai dari sini, ubah satu kenop demi satu.",
        ],
      },
      {
        h: "Trade-off SVM",
        table: {
          head: ["Kelebihan", "Kekurangan"],
          rows: [
            ["Efektif di dimensi tinggi (teks)", "Lambat di dataset sangat besar (O(n²)-ish)"],
            ["Memori efisien: hanya simpan support vectors", "Sensitif pilihan kernel/gamma/C (butuh scaling + tuning)"],
            ["Fleksibel via kernel trick", "Probabilitas tidak langsung; interpretabilitas rendah"],
          ],
        },
      },
    ],
    lab: {
      title: "Visualkan margin & kernel",
      intro: "Melihat margin lebih meyakinkan daripada membaca definisinya.",
      steps: [
        "Buat data 2D dua kelas yang terpisah jelas (mis. dua cluster).",
        "Latih SVC(kernel='linear') lalu plot garis keputusannya + titik support vectors (model.support_vectors_).",
        "Bandingkan C=0.1 vs C=100: amati margin melebar/menyempit.",
        "Buat data yang TIDAK bisa dipisah garis (lingkaran di dalam lingkaran — make_circles).",
        "Buktikan kernel='linear' gagal, lalu kernel='rbf' berhasil — inilah kernel trick secara mata.",
        "Eksperimen gamma: 0.1 vs 10 dengan rbf — amati batas makin 'gatal' mengikuti titik saat gamma tinggi.",
      ],
      hint: "SVM butuh scaling seperti KNN — jarak dan margin dihitung dari koordinat. Lupakan StandardScaler = hasil acak.",
    },
    quiz: [
      {
        q: "Tujuan SVM saat memilih hyperplane:",
        options: [
          "Garis yang paling banyak melewati data",
          "Memaksimalkan margin — jarak ke titik terdekat tiap kelas",
          "Garis paling curam",
          "Meminimalkan jumlah support vector",
        ],
        answer: 1,
        why: "Banyak garis bisa memisahkan kelas; yang dipilih SVM adalah yang marginnya terlebar supaya 'zona aman' maksimal dan generalisasi lebih baik.",
      },
      {
        q: "Fungsi kernel trick:",
        options: [
          "Menghapus fitur tak relevan",
          "Memungkinkan perhitungan SEOLAH data dipetakan ke dimensi lebih tinggi tanpa benar-benar menghitung koordinatnya — data tak terpisah linear jadi terpisah",
          "Mempercepat loading CSV",
          "Mengubah klasifikasi jadi regresi",
        ],
        answer: 1,
        why: "Kernel menghitung hubungan pasangan titik di ruang fitur tinggi secara implisit — trik matematika yang membuat batas non-linear bisa ditemukan dengan murah.",
      },
      {
        q: "Kernel default sklearn SVC dan kapan cocok:",
        options: [
          "linear — selalu",
          "rbf — batas non-linear kompleks, pilihan aman umum",
          "sigmoid — selalu",
          "precomputed — default",
        ],
        answer: 1,
        why: "rbf (Gaussian) adalah default karena menangani batas non-linear kompleks dengan baik; linear dipilih eksplisit saat data memang terpisah garis lurus.",
      },
      {
        q: "Gamma terlalu TINGGI menyebabkan...",
        options: [
          "Underfitting — batas terlalu mulus",
          "Batas melengkung mengikuti tiap titik — risiko overfitting",
          "Error saat fit",
          "Margin jadi terlebar otomatis",
        ],
        answer: 1,
        why: "Gamma tinggi = radius pengaruh tiap titik sempit = batas keputusan 'gatal' mengitari titik latih — menghafal, bukan belajar pola.",
      },
      {
        q: "Parameter C dalam SVM mengatur...",
        options: [
          "Jumlah kelas",
          "Trade-off margin lebar vs kesalahan di data latih: C besar = keras menghukum kesalahan (overfit risk)",
          "Jumlah fitur yang dipakai",
          "Kecepatan loading",
        ],
        answer: 1,
        why: "C besar menuntut latih sempurna (margin sempit, bisa overfit); C kecil memaafkan beberapa kesalahan demi margin lebih lebar dan generalisasi lebih baik.",
      },
    ],
  },
  {
    slug: "ml-16",
    tid: "38758",
    title: "Naive Bayes: Probabilitas & Teorema Bayes",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38758" },
    untukApa: [
      "Naive Bayes menjawab pertanyaan dengan BAHASA PELUANG: 'seberapa mungkin email ini spam, DENGAN MEMPERHITUNGKAN kata-katanya?' — cara berpikir yang beda dari semua algoritma sebelumnya.",
      "Ia kereta tercepat untuk masalah teks (spam, sentimen) dan satu-satunya yang kelihatan 'berpikir' seperti statistikawan.",
    ],
    sections: [
      {
        h: "Teorema Bayes dalam bahasa manusia",
        p: [
          "P(kelas | fitur) = P(fitur | kelas) × P(kelas) / P(fitur) — dihitung untuk tiap kelas, kelas dengan probabilitas tertinggi menang.",
          "Tiga bahan: PRIOR (seberapa umum kelas ini sebelum melihat fitur — 60 dari 100 email spam → prior spam 60%), LIKELIHOOD (seberapa sering fitur muncul DI DALAM kelas itu), POSTERIOR (hasil akhirnya).",
        ],
        code: "# Intuisi spam: kata 'diskon'\n# prior:   P(spam) = 60/100  = 0.6\n# likelihood: P('diskon'|spam) = 30/50 = 0.6\n#             P('diskon'|ham)  = 10/50 = 0.2\n# -> email berisi 'diskon' menguatkan hipotesis spam\n# (model mengalikan likelihood semua kata × prior tiap kelas)",
      },
      {
        h: "Asumsi 'naive' dan kenapa tetap jalan",
        p: [
          "Naive = menganggap SEMUA fitur independen satu sama lain: kata 'diskon' dan 'gratis' dianggap tak berhubungan — padahal di teks nyata mereka sering muncul bersama.",
          "Asumsinya salah, TAPI estimasi arah kelasnya tetap bagus dan komputasinya super murah — itulah kenapa NB tetap jadi baseline teks sejuta umat.",
        ],
      },
      {
        h: "Laplace smoothing: penjaga dari nol fatal",
        p: [
          "Masalah: kata 'blockchain' BELUM PERNAH muncul di data spam → P('blockchain'|spam) = 0 → seluruh perkalian jadi 0, seberat apapun bukti lainnya.",
          "Solusi Laplace (add-one) smoothing: tambah 1 ke semua hitungan supaya tak ada probabilitas nol — kata tak pernah dilihat tetap dapat kemungkinan kecil, bukan nol.",
        ],
        callout: "Ini bug matematika klasik yang diselamatkan satu parameter. Tanpa smoothing, satu kata baru = seluruh prediksi kacau.",
      },
      {
        h: "Trade-off & kapan memakai",
        table: {
          head: ["Kelebihan", "Kekurangan"],
          rows: [
            ["Sangat cepat — cocok data besar & real-time", "Asumsi independen sering tidak realistis"],
            ["Bagus di data teks berdimensi tinggi", "Estimasi probabilitasnya kurang kalibrasi"],
            ["Butuh sedikit data latih untuk jalan", "Zero-frequency problem (tanpa smoothing)"],
          ],
        },
      },
    ],
    lab: {
      title: "Spam filter mini dari nol",
      intro: "Bangun Naive Bayes teks versimu sendiri tanpa sklearn — lihat mesinnya berputar.",
      steps: [
        "Buat 10 email berlabel: 5 spam ('diskon gratis menang hadiah'), 5 ham ('rapat besok laporan proyek').",
        "Hitung prior tiap kelas, dan hitung frekuensi tiap kata per kelas (kamus sederhana pakai dict).",
        "Fungsi skor(email, kelas): kalikan prior × likelihood tiap kata (pakai log supaya tidak underflow).",
        "Uji email baru 'gratis diskon hari ini' — spam harus menang.",
        "Uji kata yang TIDAK ADA di data latih tanpa smoothing (perkalian jadi 0?) lalu tambahkan Laplace (+1) dan uji ulang.",
        "Bandingkan dengan MultinomialNB sklearn pada data yang sama.",
      ],
      hint: "Pakai log-probability: log(a×b) = log(a)+log(b) — menjumlah log jauh lebih stabil daripada mengalikan banyak desimal kecil.",
    },
    quiz: [
      {
        q: "Dalam Teorema Bayes, probabilitas PRIOR adalah...",
        options: [
          "Probabilitas fitur muncul dalam kelas",
          "Probabilitas awal kelas SEBELUM melihat fitur — dari frekuensi kelas di data latih",
          "Hasil akhir klasifikasi",
          "Jumlah kata dalam email",
        ],
        answer: 1,
        why: "Prior = pengetahuan awal ('60 dari 100 email itu spam'). Ia dikombinasikan dengan likelihood fitur untuk menghasilkan posterior.",
      },
      {
        q: "Kata 'diskon' muncul 30/50 di email spam dan 10/50 di ham. Nilai likelihood P('diskon'|spam):",
        options: ["0.2", "0.6", "0.5", "1.0"],
        answer: 1,
        why: "Likelihood = kemunculan fitur DI DALAM kelas: 30 dari 50 email spam berisi 'diskon' = 0.6 — dua kali lipat kemunculannya di ham (0.2), jadi menguatkan hipotesis spam.",
      },
      {
        q: "Fungsi Laplace smoothing:",
        options: [
          "Mempercepat training",
          "Mencegah probabilitas NOL untuk fitur yang belum pernah muncul di suatu kelas",
          "Menghapus kata jarang",
          "Mengubah NB jadi neural network",
        ],
        answer: 1,
        why: "Tanpa smoothing, satu kata tak pernah dilihat membuat P(fitur|kelas)=0 dan seluruh produk probabilitas runtuh. Menambah 1 ke hitungan menjaga semua probabilitas > 0.",
      },
      {
        q: "Makna kata 'naive' dalam Naive Bayes:",
        options: [
          "Algoritma untuk pemula",
          "Asumsi semua fitur independen satu sama lain — jarang benar di dunia nyata",
          "Modelnya selalu salah",
          "Tidak bisa dipakai produksi",
        ],
        answer: 1,
        why: "Naive merujuk asumsi independensi antar fitur (kata-kata tidak saling tergantung). Meski tidak realistis, performa arah kelasnya tetap efektif — terutama untuk teks.",
      },
    ],
  },
  {
    slug: "ml-17",
    tid: "38763",
    title: "Evaluasi Klasifikasi: Confusion Matrix & 4 Metrik",
    minutes: 18,
    source: { label: SRC, url: "https://www.dicoding.com/academies/184/tutorials/38763" },
    untukApa: [
      "Akurasi 99% bisa berarti model hebat ATAU model sangat berguna-tidak — tanpa confusion matrix kamu tidak bisa membedakannya. Ini lesson yang melindungimu dari evaluasi menipu diri.",
      "Empat metrik di sini (akurasi, precision, recall, F1) adalah bahasa wajib semua laporan model klasifikasi — termasuk di interview dan kaggle.",
    ],
    sections: [
      {
        h: "Confusion matrix: 4 kuadran",
        table: {
          head: ["", "Prediksi: Positif", "Prediksi: Negatif"],
          rows: [
            ["**Aktual: Positif**", "TP — benar positif", "FN — TERLEWAT (tipe II)"],
            ["**Aktual: Negatif**", "FP — SALAH ALARM (tipe I)", "TN — benar negatif"],
          ],
        },
        p: [
          "Analogi tes kehamilan: TP = hamil terdeteksi benar; TN = tidak hamil terdeteksi benar; FP = pria 'terdeteksi hamil' (salah alarm); FN = wanita hamil terlewat (bahaya!).",
          "FP dan FN punya BIAYA BERBEDA tergantung domain: di skrining kanker FN fatal → utamakan recall; di filter spam FP menyebalkan (email penting masuk spam) → utamakan precision.",
        ],
      },
      {
        h: "Empat metrik, satu contoh",
        p: [
          "Contoh 100 email: TP=30, FP=10, TN=50, FN=10.",
          "Akurasi = (TP+TN)/total = 80/100 = 80% — seberapa sering benar secara keseluruhan. MENIPU saat kelas timpang: model 'selalu bukan spam' dapat 70% di data ini tanpa pernah menangkap spam.",
          "Precision = TP/(TP+FP) = 30/40 = 75% — dari yang DIPREDIKSI spam, berapa benar (seberapa boleh percaya alarm).",
          "Recall = TP/(TP+FN) = 30/40 = 75% — dari yang ASLI spam, berapa yang tertangkap (seberapa lengkap jaring).",
          "F1 = rata-rata harmonis precision & recall = 2·P·R/(P+R) = 75% — satu angka saat keduanya harus seimbang.",
        ],
        code: "from sklearn.metrics import classification_report, confusion_matrix\n\ny_pred = model.predict(X_test)\nprint(confusion_matrix(y_test, y_pred))\nprint(classification_report(y_test, y_pred))  # precision/recall/F1 per kelas",
        callout: "Rata-rata HARMONIS (F1), bukan aritmetika: jika precision=100% dan recall=0%, F1=0 — metrik ini tidak bisa dibohongi dengan mengorbankan satu sisi.",
      },
      {
        h: "Milih metrik = memilih risiko",
        table: {
          head: ["Situasi", "Utamakan", "Alasan"],
          rows: [
            ["Kelas seimbang, biaya seimbang", "Akurasi", "Cukup informatif"],
            ["Skrining penyakit", "Recall", "Terlewat diagnosis = fatal"],
            ["Filter spam / alarm fraud", "Precision", "Salah alarm = kehilangan kepercayaan"],
            ["Kelas timpang + butuh satu angka", "F1", "Tahan manipulasi kelas mayoritas"],
          ],
        },
      },
    ],
    lab: {
      title: "Bedah model dengan classification_report",
      intro: "Ambil model terbaikmu dari lesson algoritma dan bedah per kelas.",
      steps: [
        "Prediksi ulang test set dengan model klasifikasimu; hitung confusion_matrix — identifikasi TP/FP/TN/FN per kelas.",
        "Hitung manual akurasi, precision, recall, F1 dari matrix — cocokkan dengan classification_report.",
        "Buat model BAD sengaja: DummyClassifier(strategy='most_frequent') — lihat akurasinya tinggi tapi recall kelas minoritas 0.",
        "Kesimpulan satu kalimat: kenapa akurasi saja tidak cukup di data timpang?",
        "Uji trade-off: metrik mana yang paling penting untuk datasetmu, dan kenapa? Tulis di catatan proyekmu.",
      ],
      hint: "classification_report menampilkan metrics PER KELAS — baca baris kelas minoritas dulu; di situlah masalah model biasanya bersembunyi.",
    },
    quiz: [
      {
        q: "Confusion matrix data kanker: TP=30, FN=10, TN=55, FP=5. Metrik PALING krusial untuk domain ini:",
        options: ["Akurasi", "Recall — meminimalkan kasus terlewat", "Precision", "Jumlah data latih"],
        answer: 1,
        why: "FN = pasien kanker terlewat = fatal. Recall 30/(30+10) = 75% berarti 25% kasus lolos — angka yang harus ditekan di skrining medis.",
      },
      {
        q: "Precision = 100% dan recall = 5% artinya...",
        options: [
          "Model sempurna",
          "Semua yang ia tandai positif memang positif, tapi ia hampir tidak pernah menandai — jaringnya sangat bocor",
          "Model gagal total membedakan kelas",
          "Data error",
        ],
        answer: 1,
        why: "Precision tinggi = alarm jarang boong; recall 5% = 95% kasus positif lolos. F1 menangkap kegagalan ini: rata-rata harmonisnya jauh dari 100%.",
      },
      {
        q: "Model 'selalu prediksi bukan fraud' di dataset 99% transaksi normal memperoleh akurasi 99%. Kesimpulan yang benar:",
        options: [
          "Modelnya hebat, siap deploy",
          "Akurasi menipu di kelas timpang — periksa recall/precision kelas fraud (akan 0)",
          "Fraud tidak perlu dideteksi",
          "Tambah data normal lagi",
        ],
        answer: 1,
        why: "Akurasi didominasi kelas mayoritas. Confusion matrix membongkarnya: fraud = 0 TP, semua FN — model berguna nol meski 'akurat 99%'.",
      },
      {
        q: "F1 memakai rata-rata HARMONIS (bukan aritmetika) karena...",
        options: [
          "Lebih mudah dihitung",
          "Menghukum ketimpangan ekstrem: satu sisi mendekati 0 menarik F1 mendekati 0",
          "Supaya hasil selalu 100%",
          "Karena precision lebih penting",
        ],
        answer: 1,
        why: "Rata-rata aritmetika 100% dan 0% = 50% (terlihat lumayan); harmonis = 0 (jujur). F1 menuntut kedua sisi benar-benar seimbang.",
      },
      {
        q: "Email penting sering masuk folder spam. Model filter ini bermasalah di metrik...",
        options: [
          "Recall — terlalu sedikit spam tertangkap",
          "Precision — terlalu banyak FP (ham salah ditandai spam)",
          "Akurasi",
          "Jumlah TN",
        ],
        answer: 1,
        why: "Email penting (negatif/ham) diprediksi spam (positif) = false positive. Precision rendah = alarm sering boong = kepercayaan user runtuh.",
      },
    ],
  },
];
