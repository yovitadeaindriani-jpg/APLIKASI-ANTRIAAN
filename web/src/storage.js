import { STATUS, emptyState } from "./queue.js";

const KUNCI = "queueapp.prototype.v1";

function bentuknyaBenar(data) {
  return (
    data !== null &&
    typeof data === "object" &&
    Number.isInteger(data.lastNumber) &&
    Array.isArray(data.queues) &&
    data.queues.every(
      (queue) =>
        Number.isInteger(queue.id) &&
        typeof queue.queueNumber === "string" &&
        Object.hasOwn(STATUS, queue.status),
    )
  );
}

function bersihkanA003(data) {
  const queues = data.queues.filter(
    (queue) => queue.queueNumber !== "A003",
  );

  return {
    ...data,
    queues,
    myQueueId: queues.some(
      (queue) => queue.id === data.myQueueId,
    )
      ? data.myQueueId
      : null,
  };
}

export function muat() {
  try {
    const teks = localStorage.getItem(KUNCI);
    if (!teks) return emptyState();

    const data = JSON.parse(teks);
    if (!bentuknyaBenar(data)) return emptyState();

    const hasil = bersihkanA003(data);
    localStorage.setItem(KUNCI, JSON.stringify(hasil));

    return hasil;
  } catch {
    return emptyState();
  }
}

export function simpan(state) {
  try {
    localStorage.setItem(
      KUNCI,
      JSON.stringify(bersihkanA003(state)),
    );
  } catch {}
}
