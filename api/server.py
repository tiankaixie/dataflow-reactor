from fastapi import FastAPI
import json
from fastapi.responses import JSONResponse

from mongodb_util.db_util import getDocument, getDocuments, findDocumentsWithPrefixAndSuffix

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/heatmap-data/{heatmap_id}")
async def get_heatmap_data(heatmap_id: str):
    data = getDocument("testheatmap", {"heatmap_id": heatmap_id})
    data = data['data']
    ylabels = data.keys()
    xlabels = data[list(ylabels)[0]].keys()
    ylabels = list(ylabels)
    xlabels = list(xlabels)
    print("wefwfwew")
    print(ylabels)
    print(xlabels)
    res_data = []
    for ylabel in ylabels:
        for xlabel in xlabels:
            # here build the string of the data
            if "beta" in heatmap_id and "lr" in heatmap_id:
                res_data.append({
                    "yLabel": ylabel,
                    "xLabel": xlabel,
                    "prefix": "high_dim3_hessian_pinn_pretrained_convection_u0sin(x)_nu0.0_beta" + xlabel + "_rho0.0_Nf100_50,50,50,50,1_L1.0_lr" + ylabel+"_source0_",
                    "suffix": "_dim3_points9261_UnstructuredGrid_aknn_", 
                    "value": data[ylabel][xlabel]
                })
            elif "bs" in heatmap_id and "width" in heatmap_id:
                res_data.append({
                    "yLabel": ylabel,
                    "xLabel": xlabel,
                    "prefix": "high_dim3_hessian_resnet18_loss_landscape_cifar10_subset_01_bs_" + xlabel  + "_",
                    "suffix": "_type_best_width_" + ylabel + "_UnstructuredGrid_aknn_PersistenceThreshold_",
                    "value": data[ylabel][xlabel]
                })

    if "beta" in heatmap_id and "lr" in heatmap_id:
        res = {
            "data": res_data,
            "xName": "Beta",
            "yName": "Learning Rate",
            "xLabels": xlabels,
            "yLabels": ylabels,
        }
    elif "bs" in heatmap_id and "width" in heatmap_id:
        res = {
            "data": res_data,
            "xName": "Batch Size",
            "yName": "Width",
            "xLabels": xlabels,
            "yLabels": ylabels,
        }
    else:
        res = None

    return JSONResponse(content=res)


@app.get("/landscape1d-data/{landscape1d_id_prefix}/{landscape1d_id_suffix}")
async def get_landscape1d_data(landscape1d_id_prefix: str, landscape1d_id_suffix: str):
    data = findDocumentsWithPrefixAndSuffix("testlandscape1d", "landscape1d_id", landscape1d_id_prefix, landscape1d_id_suffix)
    return JSONResponse(content=data)


@app.get("/get-heatmap-ids")
async def get_heatmap_ids():
    data = getDocuments("testheatmap", {})
    heatmap_ids = [item["heatmap_id"] if "heatmap_id" in item else "none" for item in list(data)]
    return JSONResponse(content=heatmap_ids)
