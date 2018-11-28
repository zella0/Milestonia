import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrgService } from '../services/org.service';
import { MatDialog, MatSnackBar } from '@angular/material';

import { RewardFormComponent } from '../reward-form/reward-form.component';
import { GoalFormComponent } from '../goal-form/goal-form.component';
import { ClipboardService } from 'ngx-clipboard'
import { EditGoalFormComponent } from '../edit-goal-form/edit-goal-form.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  public isEditting = false;
  public isLoaded = false;
  public orgOverview;
  public orgGoals;
  public orgRewards;
  public orgUsers;
  private isAdmin = false;


  constructor(
    public _clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private orgService: OrgService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.isAdmin = false;
      this.orgService.fetchOrg(params.org_id).subscribe((org) => {
        this.orgOverview = org.org;
        this.orgUsers = org.org_users;
        this.orgGoals = org.org_goal;
        this.orgRewards = org.org_reward;
      }).add(() => {
        // console.log('before verify', this.isAdmin);
        this.orgService.verifyAdmin().subscribe((response) => {
          if (response['isAdmin']) {
            this.isAdmin = true;
          }else{
            this.isAdmin = false;
          }
          // console.log('after verify', this.isAdmin);
        }).add(() => {
          this.isLoaded = true;
        })
      })
    });
  }

  onClickInvite() {
    let inv_link;
    this.orgService.fetchInviteLink().subscribe((response) => {
      if (response['invite_code']) {
        inv_link = response['invite_code'];
      }
    })
    setTimeout(() => {
      if (inv_link) {
        this._clipboardService.copyFromContent(inv_link);
        this.snackBar.open('Link copied to clipboard', 'Close', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Failed to get link', 'Close', {
          duration: 2000,
        });
      }
    }, 500)

  }

  openRewardDialog(): void {
    const dialogRef = this.dialog.open(RewardFormComponent, {
      panelClass: '',
      data: this.orgOverview.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCreateGoalDialog(): void {
    const dialogRef = this.dialog.open(GoalFormComponent, {
      panelClass: '',
      data: this.orgOverview.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditGoalDialog(body): void {
    console.log(body)
    const dialogRef = this.dialog.open(EditGoalFormComponent , {
      panelClass: '',
      data: {
        goal_id: body.id,
        goal_current_xp: body.goal_current_xp ,
        goal_total_xp: body.goal_total_xp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  rewardOnDelete(reward_id) {
    this.orgService.deleteReward(reward_id).subscribe().add(() => {
      this.snackBar.open('Reward sucessfully deleted', 'Close', {
        duration: 1000,
      });
    })
  }

}
