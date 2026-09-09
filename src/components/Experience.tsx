type ExperienceProps = {
  experience: string;
  errors: Record<string, string>;
  onExperienceChange: (value: string) => void;
};

export default function Experience({
  experience,
  errors,
  onExperienceChange,
}: ExperienceProps) {
  return (
    <section>
      <h2>Work Experience</h2>

      <label htmlFor="experience">Experience</label>

      <textarea
        id="experience"
        value={experience}
        onChange={(event) => onExperienceChange(event.target.value)}
        placeholder="Enter your work experience"
      />

      {errors.experience && <p>{errors.experience}</p>}
    </section>
  );
}