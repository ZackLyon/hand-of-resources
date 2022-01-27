-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS color_palette;
DROP TABLE IF EXISTS random_number;
DROP TABLE IF EXISTS dessert;
DROP TABLE IF EXISTS onigiri;

CREATE TABLE color_palette (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  primary_name TEXT NOT NULL,
  primary_hex CHAR(6) NOT NULL,
  secondary_name TEXT NOT NULL,
  secondary_hex CHAR(6) NOT NULL
);

CREATE TABLE random_number (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  random_int INT NOT NULL,
  random_dec DEC NOT NULL
);

CREATE TABLE dessert (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  tasted BOOLEAN NOT NULL
);

CREATE TABLE onigiri (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  filling TEXT NOT NULL,
  shape TEXT NOT NULL
);