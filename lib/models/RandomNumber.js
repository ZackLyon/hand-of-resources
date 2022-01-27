const pool = require('../utils/pool.js');

module.exports = class RandomNumber {
  id;
  randomInt;
  randomDec;

  constructor(row) {
    this.id = row.id;
    this.randomInt = row.random_int;
    this.randomDec = row.random_dec;
  }

  static async insert({ random_int, random_dec }) {
    const { rows } = await pool.query(
      'INSERT INTO random_numbers(random_int, random_dec) VALUES ($1, $2) RETURNING *;',
      [random_int, random_dec]
    );

    return new RandomNumber(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM random_numbers;');

    return rows.map((row) => new RandomNumber(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM random_numbers WHERE id=$1;',
      [id]
    );

    if (!rows[0]) return null;
    return new RandomNumber(rows[0]);
  }

  static async update(id, { random_int, random_dec }) {
    const existingColors = await this.getById(id);

    if (!existingColors) throw new Error('Not valid id');

    const randomInt = random_int ?? existingColors.randomInt;
    const randomDec = random_dec ?? existingColors.randomDec;

    const { rows } = await pool.query(
      'UPDATE random_numbers SET random_int=$1, random_dec=$2 WHERE id=$3 RETURNING *',
      [randomInt, randomDec, id]
    );

    return new RandomNumber(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM random_numbers WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new RandomNumber(rows[0]);
  }
};