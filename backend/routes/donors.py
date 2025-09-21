from flask import Blueprint, request, jsonify
from ..storage import add_food_item, read_food_items
from backend.auth import login_required  # use decorator

donor_bp = Blueprint("donor", __name__)

# --- Test Endpoint ---
@donor_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Donor endpoint working!"})

# --- Add Food Item ---
@donor_bp.route("/add_food", methods=["POST"])
@login_required(role="donor")
def add_food(user):
    data = request.json
    item = add_food_item(user, data)
    return jsonify(item), 201

# --- List My Food Items ---
@donor_bp.route("/my_items", methods=["GET"])
@login_required(role="donor")
def my_food_items(user):
    df = read_food_items()
    my_items = df[df["donorId"] == user["uid"]]
    return jsonify(my_items.to_dict(orient="records")), 200
