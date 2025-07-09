export interface Project {
  id: string;
  name: string;
  details: string;
  division: string;
  stakeholder: string;
  businessSponsor: string[];
  developer: string[];
  status: string[];
  statusDetails: string;
  nextSteps: string;
  milestoneDate: string;
  gitlabLinks: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}