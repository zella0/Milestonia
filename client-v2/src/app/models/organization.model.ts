export class Organization {
  constructor(
    public id: number,
    public org_name: string,
    public icon_img: string,
    public org_total_pts: number,
    public org_current_pts: number,
  ) { }
}

// export class Organization {
//   public id: number;
//   public org_name: string;
//   public icon_img: string;
//   public org_total_pts: number;
//   public org_current_pts: number

//   constructor(
//     id: number,
//     org_name: string,
//     icon_img: string,
//     org_total_pts: number,
//     org_current_pts: number
//   ) {
//     this.id = id;
//     this.org_name = org_name;
//     this.icon_img = icon_img;
//     this.org_total_pts = org_total_pts;
//     this.org_current_pts = org_current_pts;
//   }
// }
