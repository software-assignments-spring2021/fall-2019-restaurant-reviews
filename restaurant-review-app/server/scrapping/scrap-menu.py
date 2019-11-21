from bs4 import BeautifulSoup
import requests
import json

def get_restaurant_page(page):
    if(page==1):
        url='https://menupages.com/restaurants/ny-new-york/'
        response = requests.get(url)
        return response.text
    else:
        url='https://menupages.com/restaurants/ny-new-york/'+str(page)
        response=requests.get(url)
        return response.text

def get_names():
    max_pages=4075/50
    names=[]
    for j in range((int)(max_pages)):
        print(j)
        page = (str)(BeautifulSoup(get_restaurant_page(j+1), 'html.parser'))
        find_start=page.find('Privacy policy')
        find_start1=page.find('{',find_start)
        find_end=page.find('</',find_start1)
        restaurants_json=json.loads(page[find_start1:find_end])
        for i in range(len(restaurants_json['itemListElement'])):
            #print(restaurants_json['itemListElement'][i]['name'])
            names.append(restaurants_json['itemListElement'][i]['name'])
    return names

def compare():
    names=get_names()
    #print (names)
    count=0
    selected=[]
    common=[]
    select=open('selected-restaurants.txt','r',encoding='utf-8')
    for element in select:
        selected.append(element.strip('\n'))
    
    for word in selected:
        if(word in names):
            count=count+1
            common.append(word)
    
    print(count)
    print(common)



#get_names()
compare()