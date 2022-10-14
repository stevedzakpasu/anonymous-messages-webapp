import jwt as _jwt
from models import Admin
import models as _models
import database as _database
import schemas as _schemas
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import fastapi as _fastapi
import fastapi.security as _security

JWT_SECRET = "jwtsecret"
oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_admin_by_id(username: str, db: _orm.Session):
    return db.query(_models.Admin).filter(_models.Admin.username == username).first()


async def create_message(message: _schemas.MessageCreate, db: _orm.Session):
    message_obj = _models.Message(message=message.message)
    db.add(message_obj)
    db.commit()
    db.refresh(message_obj)
    return message_obj


def get_messages(db: _orm.Session, skip: int, limit: int):
    return db.query(_models.Message).offset(skip).limit(limit).all()


async def create_admin(admin: _schemas.AdminCreate, db: _orm.Session):
    admin_obj = _models.Admin(username=admin.username, hashed_password=_hash.bcrypt.hash(
        admin.password)
    )
    db.add(admin_obj)
    db.commit()
    db.refresh(admin_obj)
    return admin_obj


def get_admin(db: _orm.Session, skip: int, limit: int):
    return db.query(_models.Admin).offset(skip).limit(limit).all()


async def authenticate_admin(username: str, password: str, db: _orm.Session):
    admin = await get_admin_by_id(db=db, username=username)

    if not admin:
        return False

    if not admin.verify_password(password):

        return False

    return admin


async def create_token(admin: _models.Admin):
    admin_obj = _schemas.Admin.from_orm(admin)
    token = _jwt.encode(admin_obj.dict(), JWT_SECRET)
    return dict(access_token=token, token_type="bearer")


def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema),
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        admin = db.query(_models.Admin).get(payload["username"])
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Credentials"
        )

    return _schemas.Admin.from_orm(admin)
