export class UserFirebaseDto {
  constructor(responseData) {
    const user = responseData.user ? responseData.user.multiFactor.user : responseData.multiFactor.user;
    const {
      email,
      emailVerified,
      uid: id,
      metadata: { lastLoginAt, lastSignInTime },
      stsTokenManager: session
    } = user;
    this.email = email;
    this.emailVerified = emailVerified;
    this.id = id;
    this.metadata = { lastLoginAt, lastSignInTime };
    this.session = session;
  }
}