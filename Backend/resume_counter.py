import json
import os
import azure.functions as func
from azure.cosmos import CosmosClient

endpoint = os.environ["COSMOS_ENDPOINT"]
account_key = os.environ["COSMOS_KEY"]

client = CosmosClient(url=endpoint, credential=account_key)
database_name = "Counterdb"
container_name = "counter1"
item_id = "1"

database = client.get_database_client(database_name)
container = database.get_container_client(container_name)

def count_updater(req: func.HttpRequest) -> func.HttpResponse:
    
    count_item = container.read_item(item_id, item_id)
    if not count_item:
        return func.HttpResponse(
            "Count item missing",
            status_code=400 
        )
    current_count = count_item.get('count', 0) 
    updated_count = current_count + 1
    count_item['count'] = updated_count
    container.upsert_item(count_item)
    item_json = json.dumps(count_item, indent=2)
    return func.HttpResponse(
        body=item_json, 
        mimetype='application/json',
        status_code=200
    )
