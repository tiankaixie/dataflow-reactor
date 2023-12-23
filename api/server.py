from fastapi import FastAPI
import json
from fastapi.responses import JSONResponse

from mongodb_util.db_util import getDocument, getDocuments

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/heatmap-data/{heatmap_id}")
async def get_heatmap_data(heatmap_id: str):
    data = getDocument("testheatmap", {"heatmap_id": heatmap_id})
    data = data['data']
    learning_rates = data.keys()
    betas = data[list(learning_rates)[0]].keys()
    learning_rates = list(learning_rates)
    betas = list(betas)
    res_data = []
    for learning_rate in learning_rates:
        for beta in betas:
            res_data.append(data[learning_rate][beta])

    res = {
        "data": res_data,
        "xName": "Beta",
        "yName": "Learning Rate",
        "xLabels": betas,
        "yLabels": learning_rates,
    }

    return JSONResponse(content=res)


@app.get("/landscape1d-data/{landscape1d_id}")
async def get_landscape1d_data(landscape1d_id: str):
    data = getDocument("testlandscape1d", {"landscape1d_id": landscape1d_id})
    return JSONResponse(content=data)


@app.get("/get-heatmap-ids")
async def get_heatmap_ids():
    data = getDocuments("testheatmap", {})
    heatmap_ids = [item["heatmap_id"] if "heatmap_id" in item else "none" for item in list(data)]
    return JSONResponse(content=heatmap_ids)
