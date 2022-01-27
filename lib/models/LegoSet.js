const pool = require('../utils/pool.js');

module.exports = class LegoSet {
  id;
  name;
  pieces;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.pieces = row.pieces;
  }

  static async insert({ name, pieces }) {
    const { rows } = await pool.query(
      'INSERT INTO lego(name, pieces) VALUES ($1, $2) RETURNING *;',
      [name, pieces]
    );

    return new LegoSet(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM lego;');

    return rows.map((row) => new LegoSet(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM lego WHERE id=$1;', [id]);

    if (!rows[0]) return null;
    return new LegoSet(rows[0]);
  }

  static async update(id, { name, pieces }) {
    const existingSet = await this.getById(id);

    if (!existingSet) throw new Error('Not valid id');

    const setName = name ?? existingSet.name;
    const setPieces = pieces ?? existingSet.pieces;

    const { rows } = await pool.query(
      'UPDATE lego SET name=$1, pieces=$2 WHERE id=$3 RETURNING *',
      [setName, setPieces, id]
    );

    return new LegoSet(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM lego WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new LegoSet(rows[0]);
  }
};
