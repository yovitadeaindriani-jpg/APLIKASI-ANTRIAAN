import { useRef, useState } from "react";

export default function AdminLogin({ onMasuk }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [galat, setGalat] = useState("");
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  function tanganiSubmit(event) {
    event.preventDefault();

    if (email.trim() === "") {
      setGalat("Email wajib diisi.");
      refEmail.current.focus();
      return;
    }

    if (!refEmail.current.validity.valid) {
      setGalat("Format email tidak valid.");
      refEmail.current.focus();
      return;
    }

    if (password === "") {
      setGalat("Password wajib diisi.");
      refPassword.current.focus();
      return;
    }

    setGalat("");
    onMasuk();
  }

  return (
    <section>
      <p>Halaman ini hanya untuk petugas.</p>
      <form onSubmit={tanganiSubmit} noValidate>
        <p role="alert">{galat}</p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            ref={refEmail}
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setGalat("");
            }}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            ref={refPassword}
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setGalat("");
            }}
          />
        </p>
        <button type="submit">Masuk</button>
      </form>
    </section>
  );
}
