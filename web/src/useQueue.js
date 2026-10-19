import { useState, useEffect } from "react";
import {
  emptyState,
  takeQueue,
  callNext,
  completeQueue,
  hapusAntreanA003,
} from "./queue.js";
import { muat, simpan } from "./storage.js";

export function useQueue() {
  const [app, setApp] = useState(() => ({
    data: hapusAntreanA003(muat() ?? emptyState()),
    pesan: "",
  }));

  useEffect(() => {
    simpan(hapusAntreanA003(app.data));
  }, [app.data]);

  function jalankan(aksi) {
    setApp((sebelum) => {
      const hasil = aksi(sebelum.data);

      if (!hasil.ok) {
        return {
          data: hapusAntreanA003(sebelum.data),
          pesan: hasil.message,
        };
      }

      return {
        data: hapusAntreanA003(hasil.state),
        pesan: "",
      };
    });
  }

  return {
    state: app.data,
    pesan: app.pesan,
    ambilNomor: () => jalankan(takeQueue),
    panggilBerikutnya: () => jalankan(callNext),
    selesaikan: (id) =>
      jalankan((data) => completeQueue(data, id)),
  };
}
