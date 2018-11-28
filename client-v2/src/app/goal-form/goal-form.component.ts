import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})

export class GoalFormComponent implements OnInit {
  loaded: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  goalCreateFormGroup: FormGroup;
  
  constructor(
    private orgService: OrgService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GoalFormComponent>,
    public snackBar: MatSnackBar,
  ) {
    this.goalCreateFormGroup = this.formBuilder.group({
      goal_name: '',
      goal_total_xp: '',
      start_date: '',
      finish_date: '',
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.goalCreateFormGroup.value.start_date = this.goalCreateFormGroup.value.start_date.toString();
    this.goalCreateFormGroup.value.finish_date = this.goalCreateFormGroup.value.finish_date.toString();
    this.loading = true;
    if (this.goalCreateFormGroup.value.goal_name.length &&
      !isNaN(this.goalCreateFormGroup.value.goal_total_xp) &&
      this.goalCreateFormGroup.value.start_date.length &&
      this.goalCreateFormGroup.value.finish_date.length 
    ) {
      return this.orgService.addGoal(this.goalCreateFormGroup.value).subscribe((res)=>{
        if(res){
          if(res['message'] === undefined){
            this.dialogRef.close();          
          }
        }
      }).add(() => {
        this.submitted = true;
        this.loading = false;
        this.dialogRef.close();
      })
    }else{
      this.submitted = true;
      this.loading = false;
      this.snackBar.open('Invalid info!', 'Close', {
        duration: 1000,
      });
    }
  }

  ngOnInit() {
    // this.orgOverview[0].id
    // console.log()
  }

}

