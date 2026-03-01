from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import word_funcs as wf
import eng_to_ipa as ipa
import os

from flask import Flask
import eng_to_ipa as ipa

app = app = Flask(
    __name__,
    static_folder="../IPA-site/build",
    static_url_path=""
)
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
	word = data.get("word", "")
	return jsonify({
        'answer_list': ipa.convert(
            word,
            keep_punct=False,
            stress_marks=False,
            retrieve_all=True
        )
    })

# Serve React static files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    build_dir = app.static_folder
    file_path = os.path.join(build_dir, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    else:
        # Always return index.html for React Router routes
        return send_from_directory(build_dir, "index.html")