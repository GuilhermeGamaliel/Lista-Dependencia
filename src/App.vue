<template>
  <v-app>
    <v-card>
      <v-toolbar color="primary" elevation="3" dark rounded="0">
        <v-toolbar-title>Lista de Tarefas</v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-card class="ma-4" v-show="store.tarefas.length > 0">
      <v-list>
        <v-list-item
          v-for="(tarefa, index) in store.tarefas"
          :key="index"
          :class="{ 'tarefa-completa': tarefa.estaCompleta }"
          two-line
        >
          <v-checkbox
            hide-details
            v-model="tarefa.estaCompleta"
            class="mt-0 mr-2"
          ></v-checkbox>
          <v-list-item-content>
            <v-list-item-title>{{ tarefa.nome }}</v-list-item-title>
            <v-list-item-subtitle>{{ tarefa.nota }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-right text-uppercase">
            <v-list-item-title class="caption">
              <v-icon v-if="tarefa.estaCompleta" dense class="mr-1"
                >mdi-calendar-outline</v-icon
              >
              <v-icon
                v-else-if="!tarefa.estaCompleta"
                dense
                class="mr-1 primary--text"
                >mdi-calendar-alert</v-icon
              >
              <span
                :class="{
                  'primary--text font-weight-bold': !tarefa.estaCompleta,
                }"
              >
                {{ formatarData(tarefa.data) }}</span
              >
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click="deletarTarefa(tarefa)" icon>
              <v-icon color="primary">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <v-btn
      fab
      fixed
      right
      bottom
      color="primary"
      @click="modalNovaTarefa = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="modalNovaTarefa" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab fixed right bottom color="primary" v-on="on" v-bind="attrs">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"
          >Adicionar nova tarefa</v-card-title
        >
        <v-form
          class="mx-4 mt-4 pb-4"
          ref="form"
          @submit.prevent="validarTarefa"
          lazy-validation
        >
          <v-text-field
            v-model="novaTarefa.nome"
            label="Titulo"
            required
            outlined
            :rules="regras"
          ></v-text-field>
          <v-textarea
            label="Nota"
            v-model="novaTarefa.nota"
            outlined
          ></v-textarea>
          <div class="d-flex justify-end">
            <v-btn plain class="mr-2" @click="cancelarTarefa">Cancelar</v-btn>
            <v-btn color="primary" type="submit">Adicionar</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTarefaStore } from "@/store/tarefa";

const store = useTarefaStore();
const regras = [(value) => Boolean(value) || "Digite algo!"];

let form = ref(null);
let modalNovaTarefa = ref(false);
let novaTarefa = ref({});

onMounted(() => {
  console.log(form.value);
});

function formatarData(data) {
  return new Date(`${data} GMT-0300`).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

function cancelarTarefa() {
  modalNovaTarefa.value = false;
  form.value.reset();
}

function validarTarefa() {
  if (form.value.validate()) {
    store.adicionarTarefa(novaTarefa.value);
    modalNovaTarefa.value = false;
    form.value.reset();
  }
}

function deletarTarefa({ id }) {
  store.apagarTarefa(id);
}
</script>

<style scoped>
.tarefa-completa {
  background-color: #d8d8d8;
  opacity: 0.6;
}
</style>
