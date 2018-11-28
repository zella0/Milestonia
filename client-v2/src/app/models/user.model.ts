export class User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public first_name: string,
    public last_name: string,
    public password: string,
    public points: number
  ) { }
}

// export class User {
//   public id: number;
//   public email: string;
//   public username: string;
//   public first_name: string;
//   public last_name: string;
//   public password: string;
//   public points: number;

//   constructor(
//     id: number,
//     email: string,
//     username: string,
//     first_name: string,
//     last_name: string,
//     password: string,
//     points: number
//   ) {
//       this.id = id,
//       this.email = email,
//       this.username = username,
//       this.first_name = first_name,
//       this.last_name = last_name,
//       this.password = password,
//       this.points = points
//   }
// }