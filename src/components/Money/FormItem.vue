<template>
  <label class="formItem">
    <span class="name">{{ this.fieldName }}</span>
    <input :type="type||'text'" :placeholder="placeholder" @input="onValueChanged($event.target.value)" :value="

type==='date'?formatDate(value):value">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import {Component, Watch, Prop} from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) readonly fieldName!: string;
  @Prop(String) placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }

  formatDate(date: string) {
    return dayjs(date).format('YYYY-MM-DD')
  }

}

</script>

<style lang="scss" scoped>
.formItem {


  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 16px;

  > input {
    border: none;
    height: 40px;
    margin-left: 10px;
    background-color: inherit;
    flex-grow: 1;
    padding-right: 16px;
  }

  .name {
    padding-right: 16px;

  }
}
</style>
