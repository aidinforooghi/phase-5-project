from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from werkzeug.security import generate_password_hash, check_password_hash

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    

class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey('students.id', ondelete="CASCADE"))
    course_id = Column(Integer, ForeignKey('courses.id', ondelete="CASCADE"))
    student = relationship("Student")
    course = relationship("Course")

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'
    
    @property
    def is_active(self):
        # Replace this logic with your own to determine if the user is active
        return True  # Change this based on your use case
    
    @property
    def is_authenticated(self):
        return True  # Implement your authentication logic here

    @property
    def is_anonymous(self):
        return False
    
    def get_id(self):
        return str(self.id)