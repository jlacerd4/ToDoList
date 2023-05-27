import { fetchAPI } from "./request";

export class Tarefa {
    public id: number;
    public nome: string;
    public concluida: boolean;
    public data: string;

    constructor(id: number, nome: string, data: string) {
        this.id = id;
        this.nome = nome;
        this.concluida = false;
        this.data = data;
    }

    static fromApiObject(obj: any): Tarefa {
        const tarefa = new Tarefa(obj.id, obj.nome, 'DATA N IMPLEMENTADA');
        tarefa.concluida = obj.concluida;
        return tarefa;
    }

    static async fetchAll(): Promise<Tarefa[]> {
        const data = await fetchAPI('/tarefas', {}, 'GET')
        return data.map(this.fromApiObject)
    }

    async deletar() {
        await fetchAPI(`/tarefas/${this.id}`, {}, 'DELETE');
    }

    async atualizar() {
        await fetchAPI(`/tarefas/${this.id}`, {
            nome: this.nome,
            concluida: this.concluida
        }, 'PUT')
    }
    
    static async criar(nome: string, data: string): Promise<Tarefa> {
        const tarefa = Tarefa.fromApiObject(await fetchAPI('/tarefas', {
            nome,
        }, 'POST'));

        return tarefa;
    }
    
}