from flask import Flask, request, jsonify
import openai

# Step 2: Create the Flask application instance
app = Flask(__name__)

# Configure your OpenAI API key
openai.api_key = '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'

@app.route('/audit', methods=['POST'])
def audit_code():
    
    data = request.json
    prompt = data.get('prompt', '')

    try:
        response = openai.Completion.create(
          engine="gpt-3.5-turbo",  # Specify the engine you want to use
          prompt=prompt,
          max_tokens=150,
          temperature=0.7,
          top_p=1,
          frequency_penalty=0,
          presence_penalty=0,
          user="g-UqIMzPlxL-solidity-auditor"  # Specify the user or model identifier if needed
        )
        return jsonify({"response": response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
