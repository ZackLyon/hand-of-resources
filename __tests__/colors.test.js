const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ColorPalette = require('../lib/models/Color.js');

describe('color palette routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObjSend = {
    primary_name: 'RaisinBlack',
    primary_hex: '141b3c',
    secondary_name: 'AntiqueWhite',
    secondary_hex: 'faebd7',
  };

  const testObjReceive = {
    id: expect.any(String),
    primaryName: 'RaisinBlack',
    primaryHex: '141b3c',
    secondaryName: 'AntiqueWhite',
    secondaryHex: 'faebd7',
  };

  it('should create a color palette', async () => {
    const colors = await request(app).post('/colors').send(testObjSend);

    expect(colors.body).toEqual(testObjReceive);
  });

  it('should get all color palettes', async () => {
    await ColorPalette.insert(testObjSend);
    const colors = await request(app).get('/colors');

    expect(colors.body[0]).toEqual(testObjReceive);
  });

  it('should get a color palette by id', async () => {
    const { id } = await ColorPalette.insert(testObjSend);
    const colors = await request(app).get(`/colors/${id}`);

    expect(colors.body).toEqual(testObjReceive);
  });

  it('should update a color palette', async () => {
    const { id } = await ColorPalette.insert(testObjSend);
    const colors = await request(app)
      .patch(`/colors/${id}`)
      .send({ ...testObjSend, primary_name: 'working test' });

    expect(colors.body).toEqual({
      ...testObjReceive,
      primaryName: 'working test',
    });
  });

  it('should delete a color palette', async () => {
    const { id } = await ColorPalette.insert(testObjSend);
    const colors = await request(app).delete(`/colors/${id}`);

    expect(colors.body).toEqual(testObjReceive);
    expect(await ColorPalette.getById(id)).toBeNull();
  });
});
