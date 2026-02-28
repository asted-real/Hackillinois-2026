import os
import eng_to_ipa as ipa
import numpy as np
import random

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

def has_numbers(inputString):
    return any(char.isdigit() for char in inputString)

def get_sanitized_word_array(input_file):
    word_list = []
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        for line in infile:
            # Skip empty lines or comment lines if they exist
            if not line.strip() or line.startswith(';;;'):
                continue
            
            # The word is the first element before the phonetic markers
            parts = line.split()
            if not parts:
                continue
                
            word = parts[0]
            
            # Filter out entries with parentheses (duplicates/variants)
            # e.g., AARONSON(1) or ABKHAZIAN(3)
            if "(" not in word and "." not in word and not has_numbers(word):
                word_list.append(word)
                
    return word_list

words = np.array(get_sanitized_word_array('cmudict-0.7b.txt'))


# 0 easy: 3 to 5 characters 
# 1 med:  6 to 8 characters
# 2 hard: >8 characters


def random_word(dif):
    indices = np.array([])
    if (dif == 0):
        indices = np.where((np.char.str_len(words) > 2) & (np.char.str_len(words) < 6))
    elif(dif==1):
        indices = np.where((5 < np.char.str_len(words)) & (np.char.str_len(words) < 9))
    else:
        indices = np.where((8 < np.char.str_len(words)))

    san_words = words[indices]
    rand_idx = np.random.uniform(0, len(san_words))
    rand_word = san_words[int(rand_idx)]
    return rand_word


# correctness check (str response, str correct)
# goes through str response, for the size of whatever's shorter, compare char
# check place and char.compare; if indi
def correct_check(response, english):
	answer_list = []
	answer_list = ipa.convert(english,keep_punct=False,stress_marks=False,retrieve_all=True)
	str_response = []
	for answer in answer_list:
		for i in range(len(response)):
			if (i == len(answer)):
				print("stuck at len check")
				str_response.append("Missing symbols after position " + str(i))
				break
			if (response[i] != answer[i]):
				print("stuck at comparison at position " + str(i) + "with chars " + response[i] + " and " + answer[i])
				str_response.append("Missing symbols after position " + str(i))
				break
	if (len(str_response) == len(answer_list)):
		return str_response[0]
	return "Correct!!"
