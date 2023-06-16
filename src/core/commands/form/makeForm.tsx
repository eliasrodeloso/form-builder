export function makeForm(children: React.ReactNode = []) {
  const Form = () => <form>{children}</form>;

  return Form;
}
