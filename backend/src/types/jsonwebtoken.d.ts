declare module 'jsonwebtoken' {
    export interface SignOptions {
      expiresIn?: string | number;
      notBefore?: string | number;
      audience?: string | string[];
      subject?: string;
      issuer?: string;
      jwtid?: string;
      mutatePayload?: boolean;
      noTimestamp?: boolean;
      header?: object;
      encoding?: string;
    }
  
    export interface VerifyOptions {
      algorithms?: string[];
      audience?: string | string[];
      clockTimestamp?: number;
      clockTolerance?: number;
      issuer?: string | string[];
      ignoreExpiration?: boolean;
      ignoreNotBefore?: boolean;
      jwtid?: string;
      subject?: string;
      maxAge?: string | number;
    }
  
    export interface DecodeOptions {
      complete?: boolean;
      json?: boolean;
    }
  
    export interface JwtHeader {
      alg: string;
      typ?: string;
      kid?: string;
    }
  
    export interface JwtPayload {
      [key: string]: any;
      iss?: string;
      sub?: string;
      aud?: string | string[];
      exp?: number;
      nbf?: number;
      iat?: number;
      jti?: string;
    }
  
    export interface SignCallback {
      (err: Error | null, token: string | undefined): void;
    }
  
    export interface VerifyCallback {
      (err: Error | null, decoded: object | undefined): void;
    }
  
    export interface DecodeCallback {
      (err: Error | null, decoded: object | undefined): void;
    }
  
    export function sign(
      payload: string | object | Buffer,
      secretOrPrivateKey: string | Buffer,
      options?: SignOptions,
      callback?: SignCallback
    ): string;
  
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: VerifyOptions,
      callback?: VerifyCallback
    ): object | string;
  
    export function decode(
      token: string,
      options?: DecodeOptions,
      callback?: DecodeCallback
    ): null | object | string;
  }
  