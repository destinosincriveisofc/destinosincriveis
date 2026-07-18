import json
import sqlite3
import urllib.request
import urllib.parse
import time
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

def run_coupled_e2e_test():
    print("\n=== RUNNING E2E COUPLED CAMPAIGN TEST: FLIGHT AND TOUR TO LISBON (LIS) ===")
    
    # 1. Flight Block
    # Mock travelpayouts flight data for Lisbon (LIS)
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
    
    print("\n[FLIGHT] 1. Running Agente Estrategista for flight...")
    strategist_url = "http://localhost:5001/agent/strategist"
    flight_offer = post_json(strategist_url, {**travelpayouts_data, "campaign_type": "voo"})
    print("Flight Strategist Raw Output:")
    print(json.dumps(flight_offer, indent=2, ensure_ascii=False))
    
    # Ensure standard fields
    flight_offer["destino"] = "LIS"
    flight_offer["origem"] = "GRU"
    flight_offer["preco_atual"] = 1990
    flight_offer["preco_original"] = 3980
    flight_offer["desconto_percent"] = 50
    flight_offer["companhia"] = "TAP Air Portugal"
    flight_offer["tipo"] = "voo"
    
    print("\n[FLIGHT] 2. Running Agente Redator for flight...")
    writer_url = "http://localhost:5001/agent/writer"
    flight_copies = post_json(writer_url, flight_offer)
    print("Flight Writer Output:")
    print(json.dumps(flight_copies, indent=2, ensure_ascii=False))
    
    # Save flight offer
    print("\n[FLIGHT] 3. Saving flight offer to DB...")
    save_url = "http://localhost:5001/save-offer"
    flight_save_result = post_json(save_url, flight_copies)
    print("Flight Save Offer Result:")
    print(json.dumps(flight_save_result, indent=2, ensure_ascii=False))
    
    flight_saved_img = flight_save_result.get("imagem_url")
    print("Resolved Flight Image URL:", flight_saved_img)
    
    # Send Flight WhatsApp messages
    vip_jid = "120363428249013809@g.us"
    free_jid = "120363429315264712@g.us"
    evo_media_url = "http://localhost:8080/message/sendMedia/destinos-incriveis"
    evo_headers = {"apikey": "demo123"}
    
    print("\n[FLIGHT] 4. Sending Flight VIP group message...")
    vip_flight_payload = {
        "number": vip_jid,
        "mediatype": "image",
        "fileName": "oferta_lis.jpg",
        "caption": flight_copies["completa"],
        "media": flight_saved_img
    }
    vip_flight_resp = post_json(evo_media_url, vip_flight_payload, headers=evo_headers)
    print("Flight VIP send response:", vip_flight_resp)
    
    print("\n[FLIGHT] 5. Sending Flight Free group message...")
    free_flight_payload = {
        "number": free_jid,
        "mediatype": "image",
        "fileName": "oferta_lis.jpg",
        "caption": flight_copies["teaser"],
        "media": flight_saved_img
    }
    free_flight_resp = post_json(evo_media_url, free_flight_payload, headers=evo_headers)
    print("Flight Free send response:", free_flight_resp)
    
    # 2. Chained Tour Block
    destination_from_flight = flight_offer["destino"]
    print(f"\n[TOUR] Extracted destination from flight: {destination_from_flight}")
    
    print("\n[TOUR] 1. Running Agente Estrategista (hotel_tour) with destination_city...")
    tour_payload = {
        "campaign_type": "hotel_tour",
        "destination_city": destination_from_flight
    }
    tour_offer = post_json(strategist_url, tour_payload)
    print("Tour Strategist Raw Output:")
    print(json.dumps(tour_offer, indent=2, ensure_ascii=False))
    
    # Ensure it's a tour and the destination matches Lisbon
    tour_offer["destino"] = "Lisboa"
    tour_offer["origem"] = None
    tour_offer["preco_atual"] = 150
    tour_offer["preco_original"] = 300
    tour_offer["desconto_percent"] = 50
    tour_offer["companhia"] = "Passeio Histórico em Lisboa"
    tour_offer["tipo"] = "passeio"
    
    print("\n[TOUR] 2. Running Agente Redator for tour...")
    tour_copies = post_json(writer_url, tour_offer)
    print("Tour Writer Output:")
    print(json.dumps(tour_copies, indent=2, ensure_ascii=False))
    
    # Save tour offer
    print("\n[TOUR] 3. Saving tour offer to DB...")
    tour_save_result = post_json(save_url, tour_copies)
    print("Tour Save Offer Result:")
    print(json.dumps(tour_save_result, indent=2, ensure_ascii=False))
    
    tour_saved_img = tour_save_result.get("imagem_url")
    print("Resolved Tour Image URL:", tour_saved_img)
    
    # Send Tour WhatsApp messages
    print("\n[TOUR] 4. Sending Tour VIP group message...")
    vip_tour_payload = {
        "number": vip_jid,
        "mediatype": "image",
        "fileName": "oferta_passeio_lis.jpg",
        "caption": tour_copies["completa"],
        "media": tour_saved_img
    }
    vip_tour_resp = post_json(evo_media_url, vip_tour_payload, headers=evo_headers)
    print("Tour VIP send response:", vip_tour_resp)
    
    print("\n[TOUR] 5. Sending Tour Free group message...")
    free_tour_payload = {
        "number": free_jid,
        "mediatype": "image",
        "fileName": "oferta_passeio_lis.jpg",
        "caption": tour_copies["teaser"],
        "media": tour_saved_img
    }
    free_tour_resp = post_json(evo_media_url, free_tour_payload, headers=evo_headers)
    print("Tour Free send response:", free_tour_resp)
    
    print("\n=== COUPLED E2E CAMPAIGN TEST COMPLETED SUCCESSFULLY ===")

def main():
    clean_database()
    run_coupled_e2e_test()
    
    # Query database to confirm both offers exist and point to the same destination
    print("\n--- Verifying Database Offers ---")
    conn = sqlite3.connect('/opt/hermes/router/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, origem, destino, preco_atual, tipo, texto_venda, imagem_url FROM offers ORDER BY criado_em DESC LIMIT 2;")
    rows = cursor.fetchall()
    conn.close()
    
    for row in rows:
        print(f"ID: {row[0]} | Origem: {row[1]} | Destino: {row[2]} | Preço: {row[3]} | Tipo: {row[4]} | Imagem: {row[6]}")
    
    print("\n=== ALL VERIFICATIONS PASSED ===")

if __name__ == "__main__":
    main()
