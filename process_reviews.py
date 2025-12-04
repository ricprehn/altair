import json
import re
from datetime import datetime

input_file = 'reviews.json'
output_file = 'reviews_data.json'

def parse_rating(rating_str):
    rating_map = {
        'FIVE': 5,
        'FOUR': 4,
        'THREE': 3,
        'TWO': 2,
        'ONE': 1
    }
    return rating_map.get(rating_str, 5)

def format_date(date_str):
    try:
        # Format: 2019-12-26T08:35:22.497625Z
        dt = datetime.strptime(date_str.split('.')[0], "%Y-%m-%dT%H:%M:%S")
        return dt.strftime("%Y-%m-%d")
    except:
        return date_str

try:
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Attempt to fix truncation
    # Find the last occurrence of "    }," which signifies the end of a review object in this specific formatting
    last_object_end = content.rfind('    },')
    
    if last_object_end != -1:
        # Keep content up to the closing brace of the last complete object
        # The structure is "reviews": [ { ... }, { ... } ...
        # We want to close the array and the root object
        fixed_content = content[:last_object_end + 6] + "\n  ]\n}"
    else:
        # Fallback if formatting is different, try to parse as is or fail
        fixed_content = content

    try:
        data = json.loads(fixed_content)
    except json.JSONDecodeError:
        # If simple fix failed, try a more aggressive one: find the last "}," and cut
        last_brace = content.rfind('},')
        if last_brace != -1:
             fixed_content = content[:last_brace + 2] + "]}"
             data = json.loads(fixed_content)
        else:
            raise

    processed_reviews = []
    if 'reviews' in data:
        for review in data['reviews']:
            # Extract fields
            name = review.get('reviewer', {}).get('displayName', 'Anonymous')
            
            # Handle comment: remove (Translated by Google)... if present?
            # User might want the original or translated. The file has both.
            # "Increíble... \n\n(Translated by Google)\nIncredible..."
            # Let's keep the original Spanish part (before the translation tag)
            comment = review.get('comment', '')
            if '(Translated by Google)' in comment:
                comment = comment.split('(Translated by Google)')[0].strip()
            
            rating = parse_rating(review.get('starRating', 'FIVE'))
            date = format_date(review.get('createTime', ''))
            
            if comment and comment != "(Sin comentario)":
                processed_reviews.append({
                    "name": name,
                    "text": comment,
                    "rating": rating,
                    "date": date
                })

    # Save processed data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_reviews, f, indent=4, ensure_ascii=False)
    
    print(f"Successfully processed {len(processed_reviews)} reviews.")

except Exception as e:
    print(f"Error processing reviews: {e}")
