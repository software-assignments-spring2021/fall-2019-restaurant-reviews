# Stakeholder Interviews

Some of our learnings from conducting our interviews with Prof Bloomberg and Omkar:

•Watch tutorial regarding react and node (2 hrs)

•Do front and back end together

•Consider building our own API for Yelp data

•Focus on learning NodeJS and ReactJS first

•'tf idf' (Natural Language Processing) can be useful for processing the reviews

•Use bootstrap, material UI

•We could trigger a ‘background task’ that maybe once a day or once a week does the processing/calculations and stores it as opposed to processing upon every search


# End User Observation

#### Person: Khayre Ali

Occupation: Student

Age: 22

About: Khayre is currently a Senior studying business at NYU. He loves to find new restaurants while walking around the city. Usually he reads a few reviews on yelp about a restaurant before going, but he always feels overwhelmed reading long reviews that often go off on tangents. He would love a single place that provides an average score and provides the most said key words.

Needs: Khayre needs an application that can save him the time and reading. He’s walking around the city quickly, he needs to be able to get a good sense of a restaurant quickly—not just the overall score however, but specific strengths and weaknesses of each establishment as well. 

----------------------------------------------
#### Person: Ally An

Occupation: Investment Banker

Age: 36

About: Ally is working in investment banking at Goldman Sachs. She often finds she does not have enough time to cook food due to her demanding schedule and she ends up ordering food most nights. She is getting tired of eating from the same places over and over and wants to try a new restaurant to order from. She finds new places but is hesitant as she does not trust the reviews from the food delivery app.

Needs: Ally needs a place to verify that the food is alright at new restaurants she wants to order from. She would need an application with more reliable rating services than delivery apps and one that can also let’s her find out information specifically about food ordered in the reviews; i.e. ability to look for how people speak about particular keywords in the reviews.

----------------------------------------------
#### Person: Hunter Prost

Occupation: Software Engineer

Age: 40

About: Hunter’s anniversary is coming up and he does not know where to take his wife. He has an idea of a few restaurants that he wants to go to but wants the most romantic atmosphere that reminds him of wedding in the south of France. He wants a quick place to search for atmosphere and french cuisine.

Needs: Hunter needs an application that can sort a specific cuisine by a keyword. He wants a restaurant that has been highly praised for a specific thing he is looking for, in this case it is french food with atmosphere.




# Use Cases

#### Title: Search For Restaurants
Actor: User

Scenario: A user wants to find out about the reviews and reception of a particular restaurant they plan on visiting. The user uses the search bar to find the restaurant and then the system delivers information about the restaurant, such as the overall rating, and how particular aspects of the restaurant were received. 

#### Title: Browse Restaurants
Actor: User

Scenario: A user who is unsure of what restaurant they’d like to dine at can browse for a restaurant in multiple ways such as ‘near me’, or by particular cuisines. Naturally, the system will make sure to show the user restaurants that are better received.

#### Title: Keyword Search
Actor: User

Scenario: This case occurs when the user already has a restaurant open. The restaurant page will have a list of keywords (eg. food items, adjectives related to the restaurant, particular features) with their corresponding ratings and the user can search for a particular keyword to see how it has been received.

#### Title: Sign Up
Actor: User

Scenario: The user will be able to sign up for an account using some basic information such as a username, password, and email.

#### Title: Log In
Actor: User

Scenario: User Should be able to log into the system given their login credentials: user/pass or email/pass.

#### Title: Favorite Restaurant
Actor: User

Scenario: Users will be able to ‘star’ restaurants from the restaurant page, which will be saved in their favorite restaurants for easy finding later on.
