import { useState } from "react";
import StudentLayout from "../components/StudentLayout";
import { Gamepad2, Music, Palette, Cpu, Rocket, BookOpen, Save, Check } from "lucide-react";

export default function StudentSettings() {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([
    "Video Games",
    "Music",
    "Cooking",
  ]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    "Text",
    "Video",
  ]);

  const hobbies = [
    { id: "video-games", label: "Video Games", icon: Gamepad2 },
    { id: "football", label: "Football", icon: BookOpen },
    { id: "music", label: "Music", icon: Music },
    { id: "drawing", label: "Drawing", icon: Palette },
    { id: "technology", label: "Technology", icon: Cpu },
    { id: "space", label: "Space", icon: Rocket },
    { id: "history", label: "History", icon: BookOpen },
    { id: "cooking", label: "Cooking", icon: BookOpen },
  ];

  const learningFormats = [
    { id: "text", label: "Text Explanations", icon: "📝" },
    { id: "video", label: "Video Explanations", icon: "🎥" },
    { id: "audio", label: "Audio Explanations", icon: "🎧" },
    { id: "visual", label: "Image/Visual Explanations", icon: "🖼️" },
  ];

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Learning Preferences</h1>
          <p className="text-muted-foreground">
            Help AI personalize your learning experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Hobbies Section */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl mb-2">Your Hobbies & Interests</h2>
              <p className="text-muted-foreground text-sm">
                Select your hobbies and the AI will use them to create engaging explanations and
                examples. For example, explaining math concepts using video game mechanics.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hobbies.map((hobby) => {
                const isSelected = selectedHobbies.includes(hobby.label);
                const Icon = hobby.icon;
                return (
                  <button
                    key={hobby.id}
                    onClick={() => toggleHobby(hobby.label)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50 bg-muted/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {hobby.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedHobbies.length > 0 && (
              <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm">
                  <span className="text-primary">Selected:</span>{" "}
                  {selectedHobbies.join(", ")}
                </p>
              </div>
            )}
          </div>

          {/* Learning Formats Section */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl mb-2">Preferred Learning Formats</h2>
              <p className="text-muted-foreground text-sm">
                Choose how you prefer to learn. The AI will prioritize these formats when
                generating explanations, exercises, and study materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningFormats.map((format) => {
                const isSelected = selectedFormats.includes(format.label.split(" ")[0]);
                return (
                  <button
                    key={format.id}
                    onClick={() => toggleFormat(format.label.split(" ")[0])}
                    className={`p-5 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50 bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{format.icon}</div>
                      <div className="flex-1">
                        <div
                          className={`mb-1 ${
                            isSelected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {format.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format.id === "text" && "Written explanations and examples"}
                          {format.id === "video" && "Video tutorials and demonstrations"}
                          {format.id === "audio" && "Audio lessons and podcasts"}
                          {format.id === "visual" && "Diagrams, charts, and infographics"}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="bg-primary rounded-full p-2">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  defaultValue="Emma Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  defaultValue="emma.johnson@school.edu"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
            <button className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
