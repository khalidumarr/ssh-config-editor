<template>
  <v-layout row>
    <v-flex xs24>
      <v-card>        
        <v-toolbar color="teal" dark>          
          <v-toolbar-title>
            SSH Config Editor
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">                
                <v-btn icon ripple color="teal" dark v-on="on">
                  <v-icon color="white lighten-1">sync</v-icon>
                </v-btn>
              </template>
              <span>Save Config</span>
            </v-tooltip>
          </v-toolbar-title>
          <v-spacer></v-spacer>          
        </v-toolbar>

        <v-btn icon ripple to="/">
          <v-icon color="primary lighten-1">navigate_before</v-icon>
        </v-btn>
        
        <v-list two-line subheader>
          <v-layout align-center wrap justify-center row fill-height>
            <v-flex sm6>
              <ul style="list-style: none">
                <li v-for="(item, index) in host.items">
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>{{ item.key }}</v-subheader>
                    </v-flex>
                    <v-flex xs7>
                      <v-text-field
                        @input="changeHandler($event, index)"
                        :value="item.value"
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm1>
                      <v-btn 
                        icon 
                        ripple
                        @click="deleteHandler($event, index)"
                      >
                        <v-icon color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>                                    
                </li>
              </ul>  

              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn ripple color="teal" dark v-on="on">
                    <v-icon color="white lighten-1">add</v-icon> Add More Configs
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Add New Config to Host</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="toAddKey"                      
                      label="Key"                    
                    ></v-text-field>
                    <v-text-field
                      v-model="toAddValue"
                      label="Value"                    
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat @click="addHandler">Add</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>            
            </v-flex>
          </v-layout> 
        </v-list>

      </v-card>      
    </v-flex>
  </v-layout>    
</template>

<script>
  import Vue from 'vue';
  import store from '@/store';

  export default {    
    created() {      
      // load from store here
      // store item in computed properties
    },
    onChange() {
      // on change store the changes to main configs array with the key
    },    
    addConfig() {
      // append configs[index] to accomodate this new item
      // changes will be automatically populated because items array is already iterated
      // make new component from head and store sync functionality within that component
    },
    methods: {
      deleteHandler(value, index) {        
        this.$store.dispatch("removeHostConfig", {mainIndex: this.$route.params.id, specificIndex: index})
      },
      changeHandler(value, index) {  
        this.$store.dispatch("updateHostConfig", {mainIndex: this.$route.params.id, specificIndex: index, value: value})
      },
      addHandler() {
        this.$store.dispatch("addHostConfig", {mainIndex: this.$route.params.id, key: this.toAddKey, value: this.toAddValue})        
        this.dialog = false
        this.toAddKey = ''
        this.toAddValue = ''
      }
    },
    data() {      
      return {
        dialog: false,
        toAddKey: '',
        toAddValue: '',
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,        
        host: this.$store.state.Config['items']['specific'][this.$route.params.id]        
      };
    },
  };
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
