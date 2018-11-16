<template>
<transition name="fade">
  <div class="form modal" v-if="getModalState">
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

        <!-- <span class="error">{{ listOfErros[input.name] }}</span> -->
    </div>

    <div class="controls">
      <btn type="btn-sucess"
           :isLoader="isLoader" 
           @click.native="updateRegister()">
        Atualizar
      </btn>
      <btn type="btn-danger"
           @click.native="changeModalState()">
        Cancelar
      </btn>
    </div>
  </div>
</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Btn from '@/components/Btn';
export default {
  props: ['showModal', 'formData', 'personIndex'],
  components: {
    Btn
  },

  data() {
    return {
      isLoader: false
    };
  },

  computed: {
    ...mapGetters(['getModalState', 'getFormInputs'])
  },

  methods: {
    ...mapActions(['changeModalState']),

    updateRegister() {
      this.isLoader = true;
      let storage = JSON.parse(localStorage.listOfRegister);

      storage.splice(this.personIndex, 1, this.formData);
      storage = JSON.stringify(storage);

      localStorage.setItem('listOfRegister', storage);

      setTimeout(() => (this.isLoader = false), 500);

      this.changeModalState();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 2;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
}

.controls {
  display: flex;

  button {
    margin: 0.5rem;
  }
}
</style>

