export default function AuthFormContainer({ title, children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-96 p-6 space-y-6 bg-white shadow-md rounded-md"
    >
      <h3 className="text-center font-semibold">{title}</h3>
      {children}
    </form>
  );
}
