from typing import List
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas
import uvicorn

app = _fastapi.FastAPI()

# _services.create_database()


@app.post("/api/new_message/")
async def create_message(
    message: _schemas.MessageCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):

    return await _services.create_message(message=message, db=db)


@app.post("/api/new_admin/")
async def create_admin(
    admin: _schemas.AdminCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_admin = await _services.get_admin_by_id(username=admin.username, db=db)
    if db_admin:
        raise _fastapi.HTTPException(
            status_code=400, detail="Username already in use")
    admin = await _services.create_user(admin, db)

    return await _services.create_token(admin)


@app.post("/api/token/")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    admin = await _services.authenticate_admin(
        form_data.username, form_data.password, db)

    if not admin:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Login Details")
    return await _services.create_token(admin)


@app.get("/api/view_messages/", response_model=List[_schemas.Message])
def view_messages(skip: int = 0, limit: int = 10, db: _orm.Session = _fastapi.Depends(_services.get_current_user)):
    messages = _services.get_messages(db=db, skip=skip, limit=limit)
    return messages


@app.get("/api/view_admin/", response_model=List[_schemas.Admin])
def view_admin(skip: int = 0, limit: int = 10, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    admin = _services.get_admin(db=db, skip=skip, limit=limit)
    return admin


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8002, log_level="debug")
