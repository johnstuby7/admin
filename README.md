#1 install angular client:
    -> npm i @angular/cli

#2 Create new angular App
    -> ng new admin

#3 Angular Material
    -> ng add @angular/material

#4 run the app
    -> ng server
    -> Basic angular app is now running

#5 empty out app.component.html except for <router-outlet>

#6 import sideNav basic drawer from material.angular.io 
    -> in app.module.ts include the component
    -> Add <Router-outlet> between <<mat-drawer-content> in app.component.html

#7 Add in scss to app.component.scss
.example-container {
    width: 90%;
    height: 100%;
    margin: 10px;
    border: 1px solid #555;
  }

#8 Generate common module -> layout
    -> ng g module layout
    -> in layout : ng g c header
        -> ng g c sidebar
        -> ng g c footer

#9 update laout.module.ts. add in export:
,
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]

#10 Import the common module -> layout into App Module
    -> App.module.ts:     imports: [ LayoutModule,]
    -> App.component.html: update file to the  follows:
        <app-header></app-header>
        <mat-drawer-container class="example-container">
        <mat-drawer mode="side" opened>
            <app-sidebar></app-sidebar>
        </mat-drawer>
        <mat-drawer-content>
            <h1> Welcome to my site</h1>
            <router-outlet></router-outlet>
        </mat-drawer-content>
        </mat-drawer-container>
        <app-footer></app-footer>

#11 Update the following files:
    -> for the header, go to material.angular.io and select basic toolbar example, copy code and paste it into header.component.html:
        <mat-toolbar>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
        </button>
        <span>My App</span>
        <span class="example-spacer"></span>
        <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>share</mat-icon>
        </button>
        </mat-toolbar>
    
    -> Import it in Layout.module.ts:
        import {MatToolbarModule} from '@angular/material/toolbar'; 
        imports: [
        CommonModule,
        MatToolbarModule
        ],
    -> restart server
    -> error:
        Error: src/app/layout/header/header.component.html:11:7 - error NG8001: 'mat-icon' is not a known element:
        1. If 'mat-icon' is an Angular component, then verify that it is part of this module.
        2. If 'mat-icon' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

        11       <mat-icon>share</mat-icon>
            ~~~~~~~~~~

        src/app/layout/header/header.component.ts:5:16
            5   templateUrl: './header.component.html',
                        ~~~~~~~~~~~~~~~~~~~~~~~~~
            Error occurs in the template of component HeaderComponent.

    -> Fix by importing MatIcon in layout.module.ts:
    import {MatIconModule} from '@angular/material/icon'; 
    imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],

#12 update the following files:
    -> header.component.scss: 
    .example-spacer {
        flex: 1 1 auto;
    }

    -> Update app.component.html mat-drawer wrapping app-sidebar
        <mat-drawer mode="side" opened class="sidebar">

    -> sidebar.component.scss:
        .sidebar {
            max-width: 250px;
        }

#13 ng g module users in app folder
    -> ng g c list-users
    -> ng g c view-user
    -> ng g c add-user
    -> ng g c edit-user
    -> ng g c delete-user

#14 Add UsersModule into Imports:[] in app.module.ts

#15 Update app-routing.module.ts:
    import { AddUserComponent } from './users/add-user/add-user.component';
    import { ViewUserComponent } from './users/view-user/view-user.component';
    import { ListUsersComponent } from './users/list-users/list-users.component';
    import { DeleteUserComponent } from './users/delete-user/delete-user.component';
    import { EditUserComponent } from './users/edit-user/edit-user.component';

    const routes: Routes = [
    { path: 'create', component: AddUserComponent },
    { path: 'view/:id', component: ViewUserComponent },
    { path: 'list', component: ListUsersComponent },
    { path: 'delete/:id', component: DeleteUserComponent },
    { path: 'edit/:id', component: EditUserComponent }
    ];

#16 update sidebar.component.html:
    <mat-list role="list">
        <mat-list-item role="listitem">Item 1</mat-list-item>
        <mat-list-item role="listitem">Item 2</mat-list-item>
        <mat-list-item role="listitem">Item 3</mat-list-item>
    </mat-list>

    Import matlist in layout.module.ts:
    import {MatListModule} from '@angular/material/list';
    imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],

#17: in app mkdir services, cd services ng g service user
    -> import httpclient module in app.module.ts:
        import { HttpClientModule } from '@angular/common/http';
        HttpClientModule,

    -> update User.services.ts:
        import { Injectable } from '@angular/core';
        import { HttpClient } from '@angular/common/http';

        @Injectable({
        providedIn: 'root'
        })
        export class UserService {

        baseUrl: string = 'https://jsonplaceholder.cypress.io/'
        constructor(private http: HttpClient) { }

        listUser() {
            return this.http.get(this.baseUrl + 'users')
        }
        }

    ->list-user.components.ts
        import { Component, OnInit } from '@angular/core';
        import { Observable } from 'rxjs/internal/Observable';
        import { UserService } from 'src/app/services/user.service';


        @Component({
        selector: 'app-list-users',
        templateUrl: './list-users.component.html',
        styleUrls: ['./list-users.component.scss']
        })
        export class ListUsersComponent implements OnInit {

            listUsers!: any;
        constructor(private userService: UserService) { }

        ngOnInit(): void {
            this.userService.listUser().subscribe(data => {
            this.listUsers = data;
            } );
        }

        }

    
    -> go to jsonplaceholder.cypress.io/users 
    -> start server: ng serve
    -> in Chrome: chrome://flags/#allow-insecure-localhost

    -> Add RouterModule to users.module.ts
    ->
        
#18 Adding in addUserForm:

    -> update add-user.component.ts
        import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
        addUserForm: FormGroup = new FormGroup({});
        constructor(private formBuilder: FormBuilder) { }

        ngOnInit(): void {
            this.addUserForm = this.formBuilder.group({
            'username': new FormControl(''),
            'email': new FormControl(''),
            'phone': new FormControl('')
            })
        }

    -> add-user.component.html:
        <mat-card>
            <mat-card-title>Create New User</mat-card-title>
            <mat-card-content>
                <form [formGroup]="addUserForm" (submit)="createUser()">
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label>Username</mat-label>
                            <input matInput placeholder="Username" formControlName="username">
                            <mat-icon matSuffix>Sentiment_very_satisfied</mat-icon>
                            <mat-hint>Enter Username</mat-hint>
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label>Email Address</mat-label>
                            <input matInput placeholder="Email Address" formControlName="email">
                            <mat-icon matSuffix>Sentiment_very_satisfied</mat-icon>
                            <mat-hint>Enter Email</mat-hint>
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label>Phone Number</mat-label>
                            <input matInput placeholder="Phone Number" formControlName="phone">
                            <mat-icon matSuffix>Sentiment_very_satisfied</mat-icon>
                            <mat-hint>Enter Phone Number</mat-hint>
                        </mat-form-field>
                    </p>
                    
                    <p>
                        <button mat-raised-button color="primary">Submit</button>
                    </p>
                </form>
            </mat-card-content>
        </mat-card>

    ->Add material components to user.module.ts
        import { MatFormFieldModule} from '@angular/material/form-field';
        import {MatInputModule} from '@angular/material/input';
        import {MatIconModule} from '@angular/material/icon'; 
    -> in imports=[]
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,

    -> NEED TO ADD IN import { ReactiveFormsModule } from '@angular/forms'; to user.modules.ts or their will be a issue trying to use formGroup in a form
        import { ReactiveFormsModule } from '@angular/forms';
        imports: [ ReactiveFormsModule]

#19 update user.service.ts
    ->  addUser(userObj: any) {
        return this.http.post(this.baseUrl + 'users', userObj);
         }

    -> add to user.module.ts
        import {MatSnackBarModule} from '@angular/material/snack-bar'; 

    -> add to add-user-component.ts
        import {MatSnackBarModule} from '@angular/material/snack-bar'; 
          constructor(private formBuilder: FormBuilder, 
            private userService: UserService, private _snackbar: MatSnackBar ) { }
        
        createUser() {
            this.userService.addUser(this.addUserForm.value).subscribe(data => {
            this._snackbar.open("User Created Successfully");
            }, err => {
            this._snackbar.open("Unable to create User");
            })
        }

    -> to get message to close:
        ->user.modules.ts:
        import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar'; 
            ,
            providers: [
                { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} }
            ]

#20 delete action:
    -> update delete-user.component.ts
        import { Component, OnInit } from '@angular/core';
        import { MatSnackBar } from '@angular/material/snack-bar';
        import { ActivatedRoute, Router } from '@angular/router';
        import { UserService } from 'src/app/services/user.service';

        @Component({
        selector: 'app-delete-user',
        templateUrl: './delete-user.component.html',
        styleUrls: ['./delete-user.component.scss']
        })
        export class DeleteUserComponent implements OnInit {

        userId: string = '';
        constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
            private _snackBar: MatSnackBar,
            private router: Router) { }

        ngOnInit(): void {
            this.activatedRoute.params.subscribe(data => {
            this.userId = data.id;
            });

            if(this.userId){
            this.userService.deleteUser(this.userId).subscribe(data => {
                this._snackBar.open("User Deleted Successfully");
                this.router.navigateByUrl('list')
            }, err => {
                this._snackBar.open("Unable to delete user");
            })
            }
        }

        }

    -> update user.service.ts
          deleteUser(id: any) {
            return this.http.delete(this.baseUrl + 'users/' + id);
        }

#21 Edit user:
    ->In edit-user.component.ts this line: this.activatedRoute.params.subscribe(data => { will capture the data any time it changes

Make sure to create a dataLoaded Boolean, that you can wrap forms in <div *ngIf="dataLoaded"> and have it defined in edit-user.components.ts. this will make sure that the data is availble before failing.

Example of disabling form until it is valid: 
    <button mat-raised-button color="primary" [disabled]="!addUserForm.valid">Create User</button>

ActivatedRoute is used for routing for each component

To navigate one level up in the url:
this.router.navigate(['..', 'list']);

Resources:
material.angular.io
https://www.youtube.com/watch?v=-e9Drok8eiA
https://www.youtube.com/watch?v=oL0wcXKV8fI
