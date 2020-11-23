<template>
    <div id="chart" ref="chart" style="width: 100%;height: 100%; overflow: hidden" />
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js'

export default {
    props: {
        obj: {
            type: Array,
            required: true
        },
        config: {
            type: Object,
            required: true
        },
        edit: {
            defalut: false,
            type: Boolean
        }
    },
    mounted(){
        this.oc(this.$refs.chart, this.obj)
    },
    methods: {
        oc(dom, obj){
            OrgChart.templates.rony = Object.assign({}, {
                ...OrgChart.templates.rony,
                size: [320, 150],
                field_0: '<text class="field_0" style="font-size: 18px;font-family: Poppins-medium" fill="#022c43" x="160" y="60" text-anchor="middle">{val}</text>',
                field_1: '<text class="field_1" style="font-size: 14px;font-family: Poppins-medium" fill="#eade28" x="160" y="40" text-anchor="middle">{val}</text>',
                field_2: '<text class="field_2" style="font-size: 14px;font-family: Poppins-medium" fill="#3490dc" x="160" y="80" text-anchor="middle">{val}</text>',
                node: '<rect x="0" y="0" height="150" width="320" fill="#f8fafc" stroke-width="0" rx="5" ry="5"></rect>',
                nodeMenuButton: '<g style="cursor:pointer;" transform="matrix(1,0,0,1,295,135)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#022c43"></circle><circle cx="7" cy="0" r="2" fill="#022c43"></circle><circle cx="14" cy="0" r="2" fill="#022c43"></circle></g>',
                minus: '<circle cx="15" cy="15" r="15" fill="#f8fafc" stroke="#022c43" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#022c43"></line>',
                plus: '<circle cx="15" cy="15" r="15" fill="#f8fafc" stroke="#022c43" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#022c43"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#022c43"></line>',
                link: '<path stroke="#022c43" stroke-width="1px" fill="none" link-id="[{id}][{child-id}]" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"></path>'
            })
            this.config.template = 'rony'
            this.config.nodes = obj

            if(this.edit)
                this.config.nodeMouseClick = OrgChart.action.edit

            this.chart = new OrgChart(dom, this.config)
        }
    }
}
</script>
