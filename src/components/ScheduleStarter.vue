<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="生效日期" v-bind="validateInfos.dates">
      <a-range-picker v-model:value="modelRef.dates" />
    </a-form-item>
    <a-form-item label="星期" v-bind="validateInfos.days">
      <a-select
          mode="multiple"
          v-model:value="modelRef.days"
          placeholder="please select your zone"
          :options="weeklyOptions"
      >
      </a-select>
    </a-form-item>
    <a-form-item label="小时" v-bind="validateInfos.hours">
      <a-select
          mode="multiple"
          v-model:value="modelRef.hours"
          placeholder="please select your zone"
          :options="hoursOptions"
      >
      </a-select>
    </a-form-item>
    <a-form-item label="是否启用" v-bind="validateInfos.enable">
      <a-checkbox v-model:checked="modelRef.enable"></a-checkbox>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {
  Button,
  Checkbox,
  Form,
  FormItem,
  RangePicker,
  Select
} from 'ant-design-vue';
import {Moment} from "moment";
import moment from 'moment';
import {weeklyOptions, hoursOptions} from "@/const/schedule";
import instance from "@/ajax/interceptors";

const useForm = Form.useForm;
export default defineComponent({
  components: {
    'a-form': Form,
    'a-button': Button,
    'a-form-item': FormItem,
    'a-range-picker': RangePicker,
    'a-checkbox': Checkbox,
    'a-select': Select,
  },
  setup() {

    const modelRef = reactive({
      days: new Array(),
      hours: new Array(),
      enable: ref(false),
      dates: ref<Moment[]>([]),
    });
    const rulesRef = reactive({
      dates: [
        {
          required: true,
          message: 'Please select dates',
        },
      ],
      days: [
        {
          required: true,
          message: 'Please select weekly day',
        },
      ],
      hours: [
        {
          required: true,
          message: 'Please select hour',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
    onMounted( () => {
      instance
          .post('http://localhost:8183/api/findWorkflowSettings',
              JSON.stringify({
                projectId: 1,
                workflowId: 1
              }),
              {timeout: 86400000, headers: {
                  'Content-type': "application/json",
                  "dataType": "json",
                }})
          .then((response: any) => {
            modelRef.hours = response.data.hours.split(',');
            modelRef.enable = response.data.enable;
            modelRef.days = response.data.days.split(',');
            modelRef.dates = [moment( response.data.start), moment(response.data.end)]
            alert(JSON.stringify(response));
          }).catch((error) => {
        alert(error.response);
      })
    })

    const onSubmit = () => {
      validate()
          .then(() => {
            instance
                .post('http://localhost:8183/api/updateWorkflowSettings',
                    JSON.stringify({
                      projectId: 1,
                      workflowId: 1,
                      start: moment(modelRef.dates[0]).format("YYYY-MM-DD HH:mm:ss"),
                      end: moment(modelRef.dates[1]).format("YYYY-MM-DD HH:mm:ss"),
                      enable: modelRef.enable,
                      days: modelRef.days.join(","),
                      hours: modelRef.hours.join(","),
                      updatedBy: "chenhm881"
                    }),
                    {timeout: 86400000, headers: {
                        'Content-type': "application/x-www-form-urlencoded",
                        "dataType": "json",
                      }})
                .then((response: any) => {
                  alert(JSON.stringify(response));
                }).catch((error) => {
              alert(error.response);
            })
          })
          .catch(err => {
            console.log('error', err);
          });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      weeklyOptions,
      hoursOptions
    };
  },
});
</script>
