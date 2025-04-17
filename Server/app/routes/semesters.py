from db_connection import get_db_connection
from flask import Flask, jsonify, request, Blueprint

semesters_bp = Blueprint('semesters', __name__)

# GET functions
@semesters_bp.route('/semesters', methods=['GET'])
def get_semesters_by_class_route():
    db = get_db_connection()
    try:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM semesters"
        cursor.execute(sql)
        semesters = cursor.fetchall()
    finally:
        db.close()
        cursor.close()
    if not semesters:
        return jsonify({'message': 'No semesters found'}), 200
    return jsonify({'message': 'Semesters retrieved', 'semesters': semesters}), 200