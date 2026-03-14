import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function parseJSON(text: string) {
  try {
    // Try primary parse
    return JSON.parse(text);
  } catch (e) {
    // Attempt to extract JSON from model response
    const jsonStart = Math.max(text.indexOf("{"), text.indexOf("["));
    const jsonEnd = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const extracted = text.substring(jsonStart, jsonEnd + 1);
      try {
        return JSON.parse(extracted);
      } catch (e2) {
        console.error("Failed to parse extracted JSON:", extracted);
        throw e2;
      }
    }
    console.error("No JSON structure found in response:", text);
    throw e;
  }
}

export async function generatePersonalizedTasks(interests: string[], concepts: string[]) {
  const prompt = `
    Generate 3 personalized learning tasks for a student.
    Interests: ${interests.join(", ")}
    Concepts to learn: ${concepts.join(", ")}
    
    Return the response as a JSON array of objects with the following structure:
    [
      {
        "id": number,
        "concept": "concept name",
        "hobby": "interest used",
        "title": "catchy title",
        "description": "brief description",
        "progress": 0,
        "difficulty": "Easy" | "Medium" | "Hard"
      }
    ]
    Format the response as pure JSON without markdown code blocks.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON(text);
}

export async function generateTaskContent(concept: string, hobby: string) {
  const prompt = `
    Create a detailed educational task for a student.
    Concept: ${concept}
    Hobby/Interest context: ${hobby}
    
    Return the response as a JSON object with the following structure:
    {
      "concept": "${concept}",
      "hobby": "${hobby}",
      "title": "A title relating the concept to the hobby",
      "explanation": "A 2-3 paragraph explanation of the concept using the hobby as a metaphor/context. Use markdown for bullets or bold text if needed.",
      "practiceTask": "A specific problem or question for the student to solve. Must have a numerical or short string answer.",
      "correctAnswer": "the exact answer",
      "hint": "a helpful hint to guide the student"
    }
    Format the response as pure JSON without markdown code blocks.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON(text);
}

export async function analyzeErrorPatterns(studentAttempts: any[]) {
  const prompt = `
    Analyze the following student attempts and identify recurring error patterns.
    Attempts: ${JSON.stringify(studentAttempts)}
    
    Return the response as a JSON array of error pattern objects:
    [
      {
        "pattern": "Description of the pattern",
        "affected": number,
        "severity": "high" | "medium" | "low"
      }
    ]
    Format the response as pure JSON without markdown code blocks.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return parseJSON(text);
  } catch (e) {
    return [];
  }
}

export async function extractCourseCompetencies(courseTitle: string, syllabusText: string) {
  const prompt = `
    Analyze the following course syllabus and extract a structured learning path with 3 mastery levels.
    Course: ${courseTitle}
    Syllabus: ${syllabusText}
    
    Return the response as a JSON object with this structure:
    {
      "level1": { "mastered": 0, "total": 5, "competencies": [{ "id": "1-1", "text": "...", "status": "not-mastered" }] },
      "level2": { "mastered": 0, "total": 4, "competencies": [{ "id": "2-1", "text": "...", "status": "not-mastered" }] },
      "level3": { "mastered": 0, "total": 3, "competencies": [{ "id": "3-1", "text": "...", "status": "not-mastered" }] }
    }
    Format the response as pure JSON without markdown code blocks.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON(text);
}
export async function gradeHomework(homeworkTitle: string, description: string, submission: string) {
  const prompt = `
    Grade the following homework submission.
    Homework Title: ${homeworkTitle}
    Description: ${description}
    Student Submission: ${submission}
    
    Provide a pedagogical evaluation focusing on reasoning, method, and correctness.
    
    Return the response as a JSON object with this structure:
    {
      "score": number (0-100),
      "feedback": "detailed pedagogical feedback",
      "areasOfImprovement": ["point 1", "point 2"],
      "correctness": "summary of what was correct and what was not"
    }
    Format the response as pure JSON without markdown code blocks.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON(text);
}
