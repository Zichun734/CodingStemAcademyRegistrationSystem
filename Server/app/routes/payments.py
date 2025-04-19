from db_connection import get_db_connection
from flask import jsonify, request, Blueprint

payments_bp = Blueprint('payments', __name__)

# GET functions
@payments_bp.route('/payments', methods=['GET'])
def get_payments():
    db = get_db_connection()
    try:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM payments"
        cursor.execute(sql)
        payments = cursor.fetchall()
    finally:
        db.close()
        cursor.close()
    return jsonify({'message': 'Payments retrieved', 'payments': payments})