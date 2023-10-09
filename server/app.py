#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from sqlite3 import IntegrityError
from flask import Flask, request, jsonify
from flask_restful import Resource
from models import Student, Course, Enrollment,User
from flask import  render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# Local imports
from config import app, db, api,login_manager 
# Add your model imports


# Views go here!

@app.route('/')
def index():
    
    return '<h1>Project Server</h1>'



@app.route('/add-student', methods=['POST'])
def add_student():
    print("student")
    name = request.json.get('name')
    print(name)
    if name:
        student = Student(name=name)
        db.session.add(student)
        db.session.commit()
        return jsonify({"message": f"Added student: {name}"}), 201
    else:
        return jsonify({"error": "Name is required"}), 400
    
@app.route('/add-course', methods=['POST'])
def add_course():
    name = request.json.get('name')
    
    if not name:
        return jsonify({"error": "Name is required"}), 400

    try:
        course = Course(name=name)
        db.session.add(course)
        db.session.commit()
        return jsonify({"message": f"Added course: {name}"}), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Course name already exists"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while adding the course"}), 500


@app.route('/enroll-student', methods=['POST'])
def enroll_student():
    student_id = request.json.get('student_id')
    course_id = request.json.get('course_id')

    student = Student.query.get(student_id)
    course = Course.query.get(course_id)

    if not student:
        return jsonify({"error": "Student not found"}), 404

    if not course:
        return jsonify({"error": "Course not found"}), 404

    # Check if the student is already enrolled in the course
    existing_enrollment = Enrollment.query.filter_by(student_id=student_id, course_id=course_id).first()
    if existing_enrollment:
        return jsonify({"error": "Student is already enrolled in the course"}), 400

    enrollment = Enrollment(student=student, course=course)
    db.session.add(enrollment)
    db.session.commit()

    return jsonify({"message": f"Enrolled student {student.name} in course {course.name}"}), 201


@app.route('/list-students', methods=['GET'])
def list_students():
    students = Student.query.all()
    serialized_students = [student.to_dict() for student in students]
    return jsonify(serialized_students)

@app.route('/list-courses', methods=['GET'])
def list_courses():
    courses = Course.query.all()
    serialized_courses = [course.to_dict() for course in courses]
    return jsonify(serialized_courses)

@app.route('/delete-course/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": f"Deleted course: {course.name}"}), 200

@app.route('/delete-student/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    db.session.delete(student)
    db.session.commit()

    return jsonify({"message": f"Deleted student: {student.name}"}), 200

@app.route('/delete-all-enrollments', methods=['DELETE'])
def delete_all_enrollments():
    enrollments = Enrollment.query.all()
    for enrollment in enrollments:
        db.session.delete(enrollment)

    db.session.commit()

    return jsonify({"message": "All enrollments deleted"}), 200

@app.route('/generate-report', methods=['GET'])
def generate_report():
    enrollments = Enrollment.query.all()
    report_data = [{"Student": enrollment.student.to_dict(), "Course": enrollment.course.to_dict()} for enrollment in enrollments]
    
    return jsonify(report_data)



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    password_confirmation = data.get('passwordConfirmation')

    

    # Check if the email is already in use
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already in use"}), 400
    
    # Check if the user is already in use
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "username already in use"}), 400
    # Check if the passwords match
    if password != password_confirmation:
        return jsonify({"message": "Passwords do not match"}), 400

    # Create a new user
    user = User(username=username, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    # Parse login data from the request
    username = request.json.get('username')
    password = request.json.get('password')

    # Query the user from the database
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        # Log the user in
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401



@app.route('/check-authentication')
def check_authentication():
    if current_user.is_authenticated:
        return jsonify({'authenticated': True}), 200
    else:
        return jsonify({'authenticated': False}), 401
    
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)

