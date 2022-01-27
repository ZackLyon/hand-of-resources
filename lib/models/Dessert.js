const pool = require('../utils/pool.js');

module.exports = class Dessert {
  id;
  name;
  tasted;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.tasted = row.tasted;
  }

  static async insert({ name, tasted }) {
    const { rows } = await pool.query(
      'INSERT INTO dessert(name, tasted) VALUES ($1, $2) RETURNING *;',
      [name, tasted]
    );

    return new Dessert(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dessert;');

    return rows.map((row) => new Dessert(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dessert WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Dessert(rows[0]);
  }

  static async update(id, { name, tasted }) {
    const existingDessert = await this.getById(id);

    if (!existingDessert) throw new Error('Not valid id');

    const dessertName = name ?? existingDessert.name;
    const dessertTasted = tasted ?? existingDessert.tasted;

    const { rows } = await pool.query(
      'UPDATE dessert SET name=$1, tasted=$2 WHERE id=$3 RETURNING *',
      [dessertName, dessertTasted, id]
    );

    return new Dessert(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM dessert WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Dessert(rows[0]);
  }
};
