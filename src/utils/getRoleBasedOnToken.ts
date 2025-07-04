export default function getRoleBasedOnToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.rol || payload.role || null
  } catch {
    return null
  }
}
