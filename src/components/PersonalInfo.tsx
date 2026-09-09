type PersonalInfoProps = {
  name: string;
  email: string;
  errors: Record<string, string>;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

export default function PersonalInfo({
  name,
  email,
  errors,
  onNameChange,
  onEmailChange,
}: PersonalInfoProps) {
  return (
    <section>
      <h2>Personal Information</h2>

      <div>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />

        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
        />

        {errors.email && <p>{errors.email}</p>}
      </div>
    </section>
  );
}