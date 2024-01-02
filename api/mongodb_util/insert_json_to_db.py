import os
import json
from pymongo import MongoClient

from db_util import addOrUpdateDocument

# Directory containing JSON files
folder_path = 'basin_points'

# Read and store each JSON file
for filename in os.listdir(folder_path):
    if filename.endswith('.json'):
        file_path = os.path.join(folder_path, filename)
        print("Reading file: {}".format(file_path))
        with open(file_path, 'r') as file:
            data = json.load(file)
            points = data.get('points', [])
            document = {
                'landscape1d_id': filename,
                'points': points
            }
            # Insert the document into MongoDB
            addOrUpdateDocument("testlandscape1d", {"landscape1d_id": filename}, document)
            

print("Data insertion complete.")

