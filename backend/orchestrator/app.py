from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import httpx
import os

app = FastAPI(
    title="Orchestrator Service",
    description="Servicio orquestador que integra User, Content y History",
    version="1.0.0"
)

# URLs de servicios (ajustables)
USER_SERVICE = "http://user-service:8000/users"
CONTENT_SERVICE = "http://content-service:8080/video"
HISTORY_SERVICE =  "http://historial-service:3000/historial/all"

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "Orchestrator is up"}

@app.get("/dashboard", response_class=HTMLResponse, tags=["Dashboard"])
async def dashboard():
    async with httpx.AsyncClient(timeout=5) as client:
        try:
            users = await client.get(USER_SERVICE)
            videos = await client.get(CONTENT_SERVICE)
            histories = await client.get(HISTORY_SERVICE)
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Error calling upstream service: {e}")

    users_list = users.json() if users.status_code == 200 else []
    videos_list = videos.json() if videos.status_code == 200 else []
    history_list = histories.json() if histories.status_code == 200 else []

    html = """
    <html>
      <head><title>Orchestrator Dashboard</title></head>
      <body>
        <h1>Dashboard</h1>
        <h2>Users</h2>
        <pre>{users}</pre>
        <h2>Videos</h2>
        <pre>{videos}</pre>
        <h2>Histories</h2>
        <pre>{histories}</pre>
      </body>
    </html>
    """.format(
        users=users_list,
        videos=videos_list,
        histories=history_list
    )
    return HTMLResponse(content=html, status_code=200)

@app.get("/aggregate/users/{user_id}", tags=["Aggregate"])
async def get_user_aggregate(user_id: int):
    async with httpx.AsyncClient(timeout=5) as client:
        try:
            user = await client.get(f"http://user-service:8000/user/{user_id}")
            history = await client.get(HISTORY_SERVICE, params={"user_id": user_id})
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=str(e))

    if user.status_code != 200:
        raise HTTPException(status_code=user.status_code, detail="User service error")
    data = user.json()
    data["history"] = history.json() if history.status_code == 200 else []
    return data
