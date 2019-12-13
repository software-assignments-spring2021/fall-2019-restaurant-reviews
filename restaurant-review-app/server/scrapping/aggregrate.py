from bs4 import BeautifulSoup
from pymongo import MongoClient
import requests
import json

class scraping:
    common={}
    __instance = None
    def __init__(self):
      """ Virtually private constructor. """
      if scraping.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         scraping.__instance = self
    
    def mongo_connect(self):
        # connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
        client = MongoClient('mongodb+srv://hw1635:wuhaodong250382@cluster0-lirni.mongodb.net/test?retryWrites=true&w=majority')
        db=client.test
        return db
    
    def get_common_restaurants(self):
        restaurant_menu_pages=[]
        restaurant_yelp=[]
        restaurant_links=[]
        #common={}
        count=0
        file=open('menu_pages_restaurants.txt','r')
        for item in file:
            restaurant_menu_pages.append(item.rstrip())
        file=open('yelp_restaurants.txt','r',encoding="utf-8")
        for item in file:
            restaurant_yelp.append(item.rstrip())
        file=open('yelp_links.txt','r',encoding="utf-8")
        for item in file:
            restaurant_links.append(item.rstrip())

        ptr=0
        for word in restaurant_yelp:
            if(word in restaurant_menu_pages):
                if(word not in self.common.keys()):
                    self.common[word]=[restaurant_links[ptr],'']
            ptr=ptr+1
                

        #print(self.common)
        MyFile=open('common_restaurants.txt','w',encoding="utf-8")
        for element in self.common.keys():
            MyFile.write(element)
            MyFile.write('\n')
        MyFile.close()


    def get_reviews(self,soup):
        pretty=soup.prettify()
        string=(str)(pretty)
        find_start=string.find('aggregateRating')
        find_end=string.find(', "addressCountry"',find_start)
        analysis_test=string[find_start-2:find_end]
        reviews=analysis_test+'}}'
        json_ob=json.loads(reviews)
        return json_ob
    
    def get_menu(self,soup):
        menu = soup.find_all('a', {"class":"menu-item__title-link"})
        #initialize an empty list for this matching restaurant to store dish names
        menu_list = []
    
        for dishname in menu:
            menu_list.append(dishname.string)
        return menu_list


    def get_page(self,url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
        #dump=[item.get_text(strip=True) for item in soup.select("span.html-attribute-value")]
    
    def get_page_yelp(self,url,page):
        #print(url+"?start="+(str)(page))
        response = requests.get(url+"?start="+(str)(page))
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup

    def get_menu_links(self):
        max_pages=4075/50
        url='https://menupages.com/restaurants/ny-new-york/'
        for j in range((int)(max_pages)):
            #print(j)
            if(j>0):
                url='https://menupages.com/restaurants/ny-new-york/'+str(j+1)
            soup = self.get_page(url)
            pretty=soup.prettify()
            string=(str)(pretty)
            find_start=string.find('Privacy policy')
            find_start1=string.find('{',find_start)
            find_end=string.find('</',find_start1)
            restaurants_json=json.loads(string[find_start1:find_end])
            for i in range(len(restaurants_json['itemListElement'])):
                #print(restaurants_json['itemListElement'][i]['name'])
                name = restaurants_json['itemListElement'][i]['name'].rstrip()
                url = restaurants_json['itemListElement'][i]['url'].rstrip()
                if(name in self.common.keys()):
                    self.common[name][1]=url
        print(self.common)
    
    def combine(self):
        db=self.mongo_connect()
        count=40
        restaurant=[]
        for i,rest in enumerate(self.common):
            if(i<count):
                continue
            review_number=300
            yelp_link=self.common[rest][0]
            menu_link=self.common[rest][1]
            review_list=[]
            print((str)(count)+" "+rest)
            #page=1
            for i in range(0,review_number,20):
                soup=self.get_page_yelp(yelp_link,i)
                #page=page+1
                json_ob=self.get_reviews(soup)
                for j in range(len(json_ob['review'])):
                    review_list.append((str)(json_ob['review'][j]['reviewRating']['ratingValue'])+' '+json_ob['review'][j]['description'])


            menu_soup=self.get_page(menu_link)
            business = {
                'name' : json_ob['name'],
                'address': json_ob['address']['streetAddress'],
                'rating' : json_ob['aggregateRating']['ratingValue'],
                'cuisine' : json_ob['servesCuisine'],
                'menu' : self.get_menu(menu_soup),
                'reviews' : review_list
                }
            db.restaurants.insert_one(business)
            #restaurant.append(business)       
            #if(count==5):
            #    break
            count=count+1



        rest_json={'restaurants':restaurant}
        with open('restaurants.json', 'w') as outfile:
            json.dump(rest_json , outfile, indent=4)

        #db=self.mongo_connect()
        #for rest in restaurant:
        #    db.restaurants.insert_one(rest)        





s=scraping()
s.get_common_restaurants()
s.get_menu_links()
s.combine()
                