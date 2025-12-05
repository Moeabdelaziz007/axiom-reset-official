from google.adk.tools import FunctionTool

@FunctionTool
def search_restaurants(
    query: str,
    cuisine_type: str = None,
    location: str = None,
    price_range: str = None
) -> dict:
    """
    البحث عن مطاعم
    
    Args:
        query: كلمات البحث (مثل: بيتزا، سوشي، برجر)
        cuisine_type: نوع المطبخ (عربي، إيطالي، آسيوي، إلخ)
        location: الموقع أو المنطقة
        price_range: نطاق الأسعار (رخيص، متوسط، فاخر)
    
    Returns:
        قائمة المطاعم المطابقة
    """
    # TODO: Integrate with restaurant API
    return {
        "restaurants": [
            {
                "id": "rest_001",
                "name": "بيتزا هت",
                "cuisine": "إيطالي",
                "rating": 4.5,
                "delivery_time": "30-45 دقيقة",
                "price_range": "متوسط"
            }
        ],
        "total": 1
    }


@FunctionTool
def get_menu(restaurant_id: str) -> dict:
    """
    عرض قائمة الطعام للمطعم
    
    Args:
        restaurant_id: معرف المطعم
    
    Returns:
        قائمة الأصناف والأسعار
    """
    # TODO: Integrate with restaurant API
    return {
        "restaurant_id": restaurant_id,
        "categories": [
            {
                "name": "بيتزا",
                "items": [
                    {"id": "item_001", "name": "بيبروني", "price": 45.00},
                    {"id": "item_002", "name": "مارغريتا", "price": 35.00}
                ]
            }
        ]
    }
