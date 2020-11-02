// src of okta code: https://slacker.ro/2020/02/26/build-a-secure-nestjs-api-with-postgres/
import { Client as OktaClient } from '@okta/okta-sdk-nodejs';
import * as dotenv from 'dotenv';
import { OktaAuthOptions } from '@okta/okta-auth-js';
const OktaAuth = require('@okta/okta-auth-js');

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  id: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Session {
  sessionId: string;
  userId: string;
  userEmail: string;
}

dotenv.config();
const { OKTA_DOMAIN, OKTA_APP_TOKEN } = process.env;

const oktaClient = new OktaClient({
  orgUrl: OKTA_DOMAIN,
  token: OKTA_APP_TOKEN,
});

const config: OktaAuthOptions = {
  issuer: `${OKTA_DOMAIN}/oauth2/default`,
};

const oktaAuthClient = new OktaAuth(config);

export async function register(
  registerData: RegisterData,
): Promise<RegistrationResponse> {
  const { email, firstName, lastName, password } = registerData;
  // to do: throw an error if username already exists???
  const createdUser = await oktaClient.createUser({
    profile: { email, login: email, firstName, lastName },
    credentials: { password: { value: password } },
  });

  return createdUser;
}

export async function sessionLogin(loginData: LoginData): Promise<Session> {
  const { email: username, password } = loginData;
  const { sessionToken } = await oktaAuthClient.signIn({ username, password });

  const session = await oktaClient.createSession({ sessionToken });
  const { login, id, userId } = session;

  return { sessionId: id, userEmail: login, userId };
}

export async function getSessionBySessionId(
  sessionId: string,
): Promise<Session> {
  const session = await oktaClient.getSession(sessionId);
  const { login, id, userId } = session;

  return { sessionId: id, userEmail: login, userId };
}
