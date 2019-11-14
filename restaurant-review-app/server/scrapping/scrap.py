from bs4 import BeautifulSoup
from pymongo import MongoClient
from pprint import pprint
import requests
from selenium import webdriver
import json

'''driver=webdriver.Chrome('C:/Users/mayuk/Desktop/chromedriver.exe')
#driver.explicitly_wait(50)
driver.get("https://www.yelp.com/search?cflt=restaurants&find_loc=Manhattan%2C%20NY")
html=driver.page_source
soup = BeautifulSoup(html,'html.parser')
print(soup.prettify())
#print(myDynamicElement)
driver=webdriver.Chrome('C:/Users/mayuk/Desktop/chromedriver.exe')
driver.get("view-source:https://www.yelp.com/biz/barn-joo-35-new-york?start=20")
soup = BeautifulSoup(driver.page_source, 'html.parser')
dump=[item.get_text(strip=True) for item in soup.select("span.html-attribute-value")]
#print([item.get_text(strip=True) for item in soup.select("span.html-attribute-value")])
pretty=soup.prettify()
#print(soup.prettify())
string_pretty=str(pretty)'''

'''#print(string_pretty.find('aggregateRating'))
find_start=string_pretty.find('aggregateRating')
analysis_test=string_pretty[find_start:string_pretty.find(']',find_start)]
#print('{"'+analysis_test+']}')
final_json_string='{"'+analysis_test+']}'
json_ob=json.loads(final_json_string)
#print(json_ob['review'])
for i in range(len(json_ob['review'])):
    print((str)(json_ob['review'][i]['reviewRating']['ratingValue'])+': '+json_ob['review'][i]['description']+'\n')
    print('---------------------------------------')'''

def mongo_connect():
    # connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
    client = MongoClient('mongodb+srv://hw1635:wuhaodong250382@cluster0-lirni.mongodb.net/test?retryWrites=true&w=majority')
    db=client.test
    # Issue the serverStatus command and print the results
    #serverStatusResult=db.command("serverStatus")
    #pprint(serverStatusResult)
    fivestar = db.restaurants.find()
    for doc in fivestar:
        print(doc)

def get_page(page):
    driver=webdriver.Chrome('C:/Users/mayuk/Desktop/chromedriver.exe')
    driver.get("view-source:https://www.yelp.com/biz/barn-joo-35-new-york?start="+(str)(page))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    #dump=[item.get_text(strip=True) for item in soup.select("span.html-attribute-value")]
    pretty=soup.prettify()
    string_pretty=(str)(pretty)
    return string_pretty

def get_reviews():
    #for i in range(0,101,20):
    #    string_pretty=get_page(i)
    string_pretty=get_page(40)
    find_start=string_pretty.find('aggregateRating')
    analysis_test=string_pretty[find_start:string_pretty.find(']',find_start)]
    #print('{"'+analysis_test+']}')
    reviews='{"'+analysis_test+']}'
    json_ob=json.loads(reviews)
    #print(json_ob['review'])
    for i in range(len(json_ob['review'])):
        print((str)(json_ob['review'][i]['reviewRating']['ratingValue'])+': '+json_ob['review'][i]['description']+'\n')
        print('---------------------------------------')

#get_reviews()
mongo_connect()
'''MyFile=open('pretty.txt','w+',encoding='utf-8')
for element in dump:
MyFile.write(str(pretty))
MyFile.write('\n')
MyFile.close()'''