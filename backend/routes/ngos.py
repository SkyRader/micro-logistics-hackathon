from flask import Blueprint, request, jsonify
import pandas as pd
from backend.storage import read_food_items, claim_food_item, mark_delivered
from backend.auth import login_required

ngo_bp = Blueprint("ngo", __name__)

@ngo_bp.route("/available", methods=["GET"])
@login_required(role="ngo")
def available_food(user):
    category_filter = request.args.get('category')

    df = read_food_items()
    available = df[df["status"] == "Available"].copy()

    if category_filter and not available.empty:
        available = available[available['category'].str.lower() == category_filter.lower()]

    available_safe = available.fillna('')
    return jsonify(available_safe.to_dict(orient="records")), 200

# --- The rest of your file (test, claim, deliver, my_claims) is unchanged ---

@ngo_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "NGO endpoint working!"})

@ngo_bp.route("/claim/<food_id>", methods=["POST"])
@login_required(role="ngo")
def claim(user, food_id):
    claimed = claim_food_item(user, food_id)
    if not claimed:
        return jsonify({"error": "Food not available"}), 400
    return jsonify(claimed), 200

@ngo_bp.route("/deliver/<food_id>", methods=["POST"])
@login_required(role="ngo")
def deliver(user, food_id):
    delivered = mark_delivered(food_id)
    if not delivered:
        return jsonify({"error": "Food not found"}), 400
    return jsonify(delivered), 200

@ngo_bp.route("/my_claims", methods=["GET"])
@login_required(role="ngo")
def my_claims(user):
    df = read_food_items()
    my_claimed_items = df[df["claimedBy"] == user["uid"]]
    my_claimed_items_safe = my_claimed_items.fillna('')
    return jsonify(my_claimed_items_safe.to_dict(orient="records")), 200

