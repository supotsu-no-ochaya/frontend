import datetime
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/dish')
def get_current_time():
    """
    Returns the current time in a JSON format.
    """
    Output = {
    "dish": "Mochi",
    "price": "3.50€",
    "tags": ["vegan","food","nice"],
    "stock": "100",
    "timestamp": datetime.datetime.now()
    }

    return jsonify(Output)

if __name__ == '__main__':
    app.run(debug=True)