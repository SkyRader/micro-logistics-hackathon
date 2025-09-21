# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS

# Relative imports for your blueprints
from .routes.donors import donor_bp
from .routes.ngos import ngo_bp

import firebase_admin
from firebase_admin import credentials

app = Flask(__name__)
CORS(app)  # Allow frontend requests

import os
from firebase_admin import credentials

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred_path = os.path.join(BASE_DIR, "firebase-service-account.json")
cred = credentials.Certificate(cred_path)  # adjust if file is elsewhere

firebase_admin.initialize_app(cred)

# Register Blueprints
app.register_blueprint(donor_bp, url_prefix='/donor')
app.register_blueprint(ngo_bp, url_prefix='/ngo')

@app.route('/')
def home():
    return jsonify({"message": "Backend is running with Firebase!"})

if __name__ == '__main__':
    app.run(debug=True)
