async function SignInFetch(ev, route, email, password) {
  await fetch(`/api/${route}`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
}
export default SignInFetch;
