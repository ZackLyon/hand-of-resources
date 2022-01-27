const pool = require('../utils/pool.js');

module.exports = class ColorPalette {
  id;
  primaryName;
  primaryHex;
  secondaryName;
  secondaryHex;

  constructor(row) {
    this.id = row.id;
    this.primaryName = row.primary_name;
    this.primaryHex = row.primary_hex;
    this.secondaryName = row.secondary_name;
    this.secondaryHex = row.secondary_hex;
  }

  static async insert({
    primary_name,
    primary_hex,
    secondary_name,
    secondary_hex,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO color_palette(primary_name, primary_hex, secondary_name, secondary_hex) VALUES ($1, $2, $3, $4) RETURNING *;',
      [primary_name, primary_hex, secondary_name, secondary_hex]
    );

    return new ColorPalette(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM color_palette;');

    return rows.map((row) => new ColorPalette(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM color_palette WHERE id=$1;',
      [id]
    );

    if (!rows[0]) return null;
    return new ColorPalette(rows[0]);
  }

  static async update(
    id,
    { primary_name, primary_hex, secondary_name, secondary_hex }
  ) {
    const existingColors = await this.getById(id);

    if (!existingColors) throw new Error('Not valid id');

    const primaryName = primary_name ?? existingColors.primaryName;
    const primaryHex = primary_hex ?? existingColors.primaryHex;
    const secondaryName = secondary_name ?? existingColors.secondaryName;
    const secondaryHex = secondary_hex ?? existingColors.secondaryHex;

    const { rows } = await pool.query(
      'UPDATE color_palette SET primary_name =$1, primary_hex=$2, secondary_name=$3, secondary_hex=$4 WHERE id=$5 RETURNING *',
      [primaryName, primaryHex, secondaryName, secondaryHex, id]
    );

    return new ColorPalette(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM color_palette WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new ColorPalette(rows[0]);
  }
};
