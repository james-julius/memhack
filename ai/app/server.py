import hmac
import os

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from kinmi_speak.chain import chain as kinmi_speak_chain
from langserve import add_routes
from starlette.status import HTTP_401_UNAUTHORIZED

load_dotenv()

def validate_api_key(request: Request):
    API_KEY = os.getenv("KINMI_API_KEY")
    request_api_key = request.headers.get("X-API-KEY")

    # If no API key is set, raise an error
    if request_api_key is None or API_KEY is None:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid API Key")

    # If the API key is invalid, raise an error
    if not hmac.compare_digest(request_api_key, API_KEY):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid API Key")
    return request_api_key


app = FastAPI(
    title="Kinmi AI API",
    version="0.1",
    description="A.",
)

kinmi_router = APIRouter(
    prefix="/kinmi-speak",
    tags=["kinmi-speak"],
    dependencies=[Depends(validate_api_key)],
)


@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")


add_routes(
    kinmi_router,
    kinmi_speak_chain,
)

app.include_router(kinmi_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
