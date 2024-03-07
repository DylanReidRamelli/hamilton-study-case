// Response model that ChatGPT produces.
export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }
  ];
}

export interface ErrorResponse {
  error: {
    message: string;
    type?: string;
    param?: string | null;
    code?: string | null;
  };
}
