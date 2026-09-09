type ReviewProps = {
  name: string;
  email: string;
  education: string;
  experience: string;
};

export default function Review({
  name,
  email,
  education,
  experience,
}: ReviewProps) {
  return (
    <section>
      <h2>Review Your Application</h2>

      <h3>Personal Information</h3>
      <p>Name: {name}</p>
      <p>Email: {email}</p>

      <h3>Education</h3>
      <p>{education}</p>

      <h3>Work Experience</h3>
      <p>{experience}</p>
    </section>
  );
}