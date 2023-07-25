from flask import Flask, request

app = Flask(__name__)


from flask import Flask, request
import requests
import base64

app = Flask(__name__)

@app.route('/image_to_base64', methods=['GET'])
def image_to_base64():
    image_url = request.args.get('image_url')

    if not image_url:
        return {'error': 'Image URL parameter is missing.'}, 400

    try:
        # 获取图片内容
        response = requests.get(image_url, verify=False)
        if response.status_code == 200:
            # 将图片内容转换为 Base64 编码
            image_base64 = base64.b64encode(response.content).decode('utf-8')
            return {'base64': image_base64}
        else:
            return {'error': 'Failed to fetch image from URL.'}, 404
    except Exception as e:
        return {'error': str(e)}, 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)
