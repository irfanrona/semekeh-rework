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
                            v-if="i !== 'permission'"
                            v-model="check[i]"
                            :value="true"
                            :unchecked-value="false"
                            :disabled="i !== 'show' && disableCheck()"
                            @change="checkbox(i, $event)"
                        >
                            <strong class="text-capitalize">{{ i }}</strong>
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-else
                            :checked="checkPerm"
                            :value="true"
                            :unchecked-value="false"
                            @change="checkAll"
                        >
                            <strong class="text-capitalize">{{ i }}</strong>
                        </b-form-checkbox>
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
                            :checked="detectCheck(i.permission)"
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

            this.detectCheckk(name === 'show' /*&& e === false*/, e, this.s(name)[0])
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
        },
        detectCheck(type){
            return this.data.filter(i =>
                this.s(i.permission)[0] === type && i.status ? true : false
            ).length === this.data.filter(i => i.permission.match(new RegExp(type, 'g'))).length
        },
        detectCheckk(fromShow = false, e, name){
            const d = this.data,
                detect = t => d.filter(i =>
                    this.s(i.permission)[1] === t && i.status ? true : false
                ).length === d.filter(i =>
                    i.permission.match(new RegExp(t, 'g'))
                    && d.filter(j => {
                        const s = this.s(j.permission)

                        return t === 'show'
                            ? true
                            : s[0] === this.s(i.permission)[0] && s[1] === 'show' && j.status ? true : false
                    }).length
                ).length,
                length = this.data.filter(i => this.s(i.permission)[1] === 'show' && i.status ? true : false).length > 0,
                check = this.data.filter(k => this.s(k.permission)[0] === name)

            this.arr.forEach(i => {
                if(check.filter(k => this.s(k.permission)[1] === i).length > 0){
                    if(length)
                        this.check[i] = detect(i)
                    else this.check[i] = false
                }else if(fromShow)
                    this.check[i] = i !== 'show' && e ? !e : e
            })
        },
        disableCheck(){
            return this.data.filter(i =>
                i.permission.match(new RegExp('show', 'g')) && i.status ? true : false
            ).length === 0
        },
        checkAll(e){
            this.data = this.data.map(i => ({
                ...i,
                status: e
            }))
            this.arr.forEach(i => {
                this.check[i] = e
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
        },
        checkPerm(){
            return this.data.filter(i => i.status ? true : false).length === this.data.length
        }
    }
}
</script>
