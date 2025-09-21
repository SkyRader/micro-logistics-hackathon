from flask import Blueprint, request, jsonify
from backend.storage import get_current_user, read_food_items, claim_food_item, mark_delivered

ngo_bp = Blueprint("ngo", __name__)

# --- Test Endpoint ---
@ngo_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "NGO endpoint working!"})

# --- List Available Food ---
@ngo_bp.route("/available", methods=["GET"])
def available_food():
    user = get_current_user()
    if not user or user["role"].lower() != "ngo":
        return jsonify({"error": "Unauthorized"}), 401

    df = read_food_items()
    available = df[df["status"] == "Available"]
    return jsonify(available.to_dict(orient="records")), 200

# --- Claim Food Item ---
@ngo_bp.route("/claim/<food_id>", methods=["POST"])
def claim(food_id):
    user = get_current_user()
    if not user or user["role"].lower() != "ngo":
        return jsonify({"error": "Unauthorized"}), 401

    claimed = claim_food_item(user, food_id)
    if not claimed:
        return jsonify({"error": "Food not available"}), 400
    return jsonify(claimed), 200

# --- Mark Delivered ---
@ngo_bp.route("/deliver/<food_id>", methods=["POST"])
def deliver(food_id):
    user = get_current_user()
    if not user or user["role"].lower() != "ngo":
        return jsonify({"error": "Unauthorized"}), 401

    delivered = mark_delivered(food_id)
    if not delivered:
        return jsonify({"error": "Food not found"}), 400
    return jsonify(delivered), 200
