import axios from 'axios'

export async function callInferenceAsync(question?: string) {
  interface ServerResponse {
    data: ServerData;
  }
  interface ServerData {
    results: Array<InferenceResult>;
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
        "questions": [
          question
        ],
        "top_k_reader": 3,
        "top_k_retriever": 5
      }
    );
    return res.data.results
  } catch (error) {
    console.log(error, 'err')
    return false
  }
}
