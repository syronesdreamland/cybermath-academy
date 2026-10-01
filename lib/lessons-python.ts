import type { Lesson } from "./lesson-types";

// ============================================================
// Track Python — batch 1 (Fase 1-2): 6 lesson
// Rewrite internal dari materi Dicoding 86 (parafrase + contoh sendiri,
// bukan salinan). Link sumber asli tetap dicantumkan per lesson.
// ============================================================

import { PYTHON_LESSONS_2 } from "./lessons-python-2";
import { PYTHON_LESSONS_3 } from "./lessons-python-3";

const SRC = "Dicoding — Memulai Pemrograman dengan Python";

export const PYTHON_LESSONS: Lesson[] = [
  ...PYTHON_LESSONS_2,
  ...PYTHON_LESSONS_3,
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
  {
    slug: "py-07",
    tid: "4751",
    title: "Variabel & Assignment",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4751" },
    untukApa: [
      "Di lesson sebelumnya data langsung dipakai lalu hilang. Program nyata perlu MENGINGAT: nama target, host, jumlah percobaan — semuanya disimpan di variabel.",
      "Formula assignment yang salah (nilai di kiri, variabel di kanan) adalah error klasik pemula hari pertama — kenali aturannya sekali, selamanya.",
    ],
    sections: [
      {
        h: "Variabel = tempat penyimpanan bernama",
        p: [
          "Variabel adalah lokasi di memori komputer yang kamu beri nama untuk menyimpan nilai. Saat kamu menulis variabel, komputer memesan ruang dan mengisinya. Tujuannya: nilai yang sama bisa dipakai BERULANG tanpa menulis ulang.",
        ],
        code: 'print("Halo, Budi!")\nprint("Halo, Budi!")\nprint("Halo, Budi!")\n\n# vs. dengan variabel:\nnama = "Budi"\nprint(f"Halo, {nama}!")\nprint(f"Halo, {nama}!")\nprint(f"Halo, {nama}!")\n\n# Kalau target berubah jadi Ani, cukup ubah SATU baris.',
      },
      {
        h: "Formula assignment",
        p: [
          "Assignment = proses memberi nilai ke variabel. Aturannya satu dan kaku:",
        ],
        code: '<variabel> = <ekspresi / nilai / variabel yang sudah jelas nilainya>\n\n# Benar:\ngreeting = "Hello World!"   # kiri: variabel; kanan: nilai\n\n# Salah — SyntaxError:\n"Hello World!" = greeting   # kiri bukan variabel',
      },
      {
        p: [
          "Ruas kanan DIEKSEKUSI DULU, hasilnya disimpan ke ruas kiri. Karena itu assignment bisa berantai:",
        ],
      },
      {
        h: "Assignment berantai (chaining)",
        code: 'addition = 2 + 2        # kanan dieksekusi: 4 -> disimpan ke addition\nresult = addition - 1   # kanan dieksekusi: 4 - 1 = 3 -> disimpan ke result\n\nprint(result)   # 3',
        callout:
          "Cara baca '=' di Python BUKAN 'sama dengan' (itu matematika), tapi 'DIISI DENGAN'. result = result + 1 terdengar mustahil di matematika, tapi wajar di Python: kanan dihitung dulu, lalu hasilnya mengisi ulang result.",
      },
    ],
    lab: {
      title: "Profil dalam variabel",
      intro: "Bangun program kecil yang menyimpan beberapa data lalu menampilkannya — pondasi semua program berikutnya.",
      steps: [
        "Buat file profil.py.",
        "Simpan data di variabel: nama = \"Alif\", umur = 21, hobi = \"cybersecurity\".",
        "Cetak dengan f-string: print(f\"{nama}, {umur} tahun, suka {hobi}\").",
        "Tambah: umur = umur + 1 lalu cetak lagi — perhatikan nilai berupa 'diisi ulang'.",
        "Tantangan: tulis umur += 1 (shortcut yang akan dibahas di lesson operator) — hasilnya sama.",
        "Coba baris rusak: 5 = umur. Baca error-nya — ruas kiri harus variabel.",
      ],
      hint: "Error di langkah terakhir: SyntaxError cannot assign to literal — angka 5 bukan lokasi penyimpanan, jadi tidak bisa 'diisi'.",
    },
    quiz: [
      {
        q: "Manakah assignment yang BENAR?",
        options: ["25 = umur", "umur = 25", "umur == 25 (untuk menyimpan)", "25 == umur"],
        answer: 1,
        why: "Assignment menuntut variabel di ruas kiri dan nilai di ruas kanan. 'umur == 25' adalah operator perbandingan (menghasilkan boolean), bukan penyimpanan nilai.",
      },
      {
        q: "x = 5 lalu x = x + 3. Berapa nilai x sekarang dan kenapa?",
        options: [
          "5 — nilai pertama tidak bisa berubah",
          "8 — ruas kanan dihitung dulu (5+3), lalu hasilnya mengisi ulang x",
          "Error karena x muncul di dua ruas",
          "53 karena angka digabung",
        ],
        answer: 1,
        why: "Eksekusi sekuensial: baris kedua mengeksekusi kanan dulu (x bernilai 5, 5+3=8), hasilnya mengisi ulang x. Membaca '=' sebagai 'diisi dengan' membuat pola ini masuk akal.",
      },
      {
        q: "Apa keuntungan utama menyimpan data ke variabel sebelum dipakai?",
        options: [
          "Program jalan lebih cepat tanpa exception",
          "Nilai bisa dipakai berulang dan cukup diubah di satu tempat",
          "Variabel membuat kode tidak perlu diuji",
          "Python mewajibkannya untuk print",
        ],
        answer: 1,
        why: "Variabel memberi nama pada data: reusable, dan saat data berubah cukup edit satu baris assignment — bukan menyisipkan nilai baru di banyak tempat (sumber bug klasik).",
      },
    ],
  },
  {
    slug: "py-08",
    tid: "4754",
    title: "Ekspresi & Abstraksi Data",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4754" },
    untukApa: [
      "Setiap perhitungan, perbandingan, dan manipulasi data di programmu adalah 'ekspresi'. Paham strukturnya = bisa membaca (dan menulis) kode apa pun tanpa menebak.",
      "Abstraksi data menjawab pertanyaan fundamental: kenapa komputer 'tidak paham' angka 60 mu sampai kamu menyebut tipenya.",
    ],
    sections: [
      {
        h: "Ekspresi = kombinasi yang menghasilkan nilai",
        p: [
          "Ekspresi adalah kombinasi dari variabel, konstanta, operator, dan/atau fungsi yang bermakna untuk MENGHASILKAN satu nilai dengan tipe tertentu. Bentuk paling umum (ekspresi biner):",
        ],
        code: '<operan1> <operator> <operan2>\n\n# contoh:\n# 2 + 2          -> 4\n# x - y          -> hasil selisih\n# "py" + "thon"  -> "python"\n# 3 < 10         -> True',
      },
      {
        p: [
          "Operan bisa berupa nilai, variabel, konstanta, bahkan ekspresi lain (yang dievaluasi dulu). Operator adalah fungsi standar bahasa: aritmetika (+, -, *), relasional (<, ==), logika (and, not), dan seterusnya.",
        ],
      },
      {
        h: "Operator yang sama, perilaku beda per tipe",
        p: [
          "Fakta menarik: + dan * tidak hanya untuk angka. Pada list dan string, + berarti GABUNG dan * berarti REPLIKASI:",
        ],
        code: 'angka = [2, 4, 6, 8]\nhuruf = ["P", "Y", "T", "H", "O", "N"]\ngabung = angka + huruf\nprint(gabung)      # [2, 4, 6, 8, \'P\', \'Y\', \'T\', \'H\', \'O\', \'N\']\n\nlearn = ["P", "Y"]\nprint(learn * 3)   # [\'P\', \'Y\', \'P\', \'Y\', \'P\', \'Y\']',
        callout:
          "Inilah konsekuensi tipe: operator punya makna tergantung tipe operannya. + pada angka = hitung; + pada string/list = sambung. Mencampur tanpa konversi ('angka: ' + 5) = TypeError.",
      },
      {
        h: "Abstraksi data: konteks menentukan makna",
        p: [
          "Angka 60 saja tidak mewakili apa pun: suhu? berat? umur? Begitu ditulis 60°C, maknanya jelas — karena ada KONTEKS. Kemampuan mengikat konteks ke data disebut abstraksi data.",
          "Komputer juga begitu, tapi lebih kaku: ia TIDAK akan tahu maksud datamu sampai kamu menyebut tipe datanya. 60 sebagai int bisa dihitung; \"60\" sebagai string bisa disambung ke teks — dua objek berbeda meski terlihat sama.",
        ],
      },
    ],
    lab: {
      title: "Eksperimen operator lintas tipe",
      intro: "Buktikan sendiri bahwa tipe operan mengubah perilaku operator.",
      steps: [
        "Buka mode interaktif: python.",
        "Jalankan: 2 + 3 lalu \"2\" + \"3\" — bandingkan hasilnya (5 vs \"23\").",
        "Coba campur: \"2\" + 3 — baca TypeError yang muncul.",
        "Jalankan: [1, 2] * 2 dan \"ab\" * 2 — replikasi bekerja pada keduanya.",
        "Coba [1, 2] + 3 — error: list hanya bisa digabung dengan list.",
        "Kesimpulan yang harus nempel: sebelum operasi, selalu sadar tipe kedua operanmu.",
      ],
      hint: "Solusi campur tipe: konversi eksplisit — int(\"2\") + 3 = 5, atau \"2\" + str(3) = \"23\".",
    },
    quiz: [
      {
        q: "Hasil dari ekspresi \"py\" + \"thon\" adalah...",
        options: [
          "Error — + hanya untuk angka",
          "\"python\" — + pada string berarti penyambungan",
          "\"py thon\"",
          "NaN",
        ],
        answer: 1,
        why: "Makna operator bergantung tipe operan. Pada string, + berarti konkatenasi (penyambungan). Pada angka ia berarti penjumlahan.",
      },
      {
        q: "Dalam ekspresi biner x - y, istilah 'operan' merujuk pada...",
        options: [
          "Tanda minus",
          "x dan y — nilai yang dioperasikan",
          "Hasil pengurangan",
          "Tipe data x",
        ],
        answer: 1,
        why: "Struktur biner = dua operan yang dihubungkan satu operator. Operan adalah bahan baku (nilai/variabel/ekspresi), operator adalah aksinya, hasilnya satu nilai baru.",
      },
      {
        q: "Kenapa komputer 'tidak paham' maksud angka 60 sampai tipenya disebut?",
        options: [
          "Karena komputer tidak bisa membaca angka",
          "Karena tipe data memberi konteks: int 60 bisa dihitung, string \"60\" bisa disambung — perilakunya berbeda",
          "Karena 60 terlalu besar untuk memori",
          "Karena Python mewajibkan semua data diberi nama",
        ],
        answer: 1,
        why: "Abstraksi data: makna lahir dari konteks. Tipe data adalah konteks yang dikenali mesin — menentukan operasi apa yang sah dan apa hasilnya (60 + 60 = 120, tapi \"60\" + \"60\" = \"6060\").",
      },
    ],
  },
  {
    slug: "py-09",
    tid: "4755",
    title: "Jenis-Jenis Ekspresi",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4755" },
    untukApa: [
      "x += 1, not x, 3 < 10 — semuanya ekspresi, tapi kelompoknya beda dan hasilnya beda tipe. Salah paham kelompok ini = salah baca kondisi if nanti.",
      "Klasifikasi ini akan kamu pakai setiap hari: ekspresi relasional & logika adalah bahan baku semua percabangan di fase berikutnya.",
    ],
    sections: [
      {
        h: "Klasifikasi #1: menurut jumlah operan (arity)",
        table: {
          head: ["Jenis", "Bentuk", "Contoh"],
          rows: [
            ["Biner", "dua operan", "x + y, x == y, x % y, x ** y"],
            ["Uner", "satu operan", "x += 1, x -= 1, not x, -x"],
          ],
        },
        p: [
          "x += 1 adalah shorthand dari x = x + 1 (increment); x -= 1 kebalikannya (decrement). not x membalik nilai kebenaran; -x membalik tanda.",
        ],
        code: "a = True\na = not a          # False\n\nb = 6\nb -= 1             # 5\nc = 6\nc += 1             # 7\n\nd = 10\nprint(-d)          # -10",
      },
      {
        h: "Klasifikasi #2: menurut tipe data yang dihasilkan",
        table: {
          head: ["Jenis", "Pola", "Contoh"],
          rows: [
            ["Aritmetika", "numerik op numerik = numerik", "2 + 2 = 4"],
            ["Relasional", "numerik op numerik = boolean", "3 < 10 = True"],
            ["Logika", "boolean op boolean = boolean", "True or False = True"],
          ],
        },
        callout:
          "Yang paling sering salah dibaca pemula: relasional. Operannya angka, tapi HASILNYA boolean. 3 < 10 bukan 'angka kecil', melainkan pernyataan yang bernilai True — dan nilai True inilah yang nanti mengontrol if.",
      },
      {
        h: "Kenapa klasifikasi ini penting",
        p: [
          "Saat membaca kondisi seperti `if umur >= 17 and punya_ktp:` kamu sedang membaca DUA ekspresi relasional (hasil boolean) yang digabung ekspresi logika (hasil boolean). Komposisi ini adalah pola dasar seluruh logika program — kuasai sekarang, fase control flow jadi hampir gratis.",
        ],
      },
    ],
    lab: {
      title: "Pemetaan ekspresi",
      intro: "Latih matamu mengklasifikasi ekspresi — skill membaca kode yang dipakai terus-menerus.",
      steps: [
        "Buat file jenis.py.",
        "Tulis dan tebak dulu hasilnya SEBELUM menjalankan: nilai = 10; print(nilai += 1)? — jangan dijalankan dulu: ini ERROR (assignment bukan ekspresi yang bisa dicetak).",
        "Bentuk yang benar: nilai += 1 di baris sendiri, lalu print(nilai).",
        "Cetak hasil klasifikasi: print(3 < 10) — relasional, hasil True.",
        "print(not (3 < 10)) — logika di atas relasional, hasil False.",
        "print(-7) — uner negasi. print(2 ** 3) — biner pangkat.",
        "Terakhir: print(7 % 2 == 0) — baca pelan: modulo dulu (1), lalu relasional (1 == 0) → False. Ini pola cek bilangan genap!",
      ],
      hint: "Urutan evaluasi: operan dieksekusi dulu, operator menengah, lalu perbandingan/logika terakhir. Kalau ragu, bungkus sub-ekspresi dengan kurung.",
    },
    quiz: [
      {
        q: "Manakah yang merupakan ekspresi UNER?",
        options: ["x + y", "x ** y", "not x", "x != y"],
        answer: 2,
        why: "Uner = satu operan. not x hanya bekerja pada satu nilai boolean dan membaliknya. Sisanya dua operan (biner).",
      },
      {
        q: "x += 1 identik dengan...",
        options: ["x = 1", "x = x + 1", "x == 1", "x + 1 saja (tanpa mengubah x)"],
        answer: 1,
        why: "Ini increment: shorthand assignment yang menambah variabel dengan jumlah tetap. Sama persis dengan x = x + 1 — kanan dihitung dulu, hasil mengisi ulang x.",
      },
      {
        q: "3 < 10 adalah ekspresi relasional. Tipe data HASILNYA adalah...",
        options: ["integer", "float", "boolean", "string"],
        answer: 2,
        why: "Pola relasional: numerik dibandingkan numerik menghasilkan BOOLEAN (True/False). Operannya angka, hasilnya kebenaran — inilah bahan baku if nanti.",
      },
      {
        q: "True or False bernilai...",
        options: ["True — or menghasilkan True jika SALAH SATU operan True", "False — or butuh keduanya True", "Error tipe data", "None"],
        answer: 0,
        why: "Operator logika or: True jika minimal satu operan True. Bandingkan with and yang menuntut KEDUANYA True. not yang membalik.",
      },
    ],
  },
  {
    slug: "py-10",
    tid: "32500",
    title: "Tipe Data Primitif: Numbers, Boolean, String",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32500" },
    untukApa: [
      "Tipe data = konteks yang kamu pelajari di py-08 — sekarang daftar lengkapnya. Memilih tipe yang tepat menentukan operasi apa yang boleh dilakukan datamu.",
      "Dua properti 'immutable' dan 'falsy values' akan menjelaskan banyak perilaku aneh Python yang kalau tidak dijelaskan terasa seperti bug.",
    ],
    sections: [
      {
        h: "Peta tipe data Python",
        p: [
          "Tipe data Python terbagi dua kelompok besar: primitif (menyimpan satu nilai) dan collection (menyimpan banyak nilai — topik fase 9). Fokus sekarang: primitif.",
        ],
        table: {
          head: ["Tipe", "Isi", "Contoh"],
          rows: [
            ["int", "bilangan bulat", "1, -20, 999, 0"],
            ["float", "bilangan riil / desimal", "3.14, 1.0, 4.01E+1"],
            ["complex", "bilangan kompleks (jarang dipakai)", "1+2j"],
            ["bool", "kebenaran", "True, False"],
            ["str", "urutan karakter", "\"Dicoding\", \'a\', teks multi-baris"],
          ],
        },
        code: 'x = 6\nprint(type(x))   # <class \'int\'>\nx = 6.0\nprint(type(x))   # <class \'float\'>\nx = "enam"\nprint(type(x))   # <class \'str\'>',
      },
      {
        h: "Immutable: tidak bisa diubah, hanya diganti",
        p: [
          "Semua tipe primitif bersifat immutable. Inisialisasi ulang variabel BUKAN mengubah nilai lama — Python membuat objek baru. Buktinya lewat alamat memori:",
        ],
        code: 'var = 10\nprint(id(var))   # alamat memori A\nvar = 11\nprint(id(var))   # alamat BERUBAH -> objek baru, bukan nilai lama diubah',
      },
      {
        p: [
          "String paling jelas: ia urutan karakter berindeks (mulai 0), bisa dibaca per karakter, tapi TIDAK bisa ditulis ulang per karakter:",
        ],
        code: 's = "Dicoding"\nprint(s[0])    # D  (indexing, mulai dari 0)\nprint(s[2:])   # coding (slicing: dari indeks 2 sampai akhir)\n\ns[0] = "F"     # TypeError: \'str\' object does not support item assignment',
      },
      {
        callout:
          "Solusi ubah string: buat string BARU — s = \"F\" + s[1:]. Karena immutable, semua method string (lesson berikutnya) mengembalikan string baru, bukan mengubah yang lama.",
      },
      {
        h: "Boolean & nilai falsy",
        p: [
          "bool hanya punya True dan False (perhatikan kapital — case-sensitive!). Menariknya, Python bisa mengevaluasi NILAI APA PUN sebagai kebenaran. Hanya beberapa nilai yang dianggap False (falsy):",
        ],
        list: [
          "None dan False (yang memang didefinisikan salah)",
          "Angka nol semua tipe: 0, 0.0, 0j",
          "Koleksi kosong: \"\" (string kosong), (), {}, set(), range(0)",
        ],
        code: 'print(bool(0))      # False\nprint(bool(""))     # False\nprint(bool("hi"))   # True  (string non-kosong = truthy)\nprint(bool(-1))     # True  (angka selain nol = truthy)',
        callout:
          "Ini bukan teori kosong: if nama_input: adalah cara idiomatik mengecek 'apakah pengguna mengetik sesuatu' — string kosong otomatis dianggap False.",
      },
    ],
    lab: {
      title: "Type explorer + bukti immutable",
      intro: "Investigasi tipe data langsung di mode interaktif — cara tercepat menjawab 'ini tipenya apa ya?' saat ngoding.",
      steps: [
        "Buka python interaktif.",
        "Cek tipe: type(1), type(1.0), type(\"1\"), type(True) — perhatikan hasilnya berbeda semua.",
        "Falsy hunt: bool(0), bool(0.0), bool(\"\"), bool(\"0\") — yang terakhir TRUE! \"0\" adalah string non-kosong.",
        "Indexing: s = \"Security\"; coba s[0], s[-1] (indeks negatif = dari belakang), s[0:4].",
        "Bukti immutable: s[0] = \"X\" — baca TypeError-nya.",
        "Perbaiki dengan cara immutable-safe: s = \"X\" + s[1:] lalu cek s.",
      ],
      hint: "id() bisa menambah bukti: a = 10; print(id(a)); a = 11; print(id(a)) — alamat berubah karena objek baru dibuat.",
    },
    quiz: [
      {
        q: "type(1.0) menghasilkan...",
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
        answer: 1,
        why: "Yang menentukan tipe adalah NILAI, bukan cara menulisnya. Ada titik desimal = float, meski nilainya 'bulat' secara matematis. 1.0 ≠ 1 dari sudut pandang tipe.",
      },
      {
        q: "s = \"Dicoding\" lalu s[0] = \"F\". Apa yang terjadi?",
        options: [
          "s menjadi \"Ficoding\"",
          "Error — string immutable, tidak mendukung item assignment",
          "s menjadi \"F\" + \"icoding\" otomatis",
          "Huruf D hilang saja",
        ],
        answer: 1,
        why: "String adalah urutan karakter yang immutable: bisa dibaca (s[0]) tapi tidak bisa ditulis ulang per posisi. Perubahan harus lewat objek baru, misal s = \"F\" + s[1:].",
      },
      {
        q: "Manakah yang dievaluasi sebagai False (falsy)?",
        options: ["\"0\"", "0.0", "\"kosong\"", "-1"],
        answer: 1,
        why: "Angka nol dari semua tipe numerik adalah falsy. Tiga lainnya justru TRUTHY: \"0\" dan \"kosong\" adalah string non-kosong, -1 adalah angka selain nol.",
      },
      {
        q: "s = \"Python\". Apa hasil s[1:3]?",
        options: ["\"Py\"", "\"yt\"", "\"yth\"", "\"th\""],
        answer: 1,
        why: "Slicing s[awal:akhir] mengambil dari indeks awal SAMPAI SEBELUM akhir. s[1:3] = indeks 1 dan 2 = 'y' dan 't'. Indeks selalu mulai 0, batas akhir eksklusif.",
      },
    ],
  },
  {
    slug: "py-11",
    tid: "4762",
    title: "Operator: Aritmetika, Relasional, Logika",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4762" },
    untukApa: [
      "Tabel operator ini adalah perkakas yang kamu pakai di SETIAP program: hitung (aritmetika), bandingkan (relasional), gabungkan keputusan (logika).",
      "Tiga operator Python sering mengejutkan pemula: // (pembagian bulat), % (sisa bagi — kunci cek genap/ganjil), dan perbandingan STRING yang memakai urutan unicode.",
    ],
    sections: [
      {
        h: "Operator aritmetika (x = 11, y = 5)",
        table: {
          head: ["Operator", "Nama", "Contoh", "Hasil"],
          rows: [
            ["+", "penjumlahan", "x + y", "16"],
            ["-", "pengurangan", "x - y", "6"],
            ["*", "perkalian", "x * y", "55"],
            ["//", "pembagian bulat", "x // y", "2"],
            ["/", "pembagian riil", "x / y", "2.2"],
            ["%", "modulo (sisa bagi)", "x % y", "1"],
            ["**", "pangkat", "x ** y", "161051"],
          ],
        },
        callout:
          "Bedakan // dan /: 11 // 5 = 2 (dibuang desimalnya), 11 / 5 = 2.2 (riil, hasilnya selalu float). Dan % memberi SISA: 11 dibagi 5 sisa 1 — pola cek genap: n % 2 == 0.",
      },
      {
        h: "Operator relasional",
        p: [
          "Membandingkan dua operan, hasil selalu boolean. Pada angka (x=5, y=10): x == y False, x != y True, x > y False, x < y True, x >= y False, x <= y True.",
          "Pada STRING, == dan != membandingkan isi, tapi < > membandingkan urutan UNICODE huruf pertama yang berbeda:",
        ],
        code: 'x = "Dicoding"\ny = "Indonesia"\nprint(x < y)   # True — huruf D (urutan unicode lebih rendah) vs I\n\nprint("apple" < "banana")   # True\nprint("abc" < "abd")        # True — banding berhenti di huruf yang beda',
      },
      {
        h: "Operator logika",
        table: {
          head: ["Operator", "Aturan", "p=True, q=False"],
          rows: [
            ["and", "True jika KEDUA operan True", "p and q = False"],
            ["or", "True jika SALAH SATU True", "p or q = True"],
            ["not", "membalik nilai", "not p = False"],
          ],
        },
        p: [
          "Komposisi nyata: `umur >= 17 and punya_ktp` — dua relasional digabung logika. Program keputusan nyata hampir selalu bentuk ini.",
        ],
      },
    ],
    lab: {
      title: "Kalkulator tip + cek genap",
      intro: "Gabungkan tiga keluarga operator dalam satu program yang masuk akal sehari-hari.",
      steps: [
        "Buat file tip.py.",
        "total = int(input(\"Total bill: \")) dan orang = int(input(\"Jumlah orang: \")).",
        "Hitung: per_orang = total // orang (pembagian bulat — rupiah utuh) dan sisa = total % orang (sisa yang tidak terbagi).",
        "Cetak keduanya — cek dengan total 100000 dan 3 orang: per_orang 33333, sisa 1.",
        "Tambah baris boolean: genap = total % 2 == 0 lalu print(f\"Total genap? {genap}\").",
        "Tantangan logika: print(per_orang > 50000 and sisa == 0) — baca: mahal DAN tidak ada sisa.",
        "Eksperimen string: print(\"b\" > \"a\"), lalu print(\"B\" > \"a\") — huruf KAPITAL unicode-nya lebih kecil! Ini penting saat membandingkan input pengguna.",
      ],
      hint: "Kenapa \"B\" > \"a\" False? Unicode huruf besar (65-90) lebih rendah dari huruf kecil (97-122). Saat membandingkan nama/username, normalisasi dulu: .lower() dari lesson berikutnya.",
    },
    quiz: [
      {
        q: "11 // 5 dan 11 % 5 masing-masing menghasilkan...",
        options: ["2.2 dan 1", "2 dan 1", "1 dan 2", "2 dan 2.2"],
        answer: 1,
        why: "// = pembagian bulat (2, desimal dibuang); % = modulo = SISA pembagian: 11 = 5x2 + 1, sisanya 1. Keduanya sering dipakai berpasangan untuk memecah angka.",
      },
      {
        q: "Cara paling idiomatik mengecek n bilangan genap:",
        options: ["n // 2 == 0", "n % 2 == 0", "n / 2 == 0", "n ** 2 == 0"],
        answer: 1,
        why: "Genap = habis dibagi 2 = sisa bagi nol: n % 2 == 0. Perhatikan pola komposisinya: ekspresi aritmetika (n % 2) menghasilkan angka, dibandingkan relasional (== 0) menghasilkan boolean.",
      },
      {
        q: "\"Dicoding\" < \"Indonesia\" menghasilkan True karena...",
        options: [
          "\"Dicoding\" lebih pendek",
          "Huruf pertama yang berbeda dibandingkan lewat urutan unicode: D < I",
          "Semua huruf D kecil dari I secara alfabet program",
          "Python menghitung jumlah huruf",
        ],
        answer: 1,
        why: "Perbandingan string memakai nilai unicode karakter, berhenti di huruf pertama yang berbeda. D (unicode 68) < I (73) → True. Panjang string tidak dipakai di sini.",
      },
      {
        q: "p = True, q = False. Mana yang bernilai True?",
        options: ["p and q", "not p", "p or q", "not (p or q)"],
        answer: 2,
        why: "or menghasilkan True jika minimal satu operan True — p saja sudah cukup. and menuntut keduanya (False), not p membalik jadi False, dan not(p or q) membalik True jadi False.",
      },
    ],
  },
  {
    slug: "py-12",
    tid: "32505",
    title: "Transformasi String: Method Wajib",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32505" },
    untukApa: [
      "Input pengguna berantakan: spasi ekstra, kapital acak. Data mentah harus dibersihkan dulu sebelum dipakai — dan pembersihannya adalah method-method string ini.",
      "Ini payload harian programmer: dari parsing file log sampai normalisasi username. Kuasai 12 method ini, kamu sudah lebih produktif dari 90% pemula.",
    ],
    sections: [
      {
        h: "Mengubah huruf besar-kecil",
        code: "kata = 'dicoding'\nprint(kata.upper())    # DICODING\nprint('DICODING'.lower())   # dicoding",
        p: [
          "Karakter non-huruf (angka, simbol) tidak berubah. Ingat lab py-11: .lower() adalah cara normalisasi sebelum membandingkan string.",
        ],
      },
      {
        h: "Menghapus whitespace: strip family",
        code: "print(\"Dicoding     \".rstrip())   # hapus kanan\nprint(\"    Dicoding\".lstrip())   # hapus kiri\nprint(\"   Dicoding   \".strip())  # hapus kiri+kanan\n\n# strip bisa diberi argumen selain whitespace:\nprint('CodeCodeDicodingCodeCode'.strip(\"Code\"))   # Dicoding",
      },
      {
        h: "Memisah & menggabung: split + join",
        code: "print('Dicoding Indonesia !'.split())\n# ['Dicoding', 'Indonesia', '!']  -> hasilnya LIST\n\nprint(' '.join(['Dicoding', 'Indonesia', '!']))\n# Dicoding Indonesia !\n\n# split per baris untuk teks multi-line:\nprint('''baris satu\nbaris dua'''.split('\\n'))\n# ['baris satu', 'baris dua']",
        callout:
          "split dan join adalah pasangan kebalikan. split memecah string -> list; join menyambung list -> string. Delimiter bisa apa pun: spasi, koma, newline.",
      },
      {
        h: "Mengecek & mengganti",
        code: "print('Dicoding Indonesia'.startswith('Dicoding'))  # True\nprint('Dicoding Indonesia'.endswith('Dicoding'))    # False\n\ns = \"Ayo belajar Coding di Dicoding\"\nprint(s.replace(\"Coding\", \"Pemrograman\"))\n# Ayo belajar Pemrograman di Dicoding  — hanya \"Coding\" kapital\n\nprint('DICODING'.isupper())   # True\nprint('dicoding'.islower())   # True",
        p: [
          "replace() case-sensitive: 'Coding' dan 'coding' adalah dua kata berbeda baginya. Method is* (isupper, islower, dst) mengembalikan boolean — pasangan sempurna untuk if.",
        ],
      },
    ],
    lab: {
      title: "Pembersih input pengguna",
      intro: "Simulasi nyata: input pengguna selalu kotor. Bersihkan dengan pipeline method.",
      steps: [
        "Buat file bersih.py.",
        "Simulasi input kotor: raw = \"   aLiF AdiTyA  \".",
        "Pipeline: clean = raw.strip().lower() lalu print(clean) — hasil: alif aditya.",
        "Cek: print(clean.islower()) — True.",
        "Cek awalan: print(clean.startswith(\"alif\")) — True.",
        "Gabung balik: print(\"-\".join(clean.split())) — alif-aditya (slug! persis pola URL).",
        "Tantangan: buat versi judul — setiap kata kapital awalnya, pakai .title() lalu verifikasi hasilnya.",
      ],
      hint: "Pipeline method bisa dirantai: raw.strip().lower().title() dieksekusi kiri ke kanan. Setiap method mengembalikan string BARU (immutable!) sehingga aman dirantai.",
    },
    quiz: [
      {
        q: "' Dicoding '.strip() menghasilkan...",
        options: ["\"Dicoding\" — whitespace kiri dan kanan dihapus", "\"Dicoding  \" — hanya kiri", "\" Dicoding\" — hanya kanan", "Error"],
        answer: 0,
        why: "strip() tanpa argumen menghapus whitespace di KEDUA ujung. rstrip() hanya kanan, lstrip() hanya kiri. Isi di tengah tidak tersentuh.",
      },
      {
        q: "'a,b,c'.split(',') menghasilkan...",
        options: ["\"abc\"", "[\"a\", \"b\", \"c\"]", "[\"a,b,c\"]", "(\"a\", \"b\", \"c\")"],
        answer: 1,
        why: "split memecah string per delimiter dan mengembalikan LIST of substring. Kebalikannya, join menyambung list menjadi satu string dengan delimiter tertentu.",
      },
      {
        q: "\"Dicoding\".replace(\"ding\", \"DING\") menghasilkan...",
        options: [
          "\"DicoDING\" — semua 'ding' diganti",
          "\"Dicoding\" tidak berubah — tapi ingat, method string mengembalikan string BARU, jadi hasilnya \"DicoDING\" saat dicetak",
          "Error karena string immutable",
          "\"DicodingDING\"",
        ],
        answer: 1,
        why: "replace mencari substring 'ding' (d kecil) dan menemukannya di 'co-ding' → \"DicoDING\". Karena immutable, hasil dikembalikan sebagai string baru — string asli tetap utuh kecuali kamu assign ulang.",
      },
      {
        q: "Kenapa .lower() penting sebelum membandingkan input pengguna dengan nilai tetap?",
        options: [
          "Supaya string jadi lebih pendek",
          "Karena perbandingan string case-sensitive: \"ALIF\" != \"alif\" secara unicode",
          "Karena lower() menghapus spasi",
          "Karena Python menolak huruf kapital",
        ],
        answer: 1,
        why: "== membandingkan unicode per karakter; 'A' (65) ≠ 'a' (97). Normalisasi .lower() di kedua sisi membuat \"ALIF\" == \"alif\" setelah normalisasi — standar pembandingan input dunia nyata.",
      },
    ],
  },
  {
    slug: "py-13",
    tid: "4747",
    title: "One-liner: Kode Satu Baris Python",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4747" },
    untukApa: [
      "Python punya super-power yang tidak dimiliki banyak bahasa: operasi rumit bisa ditulis satu baris dan TETAP terbaca. Tukar dua variabel adalah contoh legendarisnya.",
      "Salah satu alasan Python jadi bahasa favorit untuk scripting security dan data: ekspresif dalam satu baris.",
    ],
    sections: [
      {
        h: "Masalah klasik: menukar dua variabel",
        p: [
          "Cara umum di bahasa lain butuh variabel bantu (analogi: menukar isi dua gelas butuh gelas ketiga):",
        ],
        code: "x = 1\ny = 2\n\ntemp = x   # gelas ketiga simpan isi x\nx = y      # x sekarang isi y\ny = temp   # y sekarang isi x lama\n\nprint(x, y)   # 2 1",
      },
      {
        p: [
          "Tiga baris, satu variabel sementara, dan urutannya tidak boleh salah (aksi sekuensial!). Python menyingkatnya jadi SATU baris:",
        ],
      },
      {
        h: "Cara Python: tuple assignment",
        code: "x = 1\ny = 2\n\nx, y = y, x   # one-liner!\n\nprint(x, y)   # 2 1",
        p: [
          "Ruas kanan (y, x) dievaluasi DULUHULU menjadi pasangan nilai, baru lalu di-unpack ke ruas kiri. Karena kanan selesai dulu, tidak ada konflik — tidak perlu variabel bantu.",
        ],
        callout:
          "Aturan main one-liner: tujuannya singkat DAN jelas. Tidak semua blok bisa jadi one-liner (deklarasi fungsi, modul, kelas tidak). Kalau satu baris justru sulit dibaca, tulis blok biasa — keterbacaan menang.",
      },
      {
        h: "Pola one-liner lain yang akan kamu temui",
        list: [
          "x += 1 — increment (dari lesson jenis ekspresi)",
          "a, b = b, a — swap tanpa variabel bantu (hari ini)",
          "Nanti di fase lanjut: list comprehension, ternary expression, dsb.",
        ],
      },
    ],
    lab: {
      title: "Swap dan buktikan kenapa works",
      intro: "Praktikkan dua versi swap lalu bedah kenapa versi Python aman dari konflik urutan.",
      steps: [
        "Buat file swap.py.",
        "Tulis versi temp: a, b = 1, 2 lalu tukar dengan variabel temp (3 baris). Cetak hasilnya.",
        "Tambah versi Python: c, d = 1, 2 lalu c, d = d, c. Cetak.",
        "Break-test versi temp: hilangkan baris temp = x dan jalankan — nilai jadi salah (bukan error!). Ini bug diam-diam: hasil salah tanpa teriak.",
        "Pakai mode interaktif: ketik p, q = 10, 20 lalu p, q = q, p+1 — cek hasilnya (p=21, q=10). Kanan dihitung dulu, sekaligus!",
        "Refleksi: satu baris menggantikan berapa baris? Kapan versi blok tetap lebih baik?",
      ],
      hint: "Bug diam-diam di langkah 4 adalah alasan swap satu baris lebih aman: tidak ada state antara yang bisa keliru urutan.",
    },
    quiz: [
      {
        q: "x, y = y, x bekerja karena...",
        options: [
          "Python mengabaikan urutan eksekusi untuk assignment ganda",
          "Ruas kanan dievaluasi penuh DULU menjadi pasangan nilai, baru di-unpack ke ruas kiri",
          "Python otomatis membuat variabel temp",
          "y dan x ditukar referensi memori secara langsung",
        ],
        answer: 1,
        why: "Kunci eksekusinya: kanan dulu. (y, x) dibentuk sebagai pasangan nilai SEBELUM ada penulisan ulang variabel — sehingga tidak ada konflik urutan, tidak butuh variabel bantu.",
      },
      {
        q: "Apa risiko versi swap dengan variabel temp (tanpa one-liner)?",
        options: [
          "Selalu error saat dijalankan",
          "Urutan baris yang keliru menghasilkan nilai salah TANPA error — bug diam-diam",
          "Python menolak variabel bernama temp",
          "Lebih lambat sehingga program crash",
        ],
        answer: 1,
        why: "Kalau baris temp-nya lupa atau salah urutan, program tetap jalan tapi hasilnya salah — tidak ada error yang menjerit. Bug diam-diam seperti ini paling mahal saat debugging.",
      },
      {
        q: "Kapan one-liner TIDAK disarankan?",
        options: [
          "Ketika kodenya lebih pendek dan tetap jelas",
          "Ketika satu baris justru sulit dibaca — keterbacaan menang",
          "Saat memakai operator aritmetika",
          "Saat berjalan di mode interaktif",
        ],
        answer: 1,
        why: "Filsafat Python sejak lesson pertama: kode lebih sering dibaca daripada ditulis. One-liner untuk singkat-DAN-jelas; kalau jadi kriptik, tulis blok biasa. Fungsi/kelas bahkan tidak bisa dijadikan one-liner.",
      },
    ],
  },
  {
    slug: "py-14",
    tid: "4766",
    title: "Percabangan: if, elif, else",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4766" },
    untukApa: [
      "Sampai fase ini programmu robot yang naif: semua baris dieksekusi, titik. Program nyata harus BISA MEMUTUSKAN — 'jika login gagal 5 kali, blokir; jika tidak, biarkan masuk'.",
      "Percabangan adalah tool keputusan pertamamu. Paham ini + operator relasional/logika dari py-09/py-11 = kamu bisa menulis logika program apa pun.",
    ],
    sections: [
      {
        h: "if: eksekusi berdasarkan kondisi",
        p: [
          "if mengecek sebuah kondisi (ekspresi yang menghasilkan boolean). True = blok di dalamnya dieksekusi; False = dilewati. Ini pemakaian ekspresi relasional yang kamu pelajari di py-09 — sekarang jadi kontrol alur:",
        ],
        code: 'score = 100\n\nif score == 100:\n    print("Nilai Anda sempurna!")   # dieksekusi karena True',
      },
      {
        p: [
          "Bonus dari lesson tipe data: kondisi tidak harus boolean eksplisit. Python mengevaluasi nilai apa pun sebagai truthy/falsy — `if x:` dengan x string kosong akan False, jadi bloknya dilewati.",
        ],
      },
      {
        h: "else: jalan keluar terakhir",
        p: [
          "else menampung kode yang dieksekusi saat kondisi if (dan semua elif) False. Ia opsional dan tidak punya kondisi sendiri — jalan keluar PASTI terpenuhi:",
        ],
        code: 'tinggi_badan = 120\n\nif tinggi_badan >= 160:\n    print("Boleh naik roller coaster")\nelse:\n    print("Tidak boleh naik roller coaster")',
        callout:
          "Aturan penting: else adalah kondisi TERAKHIR. Kalau punya kondisi ke-2, ke-3, dst — jangan dipaksakan lewat else, gunakan elif.",
      },
      {
        h: "elif: kondisi menengah, bisa banyak",
        p: [
          "elif (else if) menyisipkan kondisi tambahan di antara if dan else — jumlahnya tidak dibatasi. Evaluasinya SEKUENSIAL: if dulu, lalu elif satu per satu, sampai yang pertama True; sisanya dilewati termasuk else:",
        ],
        code: 'nilai = 65\n\nif nilai >= 80:\n    print("Nilai A")\nelif nilai >= 70:\n    print("Nilai B")\nelif nilai >= 60:\n    print("Nilai C")   # dieksekusi: 65 >= 60\nelse:\n    print("Nilai D")',
      },
      {
        p: [
          "Perhatikan kecerdasan urutan: nilai 65 gagal di if (80) dan elif pertama (70), sukses di elif kedua (60) — jadi 'C'. Kondisi gabungan juga bisa: `if nilai >= 80 and perilaku == 'baik':`",
        ],
      },
      {
        h: "Ternary: if-else versi one-liner",
        p: [
          "Untuk keputusan yang cukup dipadatkan satu baris, Python punya conditional expression (ternary):",
        ],
        code: 'lulus = True\n\nprint("selamat") if lulus else print("perbaiki")\n\n# atau sebagai nilai:\nstatus = "lulus" if lulus else "belum lulus"\nprint(status)   # lulus',
      },
      {
        p: [
          "Ada juga varian ternary tuple `(nilai_false, nilai_true)[kondisi]` — berfungsi, tapi komunitas Python menganggapnya tidak pythonic karena membingungkan (indeks 0 = False!). Hindari; pakai bentuk standar.",
        ],
      },
    ],
    lab: {
      title: "Konverter nilai huruf + login checker",
      intro: "Dua program keputusan klasik. Tulis dulu tebakanmu, jalankan, bandingkan.",
      steps: [
        "Buat file grade.py: minta input nilai (int), lalu konversi ke huruf pakai if/elif/else (A ≥ 80, B ≥ 70, C ≥ 60, selain itu D).",
        "Tes 4 kasus: 85, 75, 65, 30 — pastikan masing-masing masuk jalur yang benar.",
        "Coba pecahkan urutannya: taruh `elif nilai >= 60` di PALING ATAS, jalankan dengan 85 — kenapa hasilnya jadi C? (evaluasi sekuensial: yang pertama True menang!)",
        "Buat file login.py: password_tersimpan = 'rahasia123'. Minta input, cocokkan case-insensitive (hint: .lower() dari py-12).",
        "Gagal = cetak 'Password salah'; benar = 'Selamat datang'.",
        "Kembangkan: gagal_berulang = 0, tiap gagal +1; jika gagal_berulang >= 3 cetak 'Akun terkunci' — ini pola nyata di sistem auth!",
      ],
      hint: "Pada langkah 3, elif >= 60 menang karena evaluasi berhenti di kondisi True PERTAMA. Urutan kondisi dari paling sempit/ketat ke paling longgar adalah disiplin wajib if-elif.",
    },
    quiz: [
      {
        q: "nilai = 85 dengan rangkaian `if nilai >= 60: ...C / elif nilai >= 70: ...B / elif nilai >= 80: ...A`. Hasilnya?",
        options: ["A — nilai tertinggi dicocokkan dulu", "C — kondisi dicek sekuensial dan >= 60 True lebih dulu, sisa cabang dilewati", "B — Python memilih yang paling mendekati", "Error urutan kondisi"],
        answer: 1,
        why: "if-elif dievaluasi berurutan dan BERHENTI di kondisi True pertama. Karena >= 60 dicek dulu dan True, cabang lain tak pernah dibaca. Urutan kondisi harus dari paling ketat ke paling longgar.",
      },
      {
        q: "Kapan else dijalankan?",
        options: [
          "Selalu, sebagai kondisi kedua",
          "Hanya jika semua if dan elif sebelumnya bernilai False",
          "Saat kondisi if True tapi kamu juga mau kode tambahan",
          "Setiap awal program",
        ],
        answer: 1,
        why: "else adalah jalan keluar terakhir: hanya dieksekusi bila seluruh kondisi sebelumnya gagal. Karena tak punya kondisi, ia PASTI terpenuhi — makanya harus paling akhir.",
      },
      {
        q: "x = \"\". Apa hasil `if x: print('True branch')`?",
        options: [
          "Dicetak — string apapun truthy",
          "Tidak dicetak — string kosong adalah falsy",
          "Error — if butuh perbandingan eksplisit",
          "Dicetak dua kali",
        ],
        answer: 1,
        why: "Python mengevaluasi nilai apa pun sebagai boolean: string kosong, 0, dan koleksi kosong adalah falsy. Pola `if x:` justru idiomatik untuk cek 'apakah ada isinya'.",
      },
      {
        q: "Manakah ternary yang BENAR dan pythonic?",
        options: [
          "print(\"selamat\") if lulus else print(\"perbaiki\")",
          "(\"perbaiki\", \"selamat\")[lulus]",
          "if lulus print(\"selamat\") else print(\"perbaiki\")",
          "print(if lulus: \"selamat\")",
        ],
        answer: 0,
        why: "Bentuk standar ternary Python: nilai-atau-aksi `if kondisi else` nilai-atau-aksi. Varian tuple berfungsi tapi dianggap tidak pythonic (indeks 0 untuk False = jebakan baca); opsi C dan D bukan sintaks Python.",
      },
    ],
  },
  {
    slug: "py-15",
    tid: "4769",
    title: "Perulangan for & range",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4769" },
    untukApa: [
      "Mencetak 10 angka dengan 10 baris print itu legal tapi memalukan programmer 😄. Perulangan menyingkat 'lakukan X sebanyak N kali' jadi dua baris — dan bekerja untuk data sebanyak apa pun.",
      "for adalah definite iteration: jumlah putaran SUDAH DITENTUKEN dari awal (dari iterable). Ini loop yang kamu pakai untuk memproses list, string, dan range.",
    ],
    sections: [
      {
        h: "for: iterasi atas iterable",
        p: [
          "Formatnya `for <var> in <iterable>:`. Iterable = objek yang bisa diiterasi: list, tuple, string. Setiap putaran, var mengambil elemen berikutnya:",
        ],
        code: 'var_list = [1, 2, 3, 4, 5]\nfor i in var_list:\n    print(i)\n\n# bekerja juga pada string:\nfor huruf in "abc":\n    print(huruf)   # a, b, c',
      },
      {
        p: [
          "Bandingkan dengan 10 baris print untuk angka 1-10: for menyelesaikannya 2 baris, dan ukuran datanya tak lagi masalah — 1.000 elemen pun tetap 2 baris.",
        ],
      },
      {
        h: "range(): urutan angka on-demand",
        p: [
          "range() menghasilkan urutan bilangan tanpa perlu menulis list manual. Sintaksnya range(start, stop, step) — start & step opsional, stop WAJIB dan EKSKLUSIF:",
        ],
        table: {
          head: ["Pemanggilan", "Menghasilkan", "Catatan"],
          rows: [
            ["range(10)", "0..9", "start default 0; stop tidak ikut!"],
            ["range(1, 10)", "1..9", "start eksplisit"],
            ["range(1, 10, 2)", "1, 3, 5, 7, 9", "step 2 = lompat 2"],
            ["range(10, 0, -1)", "10..1", "step negatif = hitung mundur"],
          ],
        },
        code: 'for i in range(1, 10, 2):\n    print(i)   # 1, 3, 5, 7, 9 — bilangan ganjil',
        callout:
          "Stop EKSKLUSIF adalah jebakan klasik: range(10) berhenti di 9. Mau 1-10? range(1, 11). Otakmu harus membaca range sebagai 'sampai SEBELUM stop'.",
      },
    ],
    lab: {
      title: "Tabel perkalian + FizzBuzz",
      intro: "Dua latihan interview klasik level pertama. FizzBuzz melatih kombinasi for + if + modulo dari py-11.",
      steps: [
        "Buat file kali.py: n = int(input('Tabel perkalian berapa? ')).",
        "Loop: for i in range(1, 11): print(f'{n} x {i} = {n*i}') — tabel perkalian lengkap 1-10.",
        "Modifikasi: range(1, 11, 2) — amati hanya 1,3,5,7,9 yang tercetak.",
        "Buat fizzbuzz.py: for n in range(1, 31): — cetak angka, TAPI: kelipatan 3 cetak 'Fizz', kelipatan 5 cetak 'Buzz', kelipatan 15 cetak 'FizzBuzz'.",
        "Tebak dulu urutan kondisinya, lalu jalankan: kenapa cek 15 HARUS lebih dulu daripada 3 atau 5?",
        "Bonus: pakai range(30, 0, -1) untuk mencetak mundur.",
      ],
      hint: "FizzBuzz: if n % 15 == 0 lebih dulu, karena 15 juga kelipatan 3 dan 5 — kalau cek % 3 dulu, 15 tak pernah sampai ke cabang FizzBuzz (evaluasi sekuensial, sama seperti lesson percabangan).",
    },
    quiz: [
      {
        q: "for i in range(1, 10, 2): — angka yang tercetak adalah...",
        options: ["1 sampai 10 semua", "1, 3, 5, 7, 9", "2, 4, 6, 8", "1 sampai 9 semua"],
        answer: 1,
        why: "start=1, stop=10 (eksklusif, jadi sampai 9), step=2 (lompat 2). Hasilnya bilangan ganjil 1..9. Membaca range: mulai di start, berhenti SEBELUM stop, bergerak sejauh step.",
      },
      {
        q: "Kenapa range(10) menghasilkan 0-9, bukan 1-10?",
        options: [
          "Bug di Python",
          "Karena stop bersifat eksklusif dan start default-nya 0",
          "Karena Python menghitung dari 1",
          "Karena range hanya untuk array",
        ],
        answer: 1,
        why: "Dua fakta digabung: start tak diberi = 0, dan stop selalu eksklusif (tidak ikut). Konsisten dengan indexing/slicing string dari py-10 yang juga mulai 0 dan batas-akhir eksklusif.",
      },
      {
        q: "Apa yang dimaksud for bersifat definite iteration?",
        options: [
          "Loop-nya pasti error-free",
          "Jumlah pengulangan ditentukan eksplisit sebelumnya — dari isi iterable",
          "Kecepatan loop sudah ditentukan Python",
          "Loop hanya untuk angka",
        ],
        answer: 1,
        why: "Definite = terdefinisi di muka: Python tahu tepat berapa putaran dari panjang iterable. Kontras dengan while (indefinite) yang berhenti berdasarkan kondisi, bukan jumlah.",
      },
      {
        q: "Di FizzBuzz, kondisi kelipatan 15 harus dicek...",
        options: [
          "Terakhir saja, hasilnya sama",
          "Lebih dulu — karena 15 juga kelipatan 3 dan 5, dan if-elif berhenti di True pertama",
          "Tidak perlu, Python otomatis tahu",
          "Dengan operator or",
        ],
        answer: 1,
        why: "Pola if-elif sekuensial: cabang pertama yang True menang. Kalau % 3 dicek dulu, angka 15 tercetak 'Fizz' dan tak pernah sampai cabang FizzBuzz. Pemesanan kondisi adalah bagian dari logika.",
      },
    ],
  },
  {
    slug: "py-16",
    tid: "4769",
    title: "while, break & continue",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4769" },
    untukApa: [
      "for hebat saat jumlah putaran diketahui. Tapi 'coba password sampai benar' atau 'baca input sampai user ketik exit' — jumlah putarannya TIDAK DIKETAHUI. Di sanalah while.",
      "break dan continue memberi kontrol penuh: hentikan loop lebih awal, atau lewati satu putaran. Ini trio yang dipakai di semua script scraping/automation.",
    ],
    sections: [
      {
        h: "while: loop berdasarkan kondisi",
        p: [
          "while = indefinite iteration: berjalan SELAMA kondisi True, berhenti saat False. Jumlah putarannya tidak ditentukan di muka — ditentukan oleh kondisi:",
        ],
        code: 'counter = 1\nwhile counter <= 5:\n    print(counter)\n    counter += 1   # increment: WAJIB, lihat bahaya di bawah\n\n# 1, 2, 3, 4, 5',
      },
      {
        p: [
          "Rumus aman while: (1) inisialisasi variabel SEBELUM loop, (2) cek kondisi, (3) UBAH variabel di dalam loop. Lupakan langkah 3:",
        ],
        code: 'counter = 1\nwhile counter <= 5:\n    print(counter)\n# tanpa increment -> counter selalu 1 -> kondisi selalu True\n# INFINITE LOOP: program berjalan tanpa henti (hentikan dengan Ctrl+C)',
      },
      {
        callout:
          "Infinite loop bukan error — program jalan normal, cuma TIDAK PERNAH berhenti. Di terminal: Ctrl+C. Di notebook: interrupt kernel. Selalu pastikan ada yang mengubah kondisi menuju False.",
      },
      {
        h: "break: keluar lebih awal",
        p: [
          "break menghentikan perulangan SEKETIKA dan lompat ke kode setelah loop. Di nested loop, break hanya menghentikan loop DI TINGKATNYA berada:",
        ],
        code: 'for huruf in "Dico ding":\n    if huruf == " ":\n        break\n    print("Huruf saat ini:", huruf)\n\n# D, i, c, o — berhenti tepat sebelum spasi',
      },
      {
        h: "continue: lewati satu putaran",
        p: [
          "continue menghentikan PUTARAN INI saja, lalu lanjut ke iterasi berikutnya. Bandingkan dengan break di string yang sama:",
        ],
        code: 'for huruf in "Dico ding":\n    if huruf == " ":\n        continue\n    print("Huruf saat ini:", huruf)\n\n# D, i, c, o, d, i, n, g — spasi dilewati, loop jalan sampai habis',
      },
      {
        p: [
          "break = berhenti TOTAL; continue = skip SEKALI. Pada while, keduanya sama berguna: break untuk 'ditemukan, cukup', continue untuk 'baris ini jelek, ambil berikutnya'.",
        ],
      },
    ],
    lab: {
      title: "Simulator login attempt (bergaya auth nyata)",
      intro: "Program yang meminta password sampai benar ATAU 3 kali gagal — persis pola lockout di sistem authentication.",
      steps: [
        "Buat file login_sim.py. password = 'rahasia123', attempts = 0.",
        "Loop utama: while attempts < 3: — di dalamnya minta input('Password: ').",
        "Jika benar: print('Selamat datang!') lalu break.",
        "Jika salah: attempts += 1 dan cetak sisa percobaan: print(f'Salah. Sisa: {3 - attempts}').",
        "Setelah loop: if attempts >= 3: print('Akun terkunci.') — kalau tidak tercetak berarti login sukses (break).",
        "Uji 3 skenario: benar di percobaan pertama, benar di ketiga, salah semua.",
        "Extra: pakai continue untuk melewati password yang kosong tanpa menghitung attempts.",
      ],
      hint: "Pola di langkah 5 disebut flag after loop: karena break melewati sisa loop, kondisi attempts >= 3 hanya True saat loop kehabisan tanpa sukses. Ini cara Python mendeteksi 'berhenti karena gagal, bukan karena berhasil'.",
    },
    quiz: [
      {
        q: "Apa yang menyebabkan infinite loop pada while?",
        options: [
          "Kondisi yang terlalu kompleks",
          "Variabel yang menentukan kondisi tidak pernah diubah menuju False di dalam loop",
          "Pakai break di dalam loop",
          "Lupa titik dua",
        ],
        answer: 1,
        why: "while berjalan selama kondisi True. Kalau tidak ada apa pun di dalam loop yang membuat kondisi menuju False (misal lupa increment), kondisi True selamanya — program tak pernah berhenti.",
      },
      {
        q: "break vs continue — pasangan perilaku yang benar:",
        options: [
          "break = lewati satu putaran; continue = hentikan loop",
          "break = hentikan loop seketika; continue = lewati sisa putaran ini, lanjut iterasi berikutnya",
          "Keduanya identik, cuma gaya penulisan",
          "break hanya untuk while, continue hanya untuk for",
        ],
        answer: 1,
        why: "break keluar dari loop SEKETIKA (eksekusi lanjut setelah loop). continue hanya memotong putaran berjalan dan kembali ke cek kondisi/ambil elemen berikutnya.",
      },
      {
        q: "Di nested loop, break di loop DALAM akan...",
        options: [
          "Menghentikan semua loop sekaligus",
          "Menghentikan loop dalam saja — loop luar lanjut putaran berikutnya",
          "Error — break hanya boleh di loop luar",
          "Menghentikan loop luar lebih dulu",
        ],
        answer: 1,
        why: "break bekerja pada tingkat loop tempat ia berada. Loop luar tidak terpengaruh dan melanjutkan iterasinya — kalau mau keluar dari semuanya, perlu flag atau refaktor ke fungsi.",
      },
      {
        q: "Kapan while lebih tepat daripada for?",
        options: [
          "Saat mengiterasi list yang isinya diketahui",
          "Saat jumlah pengulangan tidak diketahui di muka — berhenti bergantung kondisi (input user, data ditemukan, dsb)",
          "Saat butuh loop yang pasti berjalan 10 kali",
          "while selalu lebih tepat",
        ],
        answer: 1,
        why: "While = indefinite iteration: tak tahu berapa putaran, hanya tahu KAPAN harus berhenti. 'Tanya user sampai benar' dan 'poll sampai server siap' contoh klasiknya. Jumlah pasti = for.",
      },
    ],
  },
  {
    slug: "py-17",
    tid: "4769",
    title: "Nested Loop & for-else",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4769" },
    untukApa: [
      "Grid, tabel, kombinasi 'setiap X dipasangkan dengan setiap Y' — semuanya nested loop. Ini prasyarat memahami matriks di fase 8 dan double-processing data.",
      "for-else adalah fitur Python yang jarang ada di bahasa lain: blok else yang jalan saat loop SELESAI TANPA break — sempurna untuk pola pencarian.",
    ],
    sections: [
      {
        h: "Nested loop: loop dalam loop",
        p: [
          "Loop luar berjalan satu putaran, loop dalam berjalan PENUH; lalu loop luar maju satu lagi — begitu seterusnya. Total eksekusi = jumlah_luar × jumlah_dalam:",
        ],
        code: 'for i in range(1, 3):\n    for j in range(1, 3):\n        print(i, j)\n\n# 1 1\n# 1 2\n# 2 1\n# 2 2',
      },
      {
        p: [
          "Baca polanya: (1,1), (1,2) — loop dalam selesai penuh untuk i=1 — baru (2,1), (2,2). Analogi: setiap baris (i) berisi beberapa kolom (j).",
        ],
      },
      {
        h: "for-else: deteksi 'tidak ditemukan'",
        p: [
          "else setelah for dieksekusi hanya jika loop selesai TANPA break. Pola pencarian klasik:",
        ],
        code: 'numbers = [1, 2, 3, 4, 5]\n\nfor num in numbers:\n    if num == 6:\n        print("Ditemukan!")\n        break\nelse:\n    print("Angka tidak ditemukan.")\n\n# else jalan karena loop tuntas tanpa pernah break',
      },
      {
        p: [
          "Kalau angka ditemukan, break mengeksekusi dan else DILEWATI. while punya else dengan aturan mirip: else jalan saat kondisi jadi False secara normal — tapi TIDAK jalan jika loop keluar lewat break.",
        ],
        callout:
          "Kombinasi break + for-else menggantikan pola 'pakai flag ditemukan = False, set True saat ketemu, cek flag setelah loop' — lebih ringkas dan tak ada flag yang lupa diinisialisasi.",
      },
    ],
    lab: {
      title: "Scanner port mini + pencarian berganda",
      intro: "Nested loop + for-else dalam bentuk yang dekat dengan duniamu: scanner sederhana (localhost legal) dan pola pencarian.",
      steps: [
        "Buat file scanner.py (100% lokal, bukan jaringan asli): ports = [21, 22, 80, 443, 8080] sebagai simulasi daftar port.",
        "Nested: for target in ['server-a', 'server-b']: lalu for port in ports: print(f'{target}:{port} dicek').",
        "Amati: total baris = 2 × 5 = 10 — setiap target dipasangkan semua port.",
        "Tambahkan break di loop port saat port == 443 (simulasi 'berhenti saat ketemu web server') — amati loop dalam berhenti, loop luar lanjut.",
        "Buat file cari.py: gunakan pola for-else untuk mencari angka 7 di numbers = [1,3,5,7,9]. Ganti target jadi 8 — bandingkan jalannya else.",
        "Tantangan: scan dict 'server-b' langsung skip: tambahkan if target == 'server-b': continue di loop luar — lewati seluruh target tanpa menghentikan scanner.",
      ],
      hint: "continue di loop LUAR melewati satu target penuh; break di loop DALAM hanya memotong port-scan satu target. Bedakan posisi kontrol — ini inti lesson ini.",
    },
    quiz: [
      {
        q: "for i in range(3): dan di dalamnya for j in range(4): — berapa kali blok paling dalam dieksekusi?",
        options: ["7 kali", "12 kali", "3 kali", "4 kali"],
        answer: 1,
        why: "Total = luar × dalam = 3 × 4 = 12. Loop dalam berjalan penuh untuk SETIAP putaran loop luar — inilah kenapa nested loop mahal di data besar (1000 × 1000 = 1 juta eksekusi).",
      },
      {
        q: "Blok else setelah for dijalankan saat...",
        options: [
          "Setiap kali, sebagai penutup loop",
          "Loop selesai penuh TANPA pernah break",
          "Loop berhenti karena break",
          "Kondisi loop False",
        ],
        answer: 1,
        why: "for-else dieksekusi hanya bila loop tuntas normal (iterables habis) tanpa break. Break 'membatalkan' hak else — desain yang pas untuk pola pencarian: else = 'tidak ketemu'.",
      },
      {
        q: "Pola `for x in data: if x == target: break` + `else: print('tidak ada')` menggantikan pola apa di bahasa lain?",
        options: [
          "Pola try-except",
          "Flag boolean (ditemukan = False, ubah saat ketemu, cek setelah loop)",
          "Rekursi",
          "Nested if",
        ],
        answer: 1,
        why: "Tanpa for-else kamu butuh variabel flag yang di-set saat ketemu dan diperiksa setelah loop — tiga tempat yang bisa salah. for-else memadatkan semuanya: else otomatis berarti 'tak pernah ketemu'.",
      },
      {
        q: "while-else berbeda dari for-else: blok else pada while...",
        options: [
          "Jalan hanya jika ada break",
          "Jalan saat kondisi while jadi False secara normal — tapi TIDAK jalan jika keluar lewat break",
          "Tidak pernah jalan",
          "Jalan tiap iterasi",
        ],
        answer: 1,
        why: "Sama-sama butuh 'selesai tanpa break'. Perbedaannya pemicu selesai: for tuntas karena iterable habis; while selesai karena kondisi berubah False. Break pada keduanya membatalkan else.",
      },
    ],
  },
  {
    slug: "py-18",
    tid: "4771",
    title: "Error & Exception Handling",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/4771" },
    untukApa: [
      "Programmu sudah bisa memutuskan dan berulang — sekarang ia harus TANGGUH. User mengetik 'abc' saat diminta angka, file tidak ada, koneksi putus: dunia nyata penuh kegagalan.",
      "Dua pilihan: biarkan program crash, atau tangkap kegagalannya dan tangani dengan rapi. try-except adalah skill yang membedakan script mainan dari tool production.",
    ],
    sections: [
      {
        h: "Dua keluarga error",
        table: {
          head: ["Jenis", "Kapan", "Contoh"],
          rows: [
            ["Syntax error", "Sebelum program jalan — Python tak mengerti perintahmu", "SyntaxError (lupa titik dua), IndentationError (salah menjorok)"],
            ["Exception", "Saat program berjalan — perintah dimengerti tapi operasinya gagal", "NameError, TypeError, ZeroDivisionError, KeyError"],
          ],
        },
        p: [
          "Pesan exception dibuka 'Traceback (most recent call last)' — jejak baris yang dieksekusi sebelum titik error. Baca traceback dari BAWAH ke ATAS: baris terbawah = titik error.",
        ],
        code: 'print(angka)\n# NameError: name \'angka\' is not defined\n\nbukan_angka = "1"\nbukan_angka + 2\n# TypeError: can only concatenate str (not "int") to str',
      },
      {
        h: "try-except: tangkap dan tangani",
        p: [
          "Kode yang berisiko gagal ditaruh di try; respons kegagalannya di except — SPECIFIK per tipe exception:",
        ],
        code: 'z = 0\ntry:\n    print(1 / z)\nexcept ZeroDivisionError:\n    print("Anda tidak bisa membagi angka dengan nilai nol.")\n\n# program lanjut jalan — TIDAK crash',
      },
      {
        h: "Struktur lengkap: else & finally",
        p: [
          "try bisa dilengkapi else (jalan jika TIDAK ada exception) dan finally (jalan SETELAH segalanya — exception atau tidak):",
        ],
        code: 'var_dict = {"rata_rata": "1.0"}\n\ntry:\n    print(f"rata-rata: {var_dict[\'rata_rata\']}")\nexcept KeyError:\n    print("Key tidak ditemukan.")\nexcept TypeError:\n    print("Operasi tidak valid untuk tipe ini.")\nelse:\n    print("Sukses — tidak ada exception.")\nfinally:\n    print("Selalu dieksekusi.")',
        callout:
          "finally adalah tempat pembersihan: tutup file, tutup koneksi, lock release — harus jalan apapun yang terjadi. except spesifik bertingkat lebih baik daripada satu except telanjang (menelan semua error diam-diam = bug terselubung).",
      },
      {
        h: "raise: menolak input dengan sengaja",
        p: [
          "Kamu juga bisa MEMBANGKITKAN exception sendiri untuk menegakkan aturan program — biasanya dikombinasikan dengan if:",
        ],
        code: 'var = -1\nif var < 0:\n    raise ValueError("Bilangan negatif tidak diperbolehkan")\n\n# ValueError: Bilangan negatif tidak diperbolehkan',
      },
    ],
    lab: {
      title: "Kalkulator anti-crash",
      intro: "Ambil kalkulator dari py-11, kini dibuat tangguh: input salah tidak membunuh program.",
      steps: [
        "Buat file kalkulator2.py: minta dua input angka (bisa 'abc' — bukan angka!).",
        "Konversi di dalam try: a = int(input(...)) — tanpa proteksi, 'abc' meledak ValueError.",
        "Bungkus dengan try-except ValueError: print('Input harus angka!') — program lanjut hidup.",
        "Tambah operasi pembagian a / b di try yang sama, dengan except ZeroDivisionError terpisah.",
        "Lengkapi else (cetak hasil saat sukses) dan finally (cetak 'Selesai').",
        "Tes 3 skenario: normal, 'abc' sebagai input, b = 0 — amati cabang mana yang jalan.",
        "Challenge: bungkus semuanya di while True: dengan break di else — program terus meminta sampai input valid (pola retry production!).",
      ],
      hint: "Pola while True + try + break di else adalah standar industri untuk input validation: minta ulang sampai sah, tangani setiap jenis kegagalan dengan pesan yang berbeda.",
    },
    quiz: [
      {
        q: "Apa beda mendasar SyntaxError dan exception?",
        options: [
          "SyntaxError lebih serius sehingga program crash total",
          "SyntaxError terdeteksi sebelum program jalan; exception terjadi saat program berjalan",
          "Exception bisa dicegah, SyntaxError tidak",
          "Tidak ada beda",
        ],
        answer: 1,
        why: "SyntaxError = Python tidak mengerti kalimatmu ( parsing gagal sebelum eksekusi). Exception = kalimat dimengerti tapi operasinya gagal saat runtime (bagi nol, variabel tak ada). try-except menangani yang kedua, bukan yang pertama.",
      },
      {
        q: "Blok finally dieksekusi...",
        options: [
          "Hanya saat tidak ada exception",
          "Hanya saat terjadi exception",
          "Selalu — setelah try/except selesai, apapun hasilnya",
          "Hanya saat ada raise",
        ],
        answer: 2,
        why: "finally menjamin eksekusi apapun kondisinya — sukses (setelah else), atau gagal (setelah except). Makanya ia rumah untuk pembersihan resource: tutup file/koneksi yang tidak boleh tertinggal terbuka.",
      },
      {
        q: "Kenapa `except:` telanjang (tanpa tipe) dianggap praktik buruk?",
        options: [
          "Karena tidak valid secara sintaks",
          "Karena menelan SEMUA error termasuk yang tidak terduga — bug terselubung dan program jalan dengan perilaku tak terduga",
          "Karena lebih lambat",
          "Karena hanya bekerja untuk ValueError",
        ],
        answer: 1,
        why: "except spesifik (ValueError, ZeroDivisionError) berarti kamu TAHU kegagalan apa yang ditangani. except telanjang menangkap semuanya — termasuk typo dan bug — menyembunyikannya balik pesan yang sama. Debug jadi mimpi buruk.",
      },
      {
        q: "raise ValueError('pesan') digunakan untuk...",
        options: [
          "Mencetak pesan error ke layar",
          "Menandai kegagalan dengan sengaja saat aturan program dilanggar — dan menghentikan alur di titik itu",
          "Mengabaikan error",
          "Mengulang kode yang gagal",
        ],
        answer: 1,
        why: "raise membangkitkan exception secara sengaja: cara idiomatik menegakkan precondition (input negatif dilarang, parameter wajib ada). Umumnya dipasangkan dengan if, dan bisa ditangkap try-except di lapisan atas.",
      },
    ],
  },
  {
    slug: "py-19",
    tid: "5017",
    title: "Array & List: Struktur Data Linear",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/5017" },
    untukApa: [
      "Satu variabel = satu nilai. Padahal datamu sering BANYAK: 100 subdomain hasil scan, 1.000 baris log, daftar harga. Struktur data linear menyimpan semuanya dalam satu nama.",
      "Python tidak punya tipe 'array' klasik — ia punya LIST yang lebih fleksibel, plus modul array asli kalau benar-benar butuh. Paham bedanya bikin kamu tidak salah pilih tool.",
    ],
    sections: [
      {
        h: "Struktur data: cara mengatur data",
        p: [
          "Struktur data = cara mengatur dan menyimpan data supaya bisa diakses dan dioperasikan secara efisien. Dengan struktur data, sekumpulan nilai punya HUBUNGAN satu sama lain (urutan, posisi) — bukan sekadar variabel-variabel lepas.",
          "Array adalah struktur data LINEAR: elemen tersusun berurutan berdasarkan indeks. Analogi katanya memang 'sekelompok besar yang terdiri dari beberapa hal' — persis seperti list Python.",
        ],
      },
      {
        h: "Array klasik vs List Python",
        table: {
          head: ["Aspek", "Array klasik", "List Python"],
          rows: [
            ["Tipe elemen", "HARUS homogen (semua satu tipe)", "Bebas — campur int, str, apa pun"],
            ["Dari mana", "Bahasa lain (C, Java) / modul array Python", "Built-in, tanpa import"],
            ["Fleksibilitas", "Kaku tapi hemat memori & cepat", "Sangat fleksibel untuk pemula"],
          ],
        },
        p: [
          "Modul array Python tetap ada kalau butuh array sungguhan (hemat memori untuk data numerik besar):",
        ],
        code: 'import array\n\nx = array.array("i", [1, 2, 3, 4, 5])   # "i" = tipe integer\nprint(x)         # array(\'i\', [1, 2, 3, 4, 5])\n\n# elemen harus SETIPE:\n# array.array("i", [1, 2, "Dicoding"])  -> TypeError!',
      },
      {
        h: "List: pengganti array sehari-hari",
        code: 'x = [1, 2, 3, 4, 5]\nprint(x)   # [1, 2, 3, 4, 5]',
        callout:
          "Kesepakatan praktis: di Python, 99% kasus pakai LIST dan sebut saja 'array' tidak apa-apa. Modul array baru dipakai saat data numerik raksasa (jutaan elemen) dan memori jadi soal serius.",
      },
    ],
    lab: {
      title: "List vs array: buktikan bedanya",
      intro: "Eksperimen kecil yang menjernihkan perbedaan heterogen vs homogen.",
      steps: [
        "Mode interaktif: buat list campur: campur = [1, \"dua\", 3.0, True] — jalan tanpa error.",
        "Cetak id() tiap elemen dengan for — tiap nilai punya alamat sendiri (list menyimpan REFERENSI, bukan menempelkan nilai).",
        "Sekarang array: import array lalu a = array.array(\"i\", [1,2,3]) — sukses.",
        "Coba array.array(\"i\", [1, \"dua\"]) — baca TypeError-nya: elemen array wajib setipe.",
        "Buat list target dari port scan: ports = [21, 22, 80, 443, 8080] dan cetak panjangnya dengan len(ports).",
      ],
      hint: "len() mengembalikan jumlah elemen — akan terus dipakai di setiap pemrosesan array berikutnya.",
    },
    quiz: [
      {
        q: "Bedanya array klasik dan list Python yang paling menonjol?",
        options: [
          "Array hanya bisa diakses dengan for",
          "Elemen array harus bertipe sama (homogen), list bebas campur tipe",
          "List tidak punya indeks",
          "Array lebih lambat dan tidak bisa digunakan",
        ],
        answer: 1,
        why: "Array klasik mendedikasikan memori seragam per elemen — makanya tipenya wajib sama. List Python menyimpan referensi bebas, jadi [1, 'dua', 3.0] sah-sah saja.",
      },
      {
        q: "Kenapa list dipakai sebagai pengganti array di Python sehari-hari?",
        options: [
          "Karena Python melarang modul array",
          "Karena list built-in, fleksibel, dan perilaku aksesnya sama — cukup untuk hampir semua kasus",
          "Karena array tidak punya indeks",
          "Karena list lebih lambat",
        ],
        answer: 1,
        why: "List menyediakan struktur linear berindeks yang sama dengan array, tanpa batasan tipe dan tanpa import. Modul array baru masuk akal untuk data numerik raksasa yang butuh efisiensi memori.",
      },
      {
        q: "array.array(\"i\", [1, 2, 3]) — maksud \"i\" adalah...",
        options: [
          "Nama array",
          "Kode tipe elemen: semua elemen wajib integer",
          "Indeks awal",
          "Panjang maksimum array",
        ],
        answer: 1,
        why: "Modul array menuntut deklarasi tipe di muka: \"i\" = int (signed), ada juga kode lain seperti \"f\" untuk float. Itulah sifat homogen array klasik yang tidak dimiliki list.",
      },
    ],
  },
  {
    slug: "py-20",
    tid: "5020",
    title: "Deklarasi & Akses Array",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/5020" },
    untukApa: [
      "Dua situasi nyata saat membuat kumpulan data: (1) isinya SUDAH TAHU — tulis langsung; (2) isinya BELUM TAHU — siapkan wadah berisi nilai default dulu, isi belakangan.",
      "Akses elemen lewat indeks adalah operasi paling dasar di struktur data — dan jebakannya (indeks mulai 0, batas maksimum n-1) harus nempel sebelum lanjut.",
    ],
    sections: [
      {
        h: "Cara 1: isi langsung",
        p: [
          "Kalau nilai sudah diketahui, deklarasikan sekaligus isiannya. Elemen terurut berindeks 0 sampai n-1:",
        ],
        code: 'var_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]\nprint(var_arr)   # 10 elemen, indeks 0..9',
      },
      {
        h: "Cara 2: nilai default + list comprehension",
        p: [
          "Kalau isinya belum diketahui, buat wadah dengan nilai default — nilai di luar rentang data yang disepakati (misal data valid 1-10, default-nya 0) supaya mudah dikenali 'belum diisi'. Pembuatannya satu baris dengan list comprehension:",
        ],
        code: 'var_arr = [0 for i in range(4)]\nprint(var_arr)   # [0, 0, 0, 0]\n\n# nanti diisi bertahap:\nvar_arr[0] = 1\nvar_arr[1] = 2\nvar_arr[3] = 4\nprint(var_arr)   # [1, 2, 0, 4] -> indeks 2 jelas belum diisi',
        callout:
          "List comprehension `[0 for i in range(4)]` dibaca: 'isi 0, sebanyak 4 kali'. Ini for dalam satu baris — konsep one-liner dari py-13 bertemu nested loop dari py-17.",
      },
      {
        h: "Akses & update via indeks",
        p: [
          "Setiap elemen diakses lewat indeksnya — persis indexing string dari py-10, mulai dari 0:",
        ],
        code: 'var_arr = [9, 8, 7, 6, 5]\n\nprint(var_arr[0])    # 9  (elemen PERTAMA)\nprint(var_arr[4])    # 5  (elemen TERAKHIR = indeks n-1)\nprint(var_arr[-1])   # 5  (indeks negatif: dari belakang)\n\nvar_arr[0] = 99      # update elemen (list MUTABLE — beda dengan string!)\nprint(var_arr)       # [99, 8, 7, 6, 5]',
      },
      {
        p: [
          "Catatan penting: string immutable (py-10), tapi list MUTABLE — elemennya bisa diganti lewat assignment indeks. Ini salah satu alasan list jadi wadah utama data di Python.",
        ],
      },
    ],
    lab: {
      title: "Papan skor 5 pemain",
      intro: "Gabungkan kedua cara deklarasi dalam satu program skor game — dari default sampai terisi.",
      steps: [
        "Buat file skor.py: skor = [0 for i in range(5)] — 5 pemain, default 0.",
        "Cetak awal: print(skor) — semua 0, artinya belum ada yang main.",
        "Isi via indeks: skor[0] = 150, skor[2] = 90, skor[4] = 200.",
        "Cetak per pemain dengan for i in range(len(skor)): print(f'Pemain {i+1}: {skor[i]}').",
        "Amati pemain 2 tetap 0 — terlihat jelas siapa yang belum main (inilah gunanya default).",
        "Coba akses skor[5] — baca IndexError: indeks maksimum adalah len-1 = 4. Ingat selalu: 0..n-1.",
        "Bonus: skor[-1] untuk elemen terakhir tanpa tahu panjangnya.",
      ],
      hint: "IndexError 'list index out of range' = kamu minta indeks di luar 0..n-1. len() selalu bisa dijadikan pengaman sebelum akses.",
    },
    quiz: [
      {
        q: "var_arr = [0 for i in range(4)] menghasilkan...",
        options: ["[0, 0, 0, 0]", "4", "range(0, 4)", "[0, 1, 2, 3]"],
        answer: 0,
        why: "List comprehension mengeksekusi '0' sebanyak 4 kali (range(4) = 0..3) — menghasilkan wadah 4 elemen berisi default 0, siap diisi nilai asli lewat indeks.",
      },
      {
        q: "Kenapa memilih 0 sebagai nilai default ketika data valid berada di rentang 1-10?",
        options: [
          "Karena 0 paling cepat diketik",
          "Karena default harus di LUAR rentang valid — supaya 'belum diisi' mudah dibedakan dari data asli",
          "Karena 0 tidak memakan memori",
          "Karena Python mewajibkan default 0",
        ],
        answer: 1,
        why: "Default di luar rentang (kesepakatan tim) membuat status 'belum diisi' terlihat jelas: [1, 2, 0, 4] pada indeks 2 jelas belum diisi. Kalau default 1, tak bisa dibedakan dari data asli.",
      },
      {
        q: "arr berisi 5 elemen. Indeks yang VALID adalah...",
        options: ["1 sampai 5", "0 sampai 5", "0 sampai 4", "1 sampai 4"],
        answer: 2,
        why: "Indeks array/list selalu 0..n-1. Untuk 5 elemen: 0,1,2,3,4. Mengakses indeks 5 = IndexError karena di luar rentang — meski 5 adalah 'jumlah elemen'.",
      },
      {
        q: "s = \"abc\" dan l = [\"a\", \"b\", \"c\"]. Manakah yang valid?",
        options: [
          "s[0] = \"X\" dan l[0] = \"X\" — dua-duanya valid",
          "s[0] = \"X\" error (immutable), l[0] = \"X\" valid (mutable)",
          "Dua-duanya error",
          "l[0] = \"X\" error, s[0] = \"X\" valid",
        ],
        answer: 1,
        why: "String immutable — item assignment ditolak (py-10). List mutable — elemen bisa diganti lewat indeks. Inilah beda fundamental 'urutan karakter' vs 'wadah referensi', dan alasan list jadi struktur utama.",
      },
    ],
  },
  {
    slug: "py-21",
    tid: "5077",
    title: "Pemrosesan Sekuensial & Mencari Nilai Terbesar",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/5077" },
    untukApa: [
      "Menyimpan data ke array itu baru setengah cerita — nilai program muncul saat kamu MEMPROSESnya: jumlahkan, bandingkan, cari terbesar. Semua pola itu bermula dari satu teknik: pemrosesan sekuensial.",
      "Algoritma two pointers untuk mencari nilai terbesar adalah program algoritmik pertamamu — dan pola yang sama muncul lagi di interview, CP, sampai analisis log.",
    ],
    sections: [
      {
        h: "Pemrosesan sekuensial: satu per satu dari indeks terkecil",
        p: [
          "Pemrosesan sekuensial = memproses setiap elemen array BERURUTAN, dari indeks terkecil (0) sampai terbesar (n-1). Hampir selalu diwujudkan dengan loop:",
        ],
        code: 'var_arr = [1, 2, 3, 4, 5]\n\nfor i in range(len(var_arr)):\n    current = var_arr[i]\n    next_index = i + 1\n    if next_index < len(var_arr):\n        next_element = var_arr[next_index]\n    else:\n        next_element = None   # elemen terakhir: tidak ada berikutnya\n    print(f"Current: {current}, next: {next_element}")',
      },
      {
        p: [
          "Perhatikan penjagaan `if next_index < len(var_arr)` — elemen terakhir tidak punya suksesor, dan tanpa pengaman itu kamu kena IndexError. Aturan mainnya: elemen pertama selalu indeks 0, berhenti saat indeks terbesar tercapai, array tak boleh kosong.",
        ],
      },
      {
        h: "Dua gaya loop array",
        p: [
          "for i in range(len(arr)) memberi INDEKS (butuh saat kamu mengakses arr[i+1] atau mengubah arr[i]). for x in arr memberi NILAI langsung (cukup saat hanya membaca). Gaya sekuensial klasik pakai indeks karena pola current/next butuh posisi.",
        ],
      },
      {
        h: "Two pointers: cari nilai terbesar",
        p: [
          "Algoritma = langkah terstruktur menyelesaikan masalah. Untuk mencari nilai terbesar, gunakan dua penanda: left (kandidat terbesar sejauh ini) dan right (pembanding berikutnya):",
        ],
        code: 'var_arr = [1, 7, 2, 89, 3]\n\nleft = var_arr[0]          # kandidat terbesar\nfor i in range(1, len(var_arr)):\n    right = var_arr[i]     # pembanding berikutnya\n    if right > left:\n        left = right       # kandidat baru\n\nprint(left)   # 89',
      },
      {
        p: [
          "Jalannya: 1 vs 7 → left=7; 7 vs 2 → tetap; 7 vs 89 → left=89; 89 vs 3 → tetap. Sekali lewat (satu pass), terbesar pasti ketemu. Left selalu mengklaim 'terbesar sejauh ini'; right berjalan membandingkan satu per satu.",
        ],
        callout:
          "Pola kandidat-terbaik (best-so-far) ini muncul di mana-mana: cari max, min, string terpanjang, skor tertinggi. Strukturnya selalu: kandidat = elemen pertama, loop pembanding, update kandidat jika ada yang lebih unggul.",
      },
    ],
    lab: {
      title: "Analyzer log mini",
      intro: "Terapkan sekuensial + best-so-far pada data yang mirip pekerjaan nyata: durasi request per baris.",
      steps: [
        "Buat file log.py: durasi = [120, 340, 90, 512, 76, 201] (milidetik, simulasi).",
        "Sekuensial dulu: cetak tiap elemen bersama elemen berikutnya (current/next) — jangan lupa pengaman indeks terakhir.",
        "Total: total = 0 lalu loop menambahkan tiap elemen (accumulator).",
        "Terbesar: terapkan two pointers — left mulai durasi[0], bandingkan dari indeks 1.",
        "Terkecil: ubah satu tanda — if right < left. Amati betapa sedikit yang berubah.",
        "Rata-rata: total / len(durasi) — cetak dengan f-string dan pembulatan (round()).",
        "Tantangan: cari POSISI (indeks) request terlambat — simpan i saat left di-update, bukan cuma nilainya.",
      ],
      hint: "Untuk menyimpan indeks: if right > left: left = right; idx_terbesar = i. Nilai dan posisi sama-sama berguna — log analisis nyata selalu butuh 'di mana'.",
    },
    quiz: [
      {
        q: "Kenapa perlu pengaman `if next_index < len(var_arr)` pada pemrosesan sekuensial current/next?",
        options: [
          "Supaya kode terlihat profesional",
          "Karena elemen terakhir tidak punya suksesor — tanpa pengaman, akses arr[i+1] di elemen terakhir = IndexError",
          "Karena range() tidak boleh dipakai",
          "Supaya loop lebih cepat",
        ],
        answer: 1,
        why: "Saat i adalah indeks terakhir (n-1), next_index = n berada di luar rentang valid 0..n-1. Pengaman mengganti next dengan None — perilaku eksplisit, bukan crash.",
      },
      {
        q: "Pada algoritma two pointers pencarian terbesar, pointer left berperan...",
        options: [
          "Menunjuk elemen pertama selamanya",
          "Menyimpan kandidat terbesar sejauh ini — diperbarui tiap kali right lebih besar",
          "Menghitung jumlah elemen",
          "Menyimpan indeks terkecil",
        ],
        answer: 1,
        why: "Left = best-so-far: mulai dari elemen pertama, lalu selalu berpindah saat ada elemen yang lebih besar. Setelah satu pass penuh, left pasti memegang nilai terbesar.",
      },
      {
        q: "Pemrosesan sekuensial mengharuskan...",
        options: [
          "Array diurutkan dulu",
          "Elemen diproses berurutan dari indeks terkecil (0) ke terbesar (n-1), biasanya lewat loop",
          "Semua elemen diproses bersamaan",
          "Hanya elemen genap diproses",
        ],
        answer: 1,
        why: "Sekuensial = berurutan sesuai indeks, dari 0 sampai n-1 — konsisten dengan aksi sekuensial (py-05) yang diterapkan pada struktur data. Tidak perlu terurut nilainya; yang berurutan adalah PROSESNYA.",
      },
      {
        q: "Untuk mengubah elemen array saat loop, gaya loop yang paling tepat adalah...",
        options: [
          "for x in arr: (hanya memberi nilai)",
          "for i in range(len(arr)): (memberi indeks, bisa tulis arr[i] = ...)",
          "while True: selalu",
          "for tidak bisa mengubah elemen",
        ],
        answer: 1,
        why: "Gaya indeks memberi posisi sehingga arr[i] bisa DITULIS ulang. for x in arr hanya membaca salinan nilai — mengubah x tidak mengubah array. Pilih gaya sesuai kebutuhan: baca = nilai, ubah/posisi = indeks.",
      },
    ],
  },
  {
    slug: "py-22",
    tid: "6432",
    title: "Matriks: Array Dua Dimensi",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/6432" },
    untukApa: [
      "Array 1D menyimpan garis data. Tapi spreadsheet, pixel gambar, jadwal kelas, dan grid game semuanya BERBENTUK TABEL — baris dan kolom. Strukturnya: matriks.",
      "Matriks adalah pintu menuju data science (dataset = tabel) dan game/grid. Nested loop dari py-17 akhirnya ketemu guna sebenarnya di sini.",
    ],
    sections: [
      {
        h: "Dari matematika ke pemrograman",
        p: [
          "Di matematika, matriks = kumpulan bilangan tersusun baris dan kolom. Contoh jenisnya: matriks pengukuran (float, elemen (i,j) = hasil ukur di titik koordinat) dan matriks satuan (0/1, integer).",
          "Di pemrograman: matriks = tabel 2 dimensi, diimplementasikan dengan NESTED LIST — list di dalam list:",
        ],
        code: 'matriks = [[1, 2, 3],\n           [4, 5, 6],\n           [7, 8, 9]]\n\n# kurung luar = matriks; tiap list dalam = satu BARIS',
      },
      {
        h: "Indeks ganda: [baris][kolom]",
        p: [
          "Akses elemen matriks butuh DUA indeks: pertama pilih baris, kedua pilih kolom dalam baris itu:",
        ],
        code: 'matriks = [[1, 2, 3],\n           [4, 5, 6]]\n\nprint(matriks[0])      # [1, 2, 3]  -> baris pertama (sebuah list!)\nprint(matriks[0][0])   # 1          -> baris 0, kolom 0\nprint(matriks[1][2])   # 6          -> baris 1, kolom 2\nprint(len(matriks))        # 2 (jumlah baris)\nprint(len(matriks[0]))     # 3 (jumlah kolom)',
        callout:
          "Di matematika baris dimulai dari 1; di pemrograman indeks mulai 0. Elemen 'baris 2 kolom 3' versi matematika = matriks[1][2] versi Python. Salah hitung satu = akses salah seluruhnya.",
      },
      {
        h: "Kenapa nested list, bukan tipe khusus?",
        p: [
          "Python tidak punya tipe 'matriks' bawaan — ia hanya menyusun list di dalam list, karena list bersifat mutable dan bisa menampung apa pun (termasuk list lain). Semua operasi matriks (jumlah, kali, transpose) nanti dibangun di atas nested loop yang sudah kamu kuasai.",
        ],
      },
    ],
    lab: {
      title: "Peta dungeon 3x3",
      intro: "Matriks sebagai peta grid — konsep yang persis dipakai game dan image processing.",
      steps: [
        "Buat file peta.py: peta = [[1,0,0],[0,1,0],[0,0,1]] — 1 = player, 0 = ruang kosong.",
        "Cetak seluruh peta: for baris in peta: print(baris) — lihat bentuk gridnya.",
        "Cetak tiap sel dengan label: for i in range(len(peta)): for j in range(len(peta[0])): print(f'({i},{j}) = {peta[i][j]}').",
        "Pindahkan player: cari sel bernilai 1, ubah jadi 0, lalu set peta[2][0] = 1 (list mutable!).",
        "Cetak ulang — player pindah grid.",
        "Hitung jarak: berapa sel terjauh dari (0,0)? (jawab: (2,2) — butuh 4 langkah).",
      ],
      hint: "Langkah 4 melatih kombinasi mutasi + pencarian: loop sel, if peta[i][j] == 1, simpan posisinya, lalu nol-kan — pola 'temukan lalu ubah' yang dipakai di mana-mana.",
    },
    quiz: [
      {
        q: "matriks = [[1,2,3],[4,5,6]] — berapa jumlah baris dan kolomnya?",
        options: ["2 baris, 3 kolom", "3 baris, 2 kolom", "6 baris, 1 kolom", "1 baris, 6 kolom"],
        answer: 0,
        why: "Panjang list luar = jumlah BARIS (2), panjang tiap list dalam = jumlah KOLOM (3). Bentuknya NxM = 2x3. Matriks diimplementasikan sebagai list of row-lists.",
      },
      {
        q: "Cara benar mengakses elemen '6' pada [[1,2,3],[4,5,6]] adalah...",
        options: ["matriks[2][1]", "matriks[1][2]", "matriks[1,2]", "matriks(1)(2)"],
        answer: 1,
        why: "Indeks ganda berurutan: [1] pilih baris kedua ([4,5,6]), lalu [2] pilih elemen ketiga di baris itu = 6. Sintaks koma matriks[1,2] adalah NumPy, bukan list murni.",
      },
      {
        q: "Baris ke-2 kolom ke-3 dalam notasi matematika (mulai dari 1) setara dengan indeks Python...",
        options: ["[2][3]", "[1][2]", "[3][2]", "[1][3]"],
        answer: 1,
        why: "Konversi 1-based (matematika) ke 0-based (Python): kurangi satu tiap dimensi. Baris 2 → indeks 1, kolom 3 → indeks 2. Salah konversi ini sumber bug paling umum saat campur sumber materi.",
      },
      {
        q: "Mengapa matriks di Python diimplementasikan sebagai nested list?",
        options: [
          "Karena Python tidak punya tipe matriks bawaan dan list mutable bisa menampung list lain",
          "Karena nested list lebih cepat dari tipe matriks",
          "Karena matematika mewajibkannya",
          "Karena nested list tidak butuh indeks",
        ],
        answer: 0,
        why: "List adalah struktur universal yang mutable dan heterogen — list di dalam list gratis didapat tanpa tipe baru. Semua perilaku matriks (akses [i][j], mutasi, loop 2D) dibangun di atasnya; NumPy nanti menyediakan versi teroptimasi.",
      },
    ],
  },
  {
    slug: "py-23",
    tid: "6435",
    title: "Implementasi Matriks: Deklarasi & Akses",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/6435" },
    untukApa: [
      "Sama seperti array 1D: kadang isinya sudah tahu (tulis langsung), kadang belum (siapkan grid default dulu). Membuat grid NxM kosong dengan benar adalah skill yang langsung dipakai di setiap operasi matriks.",
      "Ada jebakan terkenal di sini: cara mem-buat default yang SALAH membuat semua baris jadi satu objek yang sama. Ini salah satu bug Python paling legendaris.",
    ],
    sections: [
      {
        h: "Cara 1: deklarasi + isi langsung",
        p: [
          "Kalau nilainya diketahui, tulis langsung — contoh ini matriks satuan 5x5 (elemen 0 dan 1):",
        ],
        code: 'matriks = [[1, 0, 0, 0, 0],\n           [0, 1, 0, 0, 0],\n           [0, 0, 1, 0, 0],\n           [0, 0, 0, 1, 0],\n           [0, 0, 0, 0, 1]]\nprint(matriks)',
      },
      {
        h: "Cara 2: default dengan nested comprehension",
        p: [
          "Untuk grid NxM kosong, pakai nested comprehension: for dalam membuat SATU BARIS, for luar menggandakan baris sebanyak n:",
        ],
        code: 'n, m = 3, 4   # 3 baris, 4 kolom\n\nmatriks = [[0 for j in range(m)] for i in range(n)]\nprint(matriks)\n# [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]',
      },
      {
        p: [
          "Baca dari dalam ke luar: [0 for j in range(m)] = satu baris berisi m nol; for i in range(n) = ulang n kali. Update elemen persis seperti 1D, tinggal dua indeks:",
        ],
        code: 'matriks[1][2] = 7\nprint(matriks[1])   # [0, 0, 7, 0]',
      },
      {
        h: "Jebakan legendaris: [[0]*m]*n",
        p: [
          "Cara singkat [[0]*m]*n TERLIHAT benar tapi berbahaya: ia menduplikasi REFERENSI baris yang sama — ubah satu sel, seluruh baris ikut berubah:",
        ],
        code: 'salah = [[0]*4]*3\nsalah[0][0] = 9\nprint(salah)\n# [[9, 0, 0, 0], [9, 0, 0, 0], [9, 0, 0, 0]]  <- SEMUA baris berubah!\n\nbenar = [[0 for j in range(4)] for i in range(3)]\nbenar[0][0] = 9\nprint(benar)\n# [[9, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]  <- hanya baris 0',
        callout:
          "Karena * pada list mereplikasi referensi (ingat replikasi di py-08), ketiga baris adalah objek YANG SAMA. List comprehension membuat baris BARU tiap iterasi — itulah cara yang aman.",
      },
    ],
    lab: {
      title: "Bukti jebakan + papan catur 4x4",
      intro: "Reproduksi bug legendaris lalu bangun grid yang benar — pelajaran yang tidak akan pernah dilupakan.",
      steps: [
        "Mode interaktif: salah = [[0]*3]*3 lalu salah[0][0] = 9 — cetak, amati semua baris berubah.",
        "Buktikan penyebabnya: salah[0] is salah[1] — hasil True (objek yang sama!).",
        "Sekarang benar: benar = [[0 for j in range(3)] for i in range(3)], ubah benar[0][0] = 9 — hanya satu sel.",
        "Buat file papan.py: papan 4x4 default '.', isi papan[1][1] = 'P' (player) dan papan[3][2] = 'X' (musuh).",
        "Cetak papan baris per baris dengan join: for baris in papan: print(' '.join(baris)) — hasilnya grid rapi.",
        "Hitung total sel: rows*cols dari len() — tanpa hardcode angka.",
      ],
      hint: "Operator `is` membandingkan IDENTITAS objek (alamat memori), bukan nilai. True pada salah[0] is salah[1] adalah bukti langsung replikasi referensi oleh *.",
    },
    quiz: [
      {
        q: "Bentuk nested comprehension yang benar untuk grid 3 baris x 4 kolom default 0:",
        options: [
          "[[0 for j in range(4)] for i in range(3)]",
          "[[0] * 4] * 3",
          "[0 for j in range(3)] for i in range(4)",
          "[[0 for i in range(3)] for j in range(4)]",
        ],
        answer: 0,
        why: "Baris = for dalam dengan range kolom (4); pengulangan baris = for luar dengan range baris (3). Opsi B replikasi referensi (bug terkenal); C sintaks salah; D terbalik ukurannya (3 kolom, 4 baris).",
      },
      {
        q: "grid = [[0]*4]*3 lalu grid[0][0] = 9. Apa yang terjadi?",
        options: [
          "Hanya grid[0][0] berubah",
          "Seluruh baris pertama berubah",
          "Ketiga baris berubah — ketiganya referensi ke objek list yang sama",
          "Error karena list tidak bisa diubah",
        ],
        answer: 2,
        why: "* pada list mereplikasi referensi, bukan menyalin isi. Ketiga 'baris' adalah SATU objek yang sama — mutasi lewat pintu mana pun terlihat di semua baris. Solusi: list comprehension.",
      },
      {
        q: "matriks berisi n baris. Ekspresi yang menghitung jumlah KOLOM adalah...",
        options: ["len(matriks)", "len(matriks[0])", "len(matriks[n])", "matriks.cols"],
        answer: 1,
        why: "matriks[0] adalah baris pertama (sebuah list), dan len-nya = jumlah kolom. len(matriks) memberi jumlah baris. Asumsi wajar: semua baris sama panjang (matriks regular).",
      },
    ],
  },
  {
    slug: "py-24",
    tid: "10737",
    title: "Operasi Matriks: Konstanta, Total & Transpose",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/10737" },
    untukApa: [
      "Operasi matriks adalah tempat semua skillmu bertemu: nested loop (py-17), indexing ganda (py-22), dan grid default (py-23). Kalau tiga-tiganya lancar, lesson ini terasa seperti review.",
      "Skala semua elemen, jumlahkan grid, dan transpose adalah operasi nyata: image filter, skor matiks, dan persiapan data ML semuanya bentuk dari ini.",
    ],
    sections: [
      {
        h: "Operasi 1 matriks vs 2 matriks",
        p: [
          "Operasi matriks terbagi dua keluarga: satu matriks (total semua elemen, kali konstanta, transpose, determinan) dan dua matriks (penjumlahan, perkalian). Hari ini fokus keluarga pertama — semuanya dibangun dari nested loop:",
        ],
        code: 'var_mat = [[5, 0],\n           [1, -2]]\n\ndef_mat = [[0 for j in range(2)] for i in range(2)]   # wadah hasil\n\nfor i in range(len(var_mat)):          # baris\n    for j in range(len(var_mat[0])):   # kolom\n        def_mat[i][j] = var_mat[i][j] * 2\n\nprint(def_mat)   # [[10, 0], [2, -4]]',
      },
      {
        p: [
          "Pola tiga langkah yang berulang: (1) wadah hasil ukuran sama, (2) loop i untuk baris, (3) loop j untuk kolom — olah var_mat[i][j], tulis ke def_mat[i][j].",
        ],
      },
      {
        h: "Total semua elemen (accumulator)",
        p: [
          "Total = pola akumulator dari py-21 yang dinaikkan satu dimensi — total dideklarasikan SEBELUM loop, ditambah di loop paling dalam:",
        ],
        code: 'var_mat = [[5, 0], [1, -2]]\ntotal = 0\nfor i in range(len(var_mat)):\n    for j in range(len(var_mat[0])):\n        total += var_mat[i][j]\n\nprint(total)   # 4',
      },
      {
        h: "Transpose: baris jadi kolom",
        p: [
          "Transpose membalik dimensi: elemen [i][j] pindah ke [j][i]. Baris pertama menjadi kolom pertama — berguna di statistik dan persiapan data:",
        ],
        code: 'var_mat = [[5, 0],\n           [1, -2]]\n\ntrans = [[0 for j in range(len(var_mat))] for i in range(len(var_mat[0]))]\n\nfor i in range(len(var_mat)):\n    for j in range(len(var_mat[0])):\n        trans[j][i] = var_mat[i][j]   # PERHATIKAN: indeks dibalik\n\nprint(trans)   # [[5, 1], [0, -2]]',
        callout:
          "Kunci transpose cuma satu baris: trans[j][i] = var_mat[i][j] — posisi tujuan terbalik dari sumber. Semua operasi matriks lain (penjumlahan dua matriks, perkalian) mengikuti pola loop yang sama dengan rumus berbeda.",
      },
    ],
    lab: {
      title: "Skor tim + transpose papan",
      intro: "Dua operasi dalam konteks nyata: statistik skor dan pembalikan grid.",
      steps: [
        "Buat file skor.py: skor = [[80, 90, 70], [60, 85, 95]] — baris = tim, kolom = ronde.",
        "Total semua: pakai pola accumulator — cetak hasilnya (480).",
        "Rata-rata per tim: for i, hitung sum baris / panjang baris — cetak per tim.",
        "Skor tertinggi: best-so-far dua dimensi — simpan nilai DAN posisinya (i, j).",
        "Buat file transpose.py: transpose matriks skor — baris jadi ronde, kolom jadi tim.",
        "Cek makna: setelah transpose, baris pertama = skor SEMUA tim di ronde pertama — data yang sama, sudut pandang baru.",
      ],
      hint: "Rata-rata per tim cukup satu loop (i) karena sum per baris: sum(skor[i]) / len(skor[i]). Fungsi sum() bawaan menggantikan accumulator manual — boleh dipakai setelah kamu paham cara kerjanya.",
    },
    quiz: [
      {
        q: "Tiga langkah standar operasi 'satu matriks menghasilkan matriks baru' adalah...",
        options: [
          "Import library, deklarasi, print",
          "Buat wadah hasil ukuran sama -> loop baris (i) -> loop kolom (j), olah sumber tulis ke hasil",
          "Loop saja tanpa wadah hasil",
          "Konversi ke string dulu",
        ],
        answer: 1,
        why: "Wadah hasil (grid default dari py-23) menampung output; nested loop mengunjungi tiap sel; rumus operasi menentukan isi. Pola ini identik untuk kali-konstanta, penjumlahan matriks, dan transpose.",
      },
      {
        q: "var_mat = [[5,0],[1,-2]] dikali konstanta 2 menghasilkan...",
        options: ["[[10, 0], [2, -4]]", "[[7, 2], [3, 0]]", "[[10, 0, 2, -4]]", "Error"],
        answer: 0,
        why: "Kali konstanta mengalikan SETIAP elemen: 2x5=10, 2x0=0, 2x1=2, 2x(-2)=-4 — ukuran matriks tetap 2x2. Bandingkan dengan penjumlahan dua matriks yang mengoperasikan pasangan elemen seposisi.",
      },
      {
        q: "Inti dari transpose adalah...",
        options: [
          "Mengalikan semua elemen dengan -1",
          "Menukar posisi baris dan kolom: elemen [i][j] pindah ke [j][i]",
          "Mengurutkan elemen dari kecil ke besar",
          "Menghapus kolom terakhir",
        ],
        answer: 1,
        why: "Transpose = refleksi terhadap diagonal: trans[j][i] = matriks[i][j]. Baris jadi kolom dan sebaliknya; matriks 2x3 menjadi 3x2. Satu baris pembeda dari loop biasa: indeks tujuan dibalik.",
      },
      {
        q: "total += var_mat[i][j] ditaruh di loop PALING DALAM karena...",
        options: [
          "Agar kode lebih pendek",
          "Karena ia harus menjangkau SETIAP sel — loop dalam berjalan paling sering (n_baris × n_kolom kali)",
          "Karena Python mewajibkannya di sana",
          "Supaya total tidak berubah",
        ],
        answer: 1,
        why: "Akumulator harus dieksekusi sekali per sel. Loop paling dalam adalah satu-satunya tempat yang dieksekusi n_baris × n_kolom kali — taruh di luar, total hanya menjumlah barisnya saja.",
      },
    ],
  },
];
