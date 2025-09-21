import pandas as pd
from flask import Blueprint, jsonify, Flask, request 

df = pd.read_csv("food_items.csv")
app = Flask(__name__)
donor_bp = Blueprint('donor', __name__)



@donor_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Donor endpoint working!"})

@app.route("/donor/add_food", methods=["POST"])
def add_food(id,donorId,imageURL,title,description,category,quantity,expiryDate,location,status):
    data = request.json
    df = pd.read_csv("food_items.csv")
    new_id = f"food_{str(uuid.uuid4())[:8]}"

    new_row = {
        "id": new_id,
        "donorId": user["id"],
        "imageURL": data.get("imageURL", ""),
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "category": data.get("category", ""),
        "quantity": data.get("quantity", 0),
        "expiryDate": data.get("expiryDate", ""),
        "location": data.get("location", ""),
        "status": "Available",
        "claimedBy": "",
        "claimedAt": "",
        "deliveredAt": ""
    }

    df_updated = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    return jsonify({"message": "Food added", "food_id": new_id})