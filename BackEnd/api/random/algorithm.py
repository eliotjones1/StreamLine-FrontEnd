# Given a list of movies, their associated streaming options, the prices of the streaming options, and a budget,
# find the top three best bundles to maximize the number of movie/tv show matches and minimize price using brute force

import random

# Takes in a list of movie dictionaries from the search results in the imdb database.
#
# Input: 'movies' is a list of movie dictionaries where each dictionary has keys such as
# 'title', 'release_date', 'streaming_providers', etc..
#
# Output: One dictionary where each key is the title of a movie and each value is a set 
# of all of its available streaming options
def modify_movie_dicts(movies):
    modified_movies = {}
    for movie in movies:
        title = movie["title"]
        modified_movies[title] = set()
        services = movie["streaming_providers"]
        for service in services["flatrate"]:
            modified_movies[title].add(service)
        for service in services["rent"]:
            modified_movies[title].add(service)
        for service in services["buy"]:
            modified_movies[title].add(service)

    return modified_movies


###########################################################################################

# Some help from Chat-GPT, but finds the top 3 best bundles using brute-force search
def find_best_bundle(movies, services, budget):
    # Initialize variables to keep track of best bundle
    best_bundle = set()
    best_bundle_cost = float('inf')
    best_bundle_movies = set()

    first = (best_bundle, best_bundle_cost, best_bundle_movies)
    second = (best_bundle, best_bundle_cost, best_bundle_movies)
    third = (best_bundle, best_bundle_cost, best_bundle_movies)

    
    # Recursively test all possible bundles
    def explore_bundle(bundle, bundle_cost, bundle_movies):
        nonlocal first, second, third
        # Check if the current bundle is within the budget and offers more movies
        if bundle_cost <= budget and len(bundle_movies) >= len(first[2]):
            if len(bundle_movies) > len(first[2]):
                third = second
                second = first
                first = (bundle, bundle_cost, bundle_movies)
            # if there is a tie with first with how many movies they offer, but new bundle is cheaper
            else:
                if bundle_cost < first[1]:
                    third = second
                    second = first
                    first = (bundle, bundle_cost, bundle_movies)
        elif bundle_cost <= budget and len(bundle_movies) >= len(second[2]):
            if len(bundle_movies) > len(second[2]):
                third = second
                second = (bundle, bundle_cost, bundle_movies)
            # if there is a tie with second with how many movies they offer, but new bundle is cheaper
            else:
                if bundle_cost < second[1]:
                    third = second
                    second = (bundle, bundle_cost, bundle_movies)
        elif bundle_cost <= budget and len(bundle_movies) >= len(third[2]):
            if len(bundle_movies) > len(third[2]):
                third = (bundle, bundle_cost, bundle_movies)
            # if there is a tie with third with how many movies they offer, but new bundle is cheaper
            else:
                if bundle_cost < third[1]:
                    third = (bundle, bundle_cost, bundle_movies)

        # Recurse with each possible service added to the bundle
        for service in services:
            if service not in bundle:
                new_bundle = bundle | {service}
                new_bundle_cost = bundle_cost + services[service]
                new_bundle_movies = set()
                for movie in movies:
                    if new_bundle.intersection(movies[movie]):
                        new_bundle_movies.add(movie)
                explore_bundle(new_bundle, new_bundle_cost, new_bundle_movies)
    
    # Start exploring the empty bundle
    explore_bundle(set(), 0, set())
    
    # Return the best bundle
    return first, second, third


###########################################################################################
# # SMALL TEST
# movies = {
#     'The Shawshank Redemption': {'Netflix', 'Hulu'},
#     'The Godfather': {'Netflix'},
#     'The Dark Knight': {'HBO', 'Amazon Prime'},
#     'Forrest Gump': {'Netflix', 'Amazon Prime', 'Hulu'},
#     'Inception': {'HBO', 'Amazon Prime'}
# }
# streaming_services = {
#     'Netflix': 10,
#     'Hulu': 8,
#     'HBO': 15,
#     'Amazon Prime': 9
# }
# budget = 25

# # Find the best bundle of streaming services
# first, second, third = find_best_bundle(movies, streaming_services, budget)
# # Print the results
# print("BEST BUNDLE:", "\nServices: ", first[0], "\nPrice: ", first[1], "\nMatches Included: ", first[2]) 
# print("\n\nSECOND BEST BUNDLE:", "\nServices: ", second[0], "\nPrice: ", second[1], "\nMatches Included: ", second[2]) 
# print("\n\nTHIRD BEST BUNDLE:", "\nServices: ", third[0], "\nPrice: ", third[1], "\nMatches Included: ", third[2]) 



###########################################################################################
# # MEDIUM TEST
# search_results = [
#     {
#         "title": "Star Wars",
#         "release_date": "1977-05-25",
#         "image": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
#         "rating": 8.2,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus",
#                 "Sling TV Orange and Blue",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },   
#     {
#         "title": "Avengers: Endgame",
#         "release_date": "2019-04-24",
#         "image": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
#         "rating": 8.266,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "DodgeBall: A True Underdog Story",
#         "release_date": "2004-06-18",
#         "image": "/r8KbNHkkwFXLjV1suGwm0Qjure5.jpg",
#         "rating": 6.339,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "Cinemax Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "The Maze Runner",
#         "release_date": "2014-09-10",
#         "image": "/ode14q7WtDugFDp78fo9lCsmay9.jpg",
#         "rating": 7.172,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Scorch Trials",
#         "release_date": "2015-09-09",
#         "image": "/lq9n07JSzdhK5l1TKxQ9SHawNYn.jpg",
#         "rating": 6.724,
#         "streaming_providers": {
#             "flatrate": [],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Death Cure",
#         "release_date": "2018-01-10",
#         "image": "/2zYfzA3TBwrMC8tfFbpiTLODde0.jpg",
#         "rating": 7.115,
#         "streaming_providers": {
#             "flatrate": [
#                 "fuboTV",
#                 "FXNow",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "Die Hard",
#         "release_date": "1988-07-15",
#         "image": "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
#         "rating": 7.766,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard: With a Vengeance",
#         "release_date": "1995-05-19",
#         "image": "/lwTE6cUhGxRaJvQ5VPdletIGDPh.jpg",
#         "rating": 7.246,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Party Hard, Die Young",
#         "release_date": "2018-03-22",
#         "image": "/uR9kM3SSPOGnV55jDl5lQMII2k3.jpg",
#         "rating": 4.7,
#         "streaming_providers": {
#             "flatrate": [
#                 "AMC+ Amazon Channel",
#                 "AMC+ Roku Premium Channel",
#                 "DIRECTV",
#                 "Shudder",
#                 "Shudder Amazon Channel"
#             ],
#             "rent": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard 2",
#         "release_date": "1990-07-02",
#         "image": "/lDFO7D4MdbhjOwaPwe18QG69Rt0.jpg",
#         "rating": 6.919,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Live Free or Die Hard",
#         "release_date": "2007-06-20",
#         "image": "/31TT47YjBl7a7uvJ3ff1nrirXhP.jpg",
#         "rating": 6.598,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }
# ]
# movies = modify_movie_dicts(search_results)

# # Create random streaming service prices for testing purposes
# some_services = {'Netflix', 'Hulu', 'HBO', 'Amazon Prime', 'TNT', 'Disney Plus', 'tru TV', 'Redbox'}
# prices = {}
# for service in some_services:
#     prices[service] = random.randint(1, 15)

# budget = 20

# first, second, third = find_best_bundle(movies, prices, budget)
# print("BEST BUNDLE:", "\nServices: ", first[0], "\nPrice: ", first[1], "\nMatches Included: ", first[2]) 
# print("\n\nSECOND BEST BUNDLE:", "\nServices: ", second[0], "\nPrice: ", second[1], "\nMatches Included: ", second[2]) 
# print("\n\nTHIRD BEST BUNDLE:", "\nServices: ", third[0], "\nPrice: ", third[1], "\nMatches Included: ", third[2]) 


###########################################################################################
# # MEDIUM-LARGE TEST (takes ~25 sec to run)
# search_results = [
#     {
#         "title": "Star Wars",
#         "release_date": "1977-05-25",
#         "image": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
#         "rating": 8.2,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus",
#                 "Sling TV Orange and Blue",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },   
#     {
#         "title": "Avengers: Endgame",
#         "release_date": "2019-04-24",
#         "image": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
#         "rating": 8.266,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "DodgeBall: A True Underdog Story",
#         "release_date": "2004-06-18",
#         "image": "/r8KbNHkkwFXLjV1suGwm0Qjure5.jpg",
#         "rating": 6.339,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "Cinemax Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "The Maze Runner",
#         "release_date": "2014-09-10",
#         "image": "/ode14q7WtDugFDp78fo9lCsmay9.jpg",
#         "rating": 7.172,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Scorch Trials",
#         "release_date": "2015-09-09",
#         "image": "/lq9n07JSzdhK5l1TKxQ9SHawNYn.jpg",
#         "rating": 6.724,
#         "streaming_providers": {
#             "flatrate": [],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Death Cure",
#         "release_date": "2018-01-10",
#         "image": "/2zYfzA3TBwrMC8tfFbpiTLODde0.jpg",
#         "rating": 7.115,
#         "streaming_providers": {
#             "flatrate": [
#                 "fuboTV",
#                 "FXNow",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "Die Hard",
#         "release_date": "1988-07-15",
#         "image": "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
#         "rating": 7.766,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard: With a Vengeance",
#         "release_date": "1995-05-19",
#         "image": "/lwTE6cUhGxRaJvQ5VPdletIGDPh.jpg",
#         "rating": 7.246,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Party Hard, Die Young",
#         "release_date": "2018-03-22",
#         "image": "/uR9kM3SSPOGnV55jDl5lQMII2k3.jpg",
#         "rating": 4.7,
#         "streaming_providers": {
#             "flatrate": [
#                 "AMC+ Amazon Channel",
#                 "AMC+ Roku Premium Channel",
#                 "DIRECTV",
#                 "Shudder",
#                 "Shudder Amazon Channel"
#             ],
#             "rent": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard 2",
#         "release_date": "1990-07-02",
#         "image": "/lDFO7D4MdbhjOwaPwe18QG69Rt0.jpg",
#         "rating": 6.919,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Live Free or Die Hard",
#         "release_date": "2007-06-20",
#         "image": "/31TT47YjBl7a7uvJ3ff1nrirXhP.jpg",
#         "rating": 6.598,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }
# ]
# movies = modify_movie_dicts(search_results)

# # Create random streaming service prices for testing purposes
# some_services = {'AMC+ Amazon Channel', 'Amazon Video', 'Redbox', 'Starz', 'DIRECTV', 'HBO Max', 'Sling TV Orange and Blue', 'Vudu', 'AMC on Demand', 'YouTube'}
# prices = {}
# for service in some_services:
#     prices[service] = random.randint(1, 15)

# budget = 20

# first, second, third = find_best_bundle(movies, prices, budget)
# print("BEST BUNDLE:", "\nServices: ", first[0], "\nPrice: ", first[1], "\nMatches Included: ", first[2]) 
# print("\n\nSECOND BEST BUNDLE:", "\nServices: ", second[0], "\nPrice: ", second[1], "\nMatches Included: ", second[2]) 
# print("\n\nTHIRD BEST BUNDLE:", "\nServices: ", third[0], "\nPrice: ", third[1], "\nMatches Included: ", third[2]) 

###########################################################################################
# # LARGE TEST (Won't return)
# search_results = [
#     {
#         "title": "Star Wars",
#         "release_date": "1977-05-25",
#         "image": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
#         "rating": 8.2,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus",
#                 "Sling TV Orange and Blue",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },   
#     {
#         "title": "Avengers: Endgame",
#         "release_date": "2019-04-24",
#         "image": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
#         "rating": 8.266,
#         "streaming_providers": {
#             "flatrate": [
#                 "Disney Plus"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "DodgeBall: A True Underdog Story",
#         "release_date": "2004-06-18",
#         "image": "/r8KbNHkkwFXLjV1suGwm0Qjure5.jpg",
#         "rating": 6.339,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "Cinemax Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "The Maze Runner",
#         "release_date": "2014-09-10",
#         "image": "/ode14q7WtDugFDp78fo9lCsmay9.jpg",
#         "rating": 7.172,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Scorch Trials",
#         "release_date": "2015-09-09",
#         "image": "/lq9n07JSzdhK5l1TKxQ9SHawNYn.jpg",
#         "rating": 6.724,
#         "streaming_providers": {
#             "flatrate": [],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Maze Runner: The Death Cure",
#         "release_date": "2018-01-10",
#         "image": "/2zYfzA3TBwrMC8tfFbpiTLODde0.jpg",
#         "rating": 7.115,
#         "streaming_providers": {
#             "flatrate": [
#                 "fuboTV",
#                 "FXNow",
#                 "DIRECTV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }, 
#     {
#         "title": "Die Hard",
#         "release_date": "1988-07-15",
#         "image": "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
#         "rating": 7.766,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard: With a Vengeance",
#         "release_date": "1995-05-19",
#         "image": "/lwTE6cUhGxRaJvQ5VPdletIGDPh.jpg",
#         "rating": 7.246,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Party Hard, Die Young",
#         "release_date": "2018-03-22",
#         "image": "/uR9kM3SSPOGnV55jDl5lQMII2k3.jpg",
#         "rating": 4.7,
#         "streaming_providers": {
#             "flatrate": [
#                 "AMC+ Amazon Channel",
#                 "AMC+ Roku Premium Channel",
#                 "DIRECTV",
#                 "Shudder",
#                 "Shudder Amazon Channel"
#             ],
#             "rent": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store"
#             ]
#         }
#     },
#     {
#         "title": "Die Hard 2",
#         "release_date": "1990-07-02",
#         "image": "/lDFO7D4MdbhjOwaPwe18QG69Rt0.jpg",
#         "rating": 6.919,
#         "streaming_providers": {
#             "flatrate": [
#                 "Starz Roku Premium Channel",
#                 "Starz",
#                 "DIRECTV",
#                 "Starz Amazon Channel"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand",
#                 "Spectrum On Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     },
#     {
#         "title": "Live Free or Die Hard",
#         "release_date": "2007-06-20",
#         "image": "/31TT47YjBl7a7uvJ3ff1nrirXhP.jpg",
#         "rating": 6.598,
#         "streaming_providers": {
#             "flatrate": [
#                 "HBO Max",
#                 "HBO Max Amazon Channel",
#                 "DIRECTV",
#                 "TNT",
#                 "TBS",
#                 "tru TV"
#             ],
#             "rent": [
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ],
#             "buy": [
#                 "Apple TV",
#                 "Amazon Video",
#                 "Google Play Movies",
#                 "YouTube",
#                 "Vudu",
#                 "Microsoft Store",
#                 "Redbox",
#                 "DIRECTV",
#                 "AMC on Demand"
#             ]
#         }
#     }
# ]
# movies = modify_movie_dicts(search_results)

# # Create random streaming service prices for testing purposes
# some_services = {'AMC+ Amazon Channel', 'Amazon Video', 'Redbox', 'Starz', 'HBO Max Amazon Channel', 'DIRECTV', 'HBO Max', 'Sling TV Orange and Blue', 'Vudu', 'AMC on Demand', 'YouTube', 'Microsoft Store', 'Starz Roku Premium Channel', 'Disney Plus', 'Shudder Amazon Channel', 'TNT', 'Google Play Movies', 'FXNow', 'fuboTV', 'Shudder', 'Apple TV', 'AMC+ Roku Premium Channel', 'Spectrum On Demand', 'tru TV', 'TBS', 'Starz Amazon Channel', 'Cinemax Amazon Channel'}
# prices = {}
# for service in some_services:
#     prices[service] = random.randint(1, 15)

# budget = 20

# first, second, third = find_best_bundle(movies, prices, budget)
# print("BEST BUNDLE:", "\nServices: ", first[0], "\nPrice: ", first[1], "\nMatches Included: ", first[2]) 
# print("\n\nSECOND BEST BUNDLE:", "\nServices: ", second[0], "\nPrice: ", second[1], "\nMatches Included: ", second[2]) 
# print("\n\nTHIRD BEST BUNDLE:", "\nServices: ", third[0], "\nPrice: ", third[1], "\nMatches Included: ", third[2]) 




###########################################################################################

# Below is working code to find the top match only:

# def find_best_bundle(movies, services, budget):
#     # Initialize variables to keep track of best bundle
#     best_bundle = set()
#     best_bundle_cost = float('inf')
#     best_bundle_movies = set()
    
#     # Recursively test all possible bundles
#     def explore_bundle(bundle, bundle_cost, bundle_movies):
#         nonlocal best_bundle, best_bundle_cost, best_bundle_movies
#         # Check if the current bundle is within the budget and offers more movies
#         if bundle_cost <= budget and len(bundle_movies) >= len(best_bundle_movies):
#             if len(bundle_movies) > len(best_bundle_movies):
#                 best_bundle = bundle
#                 best_bundle_cost = bundle_cost
#                 best_bundle_movies = bundle_movies
#             # if there is a tie with how many movies they offer, but new bundle is cheaper
#             else:
#                 if bundle_cost < best_bundle_cost:
#                     best_bundle = bundle
#                     best_bundle_cost = bundle_cost
#                     best_bundle_movies = bundle_movies

#         # Recurse with each possible service added to the bundle
#         for service in services:
#             if service not in bundle:
#                 new_bundle = bundle | {service}
#                 new_bundle_cost = bundle_cost + services[service]
#                 new_bundle_movies = set()
#                 for movie in movies:
#                     if new_bundle.intersection(movies[movie]):
#                         new_bundle_movies.add(movie)
#                 explore_bundle(new_bundle, new_bundle_cost, new_bundle_movies)
    
#     # Start exploring the empty bundle
#     explore_bundle(set(), 0, set())
    
#     # Return the best bundle
#     return best_bundle, best_bundle_cost, best_bundle_movies

# Example input data
# movies = {
#     'The Shawshank Redemption': {'Netflix', 'Hulu'},
#     'The Godfather': {'Netflix'},
#     'The Dark Knight': {'HBO', 'Amazon Prime'},
#     'Forrest Gump': {'Netflix', 'Amazon Prime', 'Hulu'},
#     'Inception': {'HBO', 'Amazon Prime'}
# }
# streaming_services = {
#     'Netflix': 10,
#     'Hulu': 8,
#     'HBO': 15,
#     'Amazon Prime': 9
# }
# budget = 16

# all_valid_bundles = find_best_bundle(movies, streaming_services, budget)
# print(all_valid_bundles)