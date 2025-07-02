from pydantic import BaseModel
from typing import List
from datetime import datetime


class UsuarioBase(BaseModel):
    nombre: str
    correo: str


class UsuarioCreate(UsuarioBase):
    contrasena: str


class Usuario(UsuarioBase):
    id: int

    class Config:
        orm_mode = True


class DetalleCompraCreate(BaseModel):
    producto: str
    cantidad: int
    precio: float


class CompraCreate(BaseModel):
    usuario_id: int
    detalles: List[DetalleCompraCreate]


class Compra(BaseModel):
    id: int
    usuario_id: int
    fecha: datetime
    detalles: List[DetalleCompraCreate]

    class Config:
        orm_mode = True
