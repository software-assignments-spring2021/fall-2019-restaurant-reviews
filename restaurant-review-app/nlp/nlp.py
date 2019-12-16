# this script retrieves reviews from mongodb for a specific restaurant, gives a score to each dish,
# finds snippets in the reviews and stores the 3 best and 3 worst snippets to describe each dish
# uploads menu_ratings and menu_snippets to mongodb

# Implements Singleton design pattern

from pymongo import MongoClient
from bson.objectid import ObjectId
import nltk.data
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import re
import operator


class NLP:
    __instance = None
    @staticmethod
    def getInstance():
        """ Static access method. """
        if NLP.__instance == None:
            NLP()
        return NLP.__instance

    def __init__(self):
        """ Virtually private constructor. """
        if NLP.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            NLP.__instance = self

    def processRestaurant(self):
        cluster = MongoClient(
            "mongodb+srv://hw1635:wuhaodong250382@cluster0-lirni.mongodb.net/test?retryWrites=true&w=majority")
        db = cluster["test"]
        collection = db["restaurants"]

        test = collection.find({})
        for restaurant in test:

            try:
                menu = restaurant["menu"]
            except:
                print("ERROR: this restaurant doesn't have a menu")
            try:
                reviews = restaurant["reviews"]
            except:
                print("ERROR: this restaurant doesn't have reviews")
            sid = SentimentIntensityAnalyzer()
            dict = {}
            scores_dict = {}
            for m in range(len(menu)):
                item = menu[m]
                item = item.lower()
                start = item.find('(')
                end = item.find(')')
                if start != -1 and end != -1:
                    item = item[0:start] + item[end:-1]
                item = re.sub('[^a-zA-Z]+', ' ', item)
                item = item.strip()
                menu[m] = item
                dict[item] = []
                scores_dict[item] = {}

            for r in range(len(reviews)):
                review = reviews[r]
                review = review.lower()
                reviews[r] = review

            tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
            for i in range(len(reviews)):
                sentences = tokenizer.tokenize(reviews[i])
                for j in range(len(menu)):
                    if menu[j] in reviews[i]:
                        for s in sentences:
                            if menu[j] in s:
                                ss = sid.polarity_scores(s)
                                scores_dict[menu[j]][s] = ss["compound"]
                        dict[menu[j]].append(int(reviews[i][0]))

            items_rating = {}

            menu_snippets = {}
            for dish, d in scores_dict.items():
                menu_snippets[dish] = ['']*6
                good = -1
                bad = 0

                sorted_d = sorted(d.items(), key=operator.itemgetter(1))

                for i in range(3):
                    if len(sorted_d) > i:
                        worst = sorted_d[i]
                        best = sorted_d[(i*-1)-1]
                        if worst[1] < 0:
                            menu_snippets[dish][bad] = worst
                            bad += 1
                        if best[1] > 0:
                            menu_snippets[dish][good] = best
                            good -= 1

            for i in menu_snippets.keys():
                if(dict[i] != []):
                    items_rating[i] = dict[i]

            menu_items = {}
            for i in items_rating.keys():
                menu_items[i] = [menu_snippets[i], items_rating[i]]

            id = restaurant["_id"]
            collection.update_one({"_id": ObjectId(id)}, {
                "$set": {"menu_items": menu_items}})

            print("SUCCESS: parsed reviews and uploaded to mongodb", ObjectId(id))


n = NLP()
print(n.processRestaurant())
