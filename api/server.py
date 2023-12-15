from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/heatmap-data/{heatmap_id}")
async def get_heatmap_data(heatmap_id: str):
    print("get_heatmap_data")
    print(heatmap_id)
    return {"data": heatmap_id}
