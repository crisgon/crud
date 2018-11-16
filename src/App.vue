<template>
  <div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import 'https://fonts.googleapis.com/css?family=Roboto';

* {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #ecf0f1;
}

a {
  color: #00c8b3;
  padding: 1rem 0;
  text-decoration: none;
}

.form {
  width: 70%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(#333, 0.1);
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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
  top: 5px;
  transition: all 0.2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>