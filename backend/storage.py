import pandas as pd
from flask import request
from datetime import datetime

USERS_FILE = "backend/data/users.csv"
FOOD_FILE = "backend/data/food_items.csv"

def read_csv(file_path):
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        return pd.DataFrame()

def write_csv(df, file_path):
    df.to_csv(file_path, index=False)



# ---------- User helpers ----------
def read_users():
    return read_csv(USERS_FILE)

def write_users(df):
    write_csv(df, USERS_FILE)

def get_current_user():
    user_id = request.args.get("user_id")  # temporary until Firebase Auth
    users = read_users()
    if user_id not in users["id"].values:
        return None
    return users[users["id"] == user_id].iloc[0].to_dict()



# ---------- Food helpers ----------
def read_food_items():
    return read_csv(FOOD_FILE)

def write_food_items(df):
    write_csv(df, FOOD_FILE)

def add_food_item(user, data):
    df = read_food_items()
    new_id = f"food_{len(df)+1:03d}"
    item = {
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
    df = pd.concat([df, pd.DataFrame([item])], ignore_index=True)
    write_food_items(df)
    return item

def claim_food_item(ngo_user, food_id):
    df = read_food_items()
    idx = df.index[df["id"] == food_id]
    if len(idx) == 0 or df.at[idx[0], "status"] != "Available":
        return None
    idx = idx[0]
    df.at[idx, "status"] = "Claimed"
    df.at[idx, "claimedBy"] = ngo_user["id"]
    df.at[idx, "claimedAt"] = datetime.utcnow().isoformat()
    write_food_items(df)
    return df.iloc[idx].to_dict()

def mark_delivered(food_id):
    df = read_food_items()
    idx = df.index[df["id"] == food_id]
    if len(idx) == 0:
        return None
    idx = idx[0]
    df.at[idx, "status"] = "Delivered"
    df.at[idx, "deliveredAt"] = datetime.utcnow().isoformat()
    write_food_items(df)
    return df.iloc[idx].to_dict()
