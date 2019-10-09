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
                  <li v-for="(item, index) in data.items.general">
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>{{ item.key }}</v-subheader>
                    </v-flex>
                    <v-flex xs7>
                      <v-text-field
                        @input="generalChangeHandler($event, index)"                        
                        :value="item.value"
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm1>
                      <v-btn 
                        icon
                        ripple
                        @click="generalDeleteHandler($event, index)"
                      >
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
                <v-card-title class="headline">Add New Specific Host</v-card-title>
                <v-card-text>                  
                  <v-text-field
                    v-model="toAddTitle"
                    label="Title"                    
                  ></v-text-field>
                  <v-text-field
                    v-model="toAddLabel"
                    label="Label"                    
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" flat @click="resetDialog">Cancel</v-btn>                  
                  <v-btn v-if="dialogMode == 'add'" color="green darken-1" flat @click="specificAddHandler">Add</v-btn>
                  <v-btn v-if="dialogMode == 'edit'" color="green darken-1" flat @click="specificChangeHandler">Save</v-btn>
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
              <v-btn icon ripple @click="specificChangeLoader($event, index)">
                <v-icon color="primary lighten-1">edit</v-icon>
              </v-btn>              
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="red lighten-1" @click="specificDeleteHandler($event, index)">delete</v-icon>
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
        this.$store.dispatch("addGeneralConfig", {key: this.toAddKey, value: this.toAddValue})
        this.resetDialog()
      },
      generalChangeHandler(value, index) {
        this.$store.dispatch("updateGeneralConfig", {index: index, value: value})        
      },
      generalDeleteHandler(value, index) {
        this.$store.dispatch("removeGeneralConfig", {index: index})
      },
      specificChangeLoader(value, index) {        
        this.specificDialog = true
        this.dialogMode = "edit"

        var toChange = this.data.items.specific[index]
        this.toAddTitle = toChange.title
        this.toAddLabel = toChange.label
        this.toChangeIndex = index
      },
      specificChangeHandler() {        
        this.$store.dispatch("updateSpecificConfig", {index: this.toChangeIndex, title: this.toAddTitle, label: this.toAddLabel})
        this.resetDialog()
      },
      specificAddHandler() {        
        this.$store.dispatch("addSpecificConfig", {title: this.toAddTitle, label: this.toAddLabel})
        this.resetDialog()
      },      
      specificDeleteHandler(value, index) {
        this.$store.dispatch("removeSpecificConfig", {index: index})
      },
      
      resetDialog() {
        this.generalDialog = false
        this.specificDialog = false
        this.toAddKey = ''
        this.toAddTitle = ''
        this.toAddValue = ''
        this.toAddLabel = ''
        this.dialogMode = 'add'
        this.toChangeIndex = null
      }
    },
    data() {      
      return {
        generalDialog: false,
        specificDialog: false,
        dialogMode: 'add',
        toAddLabel: '',
        toAddKey: '',
        toAddTitle: '',
        toAddValue: '',
        toChangeIndex: null,
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