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
    data = getDocument("testheatmap", {"heatmap_id": heatmap_id})
    print(data['data'])
    data = data['data']
    learning_rates = data.keys()
    betas = data[list(learning_rates)[0]].keys()
    learning_rates = list(learning_rates)
    betas = list(betas)
    print(learning_rates)
    print(betas)
    res_data = []
    for learning_rate in learning_rates:
        row = []
        for beta in betas:
            row.append(data[learning_rate][beta])
        res_data.append(row)
    print(res_data)

    res = {
        "data": res_data,
        "xName": "LR",
        "yName": "Beta",
        "xLabels": learning_rates,
        "yLabels": betas,
        

    }

    return JSONResponse(content=res)
