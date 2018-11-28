import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrgService } from '../services/org.service';


@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.scss']
})
export class RewardFormComponent implements OnInit {
  loaded: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  rewardFormGroup: FormGroup;

  constructor(
    private orgService: OrgService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RewardFormComponent>,
  ) {
    this.rewardFormGroup = this.formBuilder.group({
      reward_name: '',
      pts_required: ''
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    if (this.rewardFormGroup.value.reward_name.length &&
      this.rewardFormGroup.value.pts_required && 
      this.rewardFormGroup.value.pts_required < this.orgService.detailedOrg.org[0].org_total_pts
    ) {
      return this.orgService.addReward(this.orgService.detailedOrg.org[0].id, this.rewardFormGroup.value).subscribe().add(() => {
        this.loading = false;
        this.submitted = true;
        this.dialogRef.close();
        this.snackBar.open('New reward is successfully created!', 'Close', {
          duration: 1000,
        });
      })
    } else {
      this.loading = false;
      this.submitted = true;
      this.snackBar.open('Invalid format!', 'Close', {
        duration: 1000,
      });
    }
  }

  ngOnInit() {
    // this.orgOverview[0].id
    // console.log()
  }

}
