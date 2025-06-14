import React, {Component} from 'react';



//Form e Tarefas
import{FaPlus,FaEdit,FaWindowClose} from 'react-icons/fa';

import './main.css';
//Module not found: Error: Can't resolve 'react-icons/fa' in '/Users/maristelllabittencourt/iCloud Drive (Arquivo)/Documents/projetosCode/otavioMiranda/projetoToDoListReact/todolist/src/components'
export default class Main extends Component{

state={
novaTarefa: '',
tarefas: [],
index:-1,
};

componentDidMount(){

  const tarefas = JSON.parse(localStorage.getItem('tarefas'));

  if (!tarefas) return;

  this.setState({tarefas})
}

componentDidUpdate(prevProps, prevState){
const { tarefas } = this.state;

if (tarefas === prevState.tarefas) return;

localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

handleSubmit = (evento) => {
    evento.preventDefault();
    const{tarefas,index} =this.state;
    let {novaTarefa} = this.state;
    novaTarefa = novaTarefa.trim ();

if(tarefas.indexOf(novaTarefa) !== -1) return;

const novasTarefas = [...tarefas];

if(index === -1){
  this.setState({
    tarefas:[...novasTarefas, novaTarefa],
    novaTarefa:'',
  });
  } else {

  //const novasTarefas =[...tarefas];
  novasTarefas[index] = novaTarefa;

  this.setState({
    tarefas:[...novasTarefas],
    index:-1,
    novaTarefa:'',
    });
  }
}

handleChange= (evento) => {
    this.setState({
      novaTarefa: evento.target.value
    });
}

handleEdit = (evento,index) => {
const{tarefas} = this.state
this.setState({
index,
novaTarefa:tarefas[index],
  });

}

handleDelete = (evento,index) => {
const{tarefas} = this.state
const novaTarefas=[...tarefas];
novaTarefas.splice(index, 1);

this.setState({
tarefas: novaTarefas,
    })
};

render(){
 const {novaTarefa, tarefas} = this.state;

return (
    <div className='main'>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={this.handleSubmit} action = "#" className="form">
        <input
          onChange={this.handleChange}
           type="text"
           value={this.state.novaTarefa}
           placeholder="Digite uma tarefa" />
        <button type="submit">
          <FaPlus/>
        </button>
      </form>

      <ul className="tarefas">
        {this.state.tarefas.map((tarefa,index) => (
           <li key={index}>
{tarefa}
           <span>
            <FaEdit
              onClick={(evento) => this.handleEdit(evento,index)}
              className="edit"
            />

            <FaWindowClose
              onClick={(evento) => this.handleDelete(evento,index)}
              className="delete"
            />

           </span>
          </li>
        ))}
      </ul>
    </div>

       );
    }
  }
