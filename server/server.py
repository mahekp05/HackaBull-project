from flask import Flask, jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)

@app.route("/api/test", methods=["GET"])
def return_home():
    return jsonify({"message": "This message is coming from the Flask backend, and is displayed on the Next.js frontend."})

if __name__ == "__main__":
    app.run(debug=True, port=8080)