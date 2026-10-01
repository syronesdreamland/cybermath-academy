import type { Lesson } from "./lesson-types";

// ============================================================
// Track Python — batch 5 (Fase 9-10): 8 lesson
// Rewrite internal dari materi Dicoding 86 (parafrase + contoh sendiri,
// bukan salinan). Link sumber asli tetap dicantumkan per lesson.
// ============================================================

const SRC = "Dicoding — Memulai Pemrograman dengan Python";

export const PYTHON_LESSONS_2: Lesson[] = [
  {
    slug: "py-25",
    tid: "32510",
    title: "Operasi Built-in pada List, Set & String",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32510" },
    untukApa: [
      "Setiap script security dan data butuh operasi ini: hitung panjang payload (len), cari nilai ekstrem di log (min/max), hitung frekuensi (count), cek substring (in).",
      "Ini kantong alat pertamamu — fungsi built-in yang jalan di list, set, dan string sekaligus tanpa import apa pun.",
    ],
    sections: [
      {
        h: "len() — hitung banyaknya isi",
        p: ["Satu fungsi, tiga tipe: len(list) menghitung elemen, len(set) menghitung anggota unik, len(string) menghitung karakter (spasi ikut dihitung)."],
        code: 'angka = [1, 3, 3, 5, 5, 5]\nprint(len(angka))          # 6\nprint(len(set(angka)))     # 3  (unik: 1, 3, 5)\nprint(len("Belajar Python"))  # 14 (spasi ikut)',
      },
      {
        h: "min() & max() — nilai terkecil dan terbesar",
        code: 'angka = [13, 7, 24, 5, 96, 84]\nprint(min(angka))   # 5\nprint(max(angka))   # 96',
      },
      {
        h: "count() — berapa kali muncul",
        p: ["count() adalah method (dipanggil lewat objek, bukan fungsi lepas). Di list ia menghitung kemunculan nilai; di string menghitung kemunculan substring."],
        code: 'genap = [2, 4, 4, 6, 6, 6, 8]\nprint(genap.count(6))    # 3\n\nkalimat = "Belajar Python di Dicoding sangat menyenangkan"\nprint(kalimat.count("a"))   # 6',
      },
      {
        h: "in / not in — cek keanggotaan",
        p: ["Operator ini mengembalikan boolean — bentuk paling cepat untuk memvalidasi apakah sesuatu ada di dalam data."],
        code: 'kalimat = "Belajar Python di Dicoding"\nprint("Dicoding" in kalimat)      # True\nprint("tidak" in kalimat)         # False\nprint("Dicoding" not in kalimat)  # False',
      },
      {
        h: "Unpacking: satu baris untuk banyak variabel",
        p: ["Alih-alih mengakses indeks satu per satu, pecah list/tuple langsung ke variabel. Syaratnya ketat: jumlah variabel HARUS sama dengan jumlah elemen, kalau lebih → ValueError."],
        code: "data = ['shirt', 'white', 'L']\napparel, color, size = data\nprint(apparel, color, size)   # shirt white L",
        callout: "Unpacking yang sama inilah yang membuat for-loop bisa: for nama, nilai in pasangan: — pemahaman penting sebelum masuk dictionary.",
      },
      {
        h: "sort() — urutkan, dan tiga jebakannya",
        list: [
          "Default ascending; balik arah dengan sort(reverse=True).",
          "Campuran int + string dalam satu list → TypeError ('<' tidak terdefinisi antar tipe).",
          "Urutan mengikuti ASCII: huruf KAPITAL selalu di depan huruf kecil ('Pesawat' sebelum 'helikopter').",
          "Solusi kapitalisasi: sort(key=str.lower) — bandingkan versi lowercase tanpa mengubah data asli.",
        ],
        code: "kendaraan = ['motor', 'mobil', 'helikopter', 'Pesawat']\nkendaraan.sort()\nprint(kendaraan)\n# ['Pesawat', 'helikopter', 'mobil', 'motor']  <- ASCII!\n\nkendaraan.sort(key=str.lower)\nprint(kendaraan)\n# ['helikopter', 'mobil', 'motor', 'Pesawat']",
      },
    ],
    lab: {
      title: "Analisis log mini dengan built-in",
      intro: "Pakai lima operasi tadi sekaligus untuk menganalisis satu list log — tanpa import apa pun.",
      steps: [
        "Buat log = ['GET /admin', 'POST /login', 'GET /admin', 'GET /home', 'POST /login', 'GET /admin'].",
        "Hitung total entri (len) dan berapa kali 'GET /admin' muncul (count).",
        "Cek apakah ada request 'DELETE /user' dengan operator in — hasilnya False.",
        "Buat frekuensi unik: print(len(set(log))) dan jelaskan kenapa lebih kecil dari len(log).",
        "Urutkan log dengan sort() lalu perhatikan: urutannya alfabetis, dan 'GET' selalu sebelum 'POST' karena ASCII.",
        "Bonus: unpacking — method, path = 'GET /admin'.split(' ') lalu print keduanya.",
      ],
      hint: "split() memecah string jadi list berdasarkan pemisah — kombinasi inilah yang nanti dipakai untuk parsing baris log sungguhan.",
    },
    quiz: [
      {
        q: "x = set([1, 3, 3, 5, 5, 5, 7, 7, 9]). Berapa len(x)?",
        options: ["9", "6", "5", "Error karena set tidak punya len"],
        answer: 2,
        why: "Set membuang duplikat → anggotanya {1, 3, 5, 7, 9} = 5. len() di set menghitung anggota unik, bukan panjang data aslinya.",
      },
      {
        q: "data = ['shirt', 'white', 'L']; a, b = data. Apa yang terjadi?",
        options: [
          "a = 'shirt', b = 'white' — sisanya dibuang",
          "ValueError: terlalu banyak nilai untuk di-unpack",
          "a = list pertama, b = sisa list",
          "Jalan normal, b berisi 2 elemen",
        ],
        answer: 1,
        why: "Unpacking menuntut kesetaraan jumlah: 3 nilai ke 2 variabel → ValueError. Beda dengan slicing (a, b = data[0], data[1:]) yang memang memotong.",
      },
      {
        q: "kendaraan = ['motor', 'Pesawat', 'mobil']; kendaraan.sort(). Elemen pertama hasilnya?",
        options: ["'mobil'", "'motor'", "'Pesawat'", "TypeError"],
        answer: 2,
        why: "sort() memakai urutan ASCII: huruf kapital (P = 80) selalu di depan huruf kecil (m = 109). Pakai key=str.lower kalau mau abaikan kapitalisasi.",
      },
      {
        q: "Cara paling idiomatik cek apakah 'root' ada di daftar user:",
        options: [
          "for u in users: if u == 'root' ...",
          "'root' in users",
          "users.count('root') > 0",
          "users.index('root') >= 0",
        ],
        answer: 1,
        why: "in adalah operator keanggotaan bawaan — paling ringkas, paling cepat dibaca. count/index jauh lebih mahal; index malah melempar ValueError kalau tidak ketemu.",
      },
    ],
  },
  {
    slug: "py-26",
    tid: "5082",
    title: "Duck Typing: Perilaku Lebih Penting dari Tipe",
    minutes: 8,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/5082" },
    untukApa: [
      "Ini filosofi yang menjelaskan kenapa len() bisa dipakai di list DAN string tapi error di int — dan kenapa Python tidak pernah menanyakan 'tipe apa kamu?' sebelum menjalankan method.",
      "Memahami duck typing = paham kenapa kode Python terasa longgar dibanding Java/C++, dan kapan keleluasaan itu berbalik jadi bug.",
    ],
    sections: [
      {
        h: "Kalimat kuncinya",
        p: [
          '"If it walks like a duck and it quacks like a duck, then it must be a duck" — kalau sesuatu berperilaku seperti bebek, anggap saja bebek.',
          "Artinya: tipe/class sebuah objek TIDAK lebih penting daripada method (perilaku) yang dimilikinya. Python tidak memeriksa 'kamu objek apa' — ia langsung mencoba memanggil method-nya, dan error baru muncul kalau method itu tidak ada.",
        ],
      },
      {
        h: "Bukti: len() dan int",
        p: ["len() tidak peduli tipe datamu — cukup punya method panjang yang tepat. int tidak punya, dan error-nya menyebut method-nya, bukan tipenya:"],
        code: 'i = 123\nprint(len(i))\n# TypeError: object of type \'int\' has no len()\n#                     ^ error bicara soal METHOD yang hilang',
        callout: "Bandingkan dengan bahasa statically typed: di sana compiler menolak sebelum program jalan karena 'tipe tidak cocok'. Di Python program sudah jalan dulu, baru kena error saat memanggil.",
      },
      {
        h: "Kaitannya dengan dynamic typing",
        p: [
          "Duck typing ≠ dynamic typing, tapi keduanya saling menopang. Dynamic typing = tipe variabel ditentukan saat runtime dan boleh berubah (x = 6 lalu x = \"6\"). Duck typing = aturan main saat memanggil method: yang dicek adalah kemampuan, bukan kelas.",
          "Konsekuensi praktis: fungsi yang kamu tulis tidak perlu validasi tipe — ia langsung percaya objek yang masuk punya method yang dibutuhkan. Satu fungsi tampil() bisa menerima string, list, atau objek buatanmu sendiri.",
        ],
      },
    ],
    lab: {
      title: "Rasakan sendiri perbedaannya",
      intro: "Buktikan bahwa Python hanya peduli method, bukan tipe.",
      steps: [
        "Jalankan print(len([1, 2, 3])), print(len('abc')), lalu print(len(123)) — catat error persisnya.",
        "Jalankan x = 6; print(type(x)), lalu x = '6'; print(type(x)) — nama sama, tipe berubah (dynamic typing).",
        "Coba 'abc' + 'def' (jalan) dan 123 + 'abc' (TypeError) — operator mengikuti pola yang sama.",
        "Kesimpulan satu kalimat: kapan error tipe muncul di Python — sebelum jalan, atau saat eksekusi menyentuh method-nya?",
      ],
      hint: "Semua error runtime Python bersifat 'too late': ia tidak mencegah, ia melaporkan. Itu trade-off dari keleluasaan duck typing.",
    },
    quiz: [
      {
        q: "Inti filosofi duck typing adalah...",
        options: [
          "Tipe objek harus selalu dideklarasikan eksplisit",
          "Yang penting perilaku/method yang dimiliki objek, bukan class-nya",
          "Semua objek wajib punya method yang sama",
          "Python mengonversi semua tipe otomatis",
        ],
        answer: 1,
        why: '"Berjalan seperti bebek, bersuara seperti bebek = bebek". Python memanggil method tanpa menanyakan kelasnya; error baru muncul jika method tidak ada.',
      },
      {
        q: "print(len(123)) menghasilkan TypeError: object of type 'int' has no len(). Ini menunjukkan...",
        options: [
          "int harus dikonversi dulu sebelum dipakai",
          "Compiler menolak kode sebelum jalan",
          "Python baru mengecek keberadaan method saat runtime, bukan tipe saat compile",
          "len() hanya untuk string",
        ],
        answer: 2,
        why: "Program jalan dulu, runtime mencari method len() di objek int, tidak ketemu, baru error. Itulah sifat 'too late checking' dari duck typing.",
      },
      {
        q: "Apa beda duck typing dengan dynamic typing?",
        options: [
          "Sama saja, dua nama untuk satu konsep",
          "Dynamic typing soal kapan tipe ditentukan (runtime); duck typing soal cara memanggil method (cek perilaku, bukan kelas)",
          "Duck typing memaksa deklarasi tipe; dynamic typing tidak",
          "Dynamic typing hanya ada di Python; duck typing hanya di Java",
        ],
        answer: 1,
        why: "Dynamic typing = tipe variabel lahir saat assignment dan bisa berubah. Duck typing = saat memanggil method, yang dinilai adalah kemampuan objek, bukan kelasnya. Beda lapisan, saling menopang.",
      },
    ],
  },
  {
    slug: "py-27",
    tid: "6414",
    title: "Data Typing: Deklarasi, Inisialisasi & Peta Tipe",
    minutes: 12,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/6414" },
    untukApa: [
      "Sebelum menghafal operasi tiap tipe, kamu perlu peta besarnya: apa beda deklarasi vs inisialisasi, kenapa Python longgar, dan tipe apa saja yang tersedia.",
      "Peta ini yang membuat lesson list/set/dictionary nanti terasa seperti mengisi kotak yang sudah ada, bukan menghafal dari nol.",
    ],
    sections: [
      {
        h: "Deklarasi vs inisialisasi",
        p: [
          "Deklarasi = membuat variabel sekaligus menentukan tipenya (int age;). Inisialisasi = memberi nilai awal (int age = 17;). Di C/C++ keduanya WAJIB — kompiler perlu tahu ukuran memori sejak awal.",
          "Python tidak menerapkan keduanya: age = 17 langsung jadi. Ini disebut loosely typed — tipe tidak perlu ditulis eksplisit.",
        ],
        code: "// C/C++: wajib dua langkah\n// int age;        <- deklarasi\n// int age = 17;   <- deklarasi + inisialisasi\n\n# Python: satu langkah\nage = 17\nsalary = 5000000.0\nprint(type(age))      # <class 'int'>\nprint(type(salary))   # <class 'float'>",
      },
      {
        h: "Dynamic typing: tipe bisa berubah",
        p: ["Python baru mengetahui tipe variabel SAAT program berjalan dan assignment dieksekusi. Akibatnya satu nama variabel boleh berganti tipe di tengah program — sah, tapi berbahaya kalau tidak disadari."],
        code: 'x = 6\nprint(type(x))   # <class \'int\'>\n\nx = "6"\nprint(type(x))   # <class \'str\'>',
        callout: "Bug klasik akibat dynamic typing: x = input() selalu menghasilkan STRING. x + 1 akan error kalau kamu lupa int(x) dulu.",
      },
      {
        h: "Peta tipe: primitif vs collection",
        list: [
          "PRIMITIF (satu nilai): int (1, -20, 0), float (3.14), complex (1+2j — jarang dipakai), bool (True/False), str ('teks').",
          "COLLECTION (sekelompok nilai): list [1, 2.2, 'Dicoding'] — terurut, mutable; tuple (1, 'Dicoding') — terurut, IMMUTABLE; set {1, 2, 3} — unik, tanpa urutan; dict {'name': 'Perseus'} — pasangan key-value.",
          "Falsiness: None, False, 0, 0.0, '', (), {}, set(), range(0) dianggap False — sisanya True.",
        ],
      },
      {
        h: "Konversi antar tipe",
        p: ["Fungsi casting mengubah tipe eksplisit: int(), float(), str(). Ini jembatan wajib antara input user (string) dan perhitungan (angka)."],
        code: 'umur = int("17")        # str -> int\nharga = float("19.99")  # str -> float\nlabel = str(99)         # int -> str\nprint(umur + 1, harga, label + "!")',
      },
    ],
    lab: {
      title: "Peta tipe versi kamu",
      intro: "Bangun intuisi tipe dengan eksperimen kecil di mode interaktif.",
      steps: [
        "Buat teks = input('angka: ') lalu angka = int(teks) — buktikan teks + '1' menggabungkan, angka + 1 menambah.",
        "Cek type() dari: 7, 7.0, '7', True, [7], (7,), {7} — tujuh tipe berbeda dari satu digit.",
        "Uji falsiness: print(bool(''), bool('a'), bool(0), bool([0])) — prediksi dulu, baru jalankan.",
        "Ubah tuple: t = (1, 2) lalu t[0] = 9 — baca error-nya (TypeError) dan bandingkan dengan list.",
        "Casting dua arah: print(int('42') + float('0.5')) dan print(str(1) + str(2)) — bandingkan hasilnya.",
      ],
      hint: "(7,) dengan koma adalah tuple satu elemen — tanpa koma, (7) hanyalah angka 7 di dalam kurung. Detail kecil yang sering keluar di quiz.",
    },
    quiz: [
      {
        q: "Di Python, pernyataan age = 17 adalah...",
        options: [
          "Deklarasi + inisialisasi sekaligus",
          "Deklarasi saja, nilai menyusul",
          "Error karena tipe tidak disebutkan",
          "Inisialisasi variabel konstanta",
        ],
        answer: 0,
        why: "Python loosely typed: tidak ada deklarasi tipe terpisah seperti int age; di C. Satu baris age = 17 sekaligus membuat variabel dan mengisinya.",
      },
      {
        q: "x = 5 lalu x = 'lima'. Menurut aturan Python...",
        options: [
          "Error — tipe variabel tidak boleh berubah",
          "Sah, karena Python dynamic typed: tipe dicek saat runtime per assignment",
          "Sah, tapi x lama tetap tersimpan di memori",
          "x otomatis jadi '5lima'",
        ],
        answer: 1,
        why: "Dynamic typing: tipe diketahui saat program berjalan dan mengikuti nilai terbaru yang di-assign. Nama x sekarang menunjuk string 'lima'.",
      },
      {
        q: "Manakah yang BUKAN tipe data collection di Python?",
        options: ["tuple", "set", "int", "dictionary"],
        answer: 2,
        why: "int menyimpan satu nilai (primitif). List, tuple, set, dan dict adalah collection — wadah untuk satu atau lebih nilai primitif.",
      },
      {
        q: "Nilai berikut yang dievaluasi False, KECUALI...",
        options: ['"" (string kosong)', "[] (list kosong)", "'0' (string berisi nol)", "0.0"],
        answer: 2,
        why: "Yang falsy: None, False, 0, 0.0, '', (), {}, set(), range(0). String '0' TIDAK kosong — isinya satu karakter — jadi True. Jebakan klasik parsing data.",
      },
    ],
  },
  {
    slug: "py-28",
    tid: "32515",
    title: "Rangkuman Data + Transformasi String Lengkap",
    minutes: 15,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32515" },
    untukApa: [
      "Titik kumpul seluruh materi data: satu halaman untuk mereview primitif, collection, dan — yang paling sering dipakai nyata — semua transformasi string.",
      "Parsing log, membersihkan input, format output — semuanya operasi string. Kuasai halaman ini, kamu jarang balik lagi.",
    ],
    sections: [
      {
        h: "Peta collection dalam satu tabel",
        table: {
          head: ["Tipe", "Sintaks", "Terurut?", "Bisa diubah?", "Ciri khas"],
          rows: [
            ["list", "[1, 2, 3]", "Ya", "Ya (mutable)", "Serbaguna, paling sering dipakai"],
            ["tuple", "(1, 2, 3)", "Ya", "TIDAK (immutable)", "Data sekali-deklarasi, lebih cepat"],
            ["set", "{1, 2, 3}", "Tidak", "Ya", "Elemen unik, buang duplikat"],
            ["dict", "{'k': 'v'}", "Tidak*", "Ya", "Pasangan key-value, akses by key"],
          ],
        },
        p: ["*Sejak Python 3.7 dict mengingat urutan penyisipan, tapi secara konsep tetap akses-by-key, bukan by-indeks."],
      },
      {
        h: "Kotak 1 — huruf besar/kecil",
        code: 's = "Dicoding Indonesia"\nprint(s.upper())    # DICODING INDONESIA\nprint(s.lower())    # dicoding indonesia\nprint(s.title())    # Dicoding Indonesia',
      },
      {
        h: "Kotak 2 — bersih-bersih whitespace & cek ujung",
        p: ["rstrip(), lstrip(), strip() menghapus whitespace (kanan, kiri, keduanya). startswith()/endswith() cek awalan/akhiran — cocok untuk filter log."],
        code: 'log = "   ERROR: disk full   \\n"\nprint(repr(log.strip()))       # \'ERROR: disk full\'\n\nline = "GET /admin HTTP/1.1"\nprint(line.startswith("GET"))   # True\nprint(line.endswith("1.1"))     # True',
      },
      {
        h: "Kotak 3 — memisah & menggabung",
        p: ["Duo paling penting di dunia parsing: split() memecah string jadi list; join() menyambung list jadi string. Perhatikan join dipanggil dari PEMISAHNYA."],
        code: 'line = "GET /admin 200"\nparts = line.split(" ")\nprint(parts)               # [\'GET\', \'/admin\', \'200\']\n\nprint("-".join(parts))     # GET-/admin-200\nprint(" ".join(["a","b"])) # a b   <- separator dipanggil dari depan',
      },
      {
        h: "Kotak 4 — replace & pengecekan boolean",
        code: 's = "http://example.com"\nprint(s.replace("http", "https"))   # https://example.com\n\nprint("abc123".isalnum())   # True  (alfanumerik)\nprint("abc 123".isalnum())  # False (ada spasi)\nprint("abc".isalpha())      # True\nprint("123".isdecimal())    # True\n\nprint("7".zfill(3))         # 007\nprint("hi".rjust(5))        #    hi\nprint("hi".center(7, "*"))  # **hi***',
        list: [
          "Familia is-check mengembalikan boolean: isupper(), islower(), isalpha(), isalnum(), isdecimal(), isspace(), istitle().",
          "Familia formatting: zfill() isi nol di depan, rjust()/ljust()/center() rata kanan/kiri/tengah dengan lebar tertentu.",
        ],
      },
      {
        h: "Escape character & raw string",
        p: ['String literal diapit kutip tunggal atau ganda. Kutip di dalam teks perlu di-escape dengan backslash: \\\' atau \\". Untuk path Windows dan pattern regex, raw string r"..." mencegah backslash diartikan escape.'],
        code: "print('It\\'s ok')      # It's ok\nprint(\"It's ok\")       # It's ok  (ganda di luar)\nprint(r'C:\\new\\test')  # C:\\new\\test  (raw, \\n tidak jadi newline)",
      },
    ],
    lab: {
      title: "Log washer",
      intro: "Satu pipeline string yang mencerminkan kerja nyata: bersihkan, validasi, pecah, format ulang.",
      steps: [
        'Ambil raw = "  192.168.1.10 - GET /login 404 \\n".',
        "Bersihkan: line = raw.strip() — buktikan dengan repr() bahwa spasi dan \\n hilang.",
        "Pecah: parts = line.split(' ') → 5 kolom: ip, dash, method, path, status.",
        "Validasi: cek parts[2].startswith('G') dan parts[4].isdecimal() — keduanya harus True.",
        "Format ulang: parts[4].zfill(3) lalu ' | '.join([parts[0], parts[2], parts[4]]).",
        "Tantangan: ubah 'GET' jadi 'get' lalu balikkan — .lower() dan .upper() dalam satu baris masing-masing.",
      ],
      hint: "Pipeline strip → split → validasi → join adalah pola baku parsing. Nanti di fase regex dan scraping, pola ini yang dipakai berulang-ulang.",
    },
    quiz: [
      {
        q: "Beda utama tuple dan list di Python:",
        options: [
          "Tuple untuk angka, list untuk teks",
          "Tuple immutable (tidak bisa diubah setelah dibuat), list mutable",
          "List lebih cepat diakses daripada tuple",
          "Tuple hanya bisa satu elemen",
        ],
        answer: 1,
        why: "Tuple = versi sekali-deklarasi: tidak bisa diubah, ditambah, dihapus — eksekusinya lebih cepat dan aman untuk data tetap. List fleksibel penuh.",
      },
      {
        q: "'-'.join(['a', 'b', 'c']) menghasilkan...",
        options: ["['a', '-', 'b', '-', 'c']", "'a-b-c'", "'abc'", "TypeError"],
        answer: 1,
        why: "join() dipanggil dari string PEMISAH ('-') dan menyambung semua elemen list jadi satu string. Ini kebalikan split().",
      },
      {
        q: "Cara benar menghapus spasi di awal DAN akhir string:",
        options: ["s.rstrip()", "s.lstrip()", "s.strip()", "s.replace(' ', '')"],
        answer: 2,
        why: "strip() membersihkan kedua sisi. rstrip kanan saja, lstrip kiri saja. replace(' ','') terlalu agresif — spasi DI TENGAH ikut terhapus.",
      },
      {
        q: "print('7'.zfill(3)) menampilkan...",
        options: ["7.00", "007", "'7'  '7'  '7'", "Error, zfill hanya untuk angka"],
        answer: 1,
        why: "zfill(n) menambah nol di depan sampai panjang total n — sering dipakai untuk format nomor, jam, dan kode. Namanya zero-fill.",
      },
    ],
  },
  {
    slug: "py-29",
    tid: "10742",
    title: "Subprogram: Kenapa Kode Dipecah",
    minutes: 8,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/10742" },
    untukApa: [
      "Sampai sekarang semua kodemu berjalan lurus dari atas ke bawah. Fase ini membahas cara resmi memecah program jadi blok yang bisa dipanggil ulang — fondasi semua kode profesional.",
      "Sekali paham subprogram, kamu tidak pernah lagi menulis rumus yang sama dua kali.",
    ],
    sections: [
      {
        h: "Masalah: copy-paste rumus",
        p: ["Hitung dua luas persegi panjang = tulis rumus dua kali. Hitung dua ribu? Copy-paste bukan jawaban — setiap perubahan harus dilakukan di semua tempat, dan satu terlewat = bug."],
        code: "# cara naive: duplikasi\npanjang, lebar = 5, 10\nluas = panjang * lebar\nprint(luas)         # 50\n\npanjang, lebar = 4, 15\nluas = panjang * lebar\nprint(luas)         # 60  <- kode sama, ditulis ulang",
      },
      {
        h: "Solusi: subprogram",
        p: [
          "Subprogram = serangkaian instruksi yang dirancang untuk operasi yang sering dipakai, dibungkus satu nama, dan bisa dipanggil berkali-kali.",
          "Python mengenal dua jenisnya: FUNGSI (menerima input, memproses, MENGEMBALIKAN output via return) dan PROSEDUR (deretan instruksi yang TIDAK mengembalikan nilai — hanya melakukan aksi).",
        ],
        code: "def mencari_luas(panjang, lebar):\n    luas = panjang * lebar\n    return luas\n\nprint(mencari_luas(5, 10))   # 50\nprint(mencari_luas(4, 15))   # 60  <- rumus cuma ditulis SEKALI",
      },
      {
        h: "Kenapa dua istilah untuk hal serupa?",
        list: [
          "Fungsi: hasilnya DIPAKAI — disimpan ke variabel, dijadikan input fungsi lain. Wajib punya return value.",
          "Prosedur: hasilnya AKSI — menampilkan teks, menulis file, mengubah kondisi. Tidak mengembalikan apa pun.",
          "Di Python keduanya ditulis dengan def — bedanya cuma ada tidaknya return. Materi berikutnya membedah keduanya.",
        ],
      },
    ],
    lab: {
      title: "Refactor pertamamu",
      intro: "Ambil kode duplikat dan pecah jadi subprogram — pengalaman 'aha' yang selalu sama.",
      steps: [
        "Tulis program yang menampilkan luas 3 persegi panjang TANPA fungsi (copy-paste tiga kali).",
        "Buat def luas_pp(panjang, lebar): return panjang * lebar.",
        "Ganti ketiga blok jadi print(luas_pp(5, 10)) dan seterusnya — hitung baris yang berkurang.",
        "Tambah kasus baru: print(luas_pp(7, 7)) — tidak ada kode baru yang perlu ditulis.",
        "Buat juga keliling: def keliling_pp(panjang, lebar): return 2 * (panjang + lebar) — dua subprogram, dua operasi, nol duplikasi.",
      ],
      hint: "Aturan praktis refactor: kalau ada blok kode yang kamu copy-paste lebih dari sekali, itu kandidat subprogram.",
    },
    quiz: [
      {
        q: "Masalah utama yang diselesaikan subprogram:",
        options: [
          "Program jadi berjalan lebih cepat",
          "Menghindari penulisan ulang kode yang dipakai berulang",
          "Menghemat memori komputer",
          "Membuat kode tidak perlu diuji",
        ],
        answer: 1,
        why: "Subprogram membungkus operasi yang sering dipakai menjadi satu blok bernama — ditulis sekali, dipanggil berkali-kali. Kecepatan bukan tujuan utamanya.",
      },
      {
        q: "Beda inti fungsi dan prosedur:",
        options: [
          "Fungsi dibuat dengan def, prosedur dengan func",
          "Fungsi mengembalikan nilai (return); prosedur hanya menjalankan aksi",
          "Prosedur tidak bisa menerima parameter",
          "Fungsi hanya ada di Python modern",
        ],
        answer: 1,
        why: "Keduanya pakai def di Python. Pembedanya return: fungsi mengembalikan hasil yang bisa dipakai; prosedur hanya melakukan sesuatu (mis. print).",
      },
      {
        q: "Kamu menulis blok perhitungan pajak yang sama di 4 tempat. Tindakan paling benar:",
        options: [
          "Biarin — yang penting jalan",
          "Copy-paste lagi ke tempat kelima nanti",
          "Bungkus jadi satu subprogram, panggil di 4 tempat",
          "Tulis dalam komentar biar gampang dicari",
        ],
        answer: 2,
        why: "Empat duplikasi = empat tempat untuk bug dan empat tempat update saat aturan pajak berubah. Satu subprogram = satu titik perubahan.",
      },
    ],
  },
  {
    slug: "py-30",
    tid: "32963",
    title: "Fungsi: Parameter, Argumen, Lambda & Scope",
    minutes: 25,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32963" },
    untukApa: [
      "Fungsi adalah unit terbesar yang kamu kontrol di Python — materi ini mencakup SEMUA mekanismenya: definisi, parameter 5 jenis, argumen 2 gaya, lambda, dan scope.",
      "Ini lesson terpenting di seluruh track Python. Lambat di sini, lancar semua setelahnya.",
    ],
    sections: [
      {
        h: "Anatomi fungsi",
        p: ["Tiga bagian: header (def nama(parameter):), body (kode ter-indentasi), dan return (opsional — mengembalikan nilai ke pemanggil)."],
        code: 'def mencari_luas(panjang, lebar):   # header\n    luas = panjang * lebar          # body\n    return luas                     # return\n\nhasil = mencari_luas(5, 10)\nprint(hasil)   # 50',
        callout: "Panggilan tanpa print TIDAK menampilkan apa pun — nilainya dikembalikan, bukan dicetak. hasil = f(5, 10) menyimpannya; f(5, 10) saja membuangnya.",
      },
      {
        h: "Parameter vs argumen",
        p: [
          "PARAMETER = nama di definisi (a, b, c). ARGUMEN = nilai nyata saat pemanggilan (1, b=50, 'Dicoding'). Black box: parameter kotaknya, argumen isinya.",
          "Argumen dua gaya: POSITIONAL (urutan menentukan) dan KEYWORD (nama disebut eksplisit, urutan bebas).",
        ],
        code: 'def luas(panjang, lebar):\n    return panjang * lebar\n\nprint(luas(5, 10))                 # positional: 5->panjang, 10->lebar\nprint(luas(lebar=10, panjang=5))   # keyword: urutan bebas, tetap 50',
      },
      {
        h: "5 jenis parameter",
        list: [
          "Positional-or-keyword (default): boleh dua gaya — def greeting(nama, pesan).",
          "Positional-only: setelah /, hanya boleh positional — def penjumlahan(a, b, /).",
          "Keyword-only: setelah *, hanya boleh keyword — def greeting(*, nama, pesan).",
          "Var-positional: *args menampung banyak positional sekaligus, dibungkus jadi TUPLE.",
          "Var-keyword: **kwargs menampung banyak keyword sekaligus, dibungkus jadi DICT.",
        ],
        code: 'def hitung_total(*args):\n    print(type(args))     # <class \'tuple\'>\n    return sum(args)\n\nprint(hitung_total(1, 2, 3))        # 6\nprint(hitung_total(1, 2, 3, 4, 5))  # 15\n\ndef cetak_info(**kwargs):\n    for k, v in kwargs.items():\n        print(k, "=", v)\n\ncetak_info(nama="Dicoding", usia=17)',
      },
      {
        h: "Lambda: fungsi satu baris tanpa nama",
        p: ["lambda args: return_value — fungsi anonim untuk operasi SEDERHANA. Banyak argumen boleh, tapi body cuma satu ekspresi dan satu nilai kembali."],
        code: "luas = lambda p, l: p * l\nprint(luas(5, 10))   # 50",
        callout: "Aturan praktis: operasi sekali-lihat → lambda; ada logika/if/loop → def. Lambda yang dipaksakan lebih sulit dibaca daripada def.",
      },
      {
        h: "Docstring: dokumentasi di dalam kode",
        p: ['Blok """ tepat di bawah def — deskripsi fungsi, parameter, dan return. Bisa dibaca lewat help(nama_fungsi).'],
        code: 'def mencari_luas(panjang, lebar):\n    """\n    Menghitung luas persegi panjang.\n\n    Args:\n        panjang (int): sisi panjang.\n        lebar (int): sisi lebar.\n\n    Returns:\n        int: luas hasil perhitungan.\n    """\n    return panjang * lebar',
      },
      {
        h: "Scope: global vs lokal",
        p: [
          "Variabel yang dibuat DI DALAM fungsi bersifat LOKAL — hidup saat fungsi jalan, hilang setelahnya, tidak terlihat dari luar.",
          "Variabel di level atas bersifat GLOBAL — terbaca dari dalam fungsi mana pun, tapi tidak bisa diubah dari dalam fungsi tanpa keyword global (dan sebaiknya dihindari).",
        ],
        code: 'x = 10        # global\n\ndef ubah():\n    y = 5     # lokal — hilang saat fungsi selesai\n    return x + y\n\nprint(ubah())   # 15\n# print(y)     -> NameError: y tidak ada di luar',
      },
      {
        h: "Modul, package, library — istilah yang sering tertukar",
        table: {
          head: ["Nama", "Definisi", "Contoh"],
          rows: [
            ["Modul", "File .py berisi kode Python", "math, file main.py buatanmu"],
            ["Package", "Direktori berisi beberapa modul terkait", "NumPy, Pandas"],
            ["Library", "Koleksi modul + package yang bisa dipakai ulang", "TensorFlow, Matplotlib"],
          ],
        },
        p: ["Built-in (print, len, range) tersedia tanpa import. Standard library (os, datetime, re) perlu import tapi sudah terpasang. External library perlu pip install."],
      },
    ],
    lab: {
      title: "Toolkit scan-port mini",
      intro: "Fungsi bergaya security tooling: parameter fleksibel, return jelas, dokumentasi rapi.",
      steps: [
        "Buat def cek_port(port, *alasan): return f'Port {port}: {alasan}' — panggil dengan 1 dan dengan 3 alasan, amati tuple-nya.",
        "Tambahkan def profil(**kwargs) yang menyusun 'k: v' tiap pasangan dan mengembalikan string — panggil dengan 2 lalu 4 keyword.",
        "Konversi ke lambda: kuadrat = lambda x: x ** 2 — uji, lalu pahami kapan versi def lebih layak.",
        "Buktikan scope: fungsi lokal_test() yang membuat z = 99 di dalam; coba print(z) dari luar — baca NameError-nya.",
        "Tulis docstring untuk cek_port, lalu jalankan help(cek_port) — dokumentasimu muncul.",
      ],
      hint: "*args dan **kwargs adalah nama konvensi — yang dicari Python adalah bintangnya, bukan kata 'args'. def f(*benda) juga sah.",
    },
    quiz: [
      {
        q: "def f(a, b, /) — artinya parameter a dan b...",
        options: [
          "Hanya bisa diisi keyword argument",
          "Hanya bisa diisi positional argument",
          "Opsional, boleh kosong",
          "Menampung banyak nilai sekaligus",
        ],
        answer: 1,
        why: "Slash / menandai batas positional-only: f(1, 2) sah, f(a=1, b=2) TypeError. Kebalikannya, * menandai keyword-only.",
      },
      {
        q: "def total(*args): ... — saat dipanggil total(1, 2, 3), isi args adalah...",
        options: ["list [1, 2, 3]", "tuple (1, 2, 3)", "dict {0:1, 1:2, 2:3}", "Error, terlalu banyak argumen"],
        answer: 1,
        why: "*args mengumpulkan semua argumen posisional menjadi tuple. Var-keyword **kwargs yang membentuk dictionary.",
      },
      {
        q: "Keyword argument adalah...",
        options: [
          "Argumen yang nilainya wajib keyword Python",
          "Argumen dengan nama parameter disebut eksplisit: f(lebar=10)",
          "Argumen yang tidak boleh dikosongkan",
          "Parameter yang didefinisikan setelah *",
        ],
        answer: 1,
        why: "Keyword argument menuliskan nama parameternya (nama=nilai) sehingga urutan pemanggilan bebas. Positional mengandalkan urutan.",
      },
      {
        q: "Kapan memilih lambda daripada def?",
        options: [
          "Selalu — lambda lebih modern",
          "Saat butuh fungsi kecil satu ekspresi, mis. sebagai argumen sort(key=...)",
          "Saat fungsi punya banyak baris logika",
          "Saat butuh dokumentasi docstring lengkap",
        ],
        answer: 1,
        why: "Lambda = one-liner untuk operasi sederhana (sering jadi argumen fungsi lain). Body multi-baris, if kompleks, atau perlu docstring → def.",
      },
      {
        q: "y = 5 didefinisikan di luar fungsi. Di dalam fungsi kamu tulis y = 99 tanpa keyword global. Apa yang terjadi?",
        options: [
          "y global berubah jadi 99",
          "Terbentuk y LOKAL baru di dalam fungsi; y global tetap 5",
          "SyntaxError",
          "Error karena y tidak bisa di-assign ulang",
        ],
        answer: 1,
        why: "Assignment di dalam fungsi membuat variabel lokal baru yang menutupi yang global (shadowing). Untuk benar-benar mengubah global diperlukan keyword global y — pola yang sebaiknya dihindari.",
      },
    ],
  },
  {
    slug: "py-31",
    tid: "32968",
    title: "Prosedur: Fungsi yang Hanya Melakukan",
    minutes: 8,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32968" },
    untukApa: [
      "Tidak semua blok kode butuh hasil kembali — banyak yang tugasnya murni aksi: cetak, log, tulis file. Itu ranah prosedur.",
      "Tahu kapan pakai prosedur membuat kodemu jujur: yang menghasilkan nilai memang mengembalikan, yang hanya beraksi memang tidak.",
    ],
    sections: [
      {
        h: "Prosedur = tanpa return value",
        p: ["Dalam Python, prosedur ditulis dengan def juga — bedanya tidak ada return yang mengembalikan nilai. return polos boleh ada, fungsinya cuma menghentikan eksekusi."],
        code: 'def greeting(name):\n    print("Halo " + name + ", Selamat Datang!")\n    return   # opsional, tanpa nilai\n\ngreeting("Dicoding Indonesia")\n# Halo Dicoding Indonesia, Selamat Datang!',
      },
      {
        h: "Bukti: hasil panggilannya None",
        p: ["Coba simpan hasil panggilan prosedur — yang tersimpan bukan hasil print, melainkan None. Inilah bukti paling nyata bahwa prosedur tidak mengembalikan apa pun."],
        code: 'def greeting(name):\n    print("Halo", name)\n\nx = greeting("Budi")\nprint(x)                            # None  <- print ≠ return\nprint(greeting("Budi") is None)     # True',
        callout: "Jebakan pemula nomor satu: mengira print di dalam fungsi sama dengan mengembalikan nilai. print menampilkan ke layar; return mengirim nilai ke pemanggil. Dua hal berbeda.",
      },
      {
        h: "Prosedur tanpa parameter",
        p: ["Paling sering dipakai untuk aksi tetap yang berulang — banner, menu, separator. Panggil cukup namanya."],
        code: 'def tampilkan_banner():\n    print("=" * 30)\n    print("  SCANNER v1.0")\n    print("=" * 30)\n\ntampilkan_banner()',
      },
      {
        h: "Kapan fungsi, kapan prosedur?",
        list: [
          "Prosedur: cetak laporan, log ke file, tampilkan menu — hasilnya efek di dunia, bukan nilai.",
          "Fungsi: hitung, transformasi, validasi — hasilnya nilai yang dipakai pemanggil.",
          "Uji cepat: kalau kamu tergoda menulis hasil = f(...), f harusnya fungsi dengan return.",
        ],
      },
    ],
    lab: {
      title: "Menu CLI tanpa return",
      intro: "Bangun dua prosedur dan satu fungsi — rasakan peran masing-masing.",
      steps: [
        "def garis(): mencetak '=' * 40 — panggil tiga kali.",
        "def header(judul): memanggil garis(), cetak judul rata tengah (judul.center(40)), panggil garis() lagi.",
        "def muat_data(): return [1, 2, 3] — ini FUNGSI: simpan hasilnya ke variabel data.",
        "Buktikan beda: print(header('MENU')) menampilkan teks lalu None; print(muat_data()) menampilkan list.",
        "Rangkai: header('DATA'), lalu for item in data: print(' -', item).",
      ],
      hint: "header() adalah prosedur (aksi tampil), tapi di dalamnya boleh memanggil fungsi lain dan menggunakan hasilnya. Campuran keduanya normal.",
    },
    quiz: [
      {
        q: "def f(): print('halo') lalu x = f(). Nilai x?",
        options: ["'halo'", "None", "True", "Error"],
        answer: 1,
        why: "print hanya menampilkan ke layar. Karena f tidak punya return, Python mengembalikan None secara default — x berisi None.",
      },
      {
        q: "Pernyataan return polos (tanpa nilai) di akhir prosedur...",
        options: [
          "Syntax error, return wajib disertai nilai",
          "Sah — hanya menghentikan eksekusi, mengembalikan None",
          "Mengembalikan 0",
          "Membuat prosedur menjadi fungsi",
        ],
        answer: 1,
        why: "return tanpa nilai sah dan berguna untuk keluar awal. Nilai yang dikembalikan tetap None — jadi tidak mengubah status prosedur.",
      },
      {
        q: "Tugas: menulis setiap baris log ke file. Desain paling tepat:",
        options: [
          "Fungsi dengan return isi file",
          "Prosedur — aksi menulis tidak menghasilkan nilai",
          "Lambda satu baris",
          "Variabel global",
        ],
        answer: 1,
        why: "Menulis ke file adalah efek (side effect), bukan nilai. Prosedur menyatakan niat itu dengan jujur; pemanggil tidak mengharapkan hasil kembali.",
      },
    ],
  },
  {
    slug: "py-32",
    tid: "32973",
    title: "Rangkuman Subprogram: Cek Kompetensi",
    minutes: 10,
    source: { label: SRC, url: "https://www.dicoding.com/academies/86/tutorials/32973" },
    untukApa: [
      "Gerbang sebelum OOP: kalau checkpoint ini lancar, class dan object nanti terasa seperti 'fungsi yang menyimpan data'.",
      "Kalau ada yang gagap, labelnya jelas — ulang py-30 atau py-31, bukan seluruh fase.",
    ],
    sections: [
      {
        h: "Checklist konsep",
        list: [
          "Subprogram = blok kode bernama untuk operasi yang berulang. Dua jenis: fungsi (ada return value) dan prosedur (tanpa).",
          "Anatomi def: header + body indentasi + return. Pemanggilan: nama(argumen), hasil bisa disimpan ke variabel.",
          "Parameter (di definisi) vs argumen (saat panggil). Argumen: positional (urutan) vs keyword (nama=).",
          "5 jenis parameter: default, positional-only (/), keyword-only (*), *args (tuple), **kwargs (dict).",
          "Lambda = fungsi satu ekspresi. Docstring = dokumentasi di bawah def. Scope: lokal di dalam, global di luar.",
        ],
      },
      {
        h: "Jebakan yang paling sering muncul",
        list: [
          "print di dalam fungsi ≠ return — panggilan prosedur menghasilkan None.",
          "Keyword argument boleh acak urutannya; positional tidak. Campur keduanya: positional dulu, keyword belakangan.",
          "Lambda terlalu kompleks = kode tak terbaca — kalau butuh if/loop, pindah ke def.",
          "Fungsi harus didefinisikan SEBELUM dipanggil — Python membaca file dari atas ke bawah.",
        ],
      },
      {
        h: "Peta keputusan memakai subprogram",
        table: {
          head: ["Kebutuhan", "Pakai", "Contoh"],
          rows: [
            ["Hasil nilai untuk dipakai", "Fungsi + return", "luas = hitung_luas(5, 10)"],
            ["Aksi saja (cetak, tulis file)", "Prosedur", "log_error('disk full')"],
            ["Banyak input tak tentu", "*args", "total(1, 2, 3, 4)"],
            ["Opsi bernama bebas", "**kwargs", "profil(nama='A', usia=17)"],
            ["Fungsi sekali-lihat", "lambda", "sort(key=lambda x: x[1])"],
          ],
        },
      },
    ],
    lab: {
      title: "Uji kompetensi 10 menit",
      intro: "Tiga soal praktik tanpa melihat materi. Boleh gagal — justru itu penanda bagian mana yang perlu diulang.",
      steps: [
        "Soal 1: buat fungsi rata_rata(*angka) yang mengembalikan rata-rata dari berapa pun bilangan. Uji dengan 2 dan 5 argumen.",
        "Soal 2: buat prosedur lapor(nama, skor) yang mencetak 'NAMA: skor' — panggil dengan keyword argument terbalik urutannya.",
        "Soal 3: konversi def dobel(x): return x * 2 menjadi lambda, lalu gunakan sebagai key untuk mengurutkan [(1, 3), (2, 1)] berdasarkan elemen kedua.",
        "Cek jawabanmu: apakah rata_rata mengembalikan float? apakah lapor memakai f-string? apakah key lambda-nya x: x[1]?",
      ],
      hint: "Soal 3: sort key harus mengambil ELEMEN KEDUA tuple. Kalau kamu menulis x: x[0], hasilnya terurut berdasarkan elemen pertama — bukan yang diminta.",
    },
    quiz: [
      {
        q: "def proses(a, b=2, *args, c): — pemanggilan yang SAH:",
        options: ["proses(1)", "proses(1, c=3)", "proses(1, 2, 3)", "proses(c=3)"],
        answer: 1,
        why: "a wajib (positional), b punya default, c WAJIB keyword-only (setelah *args). proses(1, c=3) mengisi semua; opsi lain kehilangan a atau c.",
      },
      {
        q: "def f(x): if x > 0: return 'positif' — dipanggil f(-3). Hasilnya?",
        options: ["'positif'", "None", "Error saat x <= 0", "0"],
        answer: 1,
        why: "Jalur eksekusi yang tidak melewati return menghasilkan None secara default. Pola 'return awal untuk kasus khusus' memang bekerja seperti ini.",
      },
      {
        q: "Manakah deklarasi LAMBDA yang sah?",
        options: [
          "lambda x: if x > 0: return x",
          "lambda x: x * 2",
          "lambda: (x) return x",
          "lambda x, y = 1: print(x); print(y)",
        ],
        answer: 1,
        why: "Lambda hanya berisi SATU ekspresi — bukan statement (if/return/print ganda). Opsi lain memuat statement atau struktur yang dilarang.",
      },
    ],
  },
];
