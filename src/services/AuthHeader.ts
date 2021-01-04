export default function authHeader(): { Authorization: string } | unknown {
  const token = localStorage.getItem('token') as string;

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
