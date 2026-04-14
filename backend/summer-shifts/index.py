"""Управление свободными местами в летних сменах."""
import json
import os
import psycopg2

SCHEMA = "t_p29674401_children_center_webs"

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, theme, dates, age, total_spots, spots_left FROM {SCHEMA}.summer_shifts ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        data = [
            {'id': r[0], 'theme': r[1], 'dates': r[2], 'age': r[3], 'total_spots': r[4], 'spots_left': r[5]}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(data, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        shift_id = body.get('id')
        spots_left = body.get('spots_left')
        total_spots = body.get('total_spots')
        if shift_id is None:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id обязателен'})}
        conn = get_conn()
        cur = conn.cursor()
        if total_spots is not None and spots_left is not None:
            cur.execute(
                f"UPDATE {SCHEMA}.summer_shifts SET spots_left = %s, total_spots = %s, updated_at = NOW() WHERE id = %s",
                (int(spots_left), int(total_spots), int(shift_id))
            )
        elif spots_left is not None:
            cur.execute(
                f"UPDATE {SCHEMA}.summer_shifts SET spots_left = %s, updated_at = NOW() WHERE id = %s",
                (int(spots_left), int(shift_id))
            )
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
