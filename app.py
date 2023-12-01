from fastapi import FastAPI, HTTPException
import sqlite3
from sqlite3 import Error

from fastapi.middleware.cors import CORSMiddleware

# FastAPI app instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Database configuration
DATABASE_PATH = '/Users/harshladani/Desktop/Football DMBS/my-football-app/database.sqlite'

def create_connection(db_file):
    """ Create a database connection to the SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

# API endpoint to read countries
@app.get("/countries/")
async def read_countries():
    conn = create_connection(DATABASE_PATH)
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM Country"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return {"countries": rows}
        except Error as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            conn.close()
    else:
        raise HTTPException(status_code=500, detail="Countries: Error connecting to the database")

# API endpoint to read players
@app.get("/players/")
async def read_players():
    conn = create_connection(DATABASE_PATH)
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM Player"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return {"players": rows}
        except Error as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            conn.close()
    else:
        raise HTTPException(status_code=500, detail="Players: Error connecting to the database")

# API endpoint to read League
@app.get("/leagues/")
async def read_leagues():
    conn = create_connection(DATABASE_PATH)
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM League"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return {"leagues": rows}
        except Error as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            conn.close()
    else:
        raise HTTPException(status_code=500, detail="Leagues: Error connecting to the database")   

# API endpoint to read Matches
@app.get("/matches/")
async def read_matches():
    conn = create_connection(DATABASE_PATH)
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM Match"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return {"matches": rows}
        except Error as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            conn.close()
    else:
        raise HTTPException(status_code=500, detail="Matches: Error connecting to the database")     

# API endpoint to read Teams
@app.get("/teams/")
async def read_teams():
    conn = create_connection(DATABASE_PATH)
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM Team"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return {"teams": rows}
        except Error as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            conn.close()
    else:
        raise HTTPException(status_code=500, detail="Teams: Error connecting to the database")


# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
