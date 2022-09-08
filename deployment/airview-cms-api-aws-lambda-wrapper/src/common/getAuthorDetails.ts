import jwt_decode from "jwt-decode";

export function getAuthorDetails(cookieStr: string): any {
  const re = new RegExp(
    ".*CognitoIdentityServiceProvider.*idToken=(?<token>.*?);"
  );
  const matches = cookieStr.match(re);
  if (matches?.groups?.token) {
    const { name, email }: any = jwt_decode(matches.groups.token);
    return { name, email };
  }
  throw Error("Id token not found");
}
