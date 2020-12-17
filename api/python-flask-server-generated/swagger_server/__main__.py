#!/usr/bin/env python3

import connexion
import sqlite3

from swagger_server import encoder
from flask_cors import CORS


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'API de classification de sons urbains'}, pythonic_params=True)
    CORS(app.app)
    conn = sqlite3.connect('predictions.db')
    c= conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS predictions (source text, rate real)''')
    conn.commit()
    conn.close()
    app.run(port=8080)


if __name__ == '__main__':
    main()
