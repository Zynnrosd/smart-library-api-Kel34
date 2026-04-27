import { AuthorModel } from '../models/authorModel.js';

export const AuthorController = {
  async getAuthors(req,res){
    const data = await AuthorModel.getAll(req.query.name);
    res.json(data);
  },
  async getById(req,res){
    res.json(await AuthorModel.getById(req.params.id));
  },
  async create(req,res){
    const {name,nationality}=req.body;
    res.status(201).json(await AuthorModel.create(name,nationality));
  },
  async update(req,res){
    const {name,nationality}=req.body;
    res.json(await AuthorModel.update(req.params.id,name,nationality));
  },
  async delete(req,res){
    res.json(await AuthorModel.delete(req.params.id));
  }
};