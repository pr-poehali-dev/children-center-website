"""Счётчик уникальных посетителей сайта. v2"""
import json
import hashlib
import os
import psycopg2


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = event.get('headers') or {}
    ip = (
        headers.get('x-forwarded-for') or
        headers.get('X-Forwarded-For') or
        event.get('requestContext', {}).get('identity', {}).get('sourceIp') or
        'unknown'
    ).split(',')[0].strip()
    user_agent = headers.get('user-agent') or headers.get('User-Agent') or ''
    visitor_hash = hashlib.sha256(f"{ip}:{user_agent}".encode()).hexdigest()

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        f"INSERT INTO {schema}.visitors (visitor_hash, first_seen, last_seen) VALUES (%s, NOW(), NOW()) ON CONFLICT (visitor_hash) DO UPDATE SET last_seen = NOW()",
        (visitor_hash,)
    )

    cur.execute(f"SELECT COUNT(*) FROM {schema}.visitors")
    total = cur.fetchone()[0]

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'count': int(total)})
    }