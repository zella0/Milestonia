export class Goal {
  constructor(
    public id: number,
    public goal_total_xp: number,
    public org_id: number,
    public start_date: string,
    public finish_date: string,
    public status: string,
    public top_priority: boolean,
  ) { }
}

// export class Goal {
//   public id: number;
//   public goal_total_xp: number;
//   public org_id: number;
//   public start_date: string;
//   public finish_date: string;
//   public status: string;
//   public top_priority: boolean;

//   constructor(
//     id: number,
//     goal_total_xp: number,
//     org_id: number,
//     start_date: string,
//     finish_date: string,
//     status: string,
//     top_priority: boolean,
//   ) {
//     this.id = id;
//     this.goal_total_xp = goal_total_xp;
//     this.org_id = org_id;
//     this.start_date = start_date;
//     this.finish_date = finish_date;
//     this.status = status;
//     this.top_priority = top_priority;
//   }
// }