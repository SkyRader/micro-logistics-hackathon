import os
import firebase_admin
from firebase_admin import credentials, auth

# 🔹 Get absolute path to the Firebase JSON key
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FIREBASE_KEY_PATH = os.path.join(BASE_DIR, "firebase-service-account.json")

# 🔹 Initialize Firebase app (only once)
if not firebase_admin._apps:  # avoids re-initialization errors
    cred = credentials.Certificate(FIREBASE_KEY_PATH)
    firebase_admin.initialize_app(cred)

# 🔹 Function to verify Firebase ID token
def verify_token(id_token):
    """
    Verify Firebase Authentication ID token and return decoded token.
    Raises firebase_admin.auth.InvalidIdTokenError if invalid.
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print("Token verification failed:", e)
        return None
