import { gradeHomework } from "./src/lib/gemini";

async function test() {
  try {
    const result = await gradeHomework(
      "Test Homework",
      "Solve x + 2 = 4",
      "x = 2 because 2 + 2 = 4"
    );
    console.log("Grading Result:", result);
  } catch (e) {
    console.error("Test Failed:", e);
  }
}

test();
