"""Importation du script """
from urbansound8k_prediction import predict


""" Définition du chemin d'accès au fichier

Il faut soit:
- Donner le chemin d'accès absolu
- Donner le chemin d'accès relatif au dossier de script
- Donner le nom du fichier, il cherchera automatiquement dans le dossier /data
"""
# path = "../data/urbansound8k/fold1/101415-3-0-2.wav"
path = "101415-3-0-2.wav"

"""Récupération de la prédiction

Le résultat est sous forme de json:
{'air_conditioner': 7.674067e-15,
'car_horn': 2.020573e-16,
'children_playing': 5.08345e-13,
'dog_bark': 0.99997056,
'drilling': 6.5932766e-11,
'engine_idling': 1.183696e-14,
'gun_shot': 2.939075e-05,
'jackhammer': 1.415391e-22,
'siren': 2.9641058e-08,
'street_music': 7.97623e-09}
"""
prediction = predict(path)


"""On affiche le résultat"""
print(f"La prédiction de {path} est :\n {prediction}")