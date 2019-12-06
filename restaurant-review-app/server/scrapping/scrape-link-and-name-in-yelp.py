#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 10 23:02:15 2019
@author: haodongwu
"""

from bs4 import BeautifulSoup
import requests

def get_restaurant_page(page):
    if page == 1:
        #url = "https://www.yelp.com/search?find_desc=&find_loc=Manhattan%2C+NY&ns=1"
        url='https://www.yelp.com/search?cflt=restaurants&find_loc=Manhattan%2C%20NY'
        response = requests.get(url)
        return response.text
    
    #This might be the right url (not sure)
    #https://www.yelp.com/search?cflt=restaurants&find_loc=Manhattan%2C%20NY
    url = "https://www.yelp.com/search?cflt=restaurants&find_loc=Manhattan%2C%20NY&start=" + str(30*(page-1))
    response = requests.get(url)
  
    return response.text

#find all the restaurant links as well as names from page 1 to page N.
def get_link_and_name(page):
    restaurant_link = ""
    names = ""
    #scrape all links from page 1 to page 'page' which is the parameter
    for i in range(page+1):
        soup = BeautifulSoup(get_restaurant_page(i), 'html.parser')
        
        restaurants = soup.find_all('a',{"class":"lemon--a__373c0__IEZFH link__373c0__29943 link-color--blue-dark__373c0__1mhJo link-size--inherit__373c0__2JXk5"})
        print('-------')
        #print(restaurants)
        for name in restaurants:
            link = name.get('href') 
            
            if name.get('name') != "":
                names = names + name.string.encode('utf-8')+'\n'
                
            if '?' not in link and '/biz' in link:
                restaurant_link = restaurant_link + 'https://www.yelp.com'+ link +'\n'
                
    print restaurant_link
    print names
    
    #write the data into a file to avoid sending too many requests to yelp server
    f = open("restaurant-link.txt", "w")
    f.write(restaurant_link)
    f.close()
    
    f = open("restaurant-name.txt", "w")
    f.write(names)
    f.close()
    



get_link(200)







      
     


      
      
      
      