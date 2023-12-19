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
    data = getDocument("testheatmap", {"heatmap_id": heatmap_id})
    data = data['data']
    learning_rates = data.keys()
    betas = data[list(learning_rates)[0]].keys()
    learning_rates = list(learning_rates)
    betas = list(betas)
    res_data = []
    for learning_rate in learning_rates:
        row = []
        for beta in betas:
            row.append(data[learning_rate][beta])
        res_data.append(row)

    res = {
        "data": res_data,
        "xName": "LR",
        "yName": "Beta",
        "xLabels": learning_rates,
        "yLabels": betas,
        

    }

    return JSONResponse(content=res)



@app.get("/landscape1d-data/{landscape1d_id}")
async def get_landscape1d_data(landscape1d_id: str):
    data = getDocument("testlandscape1d", {"landscape1d_id": landscape1d_id})

    # res = {
    #     "data": data,
    # }
    # print(res)

    return JSONResponse(content=data)
