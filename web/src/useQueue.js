
import { useState, useEffect, useCallback } from "react";
import {
  emptyState,
  takeQueue,
  callNext,
  completeQueue,
} from "./queue.js";
import {
  muatAntrean,
  simpanAntrean,
  muatNomorSaya,
  simpanNomorSaya,
} from "./storage.js";

export function useQueue() {
  const [state, setState] = useState(() => {
    const data = muatAntrean();
    return data ?? emptyState();
  });

  const [nomorSaya, setNomorSaya] = useState(() => muatNomorSaya());
  const [pesan, setPesan] = useState("");
  const [sibuk, setSibuk] = useState(false);

  useEffect(() => {
    simpanAntrean(state);
  }, [state]);

  const jalankan = useCallback(
    async (aksi) => {
      setSibuk(true);
      setPesan("");

      let hasil = null;

      try {
        hasil = aksi(state);

        if (!hasil.ok) {
          setPesan(hasil.message);
          return null;
        }

        setState(hasil.state);
      } catch (galat) {
        setPesan(galat.message);
        return null;
      } finally {
        setSibuk(false);
      }

      return hasil;
    },
    [state],
  );

  const ambilNomor = useCallback(async () => {
    const dibuat = await jalankan(takeQueue);

    if (!dibuat) return;

    setNomorSaya(dibuat.queue.id);
    simpanNomorSaya(dibuat.queue.id);
  }, [jalankan]);

  const panggilBerikutnya = useCallback(async () => {
    await jalankan(callNext);
  }, [jalankan]);

  const selesaikan = useCallback(async (id) => {
    await jalankan((data) => completeQueue(data, id));
  }, [jalankan]);

  const muatUlang = useCallback(() => {
    const data = muatAntrean();

    setState(data ?? emptyState());
    setNomorSaya(muatNomorSaya());
    setPesan("");
  }, []);

  return {
    status: "siap",
    antrean: state.queues,
    galat: null,
    nomorSaya:
      nomorSaya === null
        ? null
        : state.queues.find((queue) => queue.id === nomorSaya) ?? null,
    pesan,
    sibuk,
    muatUlang,
    ambilNomor,
    panggilBerikutnya,
    selesaikan,
  };
}
