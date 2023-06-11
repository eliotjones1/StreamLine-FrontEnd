import numpy as np
import cvxpy as cp
import pandas as pd
import random

df = pd.read_csv('pricing - Sheet2-2.csv')

def modify_input(input):
    # Expects a list of movies or tv shows with the following inputs:
    # title, release date, image, streaming providers, media type
    providers = {}
    streaming_services = []
    prices = {}
    for item in input:
        title = item["title"]
        providers[title] = []
        services = item["streaming_providers"]
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

