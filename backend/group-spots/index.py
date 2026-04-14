"""Управление количеством свободных мест в группах центра."""
import json
import os
import psycopg2

SCHEMA = "t_p29674401_children_center_webs"

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, group_name, spots_left FROM {SCHEMA}.group_spots ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        data = [{'id': r[0], 'group_name': r[1], 'spots_left': r[2]} for r in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(data, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        group_id = body.get('id')
        spots_left = body.get('spots_left')
        if group_id is None or spots_left is None:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id и spots_left обязательны'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"UPDATE {SCHEMA}.group_spots SET spots_left = %s, updated_at = NOW() WHERE id = %s", (int(spots_left), int(group_id)))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
