import os
import httpx

from fastapi import APIRouter, Request, Response, HTTPException
from fastapi.responses import JSONResponse

import secrets
from urllib.parse import urlencode

from fastapi.responses import RedirectResponse
from app.core.config import settings
from app.core.auth import auth_client

my_auth_router = APIRouter(prefix="/auth", tags=["auth"])

AUTH0_DOMAIN = settings.AUTH0_DOMAIN              # e.g. your-tenant.us.auth0.com
AUTH0_CLIENT_ID = settings.AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET = settings.AUTH0_CLIENT_SECRET
AUTH0_CALLBACK_URL = settings.AUTH0_CALLBACK_URL  # must exactly match Auth0 app config

@my_auth_router.get("/login")
async def auth_login(request: Request, response: Response):
    if 'access_token' in request.cookies:
        store_options = {"request": request, "response": response}
        user = await auth_client.client.get_user(store_options=store_options)
        if user:
#            print(f"user:${user}")
            return {
                "data": user,
                "isLoading": "false"
            }
    state = secrets.token_urlsafe(32)

    params = urlencode({
        "response_type": "code",
        "client_id": AUTH0_CLIENT_ID,
        "redirect_uri": AUTH0_CALLBACK_URL,
        "scope": "openid profile email offline_access",
        "state": state,
    })

    redirect_url = f"https://{AUTH0_DOMAIN}/authorize?{params}"
#    print(f"my auth login: redirect url: ${redirect_url}")
    response = RedirectResponse(redirect_url)
 
    response.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=300,
    )
    return response

@my_auth_router.get("/callback")
async def auth_callback(request: Request, code: str, state: str):
    expected_state = request.cookies.get("oauth_state")
    if not expected_state or state != expected_state:
        raise HTTPException(status_code=400, detail="Invalid state")

    token_url = f"https://{AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "code": code,
        "redirect_uri": AUTH0_CALLBACK_URL,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(token_url, json=payload)

    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    tokens = resp.json()
    response = JSONResponse(tokens)
    access_token = response
    response.delete_cookie("oauth_state")
    response = RedirectResponse("http://localhost:5173")
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=300,
    )    
    return response
