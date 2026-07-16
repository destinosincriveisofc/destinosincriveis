import json
import urllib.request
import urllib.parse
import sqlite3
import sys

def post_json(url, payload, headers=None):
    if headers is None:
        headers = {}
    headers.update({"Content-Type": "application/json"})
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    
    import time
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            print(f"Attempt {attempt + 1} failed calling {url}: {e}")
            if attempt < 4:
                print("Sleeping for 15 seconds before retrying...")
                time.sleep(15)
            else:
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

def run_flight_test():
    print("\n=== RUNNING TEST 1: FLIGHT TO SALVADOR (SSA) ===")
    
    # Mock travelpayouts flight data for Salvador (SSA)
    travelpayouts_data = {
        "success": True,
        "description": "Promoção de voo saindo de São Paulo (GRU) para Salvador (SSA)",
        "origin": "GRU",
        "destination": "SSA",
        "data": {
            "SSA": {
                "0": {
                    "price": 350,
                    "airline": "GOL Linhas Aéreas",
                    "flight_number": 1654,
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
    
    # Normalize fields
    offer["destino"] = "SSA"
    offer["origem"] = "GRU"
    offer["preco_atual"] = 350
    offer["preco_original"] = 700
    offer["desconto_percent"] = 50
    offer["companhia"] = "GOL Linhas Aéreas"
    offer["tipo"] = "voo"
    
    # 2. Run Writer
    print("\n2. Running Agente Redator...")
    writer_url = "http://localhost:5001/agent/writer"
    copies = post_json(writer_url, offer)
    print("Writer Output:")
    print(json.dumps(copies, indent=2, ensure_ascii=False))
    
    completa = copies.get("completa")
    teaser = copies.get("teaser")
    
    # 3. Save offer
    save_payload = {
        "origem": offer["origem"],
        "destino": offer["destino"],
        "preco_atual": offer["preco_atual"],
        "preco_original": offer["preco_original"],
        "desconto_percent": offer["desconto_percent"],
        "companhia": offer["companhia"],
        "link_afiliado": "",
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
    cursor.execute("SELECT imagem_url FROM offers WHERE destino='SSA' ORDER BY criado_em DESC LIMIT 1;")
    saved_img = cursor.fetchone()[0]
    conn.close()
    print("Resolved Salvador Image URL:", saved_img)
    assert "unsplash.com" in saved_img, "Expected image URL to be from Unsplash"
    
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
        "fileName": "oferta_ssa.jpg"
    }
    vip_resp = post_json(evo_media_url, vip_payload, headers=evo_headers)
    print("VIP send response:", vip_resp)
    
    print("\n5. Sending Free group message...")
    free_payload = {
        "number": free_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": teaser,
        "fileName": "oferta_ssa.jpg"
    }
    free_resp = post_json(evo_media_url, free_payload, headers=evo_headers)
    print("Free send response:", free_resp)
    
    print("=== FLIGHT TEST COMPLETED SUCCESSFULLY ===")

def run_tour_test():
    print("\n=== RUNNING TEST 2: TOUR TO CRISTO REDENTOR (RIO DE JANEIRO) ===")
    
    # 1. Run Strategist with hotel_tour campaign
    print("1. Running Agente Estrategista (hotel_tour)...")
    strategist_url = "http://localhost:5001/agent/strategist"
    offer = post_json(strategist_url, {"campaign_type": "hotel_tour"})
    print("Strategist Output:")
    print(json.dumps(offer, indent=2, ensure_ascii=False))
    
    # Normalize fields for Cristo Redentor tour
    offer["destino"] = "Rio de Janeiro"
    offer["origem"] = None
    offer["preco_atual"] = 120
    offer["preco_original"] = 240
    offer["desconto_percent"] = 50
    offer["companhia"] = "Cristo Redentor Tour"
    offer["tipo"] = "passeio"
    
    # 2. Run Writer
    print("\n2. Running Agente Redator...")
    writer_url = "http://localhost:5001/agent/writer"
    copies = post_json(writer_url, offer)
    print("Writer Output:")
    print(json.dumps(copies, indent=2, ensure_ascii=False))
    
    completa = copies.get("completa")
    teaser = copies.get("teaser")
    
    # 3. Save offer
    save_payload = {
        "origem": offer["origem"],
        "destino": offer["destino"],
        "preco_atual": offer["preco_atual"],
        "preco_original": offer["preco_original"],
        "desconto_percent": offer["desconto_percent"],
        "companhia": offer["companhia"],
        "link_afiliado": "",
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
    cursor.execute("SELECT imagem_url FROM offers WHERE destino='Rio de Janeiro' ORDER BY criado_em DESC LIMIT 1;")
    saved_img = cursor.fetchone()[0]
    conn.close()
    print("Resolved Rio de Janeiro Image URL:", saved_img)
    assert "unsplash.com" in saved_img, "Expected image URL to be from Unsplash"
    
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
        "fileName": "oferta_rio.jpg"
    }
    vip_resp = post_json(evo_media_url, vip_payload, headers=evo_headers)
    print("VIP send response:", vip_resp)
    
    print("\n5. Sending Free group message...")
    free_payload = {
        "number": free_jid,
        "mediatype": "image",
        "media": saved_img,
        "caption": teaser,
        "fileName": "oferta_rio.jpg"
    }
    free_resp = post_json(evo_media_url, free_payload, headers=evo_headers)
    print("Free send response:", free_resp)
    
    print("=== TOUR TEST COMPLETED SUCCESSFULLY ===")

def main():
    # clean_database()
    run_flight_test()
    run_tour_test()
    print("\n=== ALL E2E AUTOMATION TESTS COMPLETED SUCCESSFULLY ===")

if __name__ == "__main__":
    main()
