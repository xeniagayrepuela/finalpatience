#!flask/bin/python
from flask import Flask, jsonify
from model import DBconn



app = Flask(__name__)


def spcall(qry, param, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res



@app.route('/')
def index():
    return "Hello, World!"


@app.route('/tasks', methods=['GET'])
def getalltasks():
    res = spcall('gettasks', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({"id": r[0], "title": r[1], "description": r[2], "done": str(r[3])})
    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

if __name__ == '__main__':
    app.run(debug=True)





