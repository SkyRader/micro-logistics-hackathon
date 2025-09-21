import pandas as pd

USERS_FILE = "backend/data/users.csv"
FOOD_FILE = "backend/data/food_items.csv"

def read_csv(file_path):
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        return pd.DataFrame()

def write_csv(df, file_path):
    df.to_csv(file_path, index=False)