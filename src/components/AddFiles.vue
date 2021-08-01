<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the <Button></Button>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <a-input v-model:value="value" placeholder="Basic usage" />
  </div>
</template>

<script>
import axios from "axios";
import  { Button, Input } from 'ant-design-vue';
import  { ref } from 'vue';
import 'ant-design-vue/dist/antd.css';


export default {
  setup() {
    const value = ref('');
    return {
      value,
      checked: ref(false),
    };
  },
  name: 'AddFiles',
  components: {
    Button,
    'a-input': Input,
  },
  props: {
    msg: String
  },
  data: () => ({
    loading: true,
    form: {
      location: ''
    },
    rules: {
      location: [
        { required: true, message: 'Please enter location', trigger: 'blur' }
      ]
    }
  }),

  methods: {
    onSubmit() {
          axios.post(
              'https://engineermc$env$.oneforma.com:8080/api/scanningOnDemand',
              JSON.stringify({
                projectId: 11,
                location: this.form.location
              }),
              {timeout: 86400000, headers: {'Content-type': "application/json", "dataType": "json"}}
          ).then(response => {
            this.loading = response;
          }).catch(error => {
            if (axios.isCancel(error)) {
              console.log("Request cancelled. Error: ", error.message);
            } else {
              console.log("Response failure. Error: " + error);
            }
          })
        }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
