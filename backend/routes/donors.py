import pandas as pd
from flask import Blueprint, jsonify, Flask, request 
from backend.storage import get_current_user, add_food_item, read_food_items

df = pd.read_csv("food_items.csv")
app = Flask(__name__)
donor_bp = Blueprint('donor', __name__)

@donor_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Donor endpoint working!"})

@app.route("/donor/add_food", methods=["POST"])
def add_food():
    user = get_current_user()
    if not user or user["role"] != "Donor":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    item = add_food_item(user,data)
    return jsonify(item), 201

@app.route("/donor/myItems", methods=["GET"])
def my_food_items():
    user = get_current_user()
    if not user or user["role"] != "Donor":
        return jsonify({"error": "Unauthorized"}), 403
    
    df = read_food_items()
    my_items = df[df["donorId"]==user["id"]]
    return jsonify(my_items.to_dict(orient="records")), 200


