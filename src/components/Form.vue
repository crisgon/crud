<template>
  <div class="form">
    <router-link to="/list-of-registers"
                 class="list-link">
      Lista de Pessoas Registradas
    </router-link>

    <h2 v-show="message">Cadastro realizado com sucesso!!</h2>

    <div class="form-group"
         v-for="input in getFormInputs" :key="input.name">
        <input :type="input.type" 
              class="input"
              :class="{'input-error': input.hasError}"
              :id="input.name"
              v-model="formData[input.name]">

        <label :for="input.name"
              class="input-label">
          {{ input.text }}
        </label>

        <span class="error">{{ listOfErros[input.name] }}</span>
    </div>

    <btn :isLoader="isLoader"
         type="btn-sucess"
         @click.native="registerPerson()"
         >
      Cadastrar
    </btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Btn from '@/components/Btn';
import InputForm from '@/components/InputForm';
export default {
  name: 'Form',
  components: {
    Btn,
    InputForm
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        cpf: '',
        phone: ''
      },

      listOfRegister: [],

      listOfErros: {},

      isLoader: false,
      message: false
    };
  },

  computed: {
    ...mapGetters(['getFormInputs', 'getDefaultData'])
  },

  mounted() {
    if (!localStorage.getItem('listOfRegister')) {
      localStorage.setItem(
        'listOfRegister',
        JSON.stringify(this.getDefaultData)
      );
    }
  },

  methods: {
    formValidate() {
      let regex = {
        email: /\S+@\S+\.\S+/,
        cpf: /\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/,
        phone: /\(?\d{2}\)?\d+\-?\d+/
      };

      if (this.formData.name.length < 3) {
        this.listOfErros.name = 'Campo deve conter 3 caracteres ou mais';
      }

      if (!regex.email.test(this.formData.email)) {
        this.listOfErros.email = 'Digite um email válido';
      }

      if (!regex.cpf.test(this.formData.cpf)) {
        this.listOfErros.cpf = 'Digite um cpf válido';
      }

      if (!regex.phone.test(this.formData.phone)) {
        this.listOfErros.phone = 'Digite um telefone válido';
      }
    },

    async registerPerson() {
      this.isLoader = true;

      this.formValidate();

      if (Object.keys(this.listOfErros).length != 0) {
        return (this.isLoader = false);
      }

      let storage = JSON.parse(localStorage.listOfRegister);

      await storage.push(this.formData);
      storage = JSON.stringify(storage);

      localStorage.setItem('listOfRegister', storage);

      Object.keys(this.formData).forEach(item => {
        this.formData[item] = '';
      });

      setTimeout(() => (this.isLoader = false), 500);

      this.message = true;

      setTimeout(() => (this.message = false), 2000);
    }
  }
};
</script>


<style lang="scss" scoped>
.error {
  font-size: 0.8rem;
  color: #eb4a46;
  position: relative;
  top: -15px;
}

.list-link {
  position: absolute;
  top: -50px;
  left: 5px;
}

h2 {
  padding: 1rem 0;
}
</style>