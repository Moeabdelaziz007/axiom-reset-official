from google.adk.tools import FunctionTool

@FunctionTool
def make_reservation(
    restaurant_id: str,
    date: str,
    time: str,
    party_size: int,
    customer_name: str,
    phone_number: str,
    special_requests: str = None
) -> dict:
    """
    حجز طاولة في المطعم
    
    Args:
        restaurant_id: معرف المطعم
        date: تاريخ الحجز (YYYY-MM-DD)
        time: وقت الحجز (HH:MM)
        party_size: عدد الأشخاص
        customer_name: اسم الحاجز
        phone_number: رقم الهاتف
        special_requests: طلبات خاصة (مثل: طاولة هادئة، كرسي أطفال)
    
    Returns:
        تفاصيل الحجز ورقم التأكيد
    """
    # TODO: Integrate with reservation system
    return {
        "reservation_id": "RES-2024-001",
        "status": "confirmed",
        "restaurant_name": "مطعم النجوم",
        "date": date,
        "time": time,
        "party_size": party_size,
        "confirmation_code": "ABC123"
    }
