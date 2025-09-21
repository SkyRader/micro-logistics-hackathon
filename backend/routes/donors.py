from flask import Blueprint, request, jsonify
import pandas as pd  # 1. Import pandas
from ..storage import add_food_item, read_food_items
from backend.auth import login_required

donor_bp = Blueprint("donor", __name__)

# --- Test Endpoint (unchanged) ---
@donor_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Donor endpoint working!"})

# --- Add Food Item (unchanged) ---
@donor_bp.route("/add_food", methods=["POST"])
@login_required(role="donor")
def add_food(user):
    data = request.json
    item = add_food_item(user, data)
    return jsonify(item), 201

# --- List My Food Items (THIS IS THE FIX) ---
@donor_bp.route("/my_items", methods=["GET"])
@login_required(role="donor")
def my_food_items(user):
    df = read_food_items()
    my_items = df[df["donorId"] == user["uid"]]
    
    # 2. Replace any NaN values with an empty string.
    # This ensures the data is clean before converting to a dictionary.
    my_items_safe = my_items.fillna('')
    
    return jsonify(my_items_safe.to_dict(orient="records")), 200

