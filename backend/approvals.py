from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from dependencies import get_current_user

router = APIRouter(prefix="/approvals", tags=["Approvals"])

@router.put("/{asset_req_id}")
def approve_asset_request(
    asset_req_id: int,
    action: str,   # "approve" หรือ "reject"
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    # 🔒 เฉพาะ Admin / Superadmin
    if current_user["user_role"] not in ["Admin", "Superadmin"]:
        raise HTTPException(status_code=403, detail="No permission")

    if action not in ["approve", "reject"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    cur = db.cursor()

    # 🔍 เช็คว่าเป็น request ที่ user นี้มีสิทธิ์อนุมัติ
    cur.execute("""
        SELECT asset_req_id
        FROM asset_req
        WHERE asset_req_id = %s
          AND approver_id = %s
          AND req_status = 'รออนุมัติ'
    """, (asset_req_id, current_user["user_id"]))

    if cur.fetchone() is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found or already processed"
        )

    # 🟢 แปลง action → ค่า ENUM
    new_status = "อนุมัติ" if action == "approve" else "ไม่อนุมัติ"

    # ✅ UPDATE
    cur.execute("""
        UPDATE asset_req
        SET req_status = %s
        WHERE asset_req_id = %s
    """, (new_status, asset_req_id))

    db.commit()

    return {
        "asset_req_id": asset_req_id,
        "status": new_status
    }
