import axios from 'axios'
axios.defaults.timeout = 5000;

export async function callInferenceAsync(question?: string, filters?: any) {
  interface ServerResponse {
    data: ServerData;
  }
  interface ServerData {
    answers: Array<InferenceResult>;
  }
  interface InferenceResult {
    question: string;
    answers: Array<Answer>;
  }
  interface Answer {
    answer: string;
    context: string;
    probability: number;
  }

  let res: ServerResponse

  const maxDepth = Math.max(...filters.map((o: any) => o.depth))
  const lastFilter: any = filters.find((f: any) => f.depth === maxDepth )
  const f: any = {}
  if(lastFilter){ f[lastFilter["id"]] = lastFilter["value"]}

  try {
    res = await axios.post(process.env.VUE_APP_API_URL, {
        "query": question
      }
    );
    return res.data.answers
  } catch (error) {
    console.log(error, 'err')
    return false
  }
}
