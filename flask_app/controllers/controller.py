from flask import Flask, render_template, redirect, request, session, flash, jsonify
from flask_app import app

@app.route('/')
@app.route('/play')
def play():

    return render_template('table.html')