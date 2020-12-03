from tensorflow import keras
from pathlib import Path
import numpy as np
import os
import librosa
import glob

# On se positionne dans le dossier qui contient le script
# print(Path().cwd())
current_workdir = Path().cwd()
if current_workdir.name == "bruit_paris":
    os.chdir(current_workdir / "scripts")
if current_workdir.name == "python-flask-server-generated":
    os.chdir(current_workdir / "../../scripts")
# print(Path().cwd())

if Path().cwd().name != "scripts":
    print("Erreur: changer le dossier de travail")


classes = [
    "air_conditioner",
    "car_horn",
    "children_playing",
    "dog_bark",
    "drilling",
    "engine_idling",
    "gun_shot",
    "jackhammer",
    "siren",
    "street_music",
]

# model_path = [*Path("").rglob("urbansound8k.h5")][0]
model_path = "../model/urbansound8k.h5"
print(model_path)

model = keras.models.load_model(model_path)


def extract_features(file_name):
    try:
        print("file_name", file_name)
        print("work_dir", Path().cwd())
        audio, sample_rate = librosa.load(file_name, res_type="kaiser_fast")
        print("librosa.load()")
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        print("librosa.feature.mfcc()")
        mfccsscaled = np.mean(mfccs.T, axis=0)
        print("mean()")
    except Exception as e:
        print("exception", e)
        print("Error encountered while parsing file: ", file_name)
        return None
    return mfccsscaled


def predict(path):
    sound_path = Path(path)

    if not sound_path.exists():
        # print("Erreur: le fichier audio n'existe pas")
        # print("Recherche du fichier dans le dossier data")

        sound_path = [*Path("../data").rglob(path)][0]

        """
        if sound_path.exists():
            print("Le fichier a été trouvé: ")
            print(sound_path)
        else:
            print("Le fichier n'a pas été trouvé.")
        """

    if sound_path.exists():
        print("sound_path : ", sound_path)
        sound_features = extract_features(sound_path)
        sound_features = sound_features.reshape(1, 40)

        prediction = model.predict(sound_features)[0]

        predicted_classe_index = np.argmax(prediction)
        # predicted_classe = classes[predicted_classe_index]

        prediction_json = dict(zip(classes, prediction))
        return prediction_json
    else:
        return None


if __name__ == "__main__":
    files = [
        "101415-3-0-2.wav",
        "../data/urbansound8k/fold1/101415-3-0-2.wav",
        "62837-7-1-80.wav",
    ]

    for f in files:
        print(predict(f))