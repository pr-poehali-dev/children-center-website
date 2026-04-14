import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
import urllib.request


def send_telegram(text: str):
    try:
        token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        if not token or not chat_id:
            return
        url = f'https://api.telegram.org/bot{token}/sendMessage'
        data = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode()
        req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
        urllib.request.urlopen(req, timeout=5)
    except Exception as e:
        print(f'Telegram error: {e}')


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту, в Telegram и сохраняет в БД"""

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
    messenger = body.get('messenger', 'telegram')
    service = body.get('service', '')
    message = body.get('message', '')
    shift_id = body.get('shift_id')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p29674401_children_center_webs.applications (name, phone, messenger, service, message) VALUES (%s, %s, %s, %s, %s)",
        (name, phone, messenger, service, message)
    )
    if shift_id:
        cur.execute(
            "UPDATE t_p29674401_children_center_webs.summer_shifts SET spots_left = GREATEST(0, spots_left - 1), updated_at = NOW() WHERE id = %s",
            (int(shift_id),)
        )
    conn.commit()
    cur.close()
    conn.close()

    messenger_labels = {'telegram': 'Telegram', 'max': 'Макс'}
    messenger_label = messenger_labels.get(messenger, messenger)

    checklist_note = "✅ Чек-лист по развитию ребёнка отправлен клиенту" if not shift_id else ""

    tg_text = (
        f"🐟 <b>Новая заявка — Рыбка Долли</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"💬 <b>Мессенджер:</b> {messenger_label}\n"
        f"📚 <b>Услуга:</b> {service or 'не указана'}\n"
        f"✉️ <b>Сообщение:</b> {message or 'не указано'}\n"
        + (f"\n{checklist_note}\n" if checklist_note else "") +
        f"\n👉 Ответить: ribkadollli.ru/admin"
    )
    send_telegram(tg_text)

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
      <tr><td style="padding:8px;font-weight:bold;background:#fff0ed">Мессенджер</td><td style="padding:8px">{messenger_label}</td></tr>
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