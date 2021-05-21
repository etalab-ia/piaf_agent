import axios from 'axios'
axios.defaults.timeout = 10000;

export async function callInferenceAsync(question?: string, filters?: any) {
  interface ServerResponse {
    data: InferenceResult;
  }
  interface InferenceResult {
    query: string;
    answers: Array<Answer>;
  }
  interface Answer {
    answer: string;
    context: string;
    probability: number;
  }

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
