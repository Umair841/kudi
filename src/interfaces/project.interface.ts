export enum PROJECT_STATUS {
    STARTED = 'STARTED',
    ONGOING = 'ONGOING',
    RAISED = 'RAISED',
    FAILED = 'FAILED',
}

export interface ProjectMedia {
  url?: string;
}

export interface ProjectInterface {
  title: string;
  small_description: string;
  long_description: string;
  story: string;
  desired_amount: number;
  raised_amount: number;
  published_date: number;
  status: PROJECT_STATUS;
  publisherId: string;
  rate: number;
  images: ProjectMedia[];
  videos: ProjectMedia[];
}
