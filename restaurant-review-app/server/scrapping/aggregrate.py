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
        common=[]
        file=open('menu_pages_restaurants.txt','r')
        for item in file:
            restaurant_menu_pages.append(item.rstrip())
        file=open('all_restaurants_in_yelp.txt','r')
        for item in file:
            restaurant_yelp.append(item.rstrip())

        for word in restaurant_menu_pages:
            if(word in restaurant_yelp):
                #count=count+1
                common.append(word)
    
        print(common)
        MyFile=open('common_restaurants.txt','w',encoding="utf-8")
        for element in common:
            MyFile.write(element)
            MyFile.write('\n')
        MyFile.close()


    def get_link(self):
        restaurants=[]
        select=open('all_restaurants_in_yelp.txt','r')
        for rest_link in select:
            restaurants.append(rest_link.strip('\n'))
        return restaurants

   # def get_page(self,page):
        #driver=webdriver.Chrome('C:/Users/mayuk/Desktop/chromedriver.exe')
        #!!!! Is this url only for scrap Ichiran page?
        #
        #driver.get("view-source:https://www.yelp.com/biz/ichiran-midtown-new-york?start="+(str)(page))
        #soup = BeautifulSoup(driver.page_source, 'html.parser')
        #dump=[item.get_text(strip=True) for item in soup.select("span.html-attribute-value")]
        #pretty=soup.prettify()
        #string_pretty=(str)(pretty)
        #return string_pretty


s = scraping()
s.get_common_restaurants()
t=scraping()