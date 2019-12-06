from bs4 import BeautifulSoup
import requests
import json

class scraping:
    __instance = None
    def __init__(self):
      """ Virtually private constructor. """
      if scraping.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         scraping.__instance = self
    
    def get_common_restaurants(self):
        restaurant_menu_pages=[]
        restaurant_yelp=[]
        restaurant_links=[]
        common={}
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
                if(word not in common.keys()):
                    common[word]=restaurant_links[ptr]
            ptr=ptr+1
                

        print(common)
        MyFile=open('common_restaurants.txt','w',encoding="utf-8")
        for element in common.keys():
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


    def get_page(self,url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
        #dump=[item.get_text(strip=True) for item in soup.select("span.html-attribute-value")]
        


s = scraping()
s.get_common_restaurants()
