import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrgService } from '../services/org.service';
import { MatDialog } from '@angular/material';

import { NewOrgFormComponent } from '../new-org-form/new-org-form.component';
import { Organization } from '../models/organization.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {
  orgs: Organization[];

  constructor(
    private orgService: OrgService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    return this.orgService.fetchOrgs().subscribe((orgs) => {
      this.orgs = orgs;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewOrgFormComponent, {
      panelClass: 'orgDialogContainer',
      data: this.orgs
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  shortenOrgName(org_name){
    return org_name.match(/\b(\w)/g).join('').substr(0, 3);
  }

  onOrgClick(event){
    // console.log(event);
  }


}
