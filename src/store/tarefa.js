import { defineStore } from "pinia";

export const useTarefaStore = defineStore("tarefa", {
  state: () => ({
    tarefas: [],
    id_tarefas: 0,
  }),
  actions: {
    adicionarTarefa(tarefa) {
      this.id_tarefas++;
      const novaTarefa = {
        nome: tarefa.nome,
        nota: tarefa.nota,
        estaCompleta: false,
        id: this.id_tarefas,
        data: new Date(),
      };
      this.tarefas.push(novaTarefa);
    },
    apagarTarefa(id_tarefa) {
      this.tarefas = this.tarefas.filter((item) => item.id != id_tarefa);
    },
  },
  persist: true,
});
