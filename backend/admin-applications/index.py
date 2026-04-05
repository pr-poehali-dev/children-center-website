import json
import os
import psycopg2
import psycopg2.extras


ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')
CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}


def check_auth(event):
    headers = event.get('headers') or {}
    pwd = headers.get('X-Admin-Password') or headers.get('x-admin-password') or ''
    return pwd == ADMIN_PASSWORD


def handler(event: dict, context) -> dict:
    """Админка: получение заявок и обновление статуса"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if not check_auth(event):
        return {
            'statusCode': 401,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Unauthorized'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    method = event.get('httpMethod')

    if method == 'GET':
        cur.execute(
            "SELECT id, name, phone, messenger, service, message, status, created_at "
            "FROM t_p29674401_children_center_webs.applications "
            "ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        result = []
        for row in rows:
            r = dict(row)
            r['created_at'] = r['created_at'].isoformat()
            result.append(r)
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': CORS_HEADERS,
            'body': json.dumps(result, ensure_ascii=False)
        }

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        action = body.get('action')

        if action == 'update_status':
            app_id = body.get('id')
            status = body.get('status')
            if status not in ('new', 'in_progress', 'done'):
                cur.close()
                conn.close()
                return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Invalid status'})}
            cur.execute(
                "UPDATE t_p29674401_children_center_webs.applications SET status=%s, updated_at=NOW() WHERE id=%s",
                (status, app_id)
            )
            conn.commit()
            cur.close()
            conn.close()
            return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    cur.close()
    conn.close()
    return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Bad request'})}
