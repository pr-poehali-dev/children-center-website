"""Управление галереей фотографий на главной странице."""
import json
import os
import base64
import uuid
import boto3
import psycopg2

SCHEMA = "t_p29674401_children_center_webs"

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

def handler(event: dict, context) -> dict:
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, url, sort_order FROM {SCHEMA}.gallery ORDER BY sort_order, id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        data = [{'id': r[0], 'url': r[1], 'sort_order': r[2]} for r in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(data, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        action = body.get('action', 'upload')

        if action == 'upload':
            file_data = body.get('file')
            content_type = body.get('content_type', 'image/jpeg')
            if not file_data:
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'file required'})}

            image_bytes = base64.b64decode(file_data)
            ext = 'jpg' if 'jpeg' in content_type else content_type.split('/')[-1]
            key = f"gallery/{uuid.uuid4()}.{ext}"

            s3 = get_s3()
            s3.put_object(Bucket='files', Key=key, Body=image_bytes, ContentType=content_type)
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"SELECT COALESCE(MAX(sort_order), 0) + 1 FROM {SCHEMA}.gallery")
            next_order = cur.fetchone()[0]
            cur.execute(f"INSERT INTO {SCHEMA}.gallery (url, sort_order) VALUES (%s, %s) RETURNING id", (cdn_url, next_order))
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'id': new_id, 'url': cdn_url})}

        if action == 'reorder':
            items = body.get('items', [])
            conn = get_conn()
            cur = conn.cursor()
            for item in items:
                cur.execute(f"UPDATE {SCHEMA}.gallery SET sort_order = %s WHERE id = %s", (item['sort_order'], item['id']))
            conn.commit()
            cur.close()
            conn.close()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        photo_id = body.get('id')
        if not photo_id:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id required'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.gallery WHERE id = %s", (int(photo_id),))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
