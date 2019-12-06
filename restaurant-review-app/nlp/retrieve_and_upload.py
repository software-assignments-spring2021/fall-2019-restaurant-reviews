from pymongo import MongoClient
from bson.objectid import ObjectId
from nlp import NLP

cluster = MongoClient(
    "mongodb+srv://hw1635:wuhaodong250382@cluster0-lirni.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["test"]
collection = db["restaurants"]
#                                                 insert id of restaurant here
restaurant = collection.find_one({"_id": ObjectId("5dd1a02d1e9b0a9800f465dc")})
menu = restaurant["menu"]
reviews = restaurant["reviews"]


n = NLP(menu, reviews)
print(n.menu)


# # something here
# #
# #

# #                                     insert id of restaurant here
# collection.update_one({"_id": ObjectId("5dd1a02d1e9b0a9800f465dc")}, {
#                       "$set": {"menu_ratings": items_rating}})
# collection.update_one({"_id": ObjectId("5dd1a02d1e9b0a9800f465dc")}, {
#                       "$set": {"menu_snippets": menu_snippets}})
# collection.update_one({"_id": ObjectId("5dd1a02d1e9b0a9800f465dc")}, {
#                       "$set": {"menu_items": menu_items}})
