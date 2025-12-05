from google.adk.tools import FunctionTool

@FunctionTool
def place_order(
    restaurant_id: str,
    items: list,
    delivery_address: str,
    phone_number: str,
    payment_method: str = "cash",
    notes: str = None
) -> dict:
    """
    تنفيذ طلب جديد
    
    Args:
        restaurant_id: معرف المطعم
        items: قائمة الأصناف [{"item_id": "...", "quantity": 1, "notes": "..."}]
        delivery_address: عنوان التوصيل الكامل
        phone_number: رقم الهاتف للتواصل
        payment_method: طريقة الدفع (cash/card)
        notes: ملاحظات إضافية على الطلب
    
    Returns:
        تفاصيل الطلب ورقم التتبع
    """
    # TODO: Integrate with restaurant ordering API
    return {
        "order_id": "ORD-2024-001",
        "status": "confirmed",
        "estimated_delivery": "45 دقيقة",
        "total": 80.00,
        "tracking_url": "https://track.axiomid.app/ORD-2024-001"
    }


@FunctionTool
def track_order(order_id: str) -> dict:
    """
    تتبع حالة الطلب
    
    Args:
        order_id: رقم الطلب
    
    Returns:
        حالة الطلب الحالية
    """
    # TODO: Integrate with delivery tracking API
    return {
        "order_id": order_id,
        "status": "جاري التحضير",
        "status_code": "preparing",
        "estimated_arrival": "20 دقيقة",
        "driver": {
            "name": "أحمد",
            "phone": "+20100XXXXXXX"
        }
    }
