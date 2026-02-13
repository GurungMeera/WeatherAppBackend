from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
import requests
app = FastAPI()


load_dotenv()
api_key = os.getenv("WEATHER_API_KEY")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],        # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],        # Allow all headers
)

# Define the input model
class Location(BaseModel):
    city: str
    state: str

class LatLon(BaseModel):
    lat: str
    lon: str

# POST endpoint to receive city and state
@app.post("/weather")
async def weather(location: Location):
    city = location.city
    state = location.state

    api_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{state},US&appid={api_key}"
    response = requests.get(api_url)
    data = response.json()
    lat = data[0]['lat']
    lon = data[0]['lon']

    print("data", data)

    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=Imperial&appid={api_key}"
    response_weather = requests.get(weather_url)
    weather_data = response_weather.json()
    return JSONResponse(content=weather_data)

# POST endpoint to receive city and state
@app.post("/weather_lat_lon")
async def weather(lastLon: LatLon):
    lat = lastLon.lat
    lon = lastLon.lon
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=Imperial&appid={api_key}"
    response_weather = requests.get(weather_url)
    weather_data = response_weather.json()
    return JSONResponse(content=weather_data)

@app.post("/weather_weekly")
async def weekly_weather(lastLon: LatLon):
    lat = lastLon.lat
    lon = lastLon.lon
    weather_url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid={api_key}"
    response_weather = requests.get(weather_url)
    weather_data = response_weather.json()
    return JSONResponse(content=weather_data)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
