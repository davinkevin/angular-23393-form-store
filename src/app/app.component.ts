import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Member, members, State, Team} from './app.reducer';
import {AddNewMemberAction, FormUpdateAction} from './app.action';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formTeam: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {

    this.formTeam = this.fb.group({
      name: ['The Best team !', Validators.required],
      members: this.fb.array([])
    });

    this.formTeam
      .valueChanges
      .subscribe((v: Team) => this.store.dispatch(new FormUpdateAction(v)));

    this.store.pipe(
      select(members),
      filter(v => v.length > 0)
    ).subscribe((ms: Member[]) => {
      // Infinite Loop here
      // const a = this.fb.array(ms.map(m => this.fb.group({...m})));
      // this.formTeam.setControl('members', a);

      // Error: Cannot find form control at index 3
      this.members.setValue(ms, {emitEvent: false});

    });
  }

  addMember() {
    (this.formTeam.get('members') as FormArray).push(this.fb.group({
      name: 'Type a name here...',
      age: 16
    }));
  }

  addMemberToStore() {
    this.store.dispatch(new AddNewMemberAction({name: 'foo', age: 21}));
  }

  get members() {
    return this.formTeam.get('members') as FormArray;
  }
}
