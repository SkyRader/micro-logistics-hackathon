import firebase_admin
from firebase_admin import credentials, auth
from flask import current_app

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate("backend/firebase-service-account.json")
    firebase_admin.initialize_app(cred)

def verify_token(token: str):
    """
    Verifies the Firebase token and returns a user dict.
    Example user dict: {"uid": "...", "email": "...", "role": "donor"}
    """
    try:
        decoded_token = auth.verify_id_token(token)
        # Example: store role in Firebase custom claims
        user = {
            "uid": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "role": decoded_token.get("role", "")  # role should be "donor" or "ngo"
        }
        return user
    except Exception as e:
        print("Token verification failed:", e)
        return None

# Decorator for route protection
from functools import wraps
from flask import request, jsonify

def login_required(role=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = request.headers.get("Authorization")
            if not token:
                return jsonify({"error": "Authorization token missing"}), 401

            user = verify_token(token)
            if not user:
                return jsonify({"error": "Invalid or expired token"}), 401

            if role and user.get("role", "").lower() != role.lower():
                return jsonify({"error": "Unauthorized role"}), 403

            return f(user, *args, **kwargs)  # pass user info to route
        return wrapper
    return decorator

