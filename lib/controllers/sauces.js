import { Router } from 'express';
import Sauce from '../models/Sauce';

module.exports = Router()
  .post('/api/v1/sauces', async (req, res) => {
    try {
      const sauce = await Sauce.insert(req.body);
      res.send(sauce);
    } catch(err) {
      res.status(500).send(err);
    }
  });
