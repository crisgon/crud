<template>
  <div class="form-group">
    <input :type="type" 
          class="input"
          :class="{'input-error': hasError}"
          :id="inputName">

    <label :for="inputName"
           class="input-label">
      {{ text }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['type', 'text', 'hasError', 'inputName', 'valor']
};
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;
  position: relative;
}

.input {
  width: 100%;
  color: #333333;
  padding: 0.5rem 0;
  margin: 1rem 0;
  border: 0;
  border-bottom: 1px solid #efeeed;
  outline: none;

  &:focus {
    border-color: #333;

    + label {
      font-size: 0.8rem;
      color: #333;
      top: 0px;
    }
  }
}

.input-error {
  &:focus {
    border-color: #eb4a46;
  }
}

label {
  color: #efeeed;
  position: absolute;
  top: 10px;
  transition: all 0.2s;
}
</style>
