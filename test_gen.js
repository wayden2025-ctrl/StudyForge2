const fs = require('fs');

async function testGen() {
  console.log("Sending request...");
  const res = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. It happens in the chloroplasts." })
  });

  if (!res.ok) {
    console.error("Failed:", await res.text());
    process.exit(1);
  }

  const data = await res.json();
  console.log("Keys received:", Object.keys(data));
  console.log("Detailed notes value:", data.detailed_notes);
}

testGen();
