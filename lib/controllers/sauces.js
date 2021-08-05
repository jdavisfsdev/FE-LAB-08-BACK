import { Router } from 'express';
import Sauce from '../models/Sauce';

export default Router()
  .post('/api/v1/sauces', async (req, res) => {
    try {
      const sauce = await Sauce.insert(req.body);
      res.send(sauce);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/sauces/:id', async (req, res) => {
    try {
      const sauce = await Sauce.findById(req.params.id);
      res.send(sauce);
    } catch(err) {
      res.status(500).send(err);
    }
  });
