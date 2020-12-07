<template>
    <b-container class="my-4">
        <b-card>
            <formulate-form @submit="send()">
                <b-form-group :label="$t('name')">
                    <b-form-input type="text" v-model="name" required />
                </b-form-group>
                <b-row class="pb-2 border-bottom border-bpi-blue">
                    <b-col v-for="(i, k) in first" :key="k" :cols="k === 0 ? 4 : 2">
                        <b-form-checkbox
                            v-if="k !== 0"
                            v-model="check[i]"
                            :value="true"
                            :unchecked-value="false"
                            @change="checkbox(i, $event)"
                        >
                            <strong class="text-capitalize">{{ i }}</strong>
                        </b-form-checkbox>
                        <strong v-else class="text-capitalize">{{ i }}</strong>
                    </b-col>
                </b-row>
                <b-row
                    v-for="(i, k) in arrange"
                    :key="k"
                    class="py-2"
                    :style="k % 2 ? '' : 'background-color: rgba(0, 0, 0, 0.05)'"
                >
                    <b-col cols="4" class="text-capitalize">
                        <b-form-checkbox
                            :value="true"
                            :unchecked-value="false"
                            @change="checkbox(i.permission, $event)"
                        >
                            <span class="text-capitalize">{{ i.permission.replace(/-/g, ' ') }}</span>
                        </b-form-checkbox>
                    </b-col>
                    <b-col v-for="(j, kk) in arr" :key="kk" cols="2">
                        <b-form-checkbox
                            v-if="find(i.status, j).length && j === find(i.status, j)[0].name"
                            v-model="find(i.status, j)[0].bool"
                            :value="true"
                            :unchecked-value="false"
                            :disabled="j !== 'show' && find(i.status, 'show')[0].bool === false"
                            @change="checkbox(`${i.permission}.${j}`, $event, true)"
                        />
                    </b-col>
                </b-row>
                <formulate-input
                    class="mt-2"
                    :label="$t($route.params.id ? 'update' : 'submit')"
                    type="submit"
                    :disabled="clicked"
                >
                    <b-spinner v-if="clicked" variant="primary" small />
                </formulate-input>
            </formulate-form>
        </b-card>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        data: [],
        ready: false,
        arr: ['show', 'create', 'update', 'delete'],
        first: ['permission', 'show', 'create', 'update', 'delete'],
        check: {
            show: false,
            create: false,
            update: false,
            delete: false
        },
        name: '',
        clicked: false
    }),
    mounted(){
        if(this.$route.params.id){
            if(this.$route.params.id != 1 && this.access['role.update'])
                this.render('edit/' + this.$route.params.id)
            else this.$router.push('/404')
        }else{
            if(this.access['role.create'])
                this.render('create')
            else this.$router.push('/404')
        }
    },
    methods: {
        render(target){
            axios.get('admin/role/' + target)
                .then(r => {
                    if(r.data.perm.length){
                        if(r.data.name)
                            this.name = r.data.name
                        this.data = r.data.perm
                        this.ready = true
                    }else this.$router.push('/404')
                })
        },
        s(str){
            return str.split('.') 
        },
        find(arr, str){
            return arr.filter(i => i.name === str)
        },
        checkbox(name, e = null, bool = false){
            this.data.forEach((i, k) => {
                const p = this.s(i.permission)

                if(bool){
                    if(p[0] + '.show' === name && e === false)
                        Object.keys(this.check).forEach(j => {
                            try{
                                let a = this.data.filter(z => z.permission === `${p[0]}.${j}`)[0]

                                a.status = e
                            }catch(e){}
                        })
                    else if(i.permission === name) i.status = e
                }else if(name === 'show'){
                    if(e === false) i.status = e
                    else i.status = i.permission === `${p[0]}.${name}` ? !this.check[name] : i.status
                }else if(i.permission === `${p[0]}.${name}` || i.permission === `${name}.${p[1]}`){
                    if(p[0] === name) i.status = e
                    else{
                        if(this.data.filter(z => z.permission === `${p[0]}.show`)[0].status)
                            i.status = !this.check[name]
                    }
                }
            })
        },
        send(){
            let check = []

            this.data.forEach(i => i.status == 1 && check.push(69))

            if(check.length > 0){
                this.clicked = true
    
                axios.post(`admin/role/${this.$route.params.id ? 'update/' + this.$route.params.id : 'store'}`, {
                    name: this.name,
                    list: this.data
                })
                .then(() => {
                    this.clicked = false
                    this.$router.push('/admin/user-management/role')
                })
                .catch(e => {
                    this.catchErr(e)
                    this.clicked = false
                })
            }else this.$store.dispatch('alert/set', {
                toast: this.$bvToast,
                title: this.$t('errors.error'),
                text: 'Check the field permission at least 1.',
                color: 'danger'
            })
        }
    },
    computed: {
        ...mapGetters(['access']),
        arrange(){
            let a = [],
                b = [],
                temp = ''

            this.data.forEach(i => {
                const p = this.s(i.permission)[0]

                if(p === 'audits'){
                    a.push({
                        permission: 'meta-tags',
                        status: b
                    })
                    a.push({
                        permission: 'audits',
                        status: [
                            { name: 'show', bool: i.status ? true : false }
                        ]
                    })
                }
                else if((temp !== '' && temp !== p)){
                    a.push({
                        permission: temp,
                        status: b
                    })
                    b = []
                }

                temp = p === temp ? temp : p

                this.arr.forEach(j => i.permission === `${temp}.${j}` && b.push({
                        name: j,
                        bool: i.status ? true : false,
                    })
                )
            })

            return a
        }
    }
}
</script>
