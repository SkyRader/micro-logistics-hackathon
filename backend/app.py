from flask import Flask, jsonify
from routes.donors import donor_bp
from routes.ngos import ngo_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(donor_bp, url_prefix='/donor')
app.register_blueprint(ngo_bp, url_prefix='/ngo')

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)