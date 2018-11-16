<template>
  <button :class="['btn', type]">
    <img src="../assets/spinner.png" 
         alt="Spinner" 
         class="spinner"
         v-if="isLoader">
    <slot v-else/>
  </button>
</template>

<script>
export default {
  props: ['isLoader', 'type']
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  padding: 0.7rem 2rem;
  border: 0;
  border-radius: 30px;
  opacity: 1;
  transition: opacity 0.5 ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  &:disabled {
    background-color: #f6f6f6;
    color: #dddcdc;
  }

  &-sucess {
    background-color: #00c8b3;
  }

  &-danger {
    background-color: #eb4a46;
  }

  .spinner {
    max-width: 25px;
    animation: rotate infinite 0.5s;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

