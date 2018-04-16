import Home from './components/Home.vue';

// import User from './components/user/User.vue';
const User = resolve => {
    require.ensure([
        './components/user/User.vue'
    ], () => {
        resolve(require('./components/user/User.vue'));
    }, 'user');
};

// import UserStart from './components/user/UserStart.vue';
const UserStart = resolve => {
    require.ensure([
        './components/user/UserStart.vue'
    ], () => {
        resolve(require('./components/user/UserStart.vue'));
    }, 'user');
};

// import UserEdit from './components/user/UserEdit.vue';
const UserEdit = resolve => {
    require.ensure([
        './components/user/UserEdit.vue'
    ], () => {
        resolve(require('./components/user/UserEdit.vue'));
    }, 'user');
};

// import UserDetail from './components/user/UserDetail.vue';
const UserDetail = resolve => {
    require.ensure([
        './components/user/UserDetail.vue'
    ], () => {
        resolve(require('./components/user/UserDetail.vue'));
    }, 'user');
};

export const routes = [
    { path: '', component: Home, name: 'home' }, 
    { path: '/user', component: User, children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail, props: true },
        { path: ':id/edit', component: UserEdit, name: 'userEdit'}
    ], props: true }
];