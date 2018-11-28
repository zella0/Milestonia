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
    if(this.data.goal_current_xp === this.data.goal_total_xp){
      this.data.completed_at = Date.now();
    }
    this.orgService.updateGoal(this.data).subscribe().add(()=>{
      
    })
  }

  ngOnInit() {
    // this.orgOverview[0].id
    // console.log()
  }

}


