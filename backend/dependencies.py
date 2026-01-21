from fastapi import Depends, HTTPException
from database import get_db

def get_current_user(emp_code: str, db=Depends(get_db)):
    cur = db.cursor()
    cur.execute("""
        SELECT user_id, emp_code, full_name, branch_id, service_point_id, user_role
        FROM sams_users
        WHERE emp_code = %s
    """, (emp_code,))
    user = cur.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return {
        "user_id": user[0],
        "emp_code": user[1],
        "full_name": user[2],
        "branch_id": user[3],
        "service_point_id": user[4],
        "user_role": user[5]
    }
