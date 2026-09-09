type EducationProps = {
  education: string;
  errors: Record<string, string>;
  onEducationChange: (value: string) => void;
};

export default function Education({
  education,
  errors,
  onEducationChange,
}: EducationProps) {
  return (
    <section>
      <h2>Education</h2>

      <label htmlFor="education">Education</label>

      <textarea
        id="education"
        value={education}
        onChange={(event) => onEducationChange(event.target.value)}
        placeholder="Enter your education details"
      />

      {errors.education && <p>{errors.education}</p>}
    </section>
  );
}