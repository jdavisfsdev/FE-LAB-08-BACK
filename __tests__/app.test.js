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
        heat: 'pretty hot',
        url: 'dvfsvf'
      });
 
    expect(res.body).toEqual({
      id: '1',
      name: 'super hot',
      price: '$12.50',
      heat: 'pretty hot',
      url: 'dvfsvf'
    });
  });

  it('GET sauce by ID', async () => {
    const sauce = await Sauce.insert({
      name: 'aardy vaarky',
      price: '$7.99',
      heat: 'Medium light',
      url: 'dvfsvf'
    });

    const res = await request(app)
      .get(`/api/v1/sauces/${sauce.id}`);
    expect(res.body).toEqual(sauce);
  });

  it('GET all sauces', async () => {
    const hot = await Sauce.insert({
      name: 'hot',
      price: '$3.99',
      heat: 'oohweee',
      url: 'dvfsvf'
    });

    const mild = await Sauce.insert({
      name: 'mild',
      price: '$7.50',
      heat: 'ehh',
      url: 'dvfsvf'
    });

    const res = await request(app)
      .get('/api/v1/sauces');

    expect(res.body).toEqual([hot, mild]);
  });

  it('UPDATE a sauce by id', async () => {
    const yikes = await request(app)
      .post('/api/v1/sauces')
      .send({
        name: 'yikess',
        price: '$44.00',
        heat: 'holy hell',
        url: 'cnjisld'
      });

    const yikesUpdate = await Sauce.updateItem(yikes.body.id, {
      name: 'YikesUpdated',
      price: '$44.00',
      heat: 'holy hell',
      url: 'tytyty'
    });

    const res = await request(app)
      .get(`/api/v1/sauces/${yikesUpdate.id}`);

    expect(res.body).toEqual(yikesUpdate);
  });

  it('DELETE sauce by ID', async () => {
    const yikes = await request(app)
      .post('/api/v1/sauces')
      .send({
        name: 'yikes',
        price: '$11',
        heat: 'uihd',
        url: 'qwqwq'
      });

    const res = await Sauce.deleteItem(yikes.body.id);
    request(app)
      .delete(`/api/v1/sauces/${yikes.id}`);
    expect(res.body).toEqual(yikes.id);
  });

});
