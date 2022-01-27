const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const RandomNumber = require('../lib/models/RandomNumber.js');

describe('random number entry routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObjSend = {
    random_int: 456,
    random_dec: 123.456,
  };

  const testObjReceive = {
    id: expect.any(String),
    randomInt: 456,
    randomDec: '123.456',
  };

  it('should create a random number entry', async () => {
    const numbers = await request(app).post('/numbers').send(testObjSend);

    expect(numbers.body).toEqual(testObjReceive);
  });

  it('should get all random number entries', async () => {
    await RandomNumber.insert(testObjSend);
    const numbers = await request(app).get('/numbers');

    expect(numbers.body[0]).toEqual(testObjReceive);
  });

  it('should get a random number entry by id', async () => {
    const { id } = await RandomNumber.insert(testObjSend);
    const numbers = await request(app).get(`/numbers/${id}`);

    expect(numbers.body).toEqual(testObjReceive);
  });

  it('should update a random number entry', async () => {
    const { id } = await RandomNumber.insert(testObjSend);
    const numbers = await request(app)
      .patch(`/numbers/${id}`)
      .send({ ...testObjSend, random_int: 46464684 });

    expect(numbers.body).toEqual({
      ...testObjReceive,
      randomInt: 46464684,
    });
  });

  it('should delete a random number entry', async () => {
    const { id } = await RandomNumber.insert(testObjSend);
    const numbers = await request(app).delete(`/numbers/${id}`);

    expect(numbers.body).toEqual(testObjReceive);
    expect(await RandomNumber.getById(id)).toBeNull();
  });
});
