import eng_to_ipa as ipa
import word_funcs as wf

from flask import Flask

app = Flask(__name__)




@app.route('/word_gen')
def word_gen(diff):
	return { 'word': wf.random_word(diff) } 

@app.route('/check_answer')
def check_answer(response,english):
	return { 'feedback': wf.correct_check(response,english)}

@app.route('/correct_answer')
def correct_answer(word):
	return {'answer_list':ipa.convert(word,keep_punct=False,stress_marks=False,retrieve_all=True)}