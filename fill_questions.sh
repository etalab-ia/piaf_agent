#!/bin/bash
set -x
set -eufo pipefail


if [ -z ${1+x} ]; then
  echo 'Usage: "./fill_questions.sh {CLIENT}"';
  echo 'Example: "./fill_questions.sh cnil"';
  exit 1
fi
CLIENT=${1}

SQUAD_FILE="${CLIENT}_squad.json"
QUESTIONS_FILE="${CLIENT}_questions.json"

wget "https://raw.githubusercontent.com/etalab-ia/piaf-ml/master/clients/${CLIENT}/knowledge_base/squad.json" -O "${SQUAD_FILE}"
jq -Mcr '[.data[].paragraphs[].qas[] | select(.is_impossible == false) | .question] | sort | unique' "${SQUAD_FILE}" > "${QUESTIONS_FILE}"

jq -Mcr --argfile questions "${CLIENT}_questions.json" '.AUTOCOMPLETE_QUESTIONS.questions = $questions' "public/clients/${CLIENT}.json" > "public/clients/${CLIENT}_new.json"

mv "public/clients/${CLIENT}_new.json" "public/clients/${CLIENT}.json"
rm "${QUESTIONS_FILE}"
rm "${SQUAD_FILE}"