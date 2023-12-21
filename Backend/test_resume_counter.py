from .resume_counter import count_updater
from azure.cosmos import CosmosClient
import os
import requests
from azure.cosmos import CosmosClient

endpoint = os.environ["COSMOS_ENDPOINT"]
account_key = os.environ["COSMOS_KEY"]

client = CosmosClient(url=endpoint, credential=account_key)
database_name = "Counterdb"
container_name = "Counter1"
item_id = "1"

database = client.get_database_client(database_name)
container = database.get_container_client(container_name)

def get_count_from_cosmosdb() -> int:

    count_item = container.read_item(item_id, item_id)
    current_count = count_item.get('count', 0)
    return current_count
    
def test_resume_counter():
    initial_count = get_count_from_cosmosdb()

    
    req = requests.get("url_of_azure_function")
    count_updater(req)

    new_count = get_count_from_cosmosdb()
    
    print(f"Initial Count: {initial_count} | New Count: {new_count}")
    assert new_count > initial_count
    #