<template>
  <div class="nice-input">
    <input
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="focus-border"><i></i></span>
  </div>
</template>

<script>
export default {
  name: 'NiceInput',
  inheritAttrs: false,
  props: ['modelValue'],
}
</script>

<style lang="scss">
.nice-input {
  position: relative;
  input{
    font: 15px/24px 'Muli', sans-serif;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
  }
  input{border: 4px solid #ccc; padding: 7px 14px 9px; transition: 0.4s;}
  input ~ .focus-border:before,
  input ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 4px; background-color: #42D843; transition: 0.3s;}
  input ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
  input ~ .focus-border i:before,
  input ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 0; background-color: #42D843; transition: 0.4s;}
  input ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
  input:focus ~ .focus-border:before,
  input:focus ~ .focus-border:after{width: 100%; transition: 0.3s;}
  input:focus ~ .focus-border i:before,
  input:focus ~ .focus-border i:after{height: 100%; transition: 0.4s;}
}
</style>
