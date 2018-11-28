export class Reward {
  constructor(
    public id: number,
    public reward_name: string,
    public pts_required: number,
    public org_id: number,
  ) { }
}

// export class Reward {
//   public id: number;
//   public reward_name: string;
//   public pts_required: number;
//   public org_id: number;

//   constructor(
//     id: number,
//     reward_name: string,
//     pts_required: number,
//     org_id: number,
//   ) {
//     this.id = id;
//     this.reward_name = reward_name;
//     this.pts_required = pts_required;
//     this.org_id = org_id;
//   }
// }
