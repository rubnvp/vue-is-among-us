<template>
  <div class="nice-checkbox">
    <input
      :id="`checkbox-${uid}`"
      type="checkbox"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="proxyChecked"
    />
    <label :for="`checkbox-${uid}`">
      <i v-if="color" class="material-icons" :style="{color: color}">lens</i>
      <span class="label-title">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'NiceCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'update',
  },
  props: {
    checked: {
      type: [Boolean, Array],
      default: false,
    },
    value: {
      default: null,
    },
    color: {
      type: String,
    },
    label: {
      type: [String, Number],
      default: '',
    },
  },
  data: ()=>({
    uid: Math.random().toString(36).substr(2, 9),
  }),
  computed: {
    proxyChecked: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit('update', val);
      },
    },
  },
}
</script>

<style lang="scss">
  .nice-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    margin: 16px 0;
    text-align: left;

    label {
      display: flex;
      align-items: center;
      cursor: pointer;
      text-transform: capitalize;

      &:before,
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
      }

      &:before {
        width: 20px;
        height: 20px;
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.54);
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.3s;
      }

      .label-title {
        margin: 0px 5px;
      }
    }

    input[type="checkbox"] {
      outline: 0;
      margin-right: 10px;
      visibility: hidden;

      &:checked + label:before {
        background: #4caf50;
        border: none;
      }

      &:checked + label:after {
        transform: rotate(-45deg);
        top: 5px;
        left: 4px;
        width: 12px;
        height: 6px;
        border: 2px solid #fff;
        border-top-style: none;
        border-right-style: none;
      }

      &:disabled + label:before {
        border-color: rgba(0, 0, 0, 0.26);
      }

      &:disabled:checked + label:before {
        background: rgba(0, 0, 0, 0.26);
      }
    }
  }
</style>
