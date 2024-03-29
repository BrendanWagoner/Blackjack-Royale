from flask import Flask, render_template, redirect, request, session, flash, jsonify
from flask_app import app
from flask_bcrypt import Bcrypt
from flask_app.models import user
import os, re

bcrypt = Bcrypt(app)
CLEANR = re.compile('<.*?>')

@app.route('/')
@app.route('/play')
def play():

    return render_template('table.html')

@app.route('/<int:id>/play')
def render_user_table(id):
    if 'user_id' not in session:
        flash('Please log in', 'login_error')
        return redirect('/login')
    
    return render_template('user_table.html', u=user.User.get_user({'id':id}))

@app.route('/login', methods=['POST', 'GET'])
def login_index():
    if request.method == 'GET':

        return render_template('login.html')
    
    elif request.method == 'POST':
        u = user.User.get_user_by_email({'email': request.form['user-email']})

        if not u:
            flash('invalid email or password', 'login_error')
            return redirect('/login')
        if not bcrypt.check_password_hash(u.password, request.form['user-password']):
            flash('invalid password, please try again.', 'login_error')
            return redirect('/login')
        
        if 'user_id' not in session:
            session['user_id'] = u.id
            session['coins'] = u.coins

        return redirect(f'/{u.id}/play')


@app.route('/register', methods=['POST'])
def register_user():
    print(request.form)

    if not user.User.validate_user(request.form):
        return redirect('/login')
    
    pw_hash = bcrypt.generate_password_hash(request.form['password'])

    user_id = user.User.create_user({'username': request.form['username'], 'email': request.form['email'], 'password': pw_hash})

    u = user.User.get_user({'id':user_id})
    if 'user_id' not in session:
        session['user_id'] = user_id
        session['coins'] = u.coins

    return redirect(f'/{user_id}/play')

# @app.route('/login', methods=['POST'])
# def login_user():
#     u = user.User.get_user_by_email({'email': request.form['user-email']})

#     if not u:
#         flash('invalid email or password', 'login_error')
#         return redirect('/login')
#     if not bcrypt.check_password_hash(u.password, request.form['user-password']):
#         flash('invalid password, please try again.', 'login_error')
#         return redirect('/login')
    
#     session['user_id'] = u.id

#     return redirect(f'/{u.id}/play')

# TODO update user username and coin after logging out 
@app.route('/logout')
def logout():
    user.User.update_user_coins({'id':session['user_id'], 'coins': session['coins']})
    session.clear()

    return redirect('/play')
