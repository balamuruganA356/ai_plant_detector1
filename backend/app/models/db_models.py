import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=True)
    full_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    diagnoses = relationship("PlantDiagnosisModel", back_populates="user")
    chat_messages = relationship("ChatHistoryModel", back_populates="user")

class PlantDiagnosisModel(Base):
    __tablename__ = "plant_diagnoses"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    plant_name = Column(String, nullable=False)
    plant_confidence = Column(Float, nullable=False)
    
    disease_name = Column(String, nullable=False)
    disease_confidence = Column(Float, nullable=False)
    is_healthy = Column(Boolean, default=False)
    
    severity_level = Column(String, nullable=False)
    severity_score = Column(Float, nullable=False)
    severity_description = Column(Text, nullable=True)
    
    health_score = Column(Integer, default=70)
    symptoms_json = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)
    
    immediate_actions_json = Column(Text, nullable=True)
    prevention_tips_json = Column(Text, nullable=True)
    
    weather_temp = Column(Float, nullable=True)
    weather_humidity = Column(Float, nullable=True)
    weather_rainfall = Column(Float, nullable=True)
    weather_risk_level = Column(String, nullable=True)
    
    image_path = Column(Text, nullable=True)
    mode = Column(String, default="demo")

    user = relationship("User", back_populates="diagnoses")
    history_records = relationship("DiseaseHistoryModel", back_populates="diagnosis")

class DiseaseHistoryModel(Base):
    __tablename__ = "disease_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    diagnosis_id = Column(String, ForeignKey("plant_diagnoses.id"))
    plant_name = Column(String, nullable=False)
    disease_name = Column(String, nullable=False)
    health_score = Column(Integer, nullable=False)
    severity_score = Column(Float, nullable=False)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

    diagnosis = relationship("PlantDiagnosisModel", back_populates="history_records")

class ChatHistoryModel(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    sender = Column(String, nullable=False) # 'user' or 'assistant'
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="chat_messages")
