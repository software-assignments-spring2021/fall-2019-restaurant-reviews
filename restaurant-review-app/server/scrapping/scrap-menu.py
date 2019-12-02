from bs4 import BeautifulSoup
import requests
import json

#initialize a dictionary that stores the restaurant name and its url.
dic = {}
menu_dict = {}

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
        #print(j)
        page = (str)(BeautifulSoup(get_restaurant_page(j+1), 'html.parser'))
        find_start=page.find('Privacy policy')
        find_start1=page.find('{',find_start)
        find_end=page.find('</',find_start1)
        restaurants_json=json.loads(page[find_start1:find_end])
        for i in range(len(restaurants_json['itemListElement'])):
            #print(restaurants_json['itemListElement'][i]['name'])
            name = restaurants_json['itemListElement'][i]['name']
            url = restaurants_json['itemListElement'][i]['url']
            names.append(name)
            dic[name] = url
    return names

#this function fetches the menu items for each matching restaurant 
def fetch_menu(url, name):
    print(url)
    print(name)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    menu = soup.find_all('a', {"class":"menu-item__title-link"})
    #initialize an empty list for this matching restaurant to store dish names
    menu_dict[name] = []
    
    for dishname in menu:
        menu_dict[name].append(dishname.string)
    
   
    
def compare():
    names=get_names()
    
    #print (names)
    count=0
    selected=[]
    common=[]
    #select=open('all_restaurants_in_yelp.txt','r')
    select=open('selected-restaurants.txt','r')
    for element in select:
        selected.append(element.strip('\n'))
    
    for word in selected:
        if(word in names):
            count=count+1
            common.append(word)
            fetch_menu(dic.get(word,""),word)
            
    #print(count)
    print(common)
    return (common)




compare()

#this prints the menu dictionary in which its key is the name of the restaurant and value is the
#list of all dishes. For now, it only stores the matching restaurants by comparing selected-restaurants.txt
#and all menu pages restaurants
print(menu_dict)
