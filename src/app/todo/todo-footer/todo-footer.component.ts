import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromFiltroAction from '../../filter/filter.actions';
import { Todo } from '../model/todo.model';
import { LimpiarTodoCompletadoAction } from '../todo.actions';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltroAction.filtrosValidos [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltroAction.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  setFiltro(filtro: fromFiltroAction.filtrosValidos) {
    const accion = new fromFiltroAction.SetFiltroAction(filtro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  limpiar() {
    const accion = new LimpiarTodoCompletadoAction();
    this.store.dispatch(accion);
  }

}
