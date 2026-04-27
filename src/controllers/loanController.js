import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  async create(req,res){
    const {book_id,member_id,due_date}=req.body;
    res.json(await LoanModel.createLoan(book_id,member_id,due_date));
  },

  async returnBook(req,res){
    res.json(await LoanModel.returnBook(req.params.id));
  },

  async getAll(req,res){
    res.json(await LoanModel.getAllLoans());
  }
};