import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Sauce from '../lib/models/Sauce.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST a new sauce', async () => {
    const res = await request(app)
      .post('/api/v1/sauces')
      .send({
        name: 'super hot',
        price: '$12.50',
        heat: 'pretty hot'
      });
 
    expect(res.body).toEqual({
      id: '1',
      name: 'super hot',
      price: '$12.50',
      heat: 'pretty hot'
    });
  });

  it('GET sauce by ID', async () => {
    const sauce = await Sauce.insert({
      name: 'aardy vaarky',
      price: '$7.99',
      heat: 'Medium light'
    });

    const res = await request(app)
      .get(`/api/v1/sauces/${sauce.id}`);
    expect(res.body).toEqual(sauce);
  });

});
