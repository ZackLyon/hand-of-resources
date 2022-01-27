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
      'INSERT INTO random_number(random_int, random_dec) VALUES ($1, $2) RETURNING *;',
      [random_int, random_dec]
    );

    return new RandomNumber(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM random_number;');

    return rows.map((row) => new RandomNumber(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM random_number WHERE id=$1;',
      [id]
    );

    if (!rows[0]) return null;
    return new RandomNumber(rows[0]);
  }

  static async update(id, { random_int, random_dec }) {
    const existingNumber = await this.getById(id);

    if (!existingNumber) throw new Error('Not valid id');

    const randomInt = random_int ?? existingNumber.randomInt;
    const randomDec = random_dec ?? existingNumber.randomDec;

    const { rows } = await pool.query(
      'UPDATE random_number SET random_int=$1, random_dec=$2 WHERE id=$3 RETURNING *',
      [randomInt, randomDec, id]
    );

    return new RandomNumber(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM random_number WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new RandomNumber(rows[0]);
  }
};
