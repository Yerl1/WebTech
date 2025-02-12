from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

db_host = "localhost"
db_port = "5434"
db_name = "appointment_db"
db_user = "postgres"
db_password = "Maqsat07112005."

def get_db_connection():
    return psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        password=db_password
    )

@app.route("/get_booked_slots", methods=["GET"])
def get_booked_slots():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT doctor, date, time FROM appointments;")
        data = cur.fetchall()
        booked_slots = {}
        for doctor, date, time in data:
            if doctor not in booked_slots:
                booked_slots[doctor] = {}
            if date not in booked_slots[doctor]:
                booked_slots[doctor][date] = []
            booked_slots[doctor][date].append(time)
        return jsonify(booked_slots)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route("/book_appointment", methods=["POST"])
def book_appointment():
    conn = get_db_connection()
    cur = conn.cursor()
    data = request.json
    try:
        cur.execute("""
            INSERT INTO appointments (doctor, date, time, first_name, last_name, phone, details)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (data["doctor"], data["date"], data["time"], data["first_name"], data["last_name"], data["phone"], data["details"]))
        conn.commit()
        return jsonify({"message": "Appointment booked successfully!"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
