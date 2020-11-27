# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.prediction import Prediction  # noqa: E501
from swagger_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_sounds_prediction_post(self):
        """Test case for sounds_prediction_post

        Renvoie une prédiction de la source du bruit
        """
        body = Object()
        response = self.client.open(
            '/v1/sounds/prediction',
            method='POST',
            data=json.dumps(body),
            content_type='audio/*')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
