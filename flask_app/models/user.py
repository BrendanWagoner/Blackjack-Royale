from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class User:

    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']
        self.coins = data['coins']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    # create
    @classmethod
    def create_user(cls, data):
        sql = '''INSERT INTO users(username, email, password, coins, created_at, updated_at)
        VALUES(%(username)s, %(email)s, %(password)s, 300, NOW(), NOW());'''
        results = connectToMySQL('twentyone').query_db(sql, data)

        return results

    # read
    @classmethod
    def get_user(cls, data):
        sql = 'SELECT * FROM users WHERE id=%(id)s;'
        results = connectToMySQL('twentyone').query_db(sql, data)
        
        return cls(results[0])
    
    @classmethod
    def get_user_by_email(cls, data):
        sql = 'SELECT * FROM users WHERE email=%(email)s;'
        results = connectToMySQL('twentyone').query_db(sql, data)
        if len(results) < 1:
            return False
        return cls(results[0])

    # update 
    @classmethod
    def update_user(cls, data):
        sql = '''UPDATE users
        set username=%(username)s, email=%(email)s, password=%(password)s, coins=%(coins)s, updated_at=NOW()
        WHERE id=%(id)s;'''

        return connectToMySQL('twentyone').query_db(sql, data)
    
    @classmethod
    def update_user_coins(cls, data):
        sql = 'UPDATE users set coins=%(coins)s WHERE id=%(id)s'

        return connectToMySQL('twentyone').query_db(sql, data)
    
    # delete
    @classmethod
    def delete_user(cls, data):
        sql = 'DELETE FROM users WHERE id=%(id)s;'
        result = connectToMySQL('twentyone').query_db(sql, data)

    #validation
    
    @staticmethod
    def validate_user(user):
        is_valid = True
        if len(user['username']) < 2:
            flash('Username must be at least 2 characters long', 'registration_error')
            is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            flash('Please enter a valid email', 'registration_error')
            is_valid = False
        if len(user['password']) < 8:
            flash('Password must be at least 8 characters long', 'registration_error')
            is_valid = False
        if User.special_character_count(user['password']) < 1:
            flash('Password needs at least one uppercase character', 'registration_error')
            is_valid = False
        if User.digit_count(user['password']) < 1:
            flash('Password needs at least one number', 'registration_error')
            is_valid = False
        if user['confirm'] != user['password']:
            flash('confirmation password and password did not match', 'registration_error')
            is_valid = False
        if User.get_user_by_email({'email':user['email']}) != False:
            flash('email already in use')
            is_valid = False

        return is_valid
    
    @staticmethod
    def special_character_count(string):
        counter = 0
        for char in string:
            if char.isupper():
                counter +=1
        
        return counter
    
    @staticmethod
    def digit_count(string):
        counter = 0
        for char in string:
            if char.isdigit():
                counter += 1

        return counter


