import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Organization } from '../models/organization.model';


@Injectable({
  providedIn: 'root'
})
export class OrgService {
  public orgs: Organization[];
  public detailedOrg;
  public isAdmin = false;

  url = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  verifyAdmin() {
    return this.http.get(`${this.url}/organization/${this.detailedOrg.org[0].id}/verifyadmin`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((response) => {
      return response;
    })
  }

  fetchInviteLink(){
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
        console.log(org)
        console.log(this.detailedOrg.org_goal)
        this.detailedOrg.org_goal.push(org[0])
        console.log(this.detailedOrg.org_goal)
        this.snackBar.open('New goal is successfully created!', 'Close', {
          duration: 1000,
        });
      }
    })
  }

  updateGoal(goalBody) {
    return this.http.put(`${this.url}/organization/user_goals/${goalBody.goal_id}`, goalBody, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((asf) => {
      this.detailedOrg.org_goal.map((goal)=>{
        if(goal.id === goalBody.goal_id){
          goal.goal_current_xp = goalBody.goal_current_xp;
        }
      })
      // console.log(this.detailedOrg.org_goal)
      // console.log(asf)
    })
  }



}
