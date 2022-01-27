const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dessert = require('../lib/models/Dessert.js');

describe('dessert routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObjSend = {
    name: 'mochi butter cake',
    tasted: false,
  };

  const testObjReceive = {
    id: expect.any(String),
    name: 'mochi butter cake',
    tasted: false,
  };

  it('should create a dessert', async () => {
    const desserts = await request(app).post('/desserts').send(testObjSend);

    expect(desserts.body).toEqual(testObjReceive);
  });

  it('should get all desserts', async () => {
    await Dessert.insert(testObjSend);
    const desserts = await request(app).get('/desserts');

    expect(desserts.body[0]).toEqual(testObjReceive);
  });

  it('should get a dessert by id', async () => {
    const { id } = await Dessert.insert(testObjSend);
    const desserts = await request(app).get(`/desserts/${id}`);

    expect(desserts.body).toEqual(testObjReceive);
  });

  it('should update a dessert', async () => {
    const { id } = await Dessert.insert(testObjSend);
    const desserts = await request(app)
      .patch(`/desserts/${id}`)
      .send({ ...testObjSend, tasted: false });

    expect(desserts.body).toEqual({
      ...testObjReceive,
      tasted: false,
    });
  });

  it('should delete a dessert', async () => {
    const { id } = await Dessert.insert(testObjSend);
    const desserts = await request(app).delete(`/desserts/${id}`);

    expect(desserts.body).toEqual(testObjReceive);
    expect(await Dessert.getById(id)).toBeNull();
  });
});
