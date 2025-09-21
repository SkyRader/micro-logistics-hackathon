from flask import Blueprint, jsonify

donor_bp = Blueprint('donor', __name__)

@donor_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Donor endpoint working!"})