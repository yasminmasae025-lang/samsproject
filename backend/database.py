import psycopg2

def get_db():
    conn = psycopg2.connect(
        host="localhost",
        database="sams",
        user="postgres",
        password="postgres",   
        port="5432"
    )
    try:
        yield conn
    finally:
        conn.close()