from db_connection import get_db_connection
from flask import Flask, jsonify, request, Blueprint

semesters_bp = Blueprint('semesters', __name__)

# GET functions
@semesters_bp.route('/semester', methods=['GET'])
def get_semesters_by_class_route():
    db = get_db_connection()
    