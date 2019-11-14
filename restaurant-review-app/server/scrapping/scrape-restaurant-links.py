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
        url = "https://www.yelp.com/search?find_desc=&find_loc=Manhattan%2C+NY&ns=1"
        response = requests.get(url)
        return response.text
    
    
    url = "https://www.yelp.com/search?find_desc=&find_loc=Manhattan%2C+NY&ns=&start=" + str(10*(page-1))
    response = requests.get(url)
  
    return response.text

#gets the page raw html and find the restaurant links
def get_link(page):
    restaurant_link = ""
    #scrape all links from page 1 to page 'page' which is the parameter
    for i in range(1,page):
        soup = BeautifulSoup(get_restaurant_page(i), 'html.parser')
        
        restaurants = soup.find_all('a',{"class":"lemon--a__373c0__IEZFH link__373c0__29943 link-color--blue-dark__373c0__1mhJo link-size--inherit__373c0__2JXk5"})
        
        for name in restaurants:
            restaurant_link = restaurant_link + name.get('href') +'\n'
            


#write the data into a file to avoid sending too many requests to yelp server
        
f = open("restaurant-link.txt", "w")
f.write(restaurant_link)
f.close()

#analyze the datda and extract only the restaurant url
f = open("restaurant-link.txt", "r")
links= ''
for url in f:
  #exclude some duplicate urls and other unrelated urls because according to my observation
  #the restaurant links are all starts with /biz and then no question marks or exclamation marks
  if '?' not in url and '/biz' in url:
      links += 'https://www.yelp.com' + url
      
      
#Write the urls into a file. This file only contains restaurant links in first five pages on Yelp.
f = open("true-restaurant-link.txt", "w")
f.write(links)
f.close()
      
      
      
      
      
      
      
      