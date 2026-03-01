from flask import Flask, request, jsonify
from flask_cors import CORS
import word_funcs as wf
import eng_to_ipa as ipa

from flask import Flask
import eng_to_ipa as ipa

app = Flask(__name__)
CORS(app)

@app.route('/word_gen',methods=['POST'])
def word_gen():
	data = request.get_json()
	diff = data.get("difficulty",0) # default to 0 if missing
	word = wf.random_word(diff)
	return jsonify({ 'word': word}) 

@app.route('/check_answer', methods=['POST'])
def check_answer():
	data = request.get_json()
	response = data.get("response", "")
	english = data.get("english", "")
	feedback = wf.correct_check(response, english)
	return jsonify({ 'feedback': feedback})

@app.route('/correct_answer',methods=['POST'])
def correct_answer():
	data = request.get_json()
	word = word = data.get("word", "")
	return jsonify({
        'answer_list': ipa.convert(
            word,
            keep_punct=False,
            stress_marks=False,
            retrieve_all=True
        )
    })

if __name__ == '__main__':
	app.run()
