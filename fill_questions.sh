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

# TODO: remove when question is impossible
wget "https://raw.githubusercontent.com/etalab-ia/piaf-ml/master/clients/${CLIENT}/knowledge_base/squad.json" -O "${SQUAD_FILE}"
jq -Mcr '[.data[] | select([.paragraphs[].qas[].is_impossible == false] | all) | .title] | sort | unique' > "${QUESTIONS_FILE}" < "${SQUAD_FILE}"

jq -Mcr --argfile groupInfo "${CLIENT}_questions.json" '.QUESTIONS = $groupInfo' "public/clients/${CLIENT}.json" > "public/clients/${CLIENT}_new.json"

mv "public/clients/${CLIENT}_new.json" "public/clients/${CLIENT}.json"
rm "${QUESTIONS_FILE}"
rm "${SQUAD_FILE}"