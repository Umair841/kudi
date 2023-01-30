import * as mongoose from 'mongoose';
import { ProjectInterface } from '../interfaces/project.interface';

const projectMediaSchema = new mongoose.Schema({
  url: String,
});
const projectSchema = new mongoose.Schema({
  title: String,
  small_description: String,
  long_description: String,
  story: String,
  desired_amount: Number,
  raised_amount: Number,
  published_date: Number,
  status: {
    type: String,
    enum: ['STARTED', 'ONGOING', 'RAISED', 'FAILED'],
    default: 'STARTED',
  },
  publisherId: String,
  rate: Number,
  images: [projectMediaSchema],
  videos: [projectMediaSchema],
});

const projectModel = mongoose.model<ProjectInterface & mongoose.Document>('User', projectSchema);

export default projectModel;
