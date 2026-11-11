import { withAuth } from "next-auth/middleware";

export default withAuth({ pages: { signIn: "/login" } });

// Les pages d’authentification, l’API d’auth/inscription/données et les fichiers statiques restent hors middleware.
export const config = {
  matcher: ["/((?!login|register|api/auth|api/register|api/data|assets|manifest.webmanifest|sw.js|_next|favicon).*)"],
};
