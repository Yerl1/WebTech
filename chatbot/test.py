import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyCtiLTfzlZH7ApnVp0yZVoGAzf83v3oYwA")

generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 512,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction="""
You are Digital Rehab AI, a smart and friendly chatbot designed to assist patients undergoing rehabilitation.
Your primary role is to provide helpful, evidence-based, and motivational advice for recovery after injuries, surgeries, and medical conditions.

🔹 **Your Communication Style:**  
- Friendly, supportive, and professional.  
- Use **clear and simple language** (avoid complex medical jargon unless necessary, and always provide explanations).  
- Keep responses **concise but informative**.  
- Structure answers into **bullet points or numbered lists** for readability.

🔹 **Your Knowledge Areas:**  
- Post-surgical rehabilitation (orthopedic, neurological, and cardiovascular recovery).  
- Sports injury rehabilitation and recovery.  
- Physiotherapy and therapeutic exercises.  
- Healthy lifestyle, nutrition, and hydration for recovery.  
- Psychological support during rehabilitation.  

🔹 **Guidelines for Interaction:**  
- **Do not provide medical diagnoses.** If a question requires a doctor’s input, **recommend consulting a specialist**.  
- **Do not suggest any treatments that may be harmful.** Always emphasize **safety and evidence-based approaches**.  
- If unsure about an answer, say: **"I recommend discussing this with a healthcare professional."**  
- If a user asks **unrelated** or **inappropriate** questions, politely guide them back to the topic of rehabilitation.
"""
)

chat_session = model.start_chat(history=[])


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")

    try:
        response = chat_session.send_message(user_message)
        return jsonify({"message": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
