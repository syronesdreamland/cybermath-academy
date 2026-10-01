import type { Lesson } from "./lesson-types";

// ============================================================
// Track Python — batch 1 (Fase 1-2): 6 lesson
// Rewrite internal dari materi Dicoding 86 (parafrase + contoh sendiri,
// bukan salinan). Link sumber asli tetap dicantumkan per lesson.
// ============================================================

const SRC = "Dicoding — Memulai Pemrograman dengan Python";

export const PYTHON_LESSONS: Lesson[] = [
  {
    slug: "py-01",
    tid: "4733",
    title: "Kenalan dengan Python",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4733" },
    untukApa: [
      "Kamu mau automated-recon script, scraping data, sampai bikin model ML — semuanya jalan di satu bahasa yang sintaksnya mirip pseudo-code.",
      "Python dipakai luas di dunia security (tooling, exploit PoC) dan data science — jadi ini investasi skill, bukan sekadar kursus.",
      "Sebelum nulis kode, kamu perlu tahu kenapa bahasa ini didesain se-logam-minimal ini dan versi mana yang wajib dipakai.",
    ],
    sections: [
      {
        h: "Python itu apa?",
        p: [
          "Python adalah bahasa pemrograman serbaguna yang dirilis tahun 1991 oleh Guido van Rossum. Desain utamanya: kode yang mudah dibaca manusia — Guido percaya kode lebih sering DIBACA daripada ditulis, jadi keterbacaan diprioritaskan sejak hari pertama.",
          "Konsekuensinya: tanpa titik koma di akhir baris, tanpa kurung kurawal untuk blok, tanpa deklarasi tipe. Satu baris berikut sudah bisa jalan:",
        ],
        code: 'print("Hello World!")',
      },
      {
        h: "Dipakai di mana saja",
        list: [
          "Web server-side (Django, Flask, FastAPI)",
          "Analisis data & visualisasi (pandas, matplotlib)",
          "Machine learning & AI (scikit-learn, TensorFlow)",
          "Otomasi & scripting (termasuk tooling keamanan)",
        ],
      },
      {
        h: "Python 2 vs Python 3 — kenapa harus versi 3",
        p: [
          "Python 2 (2000) membawa fitur penting seperti garbage collector dan memory management otomatis — kamu tidak perlu mengelola memori manual. Tapi Python 3 (2008) adalah perubahan besar yang TIDAK kompatibel ke belakang: kode Python 2 tidak dijamin jalan di Python 3.",
          "Python 2 sudah akhir masa dukungan sejak 2020. Semua materi di track ini (dan seluruh ekosistem modern) memakai Python 3. Kalau tutorial mana pun masih pakai `print \"...\"` tanpa kurung — itu Python 2, tinggalkan.",
        ],
        callout:
          "Aturan praktis: python --version harus menunjukkan Python 3.x. Kalau muncul 2.x, panggil dengan python3.",
      },
    ],
    lab: {
      title: "Hello World versi kamu",
      intro: "Nggak perlu install apa pun dulu — pakai mode interaktif di terminal, atau online interpreter kalau lagi di HP.",
      steps: [
        "Buka terminal (Windows: Command Prompt; Ubuntu: Ctrl+Alt+T).",
        "Cek versi: python --version (atau python3 --version).",
        "Masuk mode interaktif: ketik python (atau python3) lalu Enter.",
        'Jalankan: print("Halo, [namamu]!") — ganti dengan nama sendiri.',
        "Coba aritmetika langsung: 2 + 3 * 4 — perhatikan Python langsung menjawab tanpa print.",
        "Keluar dari mode interaktif: exit() atau Ctrl+D.",
      ],
      hint: "Kalau python tidak dikenali di Windows, berarti belum terinstall — itu bahasan lesson berikutnya. Di Ubuntu coba python3.",
    },
    quiz: [
      {
        q: "Kenapa Python disebut bahasa yang 'readable'?",
        options: [
          "Karena kodenya dikompilasi dulu sebelum jalan",
          "Karena sintaksnya didesain mendekati cara manusia menulis, minim simbol wajib",
          "Karena hanya bisa dibaca lewat IDE tertentu",
          "Karena menggunakan bahasa Inggris untuk semua variabel",
        ],
        answer: 1,
        why: "Filsafat desain Guido: kode lebih sering dibaca daripada ditulis. Akibatnya sintaksnya minimal — tanpa titik koma wajib, tanpa kurung kurawal — sehingga hampir mirip pseudo-code.",
      },
      {
        q: "Kode Python 2 yang pakai print \"teks\" (tanpa kurung) dijalankan di Python 3, apa yang terjadi?",
        options: [
          "Jalan normal, hanya tampilan beda",
          "Otomatis dikonversi ke sintaks baru",
          "Error — Python 3 tidak backward-compatible dengan Python 2",
          "Jalan tapi hasilnya terbalik",
        ],
        answer: 2,
        why: "Python 3 adalah perubahan mayor tanpa backward-compatibility. Sintaks lama dijamin rusak — itulah kenapa verifikasi versi adalah langkah pertama sebelum ngoding.",
      },
      {
        q: "Mana yang BUKAN bidang penggunaan Python?",
        options: [
          "Membangun web server-side",
          "Analisis data dan machine learning",
          "Mengedit langsung isi memori GPU driver",
          "Otomasi dan scripting",
        ],
        answer: 2,
        why: "Python multifungsi: web, data, ML, otomasi semua jalan. Manipulasi memori tingkat driver bukan ranahnya — bahasa seperti C yang menguasai memori secara langsung.",
      },
    ],
  },
  {
    slug: "py-02",
    tid: "6429",
    title: "Python Interpreter: Compiler vs Interpreter",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/6429" },
    untukApa: [
      "Pernah heran kenapa Python bisa langsung menjawab di terminal, sementara bahasa lain harus 'di-build' dulu? Jawabannya: interpreter.",
      "Memahami cara kode dieksekusi menjelaskan kenapa error Python muncul baris demi baris — skill penting saat debugging script panjang.",
      "Konsep blok kode di sini adalah fondasi indentasi Python yang bakal kamu pakai di setiap lesson berikutnya.",
    ],
    sections: [
      {
        h: "Compiler vs Interpreter",
        p: [
          "Komputer hanya paham bahasa mesin. Kode yang kamu tulis harus diterjemahkan dulu — dan ada dua strategi penerjemahan:",
        ],
        table: {
          head: ["Aspek", "Compiler", "Interpreter"],
          rows: [
            ["Kapan diterjemahkan", "Seluruh program diterjemahkan dulu sebelum jalan", "Diterjemahkan satu per satu saat program berjalan"],
            ["Hasil error", "Biasanya terdeteksi sebelum program jalan", "Muncul saat baris itu dieksekusi"],
            ["Contoh bahasa", "C, C++, Go", "Python, JavaScript"],
            ["Ciri khas", "Cepat saat jalan, butuh step build", "Langsung eksekusi & lihat hasil per baris"],
          ],
        },
      },
      {
        p: [
          "Python memakai interpreter — itulah kenapa mode interaktif ada: kamu ketik satu baris, hasilnya keluar seketika. Sangat cocok untuk eksplorasi dan eksperimen cepat.",
        ],
      },
      {
        h: "Blok kode: satu unit eksekusi",
        p: [
          "Program Python dibangun dari blok — potongan kode yang dijalankan sebagai satu unit. Blok bisa berupa modul, fungsi, kelas, atau control flow seperti perulangan. Di bahasa lain blok ditandai kurung kurawal {}; di Python ditandai INDENTASI:",
        ],
        code: 'for i in range(3):\n    print(i)\n\n# Output:\n# 0\n# 1\n# 2',
      },
      {
        p: [
          "Baris `for i in range(3):` membuka blok; baris yang menjorok (4 spasi) adalah isi blok yang diulang. Mesin membaca baris-baris itu satu per satu — inilah mode kerja interpreter.",
        ],
        callout:
          "Indentasi di Python bukan gaya — itu SINTAKS. Salah jumlah spasi = program error atau logika berubah. Konsisten: 4 spasi per level.",
      },
    ],
    lab: {
      title: "Rasakan eksekusi baris-per-baris",
      intro: "Bukti nyata interpreter: kita buat error sengaja dan lihat KAPAN error itu muncul.",
      steps: [
        "Masuk mode interaktif: python (atau python3) di terminal.",
        "Jalankan: print('baris satu') — sukses.",
        "Sekarang jalankan baris rusak: print('baris dua' — kurang tutup kurung.",
        "Amati: error muncul TEPAT di baris itu, tapi 'baris satu' tadi sudah tercetak. Itu bukti eksekusi baris demi baris.",
        "Coba blok: ketik for i in range(3): lalu Enter, ketik print(i) dengan 4 spasi di depan, Enter dua kali untuk mengeksekusi blok.",
      ],
      hint: "Di mode interaktif, blok dianggap selesai saat kamu menekan Enter di baris kosong setelah isi blok.",
    },
    quiz: [
      {
        q: "Apa beda mendasar interpreter dan compiler?",
        options: [
          "Interpreter menerjemahkan seluruh program dulu, compiler per baris",
          "Interpreter menerjemahkan per instruksi saat berjalan, compiler menerjemahkan seluruh program sebelum jalan",
          "Keduanya identik, hanya nama berbeda",
          "Compiler hanya untuk Python, interpreter untuk C",
        ],
        answer: 1,
        why: "Compiler menerjemahkan seluruh program sebelum eksekusi (contoh: C). Interpreter menerjemahkan satu per satu saat runtime — makanya Python bisa langsung menjawab di mode interaktif.",
      },
      {
        q: "Kenapa error di Python sering baru muncul 'di tengah jalan', bukan saat program dimulai?",
        options: [
          "Karena Python sengaja menyembunyikan error di awal",
          "Karena interpreter mengeksekusi baris demi baris — baris error baru kena saat dieksekusi",
          "Karena Python tidak punya pengecekan error sama sekali",
          "Karena file .py rusak saat disimpan",
        ],
        answer: 1,
        why: "Ini konsekuensi langsung model interpreter: kode dieksekusi instruksi per instruksi. Baris ke-50 yang rusak baru 'meledak' saat eksekusi sampai ke sana — beda dengan compiler yang menangkap banyak error sebelum program jalan.",
      },
      {
        q: "Di Python, blok kode ditandai dengan...",
        options: [
          "Kurung kurawal { }",
          "Kata kunci begin dan end",
          "Indentasi (menjorok) yang konsisten",
          "Titik koma di akhir baris",
        ],
        answer: 2,
        why: "Python memakai indentasi sebagai sintaks blok — bukan sekadar kerapian. Baris-baris selevel yang sama menjorok adalah satu blok yang dieksekusi sebagai satu unit.",
      },
    ],
  },
  {
    slug: "py-03",
    tid: "4738",
    title: "Setup Lokal: Install Python + IDE",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4738" },
    untukApa: [
      "Mode interaktif bagus untuk eksperimen, tapi script sungguhan butuh dua alat: Python terinstall dan editor kode yang enak dipakai.",
      "Setup yang benar sejak awal mencegah masalah klasik: salah versi, python tidak dikenali di terminal, atau menulis kode di aplikasi yang salah.",
    ],
    sections: [
      {
        h: "Langkah 0: cek dulu, jangan langsung install",
        p: [
          "MacOS dan Ubuntu umumnya sudah membawa Python. Windows biasanya belum. Cek sebelum install — dobel install hanya bikin ribet:",
        ],
        code: 'python --version\n# atau kalau tidak dikenali:\npython3 --version',
      },
      {
        p: [
          "Kalau keluar Python 3.x — beres, lanjut ke bagian IDE. Kalau tidak, install sesuai OS:",
        ],
        list: [
          "Windows: unduh installer dari python.org — PENTING: centang 'Add Python to PATH' saat install, kalau tidak perintah python tidak dikenali di terminal.",
          "MacOS: pakai installer python.org atau Homebrew (brew install python).",
          "Ubuntu: sudo apt update && sudo apt install python3 python3-pip",
        ],
        callout:
          "'Add to PATH' di Windows adalah penyebab error 'python is not recognized' nomor satu. Kalau sudah kelewat: install ulang dan centang opsi itu.",
      },
      {
        h: "Pilih IDE: VS Code",
        p: [
          "IDE = Integrated Development Environment, tempat menulis dan menjalankan kode. Untuk pemula sampai menengah, VS Code adalah pilihan aman: gratis, ringan, dan punya ekstensi Python resmi (dari Microsoft) yang memberi syntax highlighting, IntelliSense, dan tombol Run.",
          "Alternatif lain: PyCharm (lebih berat, fitur lebih banyak) dan Jupyter Notebook (mode notebook — cocok untuk data). Untuk track ini, VS Code cukup.",
        ],
      },
      {
        h: "Checklist setup sehat",
        table: {
          head: ["Cek", "Perintah / cara", "Harapan"],
          rows: [
            ["Versi Python", "python --version", "Python 3.x"],
            ["pip tersedia", "pip --version", "pip 2x.x ... (python 3.x)"],
            ["VS Code terpasang", "buka aplikasi", "Jendela welcome muncul"],
            ["Ekstensi Python", "VS Code → Extensions → cari 'Python'", "Terpasang, publisher Microsoft"],
          ],
        },
      },
    ],
    lab: {
      title: "Setup lengkap 10 menit",
      intro: "Pastikan dua alat utamamu siap sebelum lesson berikutnya — semua lab selanjutnya mengasumsikan ini sudah jalan.",
      steps: [
        "Cek versi Python di terminal: python --version atau python3 --version.",
        "Kalau belum ada: install sesuai OS-mu (Windows: jangan lupa Add to PATH).",
        "Install VS Code dari code.visualstudio.com.",
        "Di VS Code: Extensions (Ctrl+Shift+X) → cari 'Python' → install (publisher Microsoft).",
        "Buat folder latihan (misal Documents/python-latihan), lalu File > Open Folder ke sana.",
        "Install ekstensi 'code runner' opsional — atau cukup pakai terminal bawaan VS Code (Terminal > New Terminal).",
      ],
      hint: "pip biasanya ikut terinstall bersama Python. Kalau pip tidak dikenali, coba python -m pip --version.",
    },
    quiz: [
      {
        q: "Saat install Python di Windows, opsi mana yang kalau dilewatkan bikin 'python' tidak dikenali di terminal?",
        options: ["Install documentation", "Add Python to PATH", "Install for all users", "Install tcl/tk and IDLE"],
        answer: 1,
        why: "PATH adalah daftar folder yang dicari OS saat kamu mengetik nama perintah. Tanpa entri Python di PATH, terminal tidak tahu di mana mencari program python-nya.",
      },
      {
        q: "Kenapa harus cek python --version SEBELUM install?",
        options: [
          "Supaya hemat kuota internet",
          "Karena MacOS/Ubuntu sering sudah membawa Python — dobel install hanya menambah kebingungan versi",
          "Karena installer Python butuh versi lama terinstall",
          "Karena VS Code menuntutnya",
        ],
        answer: 1,
        why: "Banyak OS Unix-like membawa Python bawaan. Mengecek dulu mencegah dua instalasi paralel yang justru membingungkan — python vs python3 — saat menjalankan script.",
      },
      {
        q: "Apa fungsi utama ekstensi Python di VS Code?",
        options: [
          "Mengompilasi Python menjadi file .exe",
          "Menyediakan syntax highlighting, IntelliSense, dan integrasi menjalankan kode",
          "Mengganti interpreter Python bawaan OS",
          "Membackup kode otomatis ke cloud",
        ],
        answer: 1,
        why: "VS Code itu editor umum; ekstensi Python yang menambahkan pemahaman bahasa — pewarnaan sintaks, autocomplete (IntelliSense), dan cara mudah menjalankan script.",
      },
    ],
  },
  {
    slug: "py-04",
    tid: "10747",
    title: "3 Mode Menjalankan Python",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/10747" },
    untukApa: [
      "Sekarang semua alat siap — tinggal pilih cara mengeksekusi. Salah pilih mode bikin kerjaan jadi ribet: eksplorasi di script file itu lambat, program utama di mode interaktif itu hilang saat terminal ditutup.",
      "Tiga mode ini adalah workflow dasar yang dipakai programmer Python setiap hari.",
    ],
    sections: [
      {
        h: "Peta 3 mode",
        table: {
          head: ["Mode", "Cara", "Cocok untuk"],
          rows: [
            ["Interaktif", "Ketik python di terminal, kode langsung dieksekusi per baris", "Eksperimen 2-3 baris, cek perilaku fungsi"],
            ["Script", "Tulis file .py, jalankan python namafile.py", "Program sesungguhnya — bisa disimpan & dijalankan ulang"],
            ["Notebook", "Jupyter Notebook / VS Code notebook, eksekusi per cell", "Eksplorasi data, ML, dokumentasi hidup"],
          ],
        },
        p: [
          "Mode interaktif kamu sudah coba di lesson sebelumnya. Mode script adalah mode utama programmer: kode disimpan permanen di file berekstensi .py, lalu dieksekusi lewat terminal.",
        ],
      },
      {
        h: "Alur kerja mode script",
        p: [
          "1) Buka folder latihan di VS Code → 2) buat file hello.py → 3) tulis kode → 4) buka terminal bawaan (Terminal > New Terminal) → 5) jalankan:",
        ],
        code: 'python hello.py\n# atau di sistem yang memakai python3:\npython3 hello.py',
        callout:
          "File script harus dijalankan dari foldernya. Kalau terminal-mu buka di folder lain, gunakan cd dulu untuk pindah ke folder file itu.",
      },
      {
        h: "Script bisa menerima masukan",
        p: [
          "Bedanya dengan mode interaktif: script yang serius biasanya berinteraksi dengan pengguna lewat input() — program berhenti sebentar, menunggu kamu mengetik, lalu lanjut:",
        ],
        code: 'nama = input("Siapa nama kamu? ")\nprint(f"Halo, {nama}! Selamat belajar Python.")',
      },
      {
        p: [
          "Hasil input() selalu bertipe string. Kalau butuh angka, konversi manual — itu topik lesson tipe data nanti. Untuk sekarang cukup pahami: program = masukan → proses → keluaran.",
        ],
      },
    ],
    lab: {
      title: "Script pertama + input",
      intro: "Gabungkan semuanya: file script, input pengguna, dan format string.",
      steps: [
        "Di folder latihan VS Code, buat file baru: sapa.py",
        "Tulis: nama = input(\"Siapa nama kamu? \") lalu di baris baru print(f\"Halo, {nama}!\")",
        "Simpan (Ctrl+S), jalankan di terminal: python sapa.py",
        "Ketik namamu saat diminta — program melanjutkan dan menyapa.",
        "Modifikasi: tambah baris tahun = input(\"Tahun lahir? \") dan print(f\"Umurmu ~ {2026 - int(tahun)} tahun.\") — perhatikan int() mengubah teks jadi angka.",
        "Jalankan ulang. Kalau kamu mengetik huruf alih-alih angka, amati error-nya — kenapa? (topik lesson error handling).",
      ],
      hint: "int(tahun) gagal kalau tahun tidak bisa diubah jadi angka — coba ketik 'abc' dan baca pesan ValueError-nya.",
    },
    quiz: [
      {
        q: "Kamu mau menguji cepat perilaku sebuah fungsi bawaan Python tanpa bikin file. Mode apa paling pas?",
        options: ["Script", "Interaktif", "Notebook", "Compile dulu ke .exe"],
        answer: 1,
        why: "Mode interaktif dieksekusi per baris langsung di terminal — paling cepat untuk eksperimen 2-3 baris. Script butuh buat file dulu; notebook butuh server Jupyter.",
      },
      {
        q: "Perintah yang benar untuk mengeksekusi file script bernama cek.py adalah...",
        options: ["python cek", "python cek.py", "run cek", "execute cek.py"],
        answer: 1,
        why: "Mode script mengeksekusi FILE: python diikuti nama file lengkap dengan ekstensi .py. Tanpa ekstensi, interpreter mencari file bernama 'cek' yang tidak ada.",
      },
      {
        q: "Hasil dari input(\"Angka? \") selalu bertipe...",
        options: ["integer", "float", "string", "tergantung yang diketik pengguna"],
        answer: 2,
        why: "input() selalu mengembalikan string, apa pun yang diketik pengguna. Makanya operasi matematika butuh konversi eksplisit seperti int(...) atau float(...) — tanpa itu, '5' + '5' menghasilkan '55' bukan 10.",
      },
    ],
  },
  {
    slug: "py-05",
    tid: "6424",
    title: "Aksi Sekuensial: Program Jalan dari Atas ke Bawah",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/6424" },
    untukApa: [
      "Semua program — dari script 5 baris sampai aplikasi ribuan baris — punya aturan eksekusi paling dasar: urutan penulisan. Paham ini = paham kenapa kode yang 'benar' bisa menghasilkan output yang salah kalau urutannya keliru.",
      "Ini modal untuk control flow (percabangan & perulangan) di fase berikutnya — di sana urutan eksekusi jadi bisa 'dilompati' dan 'diulang'.",
    ],
    sections: [
      {
        h: "Definisi yang perlu nempel",
        p: [
          "Aksi sekuensial = sederetan instruksi yang dijalankan komputer SESUAI URUTAN PENULISANNYA, dari atas ke bawah. Program punya awal yang jelas dan akhir yang jelas.",
        ],
        code: 'print("Langkah 1: buka kulkas")\nprint("Langkah 2: ambil telur")\nprint("Langkah 3: tutup kulkas")\n\n# Output selalu berurutan 1, 2, 3 — tidak pernah melompat.',
      },
      {
        h: "Bedah program dengan input",
        p: [
          "Contoh nyata: program menghitung umur. Amati urutannya — setiap baris menunggu baris sebelumnya SELESAI:",
        ],
        code: 'print("Program penghitung umur")\nnama = input("Nama: ")\ntahun = int(input("Tahun lahir: "))\numur = 2026 - tahun\nprint(f"Halo {nama}, umurmu sekarang {umur} tahun.")',
        list: [
          "Baris 1 dicetak — program menyapa.",
          "Baris 2 berhenti menunggu input nama, simpan ke variabel nama.",
          "Baris 3 berhenti menunggu input tahun, langsung konversi ke angka dengan int().",
          "Baris 4 menghitung selisih tahun — variabel tahun sudah TERISI karena baris 3 selesai.",
          "Baris 5 mencetak gabungan semua hasil.",
        ],
        callout:
          "Kalau baris 4 dipindah ke ATAS baris 3, program error: variabel tahun belum ada isinya saat dipakai. Urutan bukan formalitas.",
      },
      {
        h: "Kapan urutan penting, kapan tidak",
        table: {
          head: ["Perubahan urutan", "Dampak"],
          rows: [
            ["Dua baris print saling tak terkait ditukar", "Output berubah urutan, tidak error"],
            ["Pemakaian variabel mendahului pemberian nilainya", "Error: NameError — variabel belum terdefinisi"],
            ["input() setelah print() yang menyapa", "Betul — user tahu diminta apa"],
            ["input() sebelum print() penjelasan", "User bingung, program tetap jalan"],
          ],
        },
      },
    ],
    lab: {
      title: "Program kasir sederhana",
      intro: "Buat program yang eksekusinya benar-benar bergantung pada urutan: input harga dua barang, lalu hitung total.",
      steps: [
        "Buat file kasir.py di folder latihan.",
        "Tulis: barang1 = int(input(\"Harga barang 1: \"))",
        "Baris berikutnya: barang2 = int(input(\"Harga barang 2: \"))",
        "Lalu: total = barang1 + barang2",
        "Terakhir: print(f\"Total belanja: {total}\")",
        "Jalankan: python kasir.py — isi angka apa pun, cek hasilnya benar.",
        "Tantangan: pindahkan baris total = barang1 + barang2 ke paling atas. Jalankan. Baca error-nya — itu NameError karena variabel belum terisi.",
      ],
      hint: "Error yang kamu lihat di langkah 7 adalah bukti urutan eksekusi: interpreter jalan baris demi baris dan baris itu dieksekusi sebelum sumber datanya ada.",
    },
    quiz: [
      {
        q: "Apa yang dimaksud aksi sekuensial di Python?",
        options: [
          "Program dijalankan secara acak oleh interpreter untuk kecepatan",
          "Instruksi dijalankan sesuai urutan penulisannya, dari atas ke bawah",
          "Semua baris dijalankan bersamaan",
          "Program memilih baris yang paling penting dulu",
        ],
        answer: 1,
        why: "Sekuensial = berurutan. Interpreter membaca dan mengeksekusi instruksi satu per satu persis sesuai urutan penulisannya — tanpa lompatan, tanpa paralel.",
      },
      {
        q: "total = a + b ditulis SEBELUM a dan b diberi nilai. Apa yang terjadi?",
        options: [
          "Python menunggu sampai a dan b terisi",
          "Program error: NameError karena variabel belum terdefinisi saat baris itu dieksekusi",
          "total otomatis bernilai 0",
          "Python menebak nilai a dan b",
        ],
        answer: 1,
        why: "Eksekusi sekuensial: baris total = a + b dieksekusi tepat saat giliran-nya tiba. Karena a dan b belum ada, interpreter melempar NameError — tidak ada mekanisme 'menunggu'.",
      },
      {
        q: "Manakah urutan logis untuk program 'masukkan nama → sapa pengguna'?",
        options: [
          "print sapaan personal → input nama → proses",
          "input nama → proses gabung teks → print sapaan personal",
          "proses → input → print",
          "Urutan tidak penting, hasilnya sama",
        ],
        answer: 1,
        why: "Sapaan personal butuh nama yang sudah diinput dan sudah digabung ke teks. Jadi urutan wajib: ambil input → proses → keluarkan hasil. Melanggar urutan = output kosong/salah meski kode 'benar'.",
      },
    ],
  },
  {
    slug: "py-06",
    tid: "4748",
    title: "Recap Fase 1-2: Case-Sensitive & Blok",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4748" },
    untukApa: [
      "Sebelum naik ke variabel & ekspresi, dua jebakan klasik pemula harus nempel dulu: Python membedakan huruf besar-kecil, dan blok ditentukan indentasi.",
      "Dua-duanya penyebab bug 'kok error padahal tulisannya sama' nomor satu — lebih murah dipelajari sekarang daripada dicari 30 menit nanti.",
    ],
    sections: [
      {
        h: "Recap cepat fase 1-2",
        list: [
          "Python = bahasa interpreter: dieksekusi baris demi baris, bisa mode interaktif.",
          "Python 3 = standar; Python 2 tidak kompatibel dan sudah usang.",
          "Program = urutan instruksi (sekuensial): awal jelas, akhir jelas.",
          "3 mode eksekusi: interaktif (eksperimen), script .py (program utama), notebook (data).",
          "Blok kode = satu unit eksekusi, ditandai indentasi.",
        ],
      },
      {
        h: "Jebakan #1: case-sensitive",
        p: [
          "Python memperlakukan huruf besar dan kecil sebagai dua hal BERBEDA — untuk nama variabel, nama fungsi, dan kata kunci:",
        ],
        code: 'teks = "Dicoding"\nTeks = "Indonesia"\n\nprint(teks)   # Dicoding\nprint(Teks)   # Indonesia\n\nPrint(teks)   # NameError! Tidak ada fungsi bernama Print (P besar)',
      },
      {
        p: [
          "teks dan Teks adalah dua variabel berbeda. Demikian pula print bukan Print, dan True bukan true (ingat ini saat sampai boolean).",
        ],
        callout:
          "Konvensi penamaan Python: snake_case (nama_panjang), dan variabel dimulai huruf kecil. Konsisten menyelamatkan kamu dari bug case-sensitive.",
      },
      {
        h: "Jebakan #2: indentasi = sintaks",
        p: [
          "Blok ditentukan menjoroknya baris. Salah menjorok bukan sekadar jelek dilihat — programnya berubah atau error:",
        ],
        code: '# Benar: print(i) di dalam blok for\nfor i in range(3):\n    print(i)\n\n# Salah: print(i) di LUAR blok (tidak menjorok) -> error\nfor i in range(3):\nprint(i)   # IndentationError',
      },
    ],
    lab: {
      title: "Debug mini: 2 bug dalam 6 baris",
      intro: "Kode berikut sengaja rusak. Perbaiki sampai jalan — ini melatih mata untuk bug paling umum fase awal.",
      steps: [
        "Buat file recap.py, tulis persis: Nama = input(\"nama: \")",
        "Baris kedua: print(\"Halo\", nama)",
        "Jalankan — dapat NameError. Kenapa? Karena variabelnya bernama Nama (N besar) tapi dipanggil nama.",
        "Perbaiki dengan cara yang benar: samakan penamaannya (pilih salah satu, jangan dua-duanya).",
        "Tambah blok: for i in range(2): lalu baris berikutnya print(\"hitung\", i) TANPA menjorok.",
        "Jalankan — dapat IndentationError. Perbaiki dengan menjorokkan 4 spasi.",
        "Jalankan sampai bersih. Catat dua jenis error yang baru kamu temui: NameError dan IndentationError.",
      ],
      hint: "Aturan debug fase ini: baca NAMA yang dipanggil vs NAMA yang dideklarasikan huruf demi huruf, lalu cek indentasi baris yang disebut error.",
    },
    quiz: [
      {
        q: "Di Python, apakah variabel Nila dan nila sama?",
        options: [
          "Sama, Python tidak peduli huruf besar-kecil",
          "Berbeda — Python case-sensitive, keduanya variabel terpisah",
          "Sama selama nilainya sama",
          "Tergantung sistem operasi",
        ],
        answer: 1,
        why: "Python case-sensitive: Nila dan nila adalah dua identifier berbeda. Mencampur keduanya = NameError atau lebih buruk, logika diam-diam salah.",
      },
      {
        q: "Baris print(i) ditulis tanpa menjorok di bawah for i in range(3): — hasilnya?",
        options: [
          "Normal, dicetak 3 kali",
          "IndentationError — isi blok wajib menjorok",
          "Dicetak sekali saja",
          "Loop dijalankan tapi tidak ada output",
        ],
        answer: 1,
        why: "Indentasi adalah sintaks penanda blok di Python. Baris tanpa menjorok setelah titik dua dianggap di luar blok — interpreter menolaknya dengan IndentationError.",
      },
      {
        q: "Kamu mau eksperimen cepat: 'hasilnya apa ya kalau list dikali 2?' — workflow paling efisien?",
        options: [
          "Buat file eksperimen.py, tulis, simpan, jalankan",
          "Buka mode interaktif dan ketik langsung [1,2] * 2",
          "Tanya di forum",
          "Restart komputer dulu",
        ],
        answer: 1,
        why: "Mode interaktif memang didesain untuk eksplorasi singkat: satu baris, jawaban seketika. Script file lebih tepat untuk program yang mau disimpan dan dijalankan ulang.",
      },
      {
        q: "Manakah pernyataan yang BENAR tentang eksekusi Python?",
        options: [
          "Python mengompilasi seluruh program sebelum menjalankan satu baris pun",
          "Python mengeksekusi instruksi berurutan dari atas ke bawah, satu per satu",
          "Python mengeksekusi baris yang paling sering dipanggil lebih dulu",
          "Urutan baris tidak berpengaruh pada hasil",
        ],
        answer: 1,
        why: "Model interpreter + aksi sekuensial: instruksi dijalankan sesuai urutan penulisan. Itulah kenapa memakai variabel sebelum didefinisikan error, dan urutan print memengaruhi output.",
      },
    ],
  },
];
