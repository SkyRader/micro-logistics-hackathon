from flask import Blueprint, jsonify

ngo_bp = Blueprint('ngo', __name__)

@ngo_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "NGO endpoint working!"})
