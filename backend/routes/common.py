from flask import Blueprint, request, jsonify
from backend.auth import login_required
from firebase_admin import auth

common_bp = Blueprint("common", __name__)

@common_bp.route("/register_role", methods=["POST"])
@login_required() # Requires a valid token, but no specific role
def register_role(user):
    """
    Assigns a role ('donor' or 'ngo') to the logged-in user
    by setting it as a Firebase Custom Claim.
    This should be called only once, immediately after sign-up.
    """
    data = request.get_json()
    role = data.get("role")

    if not role or role.lower() not in ["donor", "ngo"]:
        return jsonify({"error": "A valid role ('donor' or 'ngo') is required."}), 400

    try:
        uid = user["uid"]
        # This is the magic line that sets the role permanently in Firebase
        auth.set_custom_user_claims(uid, {"role": role.lower()})
        
        return jsonify({"message": f"User role successfully set to '{role.lower()}'."}), 200

    except Exception as e:
        # Log the error for debugging
        print(f"Error setting custom claim: {e}")
        return jsonify({"error": "An internal error occurred while setting the user role."}), 500
