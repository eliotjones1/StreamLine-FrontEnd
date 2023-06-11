import requests
import json
from rest_framework.response import Response
from rest_framework import generics, status
import pandas as pd

# This function takes in a string parameter which is a movie title, and uses 
# the TMDB API to return a top five list of movies that match
def getMovies(title):
    # This is the API key for TMDB
    api_key = "95cd5279f17c6593123c72d04e0bedfa"

    # This is the base URL for the TMDB API
    base_url = "https://api.themoviedb.org/3/"

    # This is the endpoint for the TMDB API
    endpoint = "search/movie?"

    # This is the query parameter for the TMDB API

    query = title

    # This is the full URL for the TMDB API
    full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"

    # This is the response from the TMDB API
    response = requests.get(full_url)

    if response.status_code != 200:
        return None

    # This is the JSON data from the response
    data = response.json()

    # This is a list of the top five movies that match the query
    popularity = {}
    for i, result in enumerate(data["results"]):
        popularity[result["popularity"]] = i
    sorted_popularity = dict(sorted(popularity.items(), key=lambda x: x[0], reverse = True))
    indices = list(sorted_popularity.values())[0:4]
    top_five = [data["results"][index] for index in indices]
    
    return top_five

# This function operates similarly to the getMovies function, but it returns a top five list of TV shows that match
def getShows(title):
    # This is the API key for TMDB
    api_key = "95cd5279f17c6593123c72d04e0bedfa"

    # This is the base URL for the TMDB API
    base_url = "https://api.themoviedb.org/3/"

    # This is the endpoint for the TMDB API
    endpoint = "search/tv?"

    # This is the query parameter for the TMDB API
    query = title

    # This is the full URL for the TMDB API
    full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&include_adult=false"

    # Operates as above
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    
    popularity = {}
    for i, result in enumerate(data["results"]):
        popularity[result["popularity"]] = i
    sorted_popularity = dict(sorted(popularity.items(), key=lambda x: x[0], reverse = True))
    indices = list(sorted_popularity.values())[0:4]
    top_five = [data["results"][index] for index in indices]

    return top_five

# This function takes in a movie title and returns the TMDB ID for that movie
def getIDMovie(title):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "search/movie?"
    query = title
    full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    data = response.json()
    
    if data["results"] == []:
        return -1

    ID = data["results"][0]["id"]
    return ID

# This function takes in a TV show title and returns the TMDB ID for that TV show
def getIDShow(title):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "search/tv?"
    query = title
    full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&include_adult=false"
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    if data["results"] == []:
        return -1
    
    ID = data["results"][0]["id"]
    return ID

def getStreamingProviderMovie(id):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "movie/"
    query = str(id)
    full_url = base_url + endpoint + query + "/watch/providers?" + "api_key=" + api_key
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    if "US" not in data["results"]:
        return []
    US_data = data["results"]["US"]
    providers = {}
    providers["flatrate"] = []
    providers["rent"] = []
    providers["buy"] = []

    for method in US_data:
        if method == "link":
            continue
        if method == "flatrate":
            for provider in US_data[method]:
                providers["flatrate"].append(provider["provider_name"])
        if method == "rent":
            for provider in US_data[method]:
                providers["rent"].append(provider["provider_name"])
        if method == "buy":
            for provider in US_data[method]:
                providers["buy"].append(provider["provider_name"])
    return providers

def getStreamingProviderShow(id):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "tv/"
    query = str(id)
    full_url = base_url + endpoint + query + "/watch/providers?" + "api_key=" + api_key
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    if "US" not in data["results"]:
        return []
    US_data = data["results"]["US"]
    providers = {}
    providers["flatrate"] = []
    providers["rent"] = []
    providers["buy"] = []

    for method in US_data:
        if method == "link":
            continue
        if method == "flatrate":
            for provider in US_data[method]:
                providers["flatrate"].append(provider["provider_name"])
        if method == "rent":
            for provider in US_data[method]:
                providers["rent"].append(provider["provider_name"])
        if method == "buy":
            for provider in US_data[method]:
                providers["buy"].append(provider["provider_name"])
    return providers
            
def modify_input(input):
    # Expects a list of movies or tv shows with the following inputs:
    # title, release date, image, streaming providers, media type
    # STOP HERE AND MAKE SURE THE INPUT IS IN THIS FORMAT
    # THIS IS SETUP TO RUN LOCALLY ON ELIOT'S COMPUTER
    # YOU WILL NEED TO CHANGE THE PATH TO THE CSV FILE
    # I WILL MAKE THIS MORE GENERAL LATER (PROBABLY)
    # in VS code, right click on the file and hit "copy path" and paste here to run locally
    df = pd.read_csv('api/random/pricing - Sheet2-3.csv')
    
    providers = {}
    streaming_services = []
    prices = {}
    for item in input:
        title = item["title"]
        providers[title] = []
        services = item["streaming_providers"]
        if "flatrate" in services:
            for service in services["flatrate"]:
                # check if service is in first column of df
                index = df.index[df["Name"] == service].tolist()
                # If the service exists
                if index:
                    location = index[0] # Find location
                    service_info = df.loc[location, :] # Get pandas object of the row information
                    if service_info["Name"] not in streaming_services:
                        streaming_services.append(service_info["Name"])
                    if service_info["Price"] == '-': # If the service doesn't have a price
                        # Check if it is an add on
                        if service_info["Add-On"] == 1:
                            # If it is an add on, check if the base service is in the list of providers
                            if not service_info["Where"] == "None":
                                if isinstance(service_info["Where"], str):
                                    # If the base service is in the list of providers, add the price of the base service to the price of the add on
                                    base_service = df.index[df["Name"] == service_info["Where"]].tolist()[0]
                                    price = df.loc[base_service, :]["Price"]
                                    prices[service] = float(price)
                    else: # If it is not an add on, we can directly append the price
                        prices[service] = float(service_info["Price"])
                if service not in providers[title]:
                    providers[title].append(service)
    streaming_services_out = []
    for streaming_service in streaming_services:
        if streaming_service in prices.keys():
            streaming_services_out.append(streaming_service)
    for key in providers.keys():
        temp = []
        for service in providers[key]:
            if service in streaming_services_out:
                temp.append(service)
        providers[key] = temp
    tobedeleted = [key for key in providers.keys() if len(providers[key]) == 0]
    for key in tobedeleted:
        print("We are sorry, but " + key + " is not available on any of the streaming services you have selected.")
        del providers[key]
    return providers, prices, streaming_services_out


def getShowProvidersImages(id):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "tv/"
    query = str(id)
    full_url = base_url + endpoint + query + "/watch/providers?" + "api_key=" + api_key
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    if "US" not in data["results"]:
        return []
    US_data = data["results"]["US"]
    providers = []
    for method in US_data:
         if method == "flatrate":
            for provider in US_data[method]:
                providers.append(provider["provider_name"])
                providers.append(provider["logo_path"])
    
    return providers

def getMovieProvidersImages(id):
    api_key = "95cd5279f17c6593123c72d04e0bedfa"
    base_url = "https://api.themoviedb.org/3/"
    endpoint = "movie/"
    query = str(id)
    full_url = base_url + endpoint + query + "/watch/providers?" + "api_key=" + api_key
    response = requests.get(full_url)

    if response.status_code != 200:
        return None
    
    data = response.json()
    if "US" not in data["results"]:
        return []
    US_data = data["results"]["US"]
    providers = []
    for method in US_data:
         if method == "flatrate":
            for provider in US_data[method]:
                providers.append(provider["provider_name"])
                providers.append(provider["logo_path"])
    
    return providers

def getServiceImages(output):
    df = pd.read_csv('api/random/pricing - Sheet2-3.csv')

    tempOutput = output.copy()

    tempOutput["Images"] = []
    tempOutput["Links"] = []
    for media in output["Movies_and_TV_Shows"]:
        #print(media)
        media_index = output["Movies_and_TV_Shows"].index(media) if media in output["Movies_and_TV_Shows"] else -1
        #print(media + " index is: " + str(media_index))
        if media_index != -1:
            if output["Type"][media_index] == "TV Series":
                id = getIDShow(media)
                #print(media)
                show_provider_images = getShowProvidersImages(id)
                for i in range(len(show_provider_images)):
                    if i % 2 == 0 and show_provider_images[i + 1] not in tempOutput["Images"] and show_provider_images[i] in output["Streaming_Services"]:
                        tempOutput["Images"].append(show_provider_images[i + 1])
            else:
                id = getIDMovie(media)
                movie_provider_images = getMovieProvidersImages(id)
                for i in range(len(movie_provider_images)):
                    if i % 2 == 0 and movie_provider_images[i + 1] not in tempOutput["Images"] and movie_provider_images[i] in output["Streaming_Services"]:
                        tempOutput["Images"].append(movie_provider_images[i + 1])
    tempOutput.pop("Type")
    for service in tempOutput["Streaming_Services"]:
        index = df.index[df["Name"] == service].tolist()
                # If the service exists
        if index:
            location = index[0] # Find location
            service_info = df.loc[location, :] # Get pandas 
            tempOutput["Links"].append(service_info["Link"])
    return tempOutput


        
















