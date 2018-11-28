import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-edit-goal-form',
  templateUrl: './edit-goal-form.component.html',
  styleUrls: ['./edit-goal-form.component.scss']
})

export class EditGoalFormComponent implements OnInit {
  loaded: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  goalEditFormGroup: FormGroup;

  constructor(
    private orgService: OrgService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditGoalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public snackBar: MatSnackBar,
  ) {
    this.goalEditFormGroup = this.formBuilder.group({
      goal_current_xp: ''
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  onUpdateGoal(){
    console.log(this.data)
    if(this.data.goal_current_xp === this.data.goal_total_xp){
      this.data.completed_at = Date.now();
    }
    console.log(this.data)
    this.orgService.updateGoal(this.data).subscribe().add(()=>{
      
    })
  }

  // onSubmit() {
  //   this.goalEditFormGroup.value.start_date = this.goalEditFormGroup.value.start_date.toString();
  //   this.goalEditFormGroup.value.finish_date = this.goalEditFormGroup.value.finish_date.toString();
  //   this.loading = true;
  //   if (this.goalEditFormGroup.value.goal_name.length &&
  //     !isNaN(this.goalEditFormGroup.value.goal_total_xp) &&
  //     this.goalEditFormGroup.value.start_date.length &&
  //     this.goalEditFormGroup.value.finish_date.length
  //   ) {
  //     return this.orgService.addGoal(this.goalEditFormGroup.value).subscribe((res) => {
  //       if (res) {
  //         if (res['message'] === undefined) {
  //           this.dialogRef.close();
  //         }
  //       }
  //     }).add(() => {
  //       this.submitted = true;
  //       this.loading = false;
  //     })
  //   } else {
  //     this.submitted = true;
  //     this.loading = false;
  //     this.snackBar.open('Invalid info!', 'Close', {
  //       duration: 1000,
  //     });
  //   }
  // }

  ngOnInit() {
    // this.orgOverview[0].id
    // console.log()
  }

}


