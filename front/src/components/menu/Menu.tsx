import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import {KeyboardEvent, useState} from 'react';
import Tasks from '../tarefas/Tasks';
import "../../pages/Tarefas/Tarefas.css"
import {Item} from '../../util/Item';
import "./Menu.css"

function Menu(props:any) {

const [list, setList] = useState<Item[]>([
  {id: 1, nome: 'tarefa', done: false, data: '12/10'},
  {id: 2, nome: 'tarefa2', done: true, data: '12/10'}
])

const [inputText, setInputText] = useState('')

const handleAddTask = (taskName: string) => {
  let newList = [...list];
  newList.push({
    id: list.length + 1,
    nome: taskName,
    done: false,
    data: '12/10'
  })
  setList(newList);
}

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.code === 'Enter' && inputText != ''){
    handleAddTask(inputText);
    setInputText('');
  }
}

const handleTaskChange = (id: number, done: boolean) => {
  let newList = [...list];
  for(let i in newList) {
    if(newList[i].id === id) {
      newList[i].done = done;
    }
  }
  setList(newList);
}


  return (
   <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.dentro}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/meudia'>🌞 Meu Dia</a></li>
            <li><a href='/importante'>⭐ Importante</a></li>
            <li><a href='/planejado'>📅 Planejado</a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="success"></IonMenuButton>
          </IonButtons>
          <div className='tolbar-task'>
            <IonTitle><a href='/tarefas'>ToDolist</a></IonTitle>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel><a href='/perfil'>Perfil</a></IonLabel>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo'>
          <div className='todoList'>
            <header>{props.principal}</header>

            {list.map((item, index) => (
              <Tasks 
              key= {index} 
              item = {item} 
              onChange={handleTaskChange}/>
            ))}

            <br/>
            <footer>
              <IonInput
               labelPlacement="floating" 
               fill="outline" 
               label='O que você vai fazer?'
               value={inputText}
               onIonChange={e => setInputText(e.target.value as string)}
               onKeyUp={handleKeyUp}
               ></IonInput>
            </footer>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}
export default Menu;