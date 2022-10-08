export class User {
  constructor(
    public email: string,
    public entries: number,
    public id: string,
    public name: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
