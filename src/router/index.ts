import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Bill from '@/views/Bill.vue'
import Notfound from '@/views/Notfound.vue'
import EditLabel from '@/views/EditLabel.vue'
import Record from "@/views/Record.vue";
import Statistics from  "@/views/Statistics.vue"
Vue.use(VueRouter);

const routes = [
    {

        path: '/',
        redirect: '/money'
    },
    {
        path: '/money',
        component: Money
    },
    {
        path: '/labels',
        component: Labels
    },
    {
        path: '/bill',
        component: Bill
    }, {
        path: '/labels/edit/:id',
        component: EditLabel
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/records',
        component: Record
    },
    {
        path: '*',
        component: Notfound
    }
];

const router = new VueRouter({
    routes
});

export default router
