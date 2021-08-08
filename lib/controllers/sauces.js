import { Router } from 'express';
import Sauce from '../models/Sauce.js';

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
  })

  .get('/api/v1/sauces', async (req, res) => {
    try {
      const sauces = await Sauce.findAllItems();
      res.send(sauces);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .put('/api/v1/sauces/:id', async (req, res) => {
    try {
      const sauce = await Sauce.updateItem(req.params.id);
      res.send(sauce);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .delete('/api/v1/sauces/:id', async (req, res) => {
    try {
      const sauce = await Sauce.deleteItem(req.params.id);
      res.send(sauce);
    } catch (err) {
      res.status(500).send(err);
    }
  });
