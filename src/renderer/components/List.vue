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
        <v-list two-line subheader>
          <v-subheader inset>
            General
            <v-dialog v-model="generalDialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn icon ripple color="teal" dark v-on="on">
                  <v-icon color="white lighten-1">add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Add New General Config</v-card-title>
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
                  <v-btn color="red darken-1" flat @click="resetDialog">Cancel</v-btn>
                  <v-btn color="green darken-1" flat @click="generalAddHandler">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-subheader>

          <v-layout align-center wrap justify-center row fill-height>
            <v-flex sm6>
              <ul style="list-style: none">
                <li v-for="item in data.items.general">
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>{{ item.key }}</v-subheader>
                    </v-flex>
                    <v-flex xs7>
                      <v-text-field
                        v-model="item.value"
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm1>
                      <v-btn icon ripple>
                        <v-icon color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>                                    
                </li>
              </ul>   
              
            </v-flex>
          </v-layout>             
        </v-list>        

        <hr>

        <v-list two-line subheader>
          <v-subheader inset>
            Specific            
            <v-dialog v-model="specificDialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn icon ripple color="teal" dark v-on="on">
                  <v-icon color="white lighten-1">add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Add New Host</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="toAddKey"                      
                    label="Key"                    
                  ></v-text-field>
                  <v-text-field
                    v-model="toAddValue"
                    label="Value"                    
                  ></v-text-field>
                  <v-text-field
                    v-model="toAddLabel"
                    label="Label"                    
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" flat @click="resetDialog">Cancel</v-btn>
                  <v-btn color="green darken-1" flat @click="generalAddHandler">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
          </v-subheader>

          <v-list-tile
            v-for="(item, index) in data.items.specific"
            :key="item.title"
            avatar
            @click=""            
          >               
            <v-list-tile-avatar class="ml-5">
              <template>
                <v-chip color="teal lighten-3" text-color="white">{{item.label}}</v-chip>              
              </template>              
            </v-list-tile-avatar>            

            <v-list-tile-content class="ml-5" :to="'/detail/' + index">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple :to="'/detail/' + index">
                <v-icon color="primary lighten-1">visibility</v-icon>
              </v-btn>              
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple @click="dialog = true">
                <v-icon color="primary lighten-1">edit</v-icon>
              </v-btn>              
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="red lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
            
          </v-list-tile>
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
      generalAddHandler() {
        this.$store.dispatch("addHostConfig", {mainIndex: this.$route.params.id, key: this.toAddKey, value: this.toAddValue})                
      },
      generalChangeHandler() {},
      generalDeleteHandler() {},
      specificAddHandler() {},
      specificChangeHandler() {},
      specificDeleteHandler() {},

      deleteHandler(value, index) {        
        this.$store.dispatch("removeHostConfig", {mainIndex: this.$route.params.id, specificIndex: index})
      },
      changeHandler(value, index) {  
        this.$store.dispatch("updateHostConfig", {mainIndex: this.$route.params.id, specificIndex: index, value: value})
      },
      addHandler() {
        this.$store.dispatch("addHostConfig", {mainIndex: this.$route.params.id, key: this.toAddKey, value: this.toAddValue})        
        this.dialog = false        
      },
      resetDialog() {
        this.generalDialog = false
        this.specificDialog = false
        this.toAddKey = ''
        this.toAddValue = ''
        this.toAddLabel = ''
      }
    },
    data() {      
      return {
        generalDialog: false,
        specificDialog: false,
        toAddLabel: '',
        toAddKey: '',
        toAddValue: '',
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,        
        data: this.$store.state.Config
      };
    },
  };
  
</script>