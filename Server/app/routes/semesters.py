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


@semesters_bp.route('/semester', methods=['GET'])
def get_semester_by_id_route():
    db = get_db_connection()
    semester_id = request.args.get('id')
    try:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM semesters WHERE id = %s"
        cursor.execute(sql, (semester_id,))
        semester = cursor.fetchone()
    finally:
        db.close()
        cursor.close()
    if not semester:
        return jsonify({'message': 'Semester not found'}), 404
    return jsonify({'message': 'Semester retrieved', 'semester': semester}), 200

@semesters_bp.route('/current-semester', methods=['GET'])
def get_current_semester_route():
    db = get_db_connection()
    try:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM semesters WHERE status = 'Ongoing'"
        cursor.execute(sql)
        semester = cursor.fetchone()
    finally:
        db.close()
        cursor.close()
    if not semester:
        return jsonify({'message': 'No current semester found'}), 404
    return jsonify({'message': 'Current semester retrieved', 'semester': semester}), 200