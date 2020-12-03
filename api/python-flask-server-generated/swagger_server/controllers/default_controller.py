import connexion
import six

from swagger_server.models.prediction import Prediction  # noqa: E501
from swagger_server.models.sound import Sound  # noqa: E501
from swagger_server import util

import base64
import sys
sys.path.insert(0, '../../scripts')
import os
from urbansound8k_prediction import predict
import json

def sounds_prediction_post(body):  # noqa: E501
    """Renvoie une prédiction de la source du bruit

    Renvoie la source détectée et le taux de confiance de la prédiction # noqa: E501

    :param body: Fichier audio du son
    :type body: dict | bytes

    :rtype: Prediction
    """
    if connexion.request.is_json:
        body = Sound.from_dict(connexion.request.get_json())  # noqa: E501
        saveWavFile(body.binary)
        prediction = predict("../data/decoded_wav.wav")
        print(prediction)
        rate = max(prediction.values())
        source = [k for k, v in prediction.items() if v == rate][0]
        deleteWavFile()
        print("SOURCE :", source)
        print("RATE :", type(rate))
        result = Prediction(source, rate)
        print("RES :", result)
        jsonObjetReturn = json.dumps(str(result))
    else: 
        print("body not json")
    return jsonObjetReturn


def test_get():  # noqa: E501
    """test d&#x27;un get sur l&#x27;API

     # noqa: E501


    :rtype: str
    """
    return 'do some magic!'

def saveWavFile(base64_sound):
    base64_wav_bytes = base64_sound.encode('utf-8')
    with open('../data/decoded_wav.wav', 'wb') as file_to_save:
        decoded_wav_data = base64.decodebytes(base64_wav_bytes)
        file_to_save.write(decoded_wav_data)
    file_to_save.close()
    print("wav file saved !")

def deleteWavFile():
    os.remove("../data/decoded_wav.wav") 