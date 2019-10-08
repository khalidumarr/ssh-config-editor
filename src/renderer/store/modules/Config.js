/*eslint-disable */
const state = {
  dialog: false,
  items: {
    'general': [
      {
        key: "TCPKeepAlive",
        value: "yes"
      },
      {
        key: "ServerAliveInterval",
        value: "20"
      },
      {
        key: "ServerAliveCountMax",
        value: "5"
      }
    ],
    'specific' : [
      {        
        title: 'Host jobs-dev-*',
        label: 'local',
        items: [
          {
            key: "User",
            value: "ubuntu"
          },
          {
            key: "RemoteForward",
            value: "52698 localhost:52698"
          },
          {
            key: "HostName",
            value: "192.168.50.5"
          }
        ]
      },
      {        
        title: 'Host jobs-devs-*',
        label: 'local',
        items: [
          {
            key: "IdentityFile",
            value: "~/.ssh/id_rsa"
          },
          {
            key: "HostName",
            value: "62.210.104.13"
          }
        ]
      },
    ]          
  }
};

const mutations = {
  ADD_GENERAL_CONFIG(state, config) {
    state.items.general.push(config)
  },
  REMOVE_GENERAL_CONFIG(state, data) {       
    state.items.general.splice(data.index, 1)    
  },
  UPDATE_GENERAL_CONFIG(state, data) {        
    state.items.general[data.index].value = data.value
  },
  ADD_HOST(state, host) {
    state.items.specific.push(host)
  },
  REMOVE_HOST(state, indexToRemove) {
    var index = state.items.specific.indexOf(indexToRemove)
    if (index > -1) {
      state.items.specific = state.items.specific.splice(index, 1)
    }
  },
  UPDATE_HOST(state, index, value) {
    state.items.specific[index] = value
  },
  ADD_HOST_CONFIG(state, data) {
    state.items.specific[data.mainIndex]['items'].push({ key: data.key, value: data.value})
  },
  REMOVE_HOST_CONFIG(state, data) {        
    state.items.specific[data.mainIndex]['items'].splice(data.specificIndex, 1)    
    state.items.specific[data.mainIndex]['items'] = state.items.specific[data.mainIndex]['items']
  },
  UPDATE_HOST_CONFIG(state, data) {    
    state.items.specific[data.mainIndex]['items'][data.specificIndex]['value'] = data.value
  }
};

const actions = {
  addGeneralConfig({ commit, state }, data) {
    return new Promise((resolve, reject) => {      
      commit('ADD_GENERAL_CONFIG', data);
      resolve()
    });        
  },
  removeGeneralConfig({ commit, state }, data) {
    return new Promise((resolve, reject) => {      
      commit('REMOVE_GENERAL_CONFIG', data);
      resolve()
    });            
  },
  updateGeneralConfig({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_GENERAL_CONFIG', data);
      resolve()
    });    
  },
  addHost({ commit, state }, data) {
    // do something async
    commit('ADD_HOST');
  },
  removeHost({ commit, state }, data) {
    // do something async
    commit('REMOVE_HOST');
  },
  updateHost({ commit, state }, data) {
    // do something async
    commit('UPDATE_HOST');
  },
  addHostConfig({ commit, state }, data) {    
    return new Promise((resolve, reject) => {      
      commit('ADD_HOST_CONFIG', data);
      resolve()
    });    
  },
  removeHostConfig({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_HOST_CONFIG', data);
      resolve()
    });    
  },
  updateHostConfig({ commit, state }, data) {
    return new Promise((resolve, reject) => {    
      commit('UPDATE_HOST_CONFIG', data);
      resolve()
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
