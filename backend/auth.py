from fastapi import APIRouter, HTTPException,Depends
from database import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(emp_code: str, db = Depends(get_db)):
    conn = get_db()
    cur = conn.cursor()

    sql = """
    SELECT
        user_id,
        emp_code,
        full_name,
        position,
        branch_id,
        service_point_id,
        user_role
    FROM sams_users
    WHERE emp_code = %s
    """

    cur.execute(sql, (emp_code,))
    user = cur.fetchone()

    cur.close()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="ไม่พบผู้ใช้ในระบบ"
        )

    return {
        "user_id": user[0],
        "emp_code": user[1],
        "full_name": user[2],
        "position": user[3],
        "branch_id": user[4],
        "service_point_id": user[5],
        "user_role": user[6]
    }
