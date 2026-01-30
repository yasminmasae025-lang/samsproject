from fastapi import APIRouter, Depends
from dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

# ✅ สำหรับหน้า Profile (ตัวเองเท่านั้น)
@router.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return {
        "user_id": current_user["user_id"],
        "emp_code": current_user["emp_code"],
        "full_name": current_user["full_name"],
        "position": current_user["position"],
        "branch_id": current_user["branch_id"],
        "phone": current_user.get("phone"),
        "email": current_user.get("email"),
        "user_role": current_user["user_role"],
    }
