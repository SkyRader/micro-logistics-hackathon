import pandas as pd
from datetime import datetime, timezone
import csv

USERS_FILE = "backend/data/users.csv"
FOOD_FILE = "backend/data/food_items.csv"

def read_csv(file_path):
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        return pd.DataFrame()

def write_csv(df, file_path):
    df.to_csv(file_path, index=False, quoting=csv.QUOTE_MINIMAL)


# ---------- User helpers ----------
def read_users():
    return read_csv(USERS_FILE)

def write_users(df):
    write_csv(df, USERS_FILE)


# ---------- Food helpers ----------
def read_food_items():
    return read_csv(FOOD_FILE)

def write_food_items(df):
    write_csv(df, FOOD_FILE)

# REVERTED: This is the simpler version of the function
def add_food_item(user, data):
    df = read_food_items()
    new_id = f"food_{len(df)+1:03d}"

    item = {
        "id": new_id,
        "donorId": user["uid"],
        "imageURL": data.get("imageURL", ""),
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "category": data.get("category", ""),
        "quantity": data.get("quantity", 0),
        "expiryDate": data.get("expiryDate", ""), # Saves the date string directly
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
    df.at[idx, "claimedBy"] = ngo_user["uid"]
    df.at[idx, "claimedAt"] = datetime.now(timezone.utc).isoformat()
    write_food_items(df)
    return df.iloc[idx].to_dict()

def mark_delivered(food_id):
    df = read_food_items()
    idx = df.index[df["id"] == food_id]
    if len(idx) == 0:
        return None
    idx = idx[0]
    df.at[idx, "status"] = "Delivered"
    df.at[idx, "deliveredAt"] = datetime.now(timezone.utc).isoformat()
    write_food_items(df)
    return df.iloc[idx].to_dict()

