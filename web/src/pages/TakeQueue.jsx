import { useRef, useState } from "react";

export default function AdminLogin({ onMasuk }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [galat, setGalat] = useState(null);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

  function tanganiSubmit(event) {
    event.preventDefault();

    const aturan = [
      {
        ref: refEmail,
        salah: () => email.trim() === "",
        pesan: "Email wajib diisi.",
      },
      {
        ref: refEmail,
        salah: () => refEmail.current.validity.typeMismatch,
        pesan: "Format email tidak valid. Contoh: petugas@queueapp.test",
      },
      {
        ref: refPassword,
        salah: () => password === "",
        pesan: "Password wajib diisi.",
      },
    ];

    const ditemukan = aturan.find((a) => a.salah());

    if (ditemukan) {
      setGalat({
        pesan: ditemukan.pesan,
        ref: ditemukan.ref,
      });

      ditemukan.ref.current.focus();
      return;
    }

    setGalat(null);
    onMasuk();
  }

  const bersihkan = () => setGalat(null);

  const ditandai = (ref) =>
    galat?.ref === ref ? "true" : undefined;

  return (
    <>
      <p>
        Halaman ini hanya untuk petugas. Pengunjung tidak perlu masuk.
      </p>

      <form onSubmit={tanganiSubmit} noValidate>
        <fieldset>
          <legend>Kredensial petugas</legend>

          <p className="pesan-galat" role="alert">
            {galat?.pesan ?? ""}
          </p>

          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              required
              ref={refEmail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                bersihkan();
              }}
              aria-invalid={ditandai(refEmail)}
              aria-describedby="bantuan-email"
            />

            <span className="bantuan" id="bantuan-email">
              Contoh: petugas@queueapp.test
            </span>
          </p>

          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              ref={refPassword}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                bersihkan();
              }}
              aria-invalid={ditandai(refPassword)}
            />
          </p>

          <button type="submit">Masuk</button>
        </fieldset>
      </form>
    </>
  );
}
