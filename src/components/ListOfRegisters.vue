<template>
  <div class="container">
    <header>
      <h1>Lista de Cadastrados</h1>

      <router-link to="/"
                  class="list-link">
        Voltar para pagina de cadastro
      </router-link>
    </header>    

    <input type="search" 
           class="search" 
           placeholder="Pesquisar"
           v-model="searchValue"
           @input="filterPerson()">

    <modal :showModal="true" 
           :formData="currentData"
           :personIndex="personIndex"/>

  <h3 v-if="listWithFilter.length == 0">Nenhum cadastro até o momento...</h3>
  <transition-group v-else name="fade" class="person-list">

    <div class="person"
         v-for="(person, index) 
         in listWithFilter" 
         :key="index">
         
      <span class="person-remove"
            @click="removePerson(index)"> 
        <img src="../assets/trash.png" alt="Remove">
      </span>

      <img src="../assets/user.png" alt="User">
      <span>
        <strong>Nome:</strong> {{ person.name }}
      </span>

      <span>
        <strong>E-mail:</strong>
        {{ person.email }}
      </span>

      <span>
        <strong>CPF:</strong>
        {{ person.cpf }}
      </span>

      <span>
        <strong>Telefone:</strong>
        {{ person.phone }}
      </span>

      <btn type="btn-sucess"
           @click.native="editPerson(index)">
        Editar
      </btn>
    </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Btn from '@/components/Btn';
import Modal from '@/components/Modal';
export default {
  components: {
    Btn,
    Modal
  },

  data() {
    return {
      listOfPersons: [],
      listWithFilter: [],
      searchValue: '',
      currentData: {},
      personIndex: null
    };
  },

  mounted() {
    this.listOfPersons = JSON.parse(localStorage.getItem('listOfRegister'));
    this.listWithFilter = this.listOfPersons;
  },

  methods: {
    ...mapActions(['changeModalState']),

    editPerson(index) {
      this.personIndex = index;
      this.currentData = this.listOfPersons[index];
      this.changeModalState();
    },

    removePerson(index) {
      this.listOfPersons.splice(index, 1);

      let storage = JSON.stringify(this.listOfPersons);

      localStorage.setItem('listOfRegister', storage);
    },

    hasOnList(person) {
      let regexList = new RegExp(this.searchValue, 'gi');
      return regexList.test(person);
    },

    filterPerson() {
      this.listWithFilter = this.listOfPersons.filter(person =>
        this.hasOnList(person.name)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  header {
    display: flex;
    flex-direction: column;

    @media (min-width: 605px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

.person-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 605px) {
    justify-content: space-between;
  }
}

.person {
  width: 300px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(#333, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  position: relative;

  span {
    margin: 0.25rem 0;
  }

  &-remove {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.3;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  button {
    max-width: 150px;
  }
}

.search {
  width: 100%;
  color: #333333;
  padding: 1rem;
  margin: 1rem 0;
  border: 0;
  border-bottom: 2px solid #00c8b3;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #333;
  }
}
</style>

