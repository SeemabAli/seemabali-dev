async function testMultipleQueries() {
  const queries = [
    "What technologies does he use?",
    "Tell me about his projects",
    "What is his experience?",
    "How can I contact him?",
    "Is Seemab available for work?"
  ];

  for (const q of queries) {
    console.log("\n==========================================");
    console.log("USER:", q);
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: q }],
      }),
    });
    const data = await res.json();
    console.log("AI REPLY:\n", data.reply);
  }
}

testMultipleQueries();
