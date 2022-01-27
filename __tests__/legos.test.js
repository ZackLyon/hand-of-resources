const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const LegoSet = require('../lib/models/LegoSet.js');

describe('lego set entry routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObjSend = {
    name: 'Treehouse',
    pieces: 12345,
  };

  const testObjReceive = {
    id: expect.any(String),
    name: 'Treehouse',
    pieces: 12345,
  };

  it('should create a lego set entry', async () => {
    const legos = await request(app).post('/legos').send(testObjSend);

    expect(legos.body).toEqual(testObjReceive);
  });

  it('should get all lego set entries', async () => {
    await LegoSet.insert(testObjSend);
    const legos = await request(app).get('/legos');

    expect(legos.body[0]).toEqual(testObjReceive);
  });

  it('should get a lego set entry by id', async () => {
    const { id } = await LegoSet.insert(testObjSend);
    const legos = await request(app).get(`/legos/${id}`);

    expect(legos.body).toEqual(testObjReceive);
  });

  it('should update a lego set entry', async () => {
    const { id } = await LegoSet.insert(testObjSend);
    const legos = await request(app)
      .patch(`/legos/${id}`)
      .send({ ...testObjSend, name: 'Castle' });

    expect(legos.body).toEqual({
      ...testObjReceive,
      name: 'Castle',
    });
  });

  it('should delete a lego set entry', async () => {
    const { id } = await LegoSet.insert(testObjSend);
    const legos = await request(app).delete(`/legos/${id}`);

    expect(legos.body).toEqual(testObjReceive);
    expect(await LegoSet.getById(id)).toBeNull();
  });
});
