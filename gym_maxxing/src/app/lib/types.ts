// User related types
export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }
  
  // Step log related types
  export interface StepLog {
    id: number;
    user_id: number;
    step_count: number;
    log_date: string;
    created_at: string;
  }
  
  // Step data formatted for UI
  export interface StepData {
    date: string;
    steps: number;
  }
  
  // API response types
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Request body types
  export interface LogStepsRequest {
    stepCount: number;
    date?: string;
  }

  // Fitness class information 
  export interface ClassInfo {
    classID: number;
    title?: string;
    date?: string;
    time?: string;
    trainerID?: number;
    trainerName?: string;
    classSize?: number;
  }
  
  export interface Trainer {
    trainerId: number;
    firstName?: string;
    lastName?: string;
    trainerName: string; // can either be concat(last, first) or 'first last'
    phone?: string;
    email?: string;
    expertise?: string;
    bio?: string;
    pictureUrl?: string;
  }