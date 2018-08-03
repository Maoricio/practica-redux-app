import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Ganar la copa del mundo');
const todo3 = new Todo('Tratar de conquistar al mundo');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];


export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo]; // genero un nuevo arreglo, clonando los states y agregando uno nuevo

        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => { // map() crea un nuevo arreglo, recorriendo el arreglo. Es como un forEach
                if (todoEdit.id === action.id) {
                    return { // devuelvo un nuevo objeto de tipo todo
                        ...todoEdit, // los tres puntitos, me clona todas las propiedades,
                                     // excepto las que escriba explicitamente como 'completado'
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
            // La clave es siempre devolver nuevos estados, NO hay que mutar la informacion anterior,
            // porque sino, no va a ser posible regresar a estados anteriores porque se habran mutado los datos originales.

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };

                } else {
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );
            // FILTER regresa un nuevo arreglo, con los elementos que cumplan una condicion
            // Va a regresar un nuevo arreglo, con todos los elementos cuyo 'id' sea distinto al que estoy mandando

        case fromTodo.LIMPIAR_TODO_COMPLETADOS:
            return state.filter(todoEdit => !todoEdit.completado );

        default:
            return state;
    }
}
