from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import logging

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # 允许所有来源访问 API

# 配置日志
logging.basicConfig(level=logging.INFO)

# 留言数据文件
MESSAGES_FILE = 'messages.json'

# 确保留言文件存在
if not os.path.exists(MESSAGES_FILE):
    try:
        with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
    except Exception as e:
        logging.error(f"创建留言文件失败: {str(e)}")

# 读取留言
def read_messages():
    try:
        with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logging.error(f"读取留言失败: {str(e)}")
        return []

# 写入留言
def write_messages(messages):
    try:
        with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
            json.dump(messages, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logging.error(f"写入留言失败: {str(e)}")

# 获取所有留言
@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        messages = read_messages()
        return jsonify(messages)
    except Exception as e:
        logging.error(f"获取留言失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

# 添加新留言
@app.route('/api/messages', methods=['POST'])
def add_message():
    try:
        logging.info("收到新留言请求")
        message = request.json
        logging.info(f"留言内容: {message}")
        messages = read_messages()
        messages.append(message)
        write_messages(messages)
        logging.info("留言保存成功")
        return jsonify(message)
    except Exception as e:
        logging.error(f"添加留言失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

# 删除留言
@app.route('/api/messages/<message_id>', methods=['DELETE'])
def delete_message(message_id):
    try:
        messages = read_messages()
        messages = [m for m in messages if m['id'] != message_id]
        write_messages(messages)
        return jsonify({'success': True})
    except Exception as e:
        logging.error(f"删除留言失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    logging.info("服务器启动在 http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True) 
