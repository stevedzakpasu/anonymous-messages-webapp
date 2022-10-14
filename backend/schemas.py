import pydantic as _pydantic


class _MessageBase(_pydantic.BaseModel):
    message: str


class MessageCreate(_MessageBase):

    class Config:
        orm_mode = True


class Message(_MessageBase):
    id: int

    class Config:
        orm_mode = True


class _AdminBase(_pydantic.BaseModel):
    username: str


class AdminCreate(_AdminBase):
    password: str

    class Config:
        orm_mode = True


class Admin(_AdminBase):
    pass

    class Config:
        orm_mode = True
