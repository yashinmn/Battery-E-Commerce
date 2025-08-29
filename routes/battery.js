import express from "express";
import { db } from "../sqlite.js";

const router = express.Router();

router.post("/filter", (req, res) => {
  const { vehicle, make, model, fuel } = req.body;

  let query = `SELECT * FROM batteries WHERE 1=1`;
  let params = [];

  if (vehicle) { query += ` AND vehicle_type = ?`; params.push(vehicle); }
  if (make)    { query += ` AND make = ?`; params.push(make); }
  if (model)   { query += ` AND model = ?`; params.push(model); }
  if (fuel)    { query += ` AND fuel = ?`; params.push(fuel); }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

export default router;
