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
            <v-list-item-title>{{ tarefa.titulo }}</v-list-item-title>
            <v-list-item-subtitle>{{ tarefa.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-app>
</template>

<script setup>
import { useTarefaStore } from "@/store/tarefa";

const store = useTarefaStore();
</script>

<style scoped>
.tarefa-completa {
  background-color: #d8d8d8;
  opacity: 0.6;
}
</style>
