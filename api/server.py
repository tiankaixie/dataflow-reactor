from fastapi import FastAPI
import json
from fastapi.responses import JSONResponse

from mongodb_util.db_util import getDocument

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/heatmap-data/{heatmap_id}")
async def get_heatmap_data(heatmap_id: str):
    print("get_heatmap_data")
    print(heatmap_id)
    data = getDocument("testheatmap", {"headmap_id": heatmap_id})
    print(data)
    return JSONResponse(content=data)
