from flask import Flask, request, jsonify, render_template, url_for

app = Flask(__name__)

# Sample data to filter (e.g., products)
data = [
    {"id": 1, "name": "Screwdriver", "category": "Tools", "price": 77.99,"rating": 3.3,"image-name": "screwdriver-tikinti-materiallari01.jpg"},
    {"id": 2, "name": "Hammer", "category": "Tools", "price": 19.99,"rating": 3.3, "image-name": "hammer-tikinti-materiallari01.jpg"},
    {"id": 3, "name": "Drill", "category": "Tools", "price": 49.99,"rating": 3.3, "image-name": "dreldesti.jpg"},
    {"id": 4, "name": "Saw", "category": "Tools", "price": 24.99,"rating": 3.3, "image-name": "saw-tikinti-materiallari01.jpg"},
    {"id": 5, "name": "Wrench", "category": "Tools", "price": 17.99,"rating": 3.3, "image-name": "wrench01.jpg"},
    {"id": 6, "name": "Pliers", "category": "Tools", "price": 9.99,"rating": 3.3, "image-name": "pliers01.jpg"},
]

@app.route('/')
def index():
    return render_template('index.html', products=data)

@app.route('/filter', methods=['GET'])
def filter_data():
    category = request.args.get('category')
    max_price = request.args.get('max_price', type=float)
    min_price = request.args.get('min_price', type=float)
    rating = request.args.get('rating', type=float)

    filtered_data = data
    if category:
        filtered_data = [item for item in filtered_data if item['category'] == category]
    if max_price is not None:
        filtered_data = [item for item in filtered_data if item['price'] <= max_price]
    if min_price is not None:
        filtered_data = [item for item in filtered_data if item['price'] >= min_price]
    if rating is not None:
        filtered_data = [item for item in filtered_data if item.get('rating', 0) >= rating]

    for item in filtered_data:
        item['image-url'] = url_for('static', filename=f'img/{item["image-name"]}')

    return jsonify(filtered_data)

if __name__ == '__main__':
    app.run(debug=True)
