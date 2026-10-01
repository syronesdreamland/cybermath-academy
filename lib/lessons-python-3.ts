import type { Lesson } from "./lesson-types";

// ============================================================
// Track Python — batch 6-7 (Fase 11 OOP + Fase 12 Profesional): 7 lesson
// Rewrite internal dari materi Dicoding 86 (parafrase + contoh sendiri,
// bukan salinan). Link sumber asli tetap dicantumkan per lesson.
// ============================================================

const SRC = "Dicoding — Memulai Pemrograman dengan Python";

export const PYTHON_LESSONS_3: Lesson[] = [
  {
    slug: "py-33",
    tid: "33003",
    title: "Class, Object, Method & Atribut",
    minutes: 20,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33003" },
    untukApa: [
      "Setelah fungsi, langkah berikutnya mengelompokkan data + perilaku jadi satu kesatuan: inilah class. Semua framework besar (Django, bot library) dibangun dengan pola ini.",
      "Kamu sudah menyentuhnya tanpa sadar: 'dicoding'.upper() adalah method dari objek string. Sekarang kamu buat punyamu sendiri.",
    ],
    sections: [
      {
        h: "Class = cetakan, object = hasil cetakannya",
        p: [
          "Class adalah blueprint: definisi atribut (identitas) dan method (perilaku) yang dimiliki. Object (instance) adalah perwujudan nyata dari cetakan itu — satu class, banyak objek.",
          "Analogi: class Mobil mendefinisikan 'punya warna, bisa maju'. mobil_1 dan mobil_2 adalah dua objek dari cetakan itu, masing-masing boleh beda warna.",
        ],
        code: 'class Mobil:\n    # atribut kelas (bawaan semua instance)\n    warna = "Merah"\n\nmobil_1 = Mobil()          # instansiasi\nprint(mobil_1.warna)       # Merah\n\nmobil_1.warna = "Biru"     # ubah atribut objek ini\nprint(mobil_1.warna)       # Biru',
      },
      {
        h: "Atribut kelas vs atribut instance",
        p: [
          "Atribut KELAS melekat pada class: nilainya sama untuk semua objek, dan mengubahnya lewat class memengaruhi semua instance.",
          "Atribut INSTANCE melekat pada objek tertentu — dibuat lewat constructor __init__ lewat self. Ini yang dipakai umumnya.",
        ],
        code: 'class Mobil:\n    def __init__(self, warna, merek, kecepatan):\n        self.warna = warna        # atribut instance\n        self.merek = merek\n        self.kecepatan = kecepatan\n\nmobil_1 = Mobil("Merah", "DicodingCar", 160)\nprint(mobil_1.warna, mobil_1.merek, mobil_1.kecepatan)',
        callout: "__init__ adalah constructor: otomatis dipanggil saat Mobil(...) dieksekusi. self merujuk objek yang sedang dibuat — selalu parameter pertama.",
      },
      {
        h: "Tiga jenis method",
        list: [
          "Object method: punya parameter self — beroperasi pada satu objek (tambah_kecepatan(self)).",
          "Static method: dekorator @staticmethod, tanpa self — fungsi biasa yang kebetulan tinggal di class.",
          "Class method: dekorator @classmethod, parameter cls merujuk class-nya, bukan objek.",
        ],
        code: 'class Mobil:\n    def __init__(self, merek):\n        self.merek = merek\n\n    def tampil(self):                 # object method\n        print("Mobil", self.merek)\n\n    @staticmethod\n    def intro():                      # static method\n        print("Ini kelas Mobil")\n\n    @classmethod\n    def keterangan(cls):              # class method\n        print("Dibuat dari", cls.__name__)\n\nMobil.intro()\nMobil.keterangan()\nMobil("DicodingCar").tampil()',
      },
      {
        h: "Peta istilah OOP",
        table: {
          head: ["Istilah", "Arti", "Contoh"],
          rows: [
            ["Class", "Cetakan/blueprint", "class Mobil:"],
            ["Object / instance", "Perwujudan class", "mobil_1 = Mobil()"],
            ["Atribut", "Variabel identitas objek", "self.warna"],
            ["Method", "Fungsi perilaku objek", "def tambah_kecepatan(self)"],
            ["Instansiasi", "Proses membuat objek dari class", "Mobil(...)"],
          ],
        },
      },
    ],
    lab: {
      title: "Class AkunUser pertamamu",
      intro: "Bangun class yang menyimpan data + perilaku sekaligus — pola yang dipakai semua aplikasi nyata.",
      steps: [
        "Buat class AkunUser dengan __init__(self, username, level) — simpan keduanya ke self.",
        "Tambah atribut kelas platform = 'CyberMath' di dalam class, cek dari dua instance: nilainya sama.",
        "Method naik_level(self): menambah self.level += 1 dan mengembalikan level baru.",
        "Method deskripsi(self): mengembalikan f-string '{self.username} | level {self.level}'.",
        "Buat dua user, naikkan level yang satu dua kali, cetak deskripsi keduanya — buktikan atribut instance saling lepas.",
        "Tambah @staticmethod panduan() yang mencetak aturan singkat — panggil lewat class tanpa membuat objek.",
      ],
      hint: "Lupa self di definisi method = error 'takes 0 positional arguments but 1 was given' — Python mengirim objek otomatis sebagai argumen pertama.",
    },
    quiz: [
      {
        q: "__init__ dalam class Python adalah...",
        options: [
          "Method yang dipanggil manual saat dibutuhkan",
          "Constructor — otomatis dipanggil saat objek dibuat",
          "Nama khusus untuk menghapus objek",
          "Dekorator untuk atribut kelas",
        ],
        answer: 1,
        why: "__init__ dijalankan otomatis setiap class di-instansiasi — tempat menyiapkan atribut awal lewat self.",
      },
      {
        q: "Bedanya atribut kelas dan atribut instance:",
        options: [
          "Atribut kelas hanya bisa angka",
          "Atribut kelas menjadi bawaan semua instance; atribut instance milik satu objek lewat __init__/self",
          "Atribut instance wajib dideklarasikan di luar class",
          "Tidak ada bedanya",
        ],
        answer: 1,
        why: "Atribut kelas = default bersama (ubah lewat class memengaruhi semua). Atribut instance = data per-objek yang didefinisikan lewat self di constructor.",
      },
      {
        q: "Ciri method yang beroperasi pada satu objek:",
        options: [
          "Pakai dekorator @staticmethod",
          "Parameter pertamanya self yang merujuk objek saat ini",
          "Parameter pertamanya cls",
          "Tidak punya parameter sama sekali",
        ],
        answer: 1,
        why: "Object method menerima self — objek pemanggil — sehingga bisa membaca/mengubah atribut objek itu. cls (classmethod) merujuk class, bukan objek.",
      },
      {
        q: "mobil_1 = Mobil(); Mobil.warna = 'Hitam'. Apa yang terjadi pada mobil_1.warna (yang belum di-override)?",
        options: [
          "Tetap nilai semula selamanya",
          "Ikut berubah jadi 'Hitam' — atribut kelas dibaca ulang oleh instance",
          "Error",
          "Menjadi None",
        ],
        answer: 1,
        why: "Atribut kelas diubah lewat class akan terlihat oleh semua instance yang belum menimpanya dengan atribut instance sendiri. Inilah kelemahan/kekuatan atribut kelas.",
      },
    ],
  },
  {
    slug: "py-34",
    tid: "33008",
    title: "Inheritance: Pewarisan, Override & super()",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33008" },
    untukApa: [
      "Copy-paste class untuk menambah satu fitur = anti-pattern. Inheritance membuat class baru mewarisi seluruh fitur class lama, lalu tinggal menambah/mengubah yang beda.",
      "Ini mekanisme yang dipakai semua framework: kamu mewarisi class bawaan dan meng-override bagian yang kamu butuhkan.",
    ],
    sections: [
      {
        h: "Mekanisme pewarisan",
        p: ["Tulis class induk di dalam kurung: class MobilSport(Mobil). Semua atribut dan method Mobil otomatis dimiliki MobilSport — termasuk __init__-nya."],
        code: 'class Mobil:\n    def __init__(self, warna, merek, kecepatan):\n        self.warna = warna\n        self.merek = merek\n        self.kecepatan = kecepatan\n\n    def tambah_kecepatan(self):\n        self.kecepatan += 10\n\nclass MobilSport(Mobil):        # mewarisi Mobil\n    def turbo(self):            # method BARU\n        self.kecepatan += 50\n\nsport = MobilSport("Hitam", "SportCar", 160)\nsport.tambah_kecepatan()   # method WARISAN: 170\nsport.turbo()              # method SENDIRI: 220\nprint(sport.kecepatan)',
      },
      {
        h: "Override: menimpa method warisan",
        p: [
          "Method dengan nama sama di class turunan MENIMPA versi induk — Python mencari nama method di class turunan dulu, baru ke induk.",
          "Override tidak mengubah class induk: objek Mobil biasa tetap memakai method versi lamanya.",
        ],
        code: 'class MobilSport(Mobil):\n    def tambah_kecepatan(self):   # menimpa versi induk\n        self.kecepatan += 20      # induk: +10, turunan: +20\n\nsport = MobilSport("Hitam", "S", 160)\nsport.tambah_kecepatan()\nprint(sport.kecepatan)   # 180 (bukan 170)',
      },
      {
        h: "super(): pakai versi induk, bukan menulis ulang",
        p: ["super() mengakses class induk dari dalam method turunan — dipakai supaya tidak menduplikasi kode induk: jalankan logika induk, lalu tambahkan perilakumu."],
        code: 'class MobilSport(Mobil):\n    def tambah_kecepatan(self):\n        super().tambah_kecepatan()     # jalankan versi induk (+10)\n        print("Kecepatan meningkat! Hati-hati!")\n\nsport = MobilSport("Hitam", "S", 160)\nsport.tambah_kecepatan()\n# Kecepatan meningkat! Hati-hati!\nprint(sport.kecepatan)   # 170',
        callout: "Pola bumi-langit: override + super() = 'lakukan apa yang induk lakukan, TAMBAH sesuatu'. Tanpa super() = 'ganti total perilaku induk'.",
      },
    ],
    lab: {
      title: "Hierarki scanner",
      intro: "Bangun class induk Scanner dan turunan WebScanner — pola nyata tooling security.",
      steps: [
        "class Scanner dengan __init__(self, target) dan method lapor(self) yang mengembalikan f'Scan {self.target}: selesai'.",
        "class WebScanner(Scanner) menambah atribut port lewat __init__ sendiri — WAJIB memanggil super().__init__(target) dulu.",
        "Override lapor(self): panggil super().lapor(), tambahkan ' (web)' pada hasilnya.",
        "Uji: Scanner('10.0.0.1').lapor() vs WebScanner('10.0.0.2', 443).lapor() — bandingkan hasilnya.",
        "Buktikan induk tidak berubah: buat Scanner biasa dan panggil lapor() — teksnya tetap versi lama.",
      ],
      hint: "Kalau turunan mendefinisikan __init__ baru, constructor induk TIDAK otomatis jalan — tanpa super().__init__(), atribut warisan (self.target) tidak akan pernah dibuat.",
    },
    quiz: [
      {
        q: "class B(A) artinya...",
        options: [
          "B adalah induk dari A",
          "B mewarisi A — B otomatis punya atribut & method A",
          "B mengganti A di memori",
          "A harus didefinisikan di dalam B",
        ],
        answer: 1,
        why: "Class dalam kurung adalah INDUKNYA. B mewarisi semua fitur A dan bebas menambah/menimpa (override) method.",
      },
      {
        q: "Kapan method turunan dipilih daripada method induk?",
        options: [
          "Selalu method induk yang dipakai",
          "Python mencari nama method di class turunan dulu; kalau tidak ada, baru ke induk",
          "Dipilih acak",
          "Method induk selalu menang",
        ],
        answer: 1,
        why: "Resolusi method berjalan dari turunan ke induk. Method dengan nama sama di turunan = override; induk tidak terpengaruh untuk objek lain.",
      },
      {
        q: "Fungsi super() dalam override:",
        options: [
          "Menghapus method induk",
          "Memanggil implementasi induk dari dalam method turunan — hindari duplikasi kode",
          "Membuat objek baru dari induk",
          "Mengunci method agar tidak di-override",
        ],
        answer: 1,
        why: "super() adalah jembatan ke class induk: jalankan dulu logika warisan, lalu tambahkan perilaku baru — atau sebaliknya.",
      },
      {
        q: "class WebScanner(Scanner) mendefinisikan __init__ sendiri tapi TIDAK memanggil super().__init__(). Konsekuensinya?",
        options: [
          "Tidak apa-apa, semua tetap jalan",
          "Atribut yang diset constructor induk (mis. self.target) tidak pernah terbentuk → AttributeError saat dipakai",
          "Python otomatis memanggil induknya",
          "Error saat definisi class",
        ],
        answer: 1,
        why: "Menimpa __init__ tanpa memanggil super() berarti constructor induk dilewati. Error baru muncul saat atribut warisan diakses — bukan saat class didefinisikan.",
      },
    ],
  },
  {
    slug: "py-35",
    tid: "33013",
    title: "Rangkuman OOP: Checkpoint",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33013" },
    untukApa: [
      "Gerbang penutup OOP: kalau checkpoint ini lancar, kamu siap membaca kode framework mana pun — karena semua mereka hanyalah class, inheritance, dan override berulang.",
      "Kalau gagap, labelnya jelas: ulang py-33 (class) atau py-34 (inheritance), bukan seluruh fase.",
    ],
    sections: [
      {
        h: "Checklist konsep",
        list: [
          "Duck typing: yang penting perilaku (method), bukan class — error baru muncul saat runtime bila method tak ada.",
          "Class = cetakan; object/instance = hasil instansiasi; atribut = identitas; method = perilaku.",
          "Atribut kelas = bawaan bersama semua instance; atribut instance = lewat self di __init__.",
          "Tiga jenis method: object (self), static (@staticmethod), class (@classmethod, cls).",
          "Inheritance: class Turunan(Induk) mewarisi semuanya. Override: nama sama di turunan menimpa induk. super(): panggil versi induk tanpa duplikasi.",
        ],
      },
      {
        h: "Jebakan yang sering muncul",
        list: [
          "Lupa self sebagai parameter pertama method — error 'takes 0 arguments but 1 was given'.",
          "Mendefinisikan __init__ di turunan tanpa super().__init__() — atribut warisan hilang.",
          "Mengubah atribut kelas mengira mengubah satu objek — semua instance ikut berubah.",
          "Nama method turunan typo → bukan override, melainkan method baru; bug diam-diam.",
        ],
      },
      {
        h: "Peta keputusan OOP",
        table: {
          head: ["Kebutuhan", "Pakai", "Contoh"],
          rows: [
            ["Data + perilaku jadi satu", "Class + __init__ + object method", "AkunUser(username).naik_level()"],
            ["Fungsi utilitas tanpa data objek", "@staticmethod", "Mobil.intro()"],
            ["Variasi dari class yang ada", "Inheritance + override", "MobilSport(Mobil)"],
            ["Pakai perilaku induk + tambahan", "Override + super()", "super().tambah_kecepatan()"],
          ],
        },
      },
    ],
    lab: {
      title: "Uji kompetensi OOP 10 menit",
      intro: "Tiga soal praktik tanpa melihat materi. Gagal di sini lebih baik daripada gagal saat membaca kode framework.",
      steps: [
        "Soal 1: class Karyawan (nama, gaji) + method naik_gaji(persen) yang mengembalikan gaji baru.",
        "Soal 2: class Manager(Karyawan) menambah atribut tim (list nama) lewat __init__ sendiri — jangan lupa super().__init__().",
        "Soal 3: override naik_gaji di Manager: pakai super().naik_gaji(persen) lalu tambah bonus tetap 1 juta pada hasilnya.",
        "Uji semua: Manager('Budi', 10_000_000, ['A','B']) naik 10% → gaji baru = 10jt*1.1 + 1jt = 12jt. Kalau hasilmu beda, cek urutan super().",
      ],
      hint: "10_000_000 adalah penulisan sah di Python (underscore pemisah ribuan). Angka float: 10_000_000 * 1.1 bisa menghasilkan 11000000.000000002 — bulatkan sebelum bandingkan.",
    },
    quiz: [
      {
        q: "Hasil eksekusi: class A: x = 1 ; a = A() ; a.x = 2 ; print(A.x, a.x) — adalah...",
        options: ["1 1", "1 2", "2 2", "Error"],
        answer: 1,
        why: "a.x = 2 membuat atribut INSTANCE baru pada objek a yang menutupi atribut kelas. A.x tetap 1 — class tidak tersentuh.",
      },
      {
        q: "Method yang TIDAK menerima self maupun cls secara otomatis:",
        options: ["Object method", "Static method (@staticmethod)", "Class method (@classmethod)", "Constructor __init__"],
        answer: 1,
        why: "@staticmethod = fungsi biasa yang tinggal di class — tidak merujuk objek (self) maupun class (cls). __init__ justru WAJIB self.",
      },
      {
        q: "Urutan pencarian method saat sport.turbo() dipanggil (sport = MobilSport(Mobil)):",
        options: [
          "Langsung ke Mobil (induk) dulu",
          "Cari turbo di MobilSport dulu; tidak ada baru ke Mobil",
          "Cari di keduanya bersamaan",
          "Hanya di MobilSport, tidak pernah ke induk",
        ],
        answer: 1,
        why: "Resolusi atribut berjalan turunan → induk. Itulah dasar mekanisme override, dan super() adalah pintu eksplisit untuk naik ke induk.",
      },
    ],
  },
  {
    slug: "py-36",
    tid: "33258",
    title: "Kode Profesional: PEP8, Linter, Formatter & Penamaan",
    minutes: 18,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33258" },
    untukApa: [
      "Kode yang jalan belum cukup — kode profesional harus bisa dibaca orang lain (dan dirimu 3 bulan lagi). PEP8 adalah standar resminya.",
      "Tooling-nya otomatis: linter menangkap kesalahan sebelum jalan, formatter merapikan kode tanpa kamu edit manual.",
    ],
    sections: [
      {
        h: "PEP8 dan linting",
        p: [
          "PEP = Python Enhancement Proposal — panduan resmi perkembangan Python. PEP8 khusus mengatur GAYA PENULISAN kode.",
          "Linting = pengecekan otomatis: error potensial, kesalahan indentasi, pelanggaran konvensi — sebelum interpreter menolaknya.",
        ],
        code: "# tiga linter populer (pilih satu)\npip install pycodestyle   # cek kesesuaian PEP8\npip install pylint        # analisis mendalam + saran refactor\npip install flake8        # gabungan pycodestyle + pyflakes\n\npycodestyle kalkulator.py",
      },
      {
        h: "Formatter: kode dirapikan otomatis",
        p: ["Bedanya dengan linter: formatter TIDAK hanya melaporkan — ia menuliskan versi yang benar. black bahkan mengubah file langsung."],
        code: "pip install black     # ubah file langsung (opinionated)\npip install yapf      # tampilkan dulu, ubah dengan -i\npip install autopep8  # berbasis pycodestyle\n\nblack kalkulator.py   # file langsung dirapikan",
      },
      {
        h: "Aturan statement gabungan",
        p: ["Jangan menumpuk >1 statement dalam satu baris. Kompak boleh untuk isi if/for/while yang SANGAT pendek — tapi haram untuk yang bertingkat (if-else, try-finally)."],
        code: "# DISARANKAN\nif foo == 'blah':\n    do_blah_thing()\ndo_one()\ndo_two()\n\n# TIDAK disarankan\nif foo == 'blah': do_blah_thing()\ndo_one(); do_two(); do_three()\n\n# SANGAT tidak disarankan\ntry: something()\nfinally: cleanup()",
      },
      {
        h: "Trailing comma & anotasi",
        list: [
          "Trailing comma opsional — WAJIB diingat untuk tuple satu elemen: FILES = ('setup.cfg',) — tanpa koma itu cuma string biasa.",
          "Pola multi-baris yang disarankan: nilai per baris baru, trailing comma di akhir, penutup di baris sendiri — gampang untuk diff/VCS.",
          "Anotasi fungsi (type hints) mendokumentasikan parameter dan return secara eksplisit — pelengkap docstring.",
        ],
        code: "FILES = [\n    'setup.cfg',\n    'tox.ini',\n]\n\ndef luas(panjang: int, lebar: int) -> int:\n    return panjang * lebar",
      },
      {
        h: "Konvensi penamaan",
        table: {
          head: ["Gaya", "Bentuk", "Dipakai untuk"],
          rows: [
            ["lower_snake", "huruf_kecil_pemisah", "variabel, fungsi, modul"],
            ["UPPER_SNAKE", "HURUF_BESAR", "konstanta"],
            ["CapWords / PascalCase", "HurufBesarTiapKata", "nama class"],
            ["_leading_underscore", "_internal", "penanda internal/non-publik"],
          ],
        },
        callout: "Nama publik harus merefleksikan FUNGSI, bukan implementasi: cari_jalan() lebih baik daripada dfs_v2(). Konsistensi tim selalu menang atas preferensi pribadi.",
      },
    ],
    lab: {
      title: "Rapikan kodemu sendiri",
      intro: "Ambil kode terburukmu dan biarkan tooling yang bekerja — rasakan bedanya.",
      steps: [
        "pip install black flake8 di lingkunganmu.",
        "Tulis file berantakan sengaja: kalkulator.py dengan indentasi campur, nama aneh (x1, DoIt), statement gabungan.",
        "flake8 kalkulator.py — baca setiap temuan: baris berapa, apa masalahnya.",
        "black kalkulator.py — buka ulang file, bandingkan sebelum-sesudah.",
        "flake8 ulang — sisa temuan tinggal soal penamaan; perbaiki manual sesuai tabel konvensi.",
        "Bongkar satu fungsi lamamu: tambahkan type hints + docstring gaya PEP257.",
      ],
      hint: "black dan flake8 kadang berbeda opini — itu normal. Pilih satu standar dan konsisten; di tim, konsistensi lebih penting daripada benar secara absolut.",
    },
    quiz: [
      {
        q: "Bedanya linter dan formatter:",
        options: [
          "Sama saja",
          "Linter hanya MELAPORKAN masalah; formatter MENULISKAN versi kode yang benar",
          "Linter mengubah file; formatter hanya laporan",
          "Formatter untuk testing; linter untuk style",
        ],
        answer: 1,
        why: "flake8/pylint/pycodestyle melaporkan; black/yapf/autopep8 memperbaiki (black bahkan langsung mengubah file). Keduanya saling melengkapi.",
      },
      {
        q: "Penulisan yang benar untuk tuple berisi SATU elemen:",
        options: ["FILES = 'setup.cfg'", "FILES = ('setup.cfg',)", "FILES = tuple('setup.cfg')", "FILES = ['setup.cfg',]"],
        answer: 1,
        why: "Koma belakang itulah yang membuatnya tuple. Tanpa koma, ('setup.cfg') hanyalah string di dalam kurung. PEP8 mewajibkan koma + kurung untuk kasus ini.",
      },
      {
        q: "Penamaan class yang sesuai PEP8:",
        options: ["mobil_sport", "MobilSport", "mobilSport", "MOBILSPORT"],
        answer: 1,
        why: "Class memakai CapWords/PascalCase. lower_snake untuk fungsi/variabel, UPPER_SNAKE untuk konstanta — tabel konvensi PEP8.",
      },
      {
        q: "if foo == 'blah': do_blah_thing() — menurut PEP8:",
        options: [
          "Disarankan, lebih ringkas",
          "Boleh jika sangat pendek, tapi TIDAK disarankan — apalagi untuk if-else/try-finally bertingkat",
          "Syntax error",
          "Wajib ditulis begini",
        ],
        answer: 1,
        why: "Statement gabungan di satu baris diperbolehkan untuk kasus sepele, tapi dikritisi keras PEP8 karena menyulitkan diff dan membuka jalan ke bug bertingkat.",
      },
    ],
  },
  {
    slug: "py-37",
    tid: "33288",
    title: "Unit Testing dengan unittest",
    minutes: 18,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33288" },
    untukApa: [
      "Setiap fungsi baru berisiko merusak fungsi lama. Mengecek manual satu per satu tidak skalabel — unit test memverifikasi SEMUA fungsionalitas dalam satu perintah.",
      "Ini skill yang membedakan skrip sekali-pakai dari kode yang dipercaya orang lain (dan yang dipakai di produksi).",
    ],
    sections: [
      {
        h: "Jenis pengujian",
        list: [
          "Manual vs otomatis: manual = manusia mengecek (seperti kamu coba-coba program sampai sekarang); otomatis = kode yang menguji kode sesuai test plan.",
          "Integration testing: menguji sistem sebagai KESATUAN — nyalakan motor, cek lampunya menyala.",
          "Unit testing: menguji bagian KECIL secara terisolasi — kalau lampu mati, cek lampunya sendiri, bukan seluruh motor.",
        ],
      },
      {
        h: "Anatomi test dengan unittest",
        p: [
          "Empat konsep unittest: test fixture (persiapan + cleanup), test case (unit pengujian, turunan TestCase), test suite (koleksi test case), test runner (yang mengeksekusi dan melaporkan).",
          "Aturan konvensi yang wajib: buat class turunan unittest.TestCase, dan SEMUA method test diawali kata test — runner hanya menjalankan yang berawalan test.",
        ],
        code: 'import unittest\n\nclass TestStringMethods(unittest.TestCase):\n    def test_strip(self):\n        self.assertEqual(\'www.dicoding.com\'.strip(\'c.mow\'), \'dicoding\')\n\n    def test_isalnum(self):\n        self.assertTrue(\'c0d1ng\'.isalnum())\n        self.assertFalse(\'c0d!ng\'.isalnum())\n\n    def test_index(self):\n        s = \'dicoding\'\n        self.assertEqual(s.index(\'coding\'), 2)\n        with self.assertRaises(ValueError):\n            s.index(\'tidakada\')\n\nif __name__ == \'__main__\':\n    unittest.main()',
      },
      {
        h: "Assert yang paling sering dipakai",
        table: {
          head: ["Assert", "Memastikan", "Contoh"],
          rows: [
            ["assertEqual(a, b)", "a == b", "assertEqual(luas(5,10), 50)"],
            ["assertTrue(x) / assertFalse(x)", "x bernilai True / False", "assertTrue('a1'.isalnum())"],
            ["assertRaises(Exc)", "kode melempar exception tertentu", "with assertRaises(ValueError): ..."],
            ["assertIn(a, b)", "a ada di dalam b", "assertIn('admin', log)"],
          ],
        },
        callout: "Menguji error adalah bagian dari test yang BAIK: assertRaises memastikan fungsi gagal dengan cara yang benar — bukan sekadar tidak error untuk kasus normal.",
      },
      {
        h: "Alur kerja TDD singkat",
        list: [
          "Tulis test untuk perilaku yang diinginkan → jalankan → GAGAL (merah).",
          "Tulis kode sesederhana mungkin sampai test lulus (hijau).",
          "Rapikan kode (refactor) dengan jaring pengaman test — ulangi untuk perilaku berikutnya.",
        ],
      },
    ],
    lab: {
      title: "Test untuk fungsi lamamu",
      intro: "Ambil fungsi dari lesson subprogram dan beri jaring pengaman sungguhan.",
      steps: [
        "Simpan kembali def rata_rata(*angka) dari py-32 di file statistik.py.",
        "Buat test_statistik.py: class TestStatistik(unittest.TestCase) dengan test_rata_dua dan test_rata_lima.",
        "assertEqual(rata_rata(2, 4), 3.0) dan assertEqual(rata_rata(1,2,3,4,5), 3.0).",
        "Tambah test kasus tepi: assertRaises(ZeroDivisionError, rata_rata) — tanpa argumen harus error.",
        "Jalankan python test_statistik.py — baca output 'OK' atau traceback 'FAILED' dan perbaiki sampai hijau.",
      ],
      hint: "Nama file bebas, tapi konvensi umum test_*.py. Jangan jalankan unittest.main() di file yang berisi fungsi biasa — pisahkan kode dan testnya.",
    },
    quiz: [
      {
        q: "Syarat method di class test agar dijalankan test runner:",
        options: [
          "Nama bebas asal ada assert di dalamnya",
          "Nama diawali kata test dan class-nya turunan unittest.TestCase",
          "Harus diberi dekorator @test",
          "Harus bernama run",
        ],
        answer: 1,
        why: "unittest menemukan test lewat konvensi: class turunan TestCase + method berawalan test_. Method lain di class itu tidak dijalankan sebagai test.",
      },
      {
        q: "Unit testing vs integration testing:",
        options: [
          "Unit untuk kode besar, integration untuk kecil",
          "Unit menguji bagian kecil terisolasi; integration menguji sistem sebagai kesatuan",
          "Unit manual, integration otomatis",
          "Tidak ada bedanya",
        ],
        answer: 1,
        why: "Analogi motor: unit = cek lampu satu-satu; integration = nyalakan motor dan lihat lampu menyala bersama komponen lain.",
      },
      {
        q: "Cara menguji bahwa fungsi melempar ValueError saat input salah:",
        options: [
          "try/except di dalam test lalu print",
          "with self.assertRaises(ValueError): fungsi(input_salah)",
          "assertTrue(fungsi(input_salah))",
          "Tidak perlu — error pasti terlihat",
        ],
        answer: 1,
        why: "assertRaises adalah konteks manager resmi unittest untuk memastikan exception yang TEPAT dilempar — error yang benar juga bagian dari kontrak fungsi.",
      },
      {
        q: "Fungsi test fixture dalam unittest:",
        options: [
          "Membuat laporan HTML",
          "Menyiapkan kondisi awal dan membersihkannya (cleanup) untuk pengujian",
          "Menjalankan semua test sekaligus",
          "Mengganti fungsi yang diuji",
        ],
        answer: 1,
        why: "Fixture = persiapan (setup) + pembersihan (teardown) yang bisa dipakai ulang antar test — contohnya membuat file sementara lalu menghapusnya setelah test.",
      },
    ],
  },
  {
    slug: "py-38",
    tid: "33308",
    title: "Dunia Library: Standard vs External, pip & conda",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33308" },
    untukApa: [
      "Kekuatan sesungguhnya Python bukan sintaksnya, tapi ekosistemnya: ratusan ribu library siap pakai. Memahami cara memasang dan mengelolanya = membuka pintu itu.",
      "Sejak fase ini, pertanyaanmu berubah dari 'bagaimana menulisnya' menjadi 'library apa yang sudah menulisnya'.",
    ],
    sections: [
      {
        h: "Dua dunia library",
        list: [
          "Python Standard Library: terpasang otomatis bersama Python — cukup import. Contoh: os, datetime, re, math, json, unittest.",
          "Python External Library: dibuat komunitas/pihak ketiga — WAJIB diinstal dulu. Contoh: pandas, NumPy, TensorFlow, Django, Beautiful Soup.",
        ],
      },
      {
        h: "pip: package manager resmi",
        p: [
          "pip mengunduh dan mengelola package dari PyPI (Python Package Index) — repositori online ribuan package.",
          "pip biasanya sudah terpasang otomatis sejak Python 3.4. Fokusnya pengelolaan paket, bukan lingkungan virtual.",
        ],
        code: "pip --version           # pastikan terpasang\npip install pandas      # pasang dari PyPI\npip install -U pandas   # update ke versi terbaru\npip uninstall pandas    # hapus",
      },
      {
        h: "conda: paket + lingkungan virtual",
        p: [
          "conda (Anaconda/Miniconda) adalah alternatif populer di dunia data science: mengelola package SEKALIGUS lingkungan virtual terisolasi.",
          "Lingkungan virtual = ruang terpisah per project, supaya versi library project A tidak merusak project B.",
        ],
        code: "conda install pandas\nconda create -n sklearn-env -c conda-forge scikit-learn\nconda activate sklearn-env",
      },
      {
        h: "Modul vs package vs library — peta final",
        table: {
          head: ["Nama", "Definisi", "Contoh"],
          rows: [
            ["Modul", "Satu file .py berisi kode", "math, main.py buatanmu"],
            ["Package", "Direktori berisi beberapa modul terkait", "NumPy, Pandas"],
            ["Library", "Koleksi modul + package siap pakai", "TensorFlow, Matplotlib"],
          ],
        },
        callout: "Menyebut NumPy 'library' sah-sah saja — library membungkus package dan package membungkus modul. Yang penting kamu tahu di lapisan mana sedang bicara.",
      },
    ],
    lab: {
      title: "Pasang dan kelola library pertamamu",
      intro: "Siklus penuh: cek, pasang, pakai, bersihkan.",
      steps: [
        "pip --version — pastikan pip tersedia.",
        "pip install rich (library external untuk output terminal cantik).",
        "Buat py: from rich import print; print('[bold red]Halo CyberMath[/bold red]') — jalankan.",
        "Cek asalnya: pip show rich — lihat lokasi instalasi dan dependensinya.",
        "Bersih-bersih: pip uninstall rich -y — ekosistem kembali bersih.",
      ],
      hint: "Kalau pip tidak dikenali, coba python -m pip atau py -m pip (Windows). Di Linux terkadang perlu pip3 atau python3 -m pip.",
    },
    quiz: [
      {
        q: "Manakah yang bukan Python Standard Library?",
        options: ["os", "re", "pandas", "datetime"],
        answer: 2,
        why: "os, re, datetime ikut terpasang bersama Python. pandas adalah external library — wajib pip install/conda install dulu.",
      },
      {
        q: "Fungsi PyPI dalam ekosistem Python:",
        options: [
          "IDE resmi Python",
          "Repositori online tempat pip mengunduh ribuan package",
          "Nama interpreter Python",
          "Standar gaya penulisan kode",
        ],
        answer: 1,
        why: "Python Package Index adalah gudang package online; pip menarik paket dari sana saat pip install dijalankan.",
      },
      {
        q: "Keunggulan utama conda dibanding pip:",
        options: [
          "Lebih cepat mengunduh",
          "Mengelola package sekaligus lingkungan virtual terisolasi",
          "Hanya untuk Windows",
          "Tidak butuh internet",
        ],
        answer: 1,
        why: "pip fokus pengelolaan paket; conda menangani paket + environment isolation — alasan ia populer di data science yang butuh versi library spesifik per project.",
      },
      {
        q: "Urutan lapisan yang benar:",
        options: [
          "Library berisi package, package berisi modul",
          "Modul berisi library, library berisi package",
          "Package berisi library, library berisi modul",
          "Ketiganya sama",
        ],
        answer: 0,
        why: "Modul = file. Package = direktori modul. Library = koleksi package + modul yang bisa dipakai ulang. Menyebutnya longgar itu sah, hierarkinya tetap begini.",
      },
    ],
  },
  {
    slug: "py-39",
    tid: "33353",
    title: "Peta Library Populer per Domain",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/33353" },
    untukApa: [
      "Kamu tidak perlu menghafal semua library — yang penting tahu PETA-nya: mau ngapain, pakai apa. Peta ini yang kamu buka setiap kali mulai project baru.",
      "Enam domain di bawah mencakup 90% kebutuhan nyata: teks, matematika, CLI, data, scraping, ML, dan web.",
    ],
    sections: [
      {
        h: "Peta lengkap",
        table: {
          head: ["Domain", "Library", "Tipe", "Catatan singkat"],
          rows: [
            ["Text processing", "string (bawaan), re", "Standard", "re = regex pencarian berpola: ^a...s$"],
            ["Matematika", "math", "Standard", "math.sqrt(25), math.pi"],
            ["Parser CLI", "argparse, getopt", "Standard", "Script menerima -o / --output dari terminal"],
            ["Pengolahan data", "pandas, NumPy", "External", "DataFrame tabel; array multidimensi"],
            ["Visualisasi", "matplotlib, seaborn", "External", "Grafik/histogram; sering dipakai bersama"],
            ["File & serialization", "os, json, pickle", "Standard", "os.getcwd(); json text-readable; pickle binary Python-only"],
            ["Web scraping", "Beautiful Soup, urllib", "External/Standard", "bs4 ekstrak per-tag; urllib mentah manual"],
            ["Machine learning", "scikit-learn, TensorFlow, PyTorch", "External", "Algoritma siap pakai → deep learning → neural network"],
            ["Web development", "Django, Flask, FastAPI", "External", "Framework lengkap → ringan → API cepat"],
          ],
        },
      },
      {
        h: "Tiga contoh yang paling sering kepakai",
        code: '# 1. regex — pola, bukan kebetulan\nimport re\nhasil = re.match(r"^a...s$", "abyss")   # cocok: a + 3 huruf + s\n\n# 2. argparse — script yang menerima flag\ndef main():\n    import argparse\n    parser = argparse.ArgumentParser()\n    parser.add_argument("-n", "--nama", required=True, help="Masukkan Nama Anda")\n    args = parser.parse_args()\n    print("Terima kasih,", args.nama)\n\n# 3. json — pertukaran data lintas bahasa\nimport json\ndata = json.loads(\'{"nama": "Budi", "usia": 17}\')\nprint(data["nama"])   # Budi',
        callout: "Pola memilih library: standard dulu kalau ada (os, re, json); external kalau kebutuhannya spesifik (pandas, bs4). Jangan pasang library untuk hal yang sudah ada di standard.",
      },
      {
        h: "JSON vs pickle — kapan mana",
        list: [
          "JSON: text serialization, manusia bisa baca, lintas bahasa, hanya subset tipe Python.",
          "Pickle: binary serialization, khusus Python, bisa hampir semua tipe — tapi TIDAK interoperabel dan berisiko dijalankan dari sumber tak dikenal.",
          "Aturan praktis: data yang keluar sistem (API, file konfigurasi) = JSON. Objek Python internal sementara = pickle boleh.",
        ],
      },
    ],
    lab: {
      title: "Satu script, tiga library",
      intro: "Rangkai standard library dalam satu tool kecil — tanpa instal apa pun.",
      steps: [
        "Buat hitung.py dengan argparse: flag --angka (boleh diulang, action='append', type=float).",
        "Di dalamnya pakai math: akar kuadrat angka pertama (math.sqrt).",
        "Cetak hasilnya sebagai JSON: json.dumps({'angka': [...], 'akar': ...}, indent=2).",
        "Jalankan: python hitung.py --angka 25 --angka 16 --angka 9 — amati output JSON rapi.",
        "Jalankan tanpa argumen dan dengan --help — argparse otomatis membuat pesan bantuan.",
      ],
      hint: "required=True membuat argumen wajib; kalau dihilangkan, flag jadi opsional. type=float mengonversi string terminal ke angka sebelum sampai ke kodemu.",
    },
    quiz: [
      {
        q: "Mau mengekstrak semua tag <a> dari halaman web. Library paling tepat:",
        options: ["math", "Beautiful Soup (bs4)", "argparse", "pickle"],
        answer: 1,
        why: "Beautiful Soup mem-parsing HTML dan menyediakan pencarian per-tag. urllib mengambil konten mentah; bs4 yang mengolah strukturnya.",
      },
      {
        q: "Script CLI kamu butuh flag --nama yang WAJIB diisi. Cara argparse:",
        options: [
          "parser.add_argument('--nama', optional=True)",
          "parser.add_argument('-n', '--nama', required=True)",
          "parser.add_argument('--nama', default='wajib')",
          "argparse tidak mendukung argumen wajib",
        ],
        answer: 1,
        why: "required=True membuat flag wajib; tanpa itu argparse menolak jalan dan menampilkan pesan bantuan. help='...' mengisi teks yang muncul di --help.",
      },
      {
        q: "Data akan dikirim ke sistem non-Python. Pilihan serialization yang tepat:",
        options: ["pickle", "JSON", "keduanya sama", "raw bytes acak"],
        answer: 1,
        why: "JSON adalah format text yang bisa dibaca hampir semua bahasa. Pickle binary dan Python-specific — penerima non-Python tidak bisa membacanya (dan berisiko keamanan).",
      },
      {
        q: "Untuk deep learning / neural network, library yang paling tepat:",
        options: ["math", "TensorFlow atau PyTorch", "json", "os"],
        answer: 1,
        why: "scikit-learn untuk algoritma ML klasik siap pakai; TensorFlow dan PyTorch untuk deep learning hingga deployment. math hanya fungsi matematika dasar.",
      },
    ],
  },
];
