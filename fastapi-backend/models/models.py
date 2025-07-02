from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True)
    nombre = Column(String)
    correo = Column(String, unique=True)
    contrasena = Column(String)
    compras = relationship("Compra", back_populates="usuario")


class Compra(Base):
    __tablename__ = "compras"
    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    fecha = Column(DateTime, default=datetime.utcnow)
    usuario = relationship("Usuario", back_populates="compras")
    detalles = relationship("DetalleCompra", back_populates="compra")


class DetalleCompra(Base):
    __tablename__ = "detalle_compras"
    id = Column(Integer, primary_key=True)
    compra_id = Column(Integer, ForeignKey("compras.id"))
    producto = Column(String)
    cantidad = Column(Integer)
    precio = Column(Float)
    compra = relationship("Compra", back_populates="detalles")
