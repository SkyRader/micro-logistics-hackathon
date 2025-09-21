from flask import Blueprint, request, jsonify
from ..storage import get_current_user, add_food_item, read_food_items

donor_bp = Blueprint("donor", __name__)

# --- Test Endpoint ---
@donor_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Donor endpoint working!"})

# --- Add Food Item ---
@donor_bp.route("/add_food", methods=["POST"])
def add_food():
    user = get_current_user()
    if not user or user["role"].lower() != "donor":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    item = add_food_item(user, data)
    return jsonify(item), 201

# --- List My Food Items ---
@donor_bp.route("/my_items", methods=["GET"])
def my_food_items():
    user = get_current_user()
    if not user or user["role"].lower() != "donor":
        return jsonify({"error": "Unauthorized"}), 403

    df = read_food_items()
    my_items = df[df["donorId"] == user["id"]]
    return jsonify(my_items.to_dict(orient="records")), 200
