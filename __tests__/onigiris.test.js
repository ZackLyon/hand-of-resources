const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Onigiri = require('../lib/models/Onigiri.js');

describe('onigiri routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObjSend = {
    filling: 'umeboshi',
    shape: 'circle',
  };

  const testObjReceive = {
    id: expect.any(String),
    filling: 'umeboshi',
    shape: 'circle',
  };

  it('should create a onigiri', async () => {
    const onigiris = await request(app).post('/onigiris').send(testObjSend);

    expect(onigiris.body).toEqual(testObjReceive);
  });

  it('should get all onigiris', async () => {
    await Onigiri.insert(testObjSend);
    const onigiris = await request(app).get('/onigiris');

    expect(onigiris.body[0]).toEqual(testObjReceive);
  });

  it('should get a onigiri by id', async () => {
    const { id } = await Onigiri.insert(testObjSend);
    const onigiris = await request(app).get(`/onigiris/${id}`);

    expect(onigiris.body).toEqual(testObjReceive);
  });

  it('should update a onigiri', async () => {
    const { id } = await Onigiri.insert(testObjSend);
    const onigiris = await request(app)
      .patch(`/onigiris/${id}`)
      .send({ ...testObjSend, shape: 'triangle' });

    expect(onigiris.body).toEqual({
      ...testObjReceive,
      shape: 'triangle',
    });
  });

  it('should delete a onigiri', async () => {
    const { id } = await Onigiri.insert(testObjSend);
    const onigiris = await request(app).delete(`/onigiris/${id}`);

    expect(onigiris.body).toEqual(testObjReceive);
    expect(await Onigiri.getById(id)).toBeNull();
  });
});
