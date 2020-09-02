import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

Vue.use(Vuetify);

const opts = {
    theme: {
        // dark: true,
    },
};

export default new Vuetify(opts);