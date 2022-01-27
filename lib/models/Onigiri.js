const pool = require('../utils/pool.js');

module.exports = class Onigiri {
  id;
  filling;
  shape;

  constructor(row) {
    this.id = row.id;
    this.filling = row.filling;
    this.shape = row.shape;
  }

  static async insert({ filling, shape }) {
    const { rows } = await pool.query(
      'INSERT INTO onigiri(filling, shape) VALUES ($1, $2) RETURNING *;',
      [filling, shape]
    );

    return new Onigiri(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM onigiri;');

    return rows.map((row) => new Onigiri(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM onigiri WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Onigiri(rows[0]);
  }

  static async update(id, { filling, shape }) {
    const existingOnigiri = await this.getById(id);

    if (!existingOnigiri) throw new Error('Not valid id');

    const onigiriFilling = filling ?? existingOnigiri.filling;
    const onigiriShape = shape ?? existingOnigiri.shape;

    const { rows } = await pool.query(
      'UPDATE onigiri SET filling=$1, shape=$2 WHERE id=$3 RETURNING *',
      [onigiriFilling, onigiriShape, id]
    );

    return new Onigiri(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM onigiri WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Onigiri(rows[0]);
  }
};
