from pymongo import MongoClient, UpdateOne, ReplaceOne, errors
from pymongo.errors import BulkWriteError
import logging
import json
import requests
from time import sleep
from secrets import token_urlsafe
from flashtext import KeywordProcessor
from os import environ
from dotenv import load_dotenv

logging.basicConfig(level=logging.DEBUG)


def get_products_by_page(url, page):
    request_url = f"{url}/products.json?page={page}"
    try:
        # NOTE: should check for 200 response first before proceeding
        # if non-200 response throw exception
        print(f"Retrieving products from {request_url}")
        result = requests.get(
            request_url).json()
        return result["products"]
    except Exception as e:
        logging.error(f"Failed to fetch from: {request_url}")
        return []


def get_db(host='localhost', port=27017):
    print("Connecting to database...")
    try:
        load_dotenv('.env.local')
        client = MongoClient(environ["MONGODB_URI"])
        return [client.packrat, client]
    except Exception as e:
        logging.error("failed to connect to database")
        exit()

def process_category(product_type):
    kp = KeywordProcessor(case_sensitive=False)
    key = {'T-Shirts': ['t-shirt', 't-shirts', 't shirt', 'crewneck', 'tshirt', 'tee', 'long', 'sleeve', 'longsleeve', 'tees'],
            'Tops': ['shirt', 'top', 'polo', 'tank', 'jersey', 'crop', 'blouse', 'tops', 'blouses', 'flannel', 'shirts'],
            'Layers': ['jacket', 'vest', 'cardigan', 'outerwear', 'coat', 'button-up', 'parka', 'button', 'knit', 
                        'shawl', 'capelet', 'bomber', 'blazer', 'windbreaker', 'zip', 'vests', 'fleece', 'jackets',
                        'knitwear'],
            'Pullovers': ['hoodie', 'sweatshirt', 'jumper', 'hoody', 'pullover', 'sweatshirts', 'sweater', 'hoodies',
                        'sweaters', 'rollneck'],
            'Shorts': ['shorts', 'short', 'sweatshorts'],
            'Pants': ['pant', 'bottom', 'sweatpant', 'trouser', 'jean', 'pants', 'bottoms', 'jeans', 'trousers', 'sweatpants'],
            'Dresses & Skirts': ['skirt', 'dress', 'skirts', 'dresses'],
            'Swim': ['swim', 'bodysuit'],
            'Shoes': ['footwear', 'shoe', 'clog', 'sneaker', 'sandal', 'boot', 'sneakers', 'sandals', 'boots',
                        'shoes'],
            'Jewelry': ['jewelry', 'necklace', 'ring'],
            'Accessories': ['socks', 'belt', 'hat', 'accessories', 'eyewear', 'underwear', 'bag', 'headwear', 
                        'apparel', 'beanie', 'pouch', 'tote', 'scarf', 'cap', 'trucker', 'sunglasses', 'odds'
                        'gloves', 'scarve', 'snapback', 'balaclavas', 'tie', 'headband', 'boxers', 'headbands',
                        'neckties', 'handbags', 'bags', 'watches', 'wristband', 'hats', 'beanies', 'belts',
                        'backpacks', 'mittens', 'scarves', 'wallets', 'wallet', 'case', 'cases', 'accessorie',
                        'ends'],

            'Wildcard Clothing': ['tracksuit', 'kimono', 'sport', 'overall', 'coverall', 'jumpsuits', 'rompers', 'robe', 
                                    'suit', 'clothing', 'suits', 'athletic', 'jumpsuit', 'casual', 'sweat', 'thermal',
                                    'womens', 'women\'s'],
            'Goods': ['art', 'music', 'home', 'books', 'furniture', 'bottle', 'desk', 'object', 'mask', 'pin',
                        'rug', 'incense', 'pillow', 'chair', 'kitchen', 'food', 'ceramic', 'soap', 'perfume',
                        'gift', 'card', 'sticker', 'digital', 'desk', 'neon', 'service', 'keychain', 'petware'
                        'towel', 'puzzle', 'cosmetic', 'good', 'tattoo', 'candle', 'blanket', 'insurance', 'mug',
                        'cup', 'bowl', 'cleaner', 'wellness', 'golf', 'skate', 'dvd', 'video', 'trucks', 'hardware',
                        'grip', 'dvds', 'videos', 'bearings', 'blankets', 'key', 'rugby', 'towel', 'stickers',
                        'skateboard', 'wheels', 'masks', 'bottles', 'homeware', 'cosmetics', 'petware', 'tattoos',
                        'pins', 'cleaners']
        }

    kp.add_keywords_from_dict(key)
    keywords_found = kp.extract_keywords(product_type)

    if len(keywords_found) == 0: # No match in key
        return product_type
    else: # New product_type
        return keywords_found[-1]


def update_products(url, db, page, products):
    try:
        operations = [ReplaceOne({'_id': product["id"]}, product, upsert=True)
                for product in products]
        operations += [UpdateOne(product, {'$set': {'random_sort': token_urlsafe(32), 'url': url, 'product_type': process_category(product['product_type'])}}, upsert=True)
                for product in products]

        result = db.products.bulk_write(operations)
        logging.debug(f"{result.inserted_count} results inserted")
        logging.debug(f"{result.modified_count} results modified")
        logging.debug(f"{result.upserted_count} results upserted")
    except BulkWriteError as bwe:
        print(bwe.details)

    logging.info(f"Page {page} stored!")

def store_products(url, db):
    page = 0

    products_on_page = get_products_by_page(url, page)
    while len(products_on_page):
        # Store product data
        update_products(url, db, page, products_on_page)
        page += 1
        sleep(12)  # Prevents blocking from shopify
        products_on_page = get_products_by_page(url, page)

def main():
    urls = ['https://shoptunnelvision.com', 'https://www.wearebraindead.com', # 0, 1
            'https://shop-cometees.biz', 'https://basketcase.gallery', 'https://shirtz.cool', # 2, 3, 4
            'https://generaladmission.com', 'https://honorthegift.co', 'https://forthosewhosin.com', # 5, 6, 7
            'https://www.bbcicecream.com', 'https://camphigh.com', 'https://unfortunateportrait.com', # 8, 9, 10 .... 9 products.json is unavailable
            'https://www.junglesjungles.com', 'https://funeralapparel.com', 'https://awakenyclothing.com', # 11, 12, 13
            'https://pleasuresnow.com', 'https://tombolocompany.com', 'https://www.storymfg.com', # 14, 15, 16
            'https://chnge.com', 'https://bdgastore.com', 'https://nepenthesny.com', # 17, 18, 19
            'https://humblesbrand.com', 'https://cherryla.com', 'https://faworldentertainment.com', # 20, 21, 22
            'https://kidsuper.com', 'https://www.thevintagetwin.com', 'https://wishmeluckbrand.com', # 23, 24, 25
            'https://www.boypotions.com', 'https://itemlabel.com']
    db, client = get_db()

    for url in urls[1:]:
        print(f"\nWorking on {url}\n")
        store_products(url, db)
        print(f"\nFinished {url}\n")

    client.close()
    print("Success!")


main()
