from flask import Flask, jsonify
from flask_cors import CORS  # Keep this import
from .routes.donors import donor_bp
from .routes.ngos import ngo_bp
from .routes.common import common_bp

app = Flask(__name__)

# --- THIS IS THE IMPORTANT CHANGE ---
# Configure CORS to be less restrictive and allow the necessary headers.
CORS(app, resources={r"/*": {"origins": "*"}})
# This explicitly allows all origins to access all routes.
# For production, you would restrict this to your actual frontend URL.
# Example: CORS(app, resources={r"/*": {"origins": "https://your-frontend-domain.com"}})

# Register Blueprints
app.register_blueprint(donor_bp, url_prefix='/donor')
app.register_blueprint(ngo_bp, url_prefix='/ngo')
app.register_blueprint(common_bp, url_prefix='/common')

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)

