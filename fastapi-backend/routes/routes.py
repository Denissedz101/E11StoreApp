from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models
from schemas import schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/usuarios/", response_model=schemas.Usuario)
def crear_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    nuevo = models.Usuario(**usuario.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


@router.post("/compras/")
def crear_compra(compra: schemas.CompraCreate, db: Session = Depends(get_db)):
    nueva = models.Compra(usuario_id=compra.usuario_id)
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    for d in compra.detalles:
        detalle = models.DetalleCompra(compra_id=nueva.id, **d.dict())
        db.add(detalle)
    db.commit()
    return {"mensaje": "Compra registrada correctamente"}
