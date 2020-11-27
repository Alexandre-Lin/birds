import connexion
import six

from swagger_server.models.prediction import Prediction  # noqa: E501
from swagger_server import util


def sounds_prediction_post(body):  # noqa: E501
    """Renvoie une prédiction de la source du bruit

    Renvoie la source détectée et le taux de confiance de la prédiction # noqa: E501

    :param body: Fichier audio du son
    :type body: dict | bytes

    :rtype: Prediction
    """
    if connexion.request.is_json:
        body = Object.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
