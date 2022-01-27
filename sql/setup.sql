-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS color_palette;
DROP TABLE IF EXISTS random_numbers;

CREATE TABLE color_palette (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  primary_name TEXT NOT NULL,
  primary_hex CHAR(6) NOT NULL,
  secondary_name TEXT NOT NULL,
  secondary_hex CHAR(6) NOT NULL
);

CREATE TABLE random_numbers (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  random_int INT NOT NULL,
  random_dec DEC NOT NULL
);