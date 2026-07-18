import sqlite3
import json
import os
from datetime import datetime, timedelta

db_path = '/opt/hermes/router/database.db'
json_path = '/root/destinosincriveis/public/offers.json'

# Ensure directory for DB exists
os.makedirs(os.path.dirname(db_path), exist_ok=True)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Ensure table exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS offers (
       id TEXT PRIMARY KEY,
       origem TEXT,
       destino TEXT,
       preco_atual REAL,
       preco_original REAL,
       desconto_percent INTEGER,
       companhia TEXT,
       link_afiliado TEXT,
       imagem_url TEXT,
       tipo TEXT DEFAULT 'voo',
       nota_urgencia INTEGER,
       texto_venda TEXT,
       ativo BOOLEAN DEFAULT 1,
       criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
""")

# Clean existing offers
cursor.execute("DELETE FROM offers;")

now = datetime.now()

# 8 Premium National Offers (6 flights/hotels + 2 tours)
offers = [
    {
        "id": "GRU-SSA",
        "origem": "GRU",
        "destino": "SSA",
        "preco_atual": 350.0,
        "preco_original": 700.0,
        "desconto_percent": 50,
        "companhia": "GOL Linhas Aéreas",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80&sig=10001",
        "tipo": "voo",
        "nota_urgencia": 9,
        "texto_venda": "Voe de São Paulo para Salvador com tarifa imperdível!",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=1)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "GRU-FLN",
        "origem": "GRU",
        "destino": "FLN",
        "preco_atual": 280.0,
        "preco_original": 560.0,
        "desconto_percent": 50,
        "companhia": "LATAM Airlines",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1571738310393-79f84a130eb5?auto=format&fit=crop&w=800&q=80&sig=10002",
        "tipo": "voo",
        "nota_urgencia": 8,
        "texto_venda": "Florianópolis com desconto saindo de São Paulo!",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=2)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "GRU-MCZ",
        "origem": "GRU",
        "destino": "MCZ",
        "preco_atual": 600.0,
        "preco_original": 1200.0,
        "desconto_percent": 50,
        "companhia": "Azul Linhas Aéreas",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80&sig=10003",
        "tipo": "voo",
        "nota_urgencia": 7,
        "texto_venda": "Maceió com praias paradisíacas e ótimo preço!",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=3)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "HOTEL-GRAMADO",
        "origem": None,
        "destino": "Gramado",
        "preco_atual": 800.0,
        "preco_original": 1600.0,
        "desconto_percent": 50,
        "companhia": "Hotel Colline de France",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80&sig=10004",
        "tipo": "hotel",
        "nota_urgencia": 8,
        "texto_venda": "Hospede-se no melhor hotel do mundo em Gramado com super desconto.",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=4)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "HOTEL-PORTO",
        "origem": None,
        "destino": "Porto de Galinhas",
        "preco_atual": 1200.0,
        "preco_original": 2400.0,
        "desconto_percent": 50,
        "companhia": "Nannai Resort & Spa",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80&sig=10005",
        "tipo": "hotel",
        "nota_urgencia": 8,
        "texto_venda": "Resort premium em Porto de Galinhas com preço exclusivo.",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=5)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "HOTEL-FORTALEZA",
        "origem": None,
        "destino": "Fortaleza",
        "preco_atual": 450.0,
        "preco_original": 900.0,
        "desconto_percent": 50,
        "companhia": "Hotel Gran Marquise",
        "link_afiliado": "https://trip.tpx.gr/8G2qwgeK",
        "imagem_url": "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80&sig=10006",
        "tipo": "hotel",
        "nota_urgencia": 8,
        "texto_venda": "Frente mar em Fortaleza com tarifas imperdíveis.",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=6)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "TOUR-RIO",
        "origem": None,
        "destino": "Rio de Janeiro",
        "preco_atual": 120.0,
        "preco_original": 240.0,
        "desconto_percent": 50,
        "companhia": "Cristo Redentor Tour",
        "link_afiliado": "https://getyourguide.tpx.gr/ltuk5KJm",
        "imagem_url": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80&sig=10007",
        "tipo": "passeio",
        "nota_urgencia": 9,
        "texto_venda": "Visita guiada ao Cristo Redentor com transporte incluso.",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=7)).strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "TOUR-FOZ",
        "origem": None,
        "destino": "Foz do Iguaçu",
        "preco_atual": 90.0,
        "preco_original": 180.0,
        "desconto_percent": 50,
        "companhia": "Parque Nacional do Iguaçu Tour",
        "link_afiliado": "https://getyourguide.tpx.gr/ltuk5KJm",
        "imagem_url": "https://images.unsplash.com/photo-1571738310393-79f84a130eb5?auto=format&fit=crop&w=800&q=80&sig=10008",
        "tipo": "passeio",
        "nota_urgencia": 9,
        "texto_venda": "Ingresso e transporte para o Parque Nacional do Iguaçu (Cataratas).",
        "ativo": 1,
        "criado_em": (now - timedelta(minutes=8)).strftime("%Y-%m-%d %H:%M:%S")
    }
]

for o in offers:
    cursor.execute("""
        INSERT OR REPLACE INTO offers (
            id, origem, destino, preco_atual, preco_original, desconto_percent,
            companhia, link_afiliado, imagem_url, tipo, nota_urgencia, texto_venda, ativo, criado_em
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        o["id"], o["origem"], o["destino"], o["preco_atual"], o["preco_original"], o["desconto_percent"],
        o["companhia"], o["link_afiliado"], o["imagem_url"], o["tipo"], o["nota_urgencia"], o["texto_venda"], o["ativo"], o["criado_em"]
    ))

conn.commit()
conn.close()
print("Offers seeded successfully in SQLite.")

# Query back active offers to save into public/offers.json
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute("SELECT * FROM offers WHERE ativo = 1 ORDER BY criado_em DESC LIMIT 20")
rows = cursor.fetchall()
offers_list = [dict(row) for row in rows]
conn.close()

os.makedirs(os.path.dirname(json_path), exist_ok=True)
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(offers_list, f, ensure_ascii=False, indent=2)

print(f"Generated {len(offers_list)} offers in {json_path}.")
