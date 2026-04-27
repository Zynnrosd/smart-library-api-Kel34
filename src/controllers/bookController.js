import { BookModel } from '../models/bookModel.js';

export const BookController = {

  async getAllBooks(req, res) {
    try {
      const { title } = req.query;
      const books = await BookModel.getAll(title);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createBook(req, res) {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updated = await BookModel.update(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      await BookModel.delete(id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};