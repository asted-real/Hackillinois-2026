import eng_to_ipa as ipa
import word_funcs as wf
from flask_cors import CORS

from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app) 


@app.route('/word_gen', methods=['POST'])
def word_gen():
    data = request.get_json()
    diff = data.get("difficulty", 0)
    return jsonify({ 'word': wf.random_word(diff) })

@app.route('/check_answer')
def check_answer(response,english):
	return { 'feedback': wf.correct_check(response,english)}

@app.route('/correct_answer')
def correct_answer(word):
	return {'answer_list':ipa.convert(word,keep_punct=False,stress_marks=False,retrieve_all=True)}

if __name__ == '__main__':
	app.run()