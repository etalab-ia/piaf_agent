import axios from 'axios'
import {Feedback} from  '../feedback'
axios.defaults.timeout = 10000;

interface ServerResponse {
  data: InferenceResult;
}
interface InferenceResult {
  query: string;
  answers: Array<Answer>;
}

export interface Answer {
  answer: string;
  context: string;
  probability: number;
  meta: Meta;
}

interface Meta {
  weight?: number;
}


export async function callInferenceAsync(question?: string, filters?: any) {

  interface Query {
    query: string;
    filters: unknown[];
    top_k_reader: number;
    top_k_retriever: number;
  }


  const maxDepth = Math.max(...filters.map((o: any) => o.depth))
  const lastFilter: any = filters.find((f: any) => f.depth === maxDepth )
  const f: any = {}
  if(lastFilter){ f[lastFilter["id"]] = lastFilter["value"]}

  try {
    const res = await axios.post<Query, ServerResponse>(global.piafAgentConfig.API_URL, {
        "query": question,
        "filters": f,
        "top_k_reader": 3,
        "top_k_retriever": 5
      }
    );
    return res.data
  } catch (error) {
    console.log(error, 'err')
    return false
  }
}


export async function sendFeedbackAsync(feedback:Feedback) :Promise<string>{
  const endpoint: string = global.piafAgentConfig.API_URL.replace('query','feedback')
  try {
    const res = await axios.post<Feedback, string>(endpoint, feedback);
    return res
  } catch (error) {
    console.log(error, 'err')
    return ''
  }
}