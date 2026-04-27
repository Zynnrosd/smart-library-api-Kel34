import { ReportModel } from '../models/reportModel.js';

export const ReportController = {
  async stats(req,res){
    res.json(await ReportModel.getStats());
  }
};