import * as mongoose from 'mongoose';
import { ProjectMedia } from '../interfaces/project.interface';

const projectMediaSchema = new mongoose.Schema({
  url: String,
});

const projectMediaModel = mongoose.model<ProjectMedia & mongoose.Document>('User', projectMediaSchema);

export default projectMediaModel;
