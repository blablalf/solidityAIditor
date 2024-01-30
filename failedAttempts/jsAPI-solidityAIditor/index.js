const axios = require('axios');

// Enter your Assistant ID here.
const ASSISTANT_ID = '';

// Make sure your API key is set as an environment variable.
const API_KEY = '';

const openAIEndpoint = 'https://api.openai.com/v1/';

async function createThread() {
  try {
    // Create a thread with a message.
    const response = await axios.post(`${openAIEndpoint}beta/threads/create`, {
      messages: [
        {
          role: 'user',
          // Update this with the query you want to use.
          content: 'What language are you supposed to review?',
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const thread = response.data.data;
    console.log(`👉 Thread Created: ${thread.id}`);

    return thread;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

async function createRun(threadId) {
  try {
    // Submit the thread to the assistant (as a new run).
    const response = await axios.post(`${openAIEndpoint}beta/threads/runs/create`, {
      thread_id: threadId,
      assistant_id: ASSISTANT_ID,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const run = response.data.data;
    console.log(`🏃 Run Created: ${run.id}`);

    return run;
  } catch (error) {
    console.error('Error creating run:', error);
    throw error;
  }
}

async function checkRunStatus(threadId, runId) {
  try {
    // Wait for run to complete.
    let status = '';
    while (status !== 'completed') {
      const response = await axios.get(`${openAIEndpoint}beta/threads/runs/retrieve?thread_id=${threadId}&run_id=${runId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      const run = response.data.data;
      status = run.status;
      console.log(`🏃 Run Status: ${status}`);

      if (status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second.
      }
    }

    console.log('🏁 Run Completed!');
  } catch (error) {
    console.error('Error checking run status:', error);
    throw error;
  }
}

async function getLatestMessage(threadId) {
  try {
    // Get the latest message from the thread.
    const response = await axios.get(`${openAIEndpoint}beta/threads/messages/list?thread_id=${threadId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const messages = response.data.data;
    const latestMessage = messages[0].content[0].text.value;
    console.log(`💬 Response: ${latestMessage}`);
  } catch (error) {
    console.error('Error getting latest message:', error);
    throw error;
  }
}

(async () => {
  try {
    const thread = await createThread();
    if (thread) {
      const run = await createRun(thread.id);
      if (run) {
        await checkRunStatus(thread.id, run.id);
        await getLatestMessage(thread.id);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
