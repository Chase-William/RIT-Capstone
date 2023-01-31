import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export type Token = {
  id: number
}

/**
 * Must use Jose for jwt because it can run in the Node Edge runtime required by Next.js middleware.ts.
 * @param payload 
 * @param secret 
 * @returns 
 */
export async function sign(payload: Token, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<JWTPayload | null | undefined> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    // run some checks on the returned payload, perhaps you expect some specific values    

    // if its all good, return it, or perhaps just return a boolean
    return payload;
}