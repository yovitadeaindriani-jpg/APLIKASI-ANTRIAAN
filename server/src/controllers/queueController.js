import { listQueues } from "../services/queueService.js";
/* GET /api/queues — daftar antrean hari ini (FR-01).
Query string `status` sudah dipastikan sah oleh validateQueueQuery, jadi
di sini ia tinggal dipakai. */
export function getQueues(req, res) {
  const queues = listQueues({ status: req.query.status });
  res.status(200).json({ data: queues });
}
