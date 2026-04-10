from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse, JSONResponse

from app.core.auth import auth_client
from app.core.config import settings

user_router = APIRouter(prefix="/auth", tags=["user"])

@user_router.get("/None")
async def profile(request: Request, response: Response):
    store_options = {"request": request, "response": response}
    user = await auth_client.client.get_user(store_options=store_options)
    if not user:
        return {"error": "User not authenticated"}
    response = RedirectResponse(settings.FRONTEND_BASE_URL, status_code=302)
    response.set_cookie(
        key="user",
        value=user,
        httponly=True, #True
        secure=True,
        samesite="lax",
        max_age=300,
    )    
    return response
    #return {
    #    "message": "Your Profile",
    #    "data": user
    #}
#   # return user

@user_router.get("/me")
def whoami(request: Request):
    # Example API endpoint to check cookie-based session on server side
    user = request.cookies.get("user")
    if user:
        return JSONResponse({"authenticated": True, "user": user})
    return JSONResponse({"authenticated": False})

@user_router.get("/profile")
async def profile(request: Request, response: Response):
    store_options = {"request": request, "response": response}
    user = await auth_client.client.get_user(store_options=store_options)
    if not user:
        return {"error": "User not authenticated"}
    response = RedirectResponse(settings.FRONTEND_BASE_URL, status_code=302)
    response.set_cookie(
        key="user",
        value=user,
        httponly=True, #True
        secure=True,
        samesite="lax",
        max_age=300,
    )
    response.headers["Access-Control-Allow-Origin"] = "*";
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";    
    return response

