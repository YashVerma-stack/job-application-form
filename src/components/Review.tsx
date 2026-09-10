type ReviewProps = {
  name: string;
  email: string;
  education: string;
  experience: string;
  address?: {
    city: string;
    country: string;
  };
};

export default function Review({
  name,
  email,
  education,
  experience,
  address,
}: ReviewProps) {
  return (
    <section>
      <h2>Review Your Application</h2>

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Education:</strong> {education}
      </p>

      <p>
        <strong>Experience:</strong> {experience}
      </p>

      <h3>Address</h3>

      <p>
        <strong>City:</strong> {address?.city}
      </p>

      <p>
        <strong>Country:</strong> {address?.country}
      </p>
    </section>
  );
}