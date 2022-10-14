import sqlalchemy as _sql
import passlib.hash as _hash
import database as _database


class Admin(_database.Base):
    __tablename__ = "admin"
    username = _sql.Column(_sql.String, primary_key=True, index=True)
    hashed_password = _sql.Column(_sql.String, index=True)

    def encrypt_password(password: str):
        return _hash.bcrypt.hash(password)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Message(_database.Base):
    __tablename__ = "messages"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    message = _sql.Column(_sql.String, index=True)
