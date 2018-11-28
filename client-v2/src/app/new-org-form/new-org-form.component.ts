import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-new-org-form',
  templateUrl: './new-org-form.component.html',
  styleUrls: ['./new-org-form.component.scss']
})
export class NewOrgFormComponent implements OnInit {
  loaded: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  orgFormGroup: FormGroup;
  joinFormGroup: FormGroup;


  constructor(
    public orgService: OrgService,
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewOrgFormComponent>,
  ) {
    this.orgFormGroup = this.formBuilder.group({
      org_name: '',
      icon_img: '',
      org_total_pts: '',
    })
    this.joinFormGroup = this.formBuilder.group({
      invitation_code: '',
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isValidURL(url) {
    if(!url){
      return true;
    }
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (RegExp.test(url)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {

  }

  addOrgSubmit() {
    this.loading = true;
    if (this.orgFormGroup.value.org_name.length &&
      this.orgFormGroup.value.org_total_pts.length &&
      this.isValidURL(this.orgFormGroup.value.icon_img) &&
      !isNaN(Number(this.orgFormGroup.value.org_total_pts))
    ) {
      return this.orgService.addOrg(this.orgFormGroup.value).subscribe().add(() => {
        this.loading = false;
        this.submitted = true;
        this.dialogRef.close();
      })
    } else {
      this.loading = false;
      this.submitted = true;
      this.snackBar.open('Invalid URL!', 'Close', {
        duration: 1000,
      });
    }
  }

  joinOrgSubmit(){
    console.log(this.joinFormGroup.value);
    this.loading = true;
    if(this.joinFormGroup.value.invitation_code.length){
      return this.orgService.acceptInviteLink(this.joinFormGroup.value).subscribe().add(() => {
        this.loading = false;
        this.submitted = true;
        this.snackBar.open('Successfully joined new org!', 'Close', {
          duration: 1000,
        });
        this.dialogRef.close();
      })
    }else{
      // this.loading = false;
      // this.submitted = true;
      // this.snackBar.open('Invalid format!', 'Close', {
      //   duration: 1000,
      // });
    }
  }
}
