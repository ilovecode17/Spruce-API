# Spruce API

RESTful API for accessing the Spruce database. This API provides programmatic access to over 100 historical musical works spanning from 2100 BC to 2020 AD.

## Live API

The API is deployed and accessible at:

**Base URL:** `https://spruce-api.vercel.app/`

No installation required - the API is ready to use immediately.

## Local Installation (Optional)

If you want to run the API locally:

```bash
npm install
```

### Running Locally

#### Production
```bash
npm start
```

#### Development
```bash
npm run dev
```

The API will start on port 3000 by default, or on the port specified in the PORT environment variable.

## API Endpoints

### Base URL
```
https://spruce-api.vercel.app/
```

### Root Endpoint
```
GET /
```
Returns API information and available endpoints.

**Example:**
```
https://spruce-api.vercel.app/
```

### Get All Songs
```
GET /api/songs
```
Returns all songs with pagination support.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 100) - Items per page
- `sort` (optional, default: 'id') - Sort by: 'id', 'year', or 'title'

**Example:**
```
https://spruce-api.vercel.app/api/songs?page=1&limit=20&sort=year
```

**Response:**
```json
{
  "success": true,
  "count": 20,
  "total": 100,
  "page": 1,
  "totalPages": 5,
  "data": [...]
}
```

### Get Song by ID
```
GET /api/songs/:id
```

Returns a single song by its ID.

**Example:**
```
api/songs/42
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "era": "Renaissance",
    "title": "Mille Regretz",
    "region": "France",
    "composer": "By Josquin des Prez",
    "year": "1520 AD",
    "youtube": "https://youtu.be/107gP2moTKM",
    "wikipedia": "",
    "spotify": "",
    "lyrics": ""
  }
}
```

### Get Songs by Year
```
GET /api/songs/year/:year
```
Returns all songs from a specific year.

**Example:**
```
https://spruce-api.vercel.app/api/songs/year/1600%20AD
```

### Get Closest Song by Year
```
GET /api/songs/closest/:year
```
Finds the closest song to a given year.

**Query Parameters:**
- `era` (optional, default: 'AD') - 'AD' or 'BC'

**Example:**
```
https://spruce-api.vercel.app/api/songs/closest/1500?era=AD
```

**Response:**
```json
{
  "success": true,
  "searchYear": "1500 AD",
  "difference": 0,
  "data": {
    "id": 40,
    "era": "Renaissance",
    "title": "El Grillo",
    "region": "Italy",
    "composer": "By Josquin des Prez",
    "year": "1500 AD",
    "youtube": "https://youtu.be/OI-bQ0RkArA",
    "wikipedia": "",
    "spotify": "",
    "lyrics": ""
  }
}
```

### Get Songs by Era
```
GET /api/songs/era/:era
```
Returns all songs from a specific era.

**Available Eras:**
- Ancient
- Medieval
- Renaissance
- Baroque
- Classical
- Romantic
- Popular

**Example:**
```
https://spruce-api.vercel.app/api/songs/era/baroque
```

**Response:**
```json
{
  "success": true,
  "era": "baroque",
  "count": 15,
  "data": [...]
}
```

### Search Songs
```
GET /api/songs/search?q=query
```
Search songs by title, composer, region, or era.

**Query Parameters:**
- `q` (required) - Search query

**Example:**
```
https://spruce-api.vercel.app/api/songs/search?q=beethoven
```

**Response:**
```json
{
  "success": true,
  "query": "beethoven",
  "count": 8,
  "data": [...]
}
```

### Get All Eras
```
GET /api/eras
```
Returns all musical eras with song counts.

**Example:**
```
https://spruce-api.vercel.app/api/eras
```

**Response:**
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "era": "Ancient",
      "count": 17,
      "songs": [...]
    }
  ]
}
```

### Get Statistics
```
GET /api/stats
```
Returns database statistics.

**Example:**
```
https://spruce-api.vercel.app/api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSongs": 100,
    "eras": 7,
    "regions": 15,
    "withYouTube": 77,
    "withWikipedia": 51,
    "withSpotify": 13,
    "withLyrics": 13,
    "byEra": {
      "Ancient": 17,
      "Medieval": 13,
      "Renaissance": 16,
      "Baroque": 15,
      "Classical": 13,
      "Romantic": 10,
      "Popular": 13
    }
  }
}
```

## Song Object Structure

```json
{
  "id": 1,
  "era": "Ancient",
  "title": "The Epic of Gilgamesh",
  "region": "Sumerian",
  "composer": "",
  "year": "2100 BC",
  "youtube": "https://youtu.be/FTG5lhtJ5rE",
  "wikipedia": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh",
  "spotify": "",
  "lyrics": ""
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": "Song not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "error": "Search query parameter 'q' is required"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 per window

## Security Features

- **CORS**: Enabled for all origins
- **Helmet**: Security headers protection
- **Rate Limiting**: Request throttling
- **Input Validation**: Query parameter sanitization

## Example Usage

### JavaScript (Fetch API)
```javascript
fetch('https://spruce-api.vercel.app/api/songs/closest/1500?era=AD')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### cURL
```bash
curl https://spruce-api.vercel.app/api/songs/era/baroque
```

### Python
```python
import requests

response = requests.get('https://spruce-api.vercel.app/api/songs/search?q=mozart')
data = response.json()
print(data)
```

### Node.js (Axios)
```javascript
const axios = require('axios');

axios.get('https://spruce-api.vercel.app/api/songs/42')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

## Quick Start Examples

### Get a Random Song
```bash
curl https://spruce-api.vercel.app/api/songs/42
```

### Get All Baroque Music
```bash
curl https://spruce-api.vercel.app/api/songs/era/baroque
```

### Find Music from 1500 AD
```bash
curl https://spruce-api.vercel.app/api/songs/closest/1500?era=AD
```

## Dependencies

- **express**: Web framework
- **cors**: CORS middleware
- **helmet**: Security middleware
- **express-rate-limit**: Rate limiting

## Database

The API includes 100 songs with complete metadata including:
- Historical era classification
- Geographic region
- Composer/Artist information
- Year of composition
- External resource links (YouTube, Wikipedia, Spotify, Lyrics)

## Related Projects

- **Spruce Web App**: [https://spruce-h2yn.onrender.com](https://spruce-h2yn.onrender.com)