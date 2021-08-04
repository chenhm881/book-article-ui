<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Files directory">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { Moment } from 'moment';
import {defineComponent, reactive, ref, toRaw, UnwrapRef} from 'vue';
import {Input, Form, Button, FormItem} from "ant-design-vue";
import axios from "axios";

interface FormState {
  name: string;
  region: string | undefined;
  date1: Moment | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
export default defineComponent({
  name: 'AddFiles',
  components: {
    'a-input': Input,
    'a-form': Form,
    'a-button': Button,
    'a-form-item': FormItem,
  },
  setup() {
    let info = ref("");
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
      axios
          .post('https://api.coindesk.com/v1/bpi/currentprice.json',
              toRaw(formState),
              {timeout: 86400000, headers: {
                'Content-type': "application/json",
                  "dataType": "json",
              }})
          .then((response: any) => {
             alert(JSON.stringify(response));
          })
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      info
    };
  },
});
</script>

