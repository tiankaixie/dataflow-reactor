from pickle import TRUE
import pymongo
import json
import os
import re
from typing import Dict


current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
with open(os.path.join(current_dir, "credential.json"), "r") as f:
    credential = json.load(f)
with open(os.path.join(current_dir, "db_client_type.json"), "r") as f:
    db_client_type = json.load(f)
clientInfo = credential[db_client_type["clientType"]]


def getClient():
    client = pymongo.MongoClient(
        host=clientInfo["host"],
        username=clientInfo["username"],
        password=clientInfo["password"],
        authSource=clientInfo["authSource"],
    )
    return client


def dbExists():
    client = getClient()
    dblist = client.list_database_names()
    if clientInfo["database"] in dblist:
        return True
    else:
        return False


def createDB():
    client = getClient()
    db = client[clientInfo["database"]]


def collectionExists(collection_name: str):
    client = getClient()
    db = client[clientInfo["database"]]
    collist = db.list_collection_names()
    if collection_name in collist:
        return True
    else:
        return False


def createCollection(collection_name: str):
    client = getClient()
    db = client[clientInfo["database"]]
    collection = db[collection_name]


def addOrUpdateDocument(
    collection_name: str, query: Dict[str, any], record: Dict[str, any]
):
    client = getClient()
    db = client[clientInfo["database"]]
    collection = db[collection_name]
    query_res = collection.find_one(query)
    if query_res is None:
        for key in record.keys():
            query[key] = record[key]
        collection.insert_one(query)
    else:
        record = {"$set": record}
        collection.update_one(query, record)


def getDocuments(collection_name: str, query: Dict[str, any]):
    client = getClient()
    db = client[clientInfo["database"]]
    collection = db[collection_name]
    exclusion = {"_id": 0}
    query_res = collection.find(query, exclusion)
    return query_res

def findDocumentsWithPrefixAndSuffix(collection_name: str, query_str: str, prefix: str, suffix: str):
    client = getClient()
    db = client[clientInfo["database"]]
    collection = db[collection_name]
    exclusion = {"_id": 0}
    escape_prefix = re.escape(prefix)
    escape_suffix = re.escape(suffix)
    pattern = f"^{escape_prefix}.*{escape_suffix}"
    query_res = collection.find({query_str: {"$regex": pattern}}, exclusion)
    query_res = [r for r in query_res]
    print(str(len(query_res)) + " results found.")
    return query_res

def getDocument(collection_name: str, query: Dict[str, any]):
    client = getClient()
    db = client[clientInfo["database"]]
    collection = db[collection_name]
    exclusion = {"_id": 0}
    query_res = collection.find_one(query, exclusion)
    return query_res
