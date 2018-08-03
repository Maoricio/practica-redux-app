import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../model/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromTodoAction from '../todo.actions';
import { NgIf } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges.subscribe(() => {
      const accion = new fromTodoAction.ToogleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
    console.log(this.todo);
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    const texto = this.txtInput.value.charAt(0).toUpperCase() + this.txtInput.value.slice(1);
    const accion = new fromTodoAction.EditarTodoAction(this.todo.id, texto);
    this.store.dispatch(accion);

  }

  borrarTodo() {
    const accion = new fromTodoAction.BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}
