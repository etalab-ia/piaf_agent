export interface Feedback {
  question: string;
  is_correct_answer: boolean;
  document_id: string;
  model_id: number;
  is_correct_document: boolean;
  answer: string;
  offset_start_in_doc: number;
}