#import controllers here
from flask_app.controllers import controller
from flask_app import app


if __name__ == '__main__':
    app.run(debug=True, port=5000)