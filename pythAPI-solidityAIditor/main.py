import time
from openai import OpenAI

ASSISTANT_ID = "asst_nI0XTkxXRcjMXGWPP2uk2cuk"

client = OpenAI(api_key="sk-yourkey")



user_prompt = "Quelle est la vulnérabilité la plus connue en solidity?"
print(f"👉 User: {user_prompt}")

# Create a thread with a message
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": user_prompt,
        }
    ]
)

# Submit the thread to the assistant (as a new run)
run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
#print(f"👉 Run Created: {run.id}")

# Wait for run to complete
while run.status != "completed":
    run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
    # print(f"🏃 Run Status: {run.status}")
    time.sleep(1)
else:
    #print(f"🏁 Run Completed!")
    pass

# Get the latest message from the thread
message_response = client.beta.threads.messages.list(thread_id=thread.id)
messages = message_response.data

# Print the latest message
latest_message = messages[0]
print(f"💬 Response: {latest_message.content[0].text.value}")