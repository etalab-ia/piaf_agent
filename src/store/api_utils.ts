import axios from 'axios'

export async function callInferenceAsync(question?: string) {
  interface ServerResponse {
    data: ServerData;
  }
  interface ServerData {
    results: InferenceResult;
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
    res = await axios.post('https://piaf.datascience.etalab.studio/models/1/doc-qa', {
        "questions": [
          question
        ],
        "top_k_reader": 1,
        "top_k_retriever": 5
      }
    );
    return res.data.results
  } catch (error) {
    console.log(error, 'err')
    return false
  }
}
