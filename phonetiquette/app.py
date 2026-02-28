from flask import Flask, request, jsonify
from flask_cors import CORS
import word_funcs as wf


from flask import Flask

app = Flask(__name__)

@app.route('/word_gen')
def word_gen(diff):
	return jsonify({ 'word': wf.random_word(diff) }) 

@app.route('/check_answer', methods=['POST'])
def check_answer(response,english):
	return jsonify({ 'feedback': wf.correct_check(response,english)})

@app.route('/correct_answer')
def correct_answer(word):
	return {'answer_list':ipa.convert(word,keep_punct=False,stress_marks=False,retrieve_all=True)}

if __name__ == '__main__':
	app.run()
