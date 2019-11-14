#The following code only scrapes the menu for ICHIRAN ramen website. 
from bs4 import BeautifulSoup
import requests
url = "https://www.ichiranusa.com/menu/"
response = requests.get(url)

menu_page = response.text



soup = BeautifulSoup(menu_page, 'html.parser')

menu = soup.find_all('p', {"class":"menu-item__heading"})

output = ""
for name in menu:
    output += name.string + '\n'

f = open("ichiran-menu.txt", "w")

f.write(output)
f.close()

