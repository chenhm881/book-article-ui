import {ref} from "vue";
import {SelectTypes} from "ant-design-vue/lib/select";

export const weeklyOptions = ref<SelectTypes['options']>([
    {
        value: '1',
        label: 'Sunday',
    },
    {
        value: '2',
        label: 'Monday',
    },
    {
        value: '3',
        label: 'Tuesday',
        disabled: false,
    },
    {
        value: '4',
        label: 'Wednesday',
    },
    {
        value: '5',
        label: 'Thursday',
    },
    {
        value: '6',
        label: 'Friday',
    },
    {
        value: '7',
        label: 'Saturday',
    },
]);

export const hoursOptions = ref<SelectTypes['options']>([
    {
        value: '0',
        label: '0h',
    },
    {
        value: '1',
        label: '1h',
    },
    {
        value: '2',
        label: '2h',
    },
    {
        value: '3',
        label: '3h',
    },
    {
        value: '4',
        label: '4h',
    },
    {
        value: '5',
        label: '5h',
    },
    {
        value: '6',
        label: '6h',
    },
    {
        value: '7',
        label: '7h',
    },
    {
        value: '8',
        label: '8h',
    },
    {
        value: '9',
        label: '9h',
    },
    {
        value: '10',
        label: '10h',
    },
    {
        value: '11',
        label: '11h',
    },
    {
        value: '12',
        label: '12h',
    },
    {
        value: '13',
        label: '13h',
    },
    {
        value: '14',
        label: '14h',
    },
    {
        value: '15',
        label: '15h',
    },
    {
        value: '16',
        label: '16h',
    },
    {
        value: '17',
        label: '17h',
    },
    {
        value: '18',
        label: '18h',
    },
    {
        value: '19',
        label: '19h',
    },
    {
        value: '20',
        label: '20h',
    },
    {
        value: '21',
        label: '21h',
    },
    {
        value: '22',
        label: '22h',
    },
    {
        value: '23',
        label: '23h',
    },
]);
