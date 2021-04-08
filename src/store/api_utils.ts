import axios from 'axios'

export async function callInferenceAsync(question?: string) {
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
