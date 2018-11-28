import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Organization } from '../models/organization.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class OrgService {
  public orgs: Organization[];
  public detailedOrg;
  public isAdmin = false;
  public curUser;

  url = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { 
    const helper = new JwtHelperService();
    this.curUser = helper.decodeToken(localStorage.getItem('token'));
  }

  verifyAdmin() {
    return this.http.get(`${this.url}/organization/${this.detailedOrg.org[0].id}/verifyadmin`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((response) => {
      return response;
    })
  }

  fetchInviteLink() {
    return this.http.get(`${this.url}/organization/${this.detailedOrg.org[0].id}/create_invitation`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((response) => {
      return response;
    })
  }

  acceptInviteLink(inv_code) {
    return this.http.post<any>(`${this.url}/organization/accept_invitation`, inv_code, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((response) => {
      this.router.navigate([`organization/${response['org_id']}`])
      // window.location.href = `/organization/${response['org_id']}`
      // return response;
    })
  }

  fetchOrgs() {
    return this.http.get<Organization[]>(`${this.url}/organization`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((orgs) => {
      this.orgs = orgs;
      return orgs;
    })
  }

  addOrg(orgPostBody) {
    return this.http.post(`${this.url}/organization`, orgPostBody, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((newOrg) => {
      this.orgs.push(newOrg[0]);
      this.router.navigate([`organization/${newOrg[0].id}`])

    })
  }

  fetchOrg(org_id) {
    // console.log('request being made')
    return this.http.get<any>(`${this.url}/organization/${org_id}`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((org) => {
      this.detailedOrg = org;
      console.log(org)
      return org;
    })
  }

  addReward(org_id, rewardBody) {
    return this.http.post<any>(`${this.url}/organization/${org_id}/rewards`, rewardBody, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((org) => {
      this.detailedOrg.org_reward.push(org.reward[0]);
    })
  }

  deleteReward(reward_id) {
    return this.http.delete(`${this.url}/organization/${this.detailedOrg.org[0].id}/rewards/${reward_id}`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map(() => {
      return this.detailedOrg.org_reward.map((reward, i) => {
        if (reward.id === reward_id) {
          this.detailedOrg.org_reward.splice(i, 1);
        }
      })
    })
  }

  addGoal(goalBody) {
    return this.http.post<any>(`${this.url}/organization/${this.detailedOrg.org[0].id}/goals`, goalBody, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((org) => {
      if (org['message'] === 'There seems to be an error') {
        this.snackBar.open('Invalid info!', 'Close', {
          duration: 1000,
        });
        return org;
      } else {
        this.detailedOrg.org_goal.push(org[0])
        this.snackBar.open('New goal is successfully created!', 'Close', {
          duration: 1000,
        });

      }
    })
  }

  updateOrgPts(orgPts) {
    return this.http.put(`${this.url}/organization/${this.detailedOrg.org[0].id}`, orgPts, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    })
  }

  // goal pts to user pts = user pts
  updateCurUserPts(goalPts){
    return this.http.put(`${this.url}/organization/user/${this.curUser.user.id}`, goalPts, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    })
  }

  updateGoal(goalBody) {
    return this.http.put(`${this.url}/organization/user_goals/${goalBody.goal_id}`, goalBody, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map(() => {
      this.detailedOrg.org_goal.map((goal) => {
        if (goal.id === goalBody.goal_id) {

          let curXP = goal.goal_current_xp;
          let totalXP = goal.goal_total_xp;

          // cur === total to cur < total
          // then minus total xp to org's current xp
          if (curXP === totalXP) {
            curXP = goalBody.goal_current_xp;
            if (curXP < totalXP) {
              this.detailedOrg.org[0].org_current_pts -= totalXP;
              let orgUpdatedObj = {
                org_current_pts: this.detailedOrg.org[0].org_current_pts
              }
              this.updateOrgPts(orgUpdatedObj).subscribe().add(()=>{
                this.detailedOrg.org_users.map((user)=>{
                  if (user.user_id === this.curUser.user.id){
                    user.points -= totalXP;
                    let userUpdatedObj = {
                      points: user.points 
                    }
                    this.updateCurUserPts(userUpdatedObj).subscribe();
                  }
                })

              })
              console.log('org minus points')
            }
          // cur < total to cur === total
          // then add total xp to org's current xp
          }  
            if (curXP < totalXP) {
              curXP = goalBody.goal_current_xp;
              if (curXP === totalXP) {
                this.detailedOrg.org[0].org_current_pts += totalXP;
                let orgUpdatedObj = {
                  org_current_pts: this.detailedOrg.org[0].org_current_pts
                }
                let userUpdatedObj = {
                  points: totalXP
                }
                this.updateOrgPts(orgUpdatedObj).subscribe().add(()=>{
                  this.detailedOrg.org_users.map((user) => {
                    if (user.user_id === this.curUser.user.id) {
                      user.points += totalXP;
                      let userUpdatedObj = {
                        points: user.points
                      }
                      this.updateCurUserPts(userUpdatedObj).subscribe();
                    }
                  })
                })
                console.log('org plus points');
              }
            }
          goal.goal_current_xp = curXP;
        }
      })
    })
  }



}
