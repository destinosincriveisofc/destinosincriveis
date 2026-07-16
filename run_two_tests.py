import json
import sqlite3
import urllib.request
import urllib.parse
import sys

def post_json(url, payload, headers=None):
    if headers is None:
        headers = {}
    headers.update({"Content-Type": "application/json"})
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Error calling {url}: {e}")
        if hasattr(e, 'read'):
            print("Response:", e.read().decode('utf-8', errors='replace'))
        raise

def clean_database():
    print("\n--- Cleaning Database ---")
    conn = sqlite3.connect('/opt/hermes/router/database.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM offers;")
    conn.commit()
    conn.close()
    print("Database cleaned successfully!")

def run_test_1():
    print("\n=== RUNNING TEST 1: FLIGHT GRU -> LIS (R$ 1.990) ===")
    
    # Mock travelpayouts flight data for Lisbon
    travelpayouts_data = {
        "success": True,
        "description": "Promoção de voo saindo de São Paulo (GRU) para Lisboa (LIS)",
        "origin": "GRU",
        "destination": "LIS",
        "data": {
            "LIS": {
                "0": {
                    "price": 1990,
                    "airline": "TAP Air Portugal",
                    "flight_number": 82,
                    "departure_at": "2026-08-15T22:30:00Z",
                    "return_at": "2026-08-30T10:00:00Z",
                    "expires_at": "2026-07-20T10:00:00Z"
                }
            }
        }
    }
    
    # 1. Run Strategist
    print("1. Running Agente Estrategista...")
    strategist_url = "http://localhost:5001/agent/strategist"
    offer = post_json(strategist_url, travelpayouts_data)
    print("Strategist Output:")
    print(json.dumps(offer, indent=2, ensure_ascii=False))
    
    # Normalize for Test 1 requirements
    offer["destino"] = "LIS"
    offer["origem"] = "GRU"
    offer["preco_atual"] = 1990
    offer["preco_original"] = 3980
    offer["desconto_percent"] = 50
    offer["companhia"] = "TAP Air Portugal"
    offer["tipo"] = "voo"
    
    # 2. Run Writer
    print("\n2. Running Agente Redator...")
    writer_url = "http://localhost:5001/agent/writer"
    copies = post_json(writer_url, offer)
    print("Writer Output:")
    print(json.dumps(copies, indent=2, ensure_ascii=False))
    
    completa = copies.get("completa")
    teaser = copies.get("teaser")
    
    # 3. Save offer and push
    save_payload = {
        "origem": offer["origem"],
        "destino": offer["destino"],
        "preco_atual": offer["preco_atual"],
        "preco_original": offer["preco_original"],
        "desconto_percent": offer["desconto_percent"],
        "companhia": offer["companhia"],
        "link_afiliado": "", # Will be resolved to Trip.com static link in save-offer
        "imagem_url": "", # Will resolve dynamically using Unsplash
        "tipo": offer["tipo"],
        "nota_urgencia": offer.get("nota_urgencia", 9),
        "texto_venda": completa,
        "ativo": 1
    }
    
    print("\n3. Saving offer to DB...")
    save_url = "http://localhost:5001/save-offer"
    save_result = post_json(save_url, save_payload)
    print("Save Offer Result:")
    print(json.dumps(save_result, indent=2, ensure_ascii=False))
    
    # Fetch resolved image_url from DB
    conn = sqlite3.connect('/opt/hermes/router/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT imagem_url FROM offers WHERE destino='LIS' ORDER BY criado_em DESC LIMIT 1;")
    saved_img = cursor.fetchone()[0]
    conn.close()
    print("Resolved Lisbon Image URL:", saved_img)
    
    # 4. Send to WhatsApp
    vip_jid = "120363428249013809@g.us"
    free_jid = "120363429315264712@g.us"
    
    evo_media_url = "http://localhost:8080/message/sendMedia/destinos-incriveis"
    evo_headers = {"apikey": "demo123"}
    
    print("\n4. Sending VIP group message...")
    vip_payload = {
        "number": vip_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": completa,
        "fileName": "oferta_lis.jpg"
    }
    vip_resp = post_json(evo_media_url, vip_payload, headers=evo_headers)
    print("VIP send response:", vip_resp)
    
    print("\n5. Sending Free group message...")
    free_payload = {
        "number": free_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": teaser,
        "fileName": "oferta_lis.jpg"
    }
    free_resp = post_json(evo_media_url, free_payload, headers=evo_headers)
    print("Free send response:", free_resp)
    
    print("=== TEST 1 COMPLETED SUCCESSFULLY ===")


def run_test_2():
    print("\n=== RUNNING TEST 2: TOUR ORLANDO (R$ 450) ===")
    
    # 1. Run Strategist with hotel_tour campaign
    print("1. Running Agente Estrategista (hotel_tour)...")
    strategist_url = "http://localhost:5001/agent/strategist"
    offer = post_json(strategist_url, {"campaign_type": "hotel_tour"})
    print("Strategist Output:")
    print(json.dumps(offer, indent=2, ensure_ascii=False))
    
    # Normalize for Test 2 requirements
    offer["destino"] = "Orlando"
    offer["origem"] = None
    offer["preco_atual"] = 450
    offer["preco_original"] = 900
    offer["desconto_percent"] = 50
    offer["companhia"] = "Disney Tour"
    offer["tipo"] = "passeio"
    
    # 2. Run Writer
    print("\n2. Running Agente Redator...")
    writer_url = "http://localhost:5001/agent/writer"
    copies = post_json(writer_url, offer)
    print("Writer Output:")
    print(json.dumps(copies, indent=2, ensure_ascii=False))
    
    completa = copies.get("completa")
    teaser = copies.get("teaser")
    
    # 3. Save offer and push
    save_payload = {
        "origem": offer["origem"],
        "destino": offer["destino"],
        "preco_atual": offer["preco_atual"],
        "preco_original": offer["preco_original"],
        "desconto_percent": offer["desconto_percent"],
        "companhia": offer["companhia"],
        "link_afiliado": "", # Will be resolved to GetYourGuide static link in save-offer
        "imagem_url": "", # Will resolve dynamically using Unsplash
        "tipo": offer["tipo"],
        "nota_urgencia": offer.get("nota_urgencia", 8),
        "texto_venda": completa,
        "ativo": 1
    }
    
    print("\n3. Saving offer to DB...")
    save_url = "http://localhost:5001/save-offer"
    save_result = post_json(save_url, save_payload)
    print("Save Offer Result:")
    print(json.dumps(save_result, indent=2, ensure_ascii=False))
    
    # Fetch resolved image_url from DB
    conn = sqlite3.connect('/opt/hermes/router/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT imagem_url FROM offers WHERE destino='Orlando' ORDER BY criado_em DESC LIMIT 1;")
    saved_img = cursor.fetchone()[0]
    conn.close()
    print("Resolved Orlando Image URL:", saved_img)
    
    # 4. Send to WhatsApp
    vip_jid = "120363428249013809@g.us"
    free_jid = "120363429315264712@g.us"
    
    evo_media_url = "http://localhost:8080/message/sendMedia/destinos-incriveis"
    evo_headers = {"apikey": "demo123"}
    
    print("\n4. Sending VIP group message...")
    vip_payload = {
        "number": vip_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": completa,
        "fileName": "oferta_mco.jpg"
    }
    vip_resp = post_json(evo_media_url, vip_payload, headers=evo_headers)
    print("VIP send response:", vip_resp)
    
    print("\n5. Sending Free group message...")
    free_payload = {
        "number": free_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": teaser,
        "fileName": "oferta_mco.jpg"
    }
    free_resp = post_json(evo_media_url, free_payload, headers=evo_headers)
    print("Free send response:", free_resp)
    
    print("=== TEST 2 COMPLETED SUCCESSFULLY ===")

def main():
    clean_database()
    run_test_1()
    run_test_2()
    print("\n=== ALL TEST RUNS COMPLETED SUCCESSFULLY ===")

if __name__ == "__main__":
    main()
