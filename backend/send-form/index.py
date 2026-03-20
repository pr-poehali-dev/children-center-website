import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту ribkadolli@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    phone = body.get('phone', '')
    service = body.get('service', '')
    message = body.get('message', '')

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'ribkadolli@mail.ru'
    to_email = 'ribkadolli@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <h2>Новая заявка с сайта Рыбка Долли</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px">
      <tr><td style="padding:8px;font-weight:bold;background:#fff0ed">Имя</td><td style="padding:8px">{name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#fff0ed">Телефон</td><td style="padding:8px">{phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#fff0ed">Услуга</td><td style="padding:8px">{service or 'не указана'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#fff0ed">Сообщение</td><td style="padding:8px">{message or 'не указано'}</td></tr>
    </table>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
