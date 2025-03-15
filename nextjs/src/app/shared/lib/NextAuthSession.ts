'use client'

import { useSession } from "next-auth/react";

export default  function NextAuthSession() {
    const { data: session } = useSession() as any;
    return session;
}