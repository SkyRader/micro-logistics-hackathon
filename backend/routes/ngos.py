from flask import Blueprint, request, jsonify
from backend.storage import read_food_items, claim_food_item, mark_delivered
from backend.auth import login_required

ngo_bp = Blueprint("ngo", __name__)

# --- Test Endpoint ---
@ngo_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "NGO endpoint working!"})

# --- List Available Food ---
@ngo_bp.route("/available", methods=["GET"])
@login_required(role="ngo")
def available_food(user):
    df = read_food_items()
    available = df[df["status"] == "Available"]
    return jsonify(available.to_dict(orient="records")), 200

# --- Claim Food Item ---
@ngo_bp.route("/claim/<food_id>", methods=["POST"])
@login_required(role="ngo")
def claim(user, food_id):
    claimed = claim_food_item(user, food_id)
    if not claimed:
        return jsonify({"error": "Food not available"}), 400
    return jsonify(claimed), 200

# --- Mark Delivered ---
@ngo_bp.route("/deliver/<food_id>", methods=["POST"])
@login_required(role="ngo")
def deliver(user, food_id):
    delivered = mark_delivered(food_id)
    if not delivered:
        return jsonify({"error": "Food not found"}), 400
    return jsonify(delivered), 200
