<template>
    <div>
        <div class="iframe-limiter mb-4">
            <iframe
                class="iframe-location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.71869822923!2d107.6176261!3d-6.9241913!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62b720d1d17%3A0xe06423459ac57fad!2sJl.+Burangrang+No.8%2C+Burangrang%2C+Lengkong%2C+Kota+Bandung%2C+Jawa+Barat+40262!5e0!3m2!1sid!2sid!4v1480509908449"
                frameborder="0"
            ></iframe>
        </div>

        <b-container class="mb-4">
            <div class="mb-4">
                <h3 class="text-bpi-blue">Kontak kami</h3>
                <hr class="line" />
                <b-row>
                    <b-col v-for="(i, k) in footer" :key="k" sm="6" md="4" lg="3">
                        <dl>
                            <dt>{{ i.key }}</dt>
                            <dd>{{ i.value }}</dd>
                        </dl>
                    </b-col>
                </b-row>
            </div>
            <div class="mb-4">
                <h3 class="text-bpi-blue">Sosial Media</h3>
                <hr class="line" />
                <a
                    class="py-2 pr-2"
                    v-for="(i, k) in social"
                    :key="k"
                    :href="i.link"
                    target="_blank"
                    rel="noopener"
                >
                    <b-avatar size="3rem" variant="bpi-blue">
                        <fa class="text-white" :icon="['fab', i.icon]" size="lg" />
                    </b-avatar>
                </a>
            </div>
            <p>
                Dibuat dengan
                <span class="cursor-pointer" v-b-toggle.about-module>{{ ' &#x2764; ' }}</span> oleh
                <strong class="mb-4">{{ ' TIM' }} ICT SMK BPI</strong>
            </p>
            <b-collapse id="about-module" class="my-2 text-center">
                <a
                    href="https://laravel.com/docs/master/installation"
                    target="_blank"
                    rel="noopener"
                >
                    <svg
                        version="1.1"
                        viewBox="0 0 240 240"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                    >
                        <path
                            d="m211.34 68.408c0-.08846-.0885-.17693-.0885-.2654-.0885-.17693-.0885-.35387-.17695-.44234-.0885-.08846-.17693-.17693-.17693-.2654-.0885-.08846-.17695-.2654-.26542-.35387l-.26538-.26539c-.0885-.08846-.17694-.17693-.35386-.2654l-35.475-20.436c-.88466-.5308-2.0347-.5308-2.9194 0l-35.475 20.436c-.0885.08846-.17693.17693-.35389.2654l-.2654.26539c-.0885.08846-.17692.2654-.26539.35387-.0885.08846-.17692.17693-.17692.2654-.0885.17693-.17695.2654-.17695.44234 0 .08846-.0885.17693-.0885.2654-.0885.2654-.0885.5308-.0885.7962v38.748l-29.547 16.986v-75.905c0-.2654 0-.5308-.0884-.7962 0-.08846-.0885-.17693-.0885-.26539-.0885-.17693-.0885-.35387-.17694-.44234-.0885-.08846-.17694-.17693-.17694-.2654-.0884-.08846-.17693-.2654-.26539-.35387l-.26539-.2654c-.0885-.08846-.17695-.17693-.35389-.2654l-35.563-20.259c-.88466-.5308-2.0347-.5308-2.9194 0l-35.475 20.436c-.08846.08846-.17693.17693-.35387.2654l-.2654.2654c-.08846.08846-.17693.26539-.26539.35387-.08846.08846-.17693.17693-.17693.2654-.08846.17693-.17693.26539-.17693.44234 0 .08846-.08846.17693-.08846.2654-.08846.2654-.08846.5308-.08846.7962v121.37c0 1.0616.5308 2.0347 1.504 2.5655l70.862 40.783c.17692.0885.35386.17692.44232.17692.0884 0 .17694.0885.26541.0885.26539.0885.53079.0885.79619.0885s.5308 0 .7962-.0885c.0885 0 .0885-.0885.17695-.0885.17693-.0885.35385-.0885.53078-.17692l70.862-40.783c.88467-.5308 1.504-1.504 1.504-2.5655v-38.748l33.971-19.551c.88467-.53081 1.504-1.504 1.504-2.5656v-40.606c-.17693-.2654-.26539-.5308-.26539-.70773zm-109.25 98.642-29.459-16.72 30.963-17.87 33.971-19.551 29.547 16.985-21.674 12.385zm67.942-75.816v33.618l-12.385-7.1658-17.162-9.9084v-33.618l12.385 7.1658zm3.0078-39.102 29.547 16.985-29.547 16.985-29.547-16.985zm-91.032 86.078-12.385 7.1658v-74.224l17.162-9.9084 12.385-7.1658v74.135zm-15.305-106.16 29.547 16.985-29.547 17.074-29.547-16.985zm-32.555 22.117 12.385 7.1658 17.162 9.9084v79.266c0 .0885 0 .26541.08846.35388 0 .17693 0 .2654.08846.44232 0 .0885.08846.26541.17693.35388.08846.0885.08846.2654.17693.35387l.26539.26539c.08846.0885.17693.17694.2654.35387.08846.0885.17693.17693.26539.17693.08846.0885.17693.17693.35387.26539l33.794 19.109v33.971l-65.023-37.422zm135.89 114.57-65.023 37.422v-33.971l48.126-27.513 16.897-9.6433zm35.475-60.865-29.547 16.986v-33.618l17.162-9.9084 12.385-7.1658z"
                            style="fill:#ff5252;stroke-width:4.802;stroke:#ff5252"
                        />
                    </svg>
                </a>
                <a
                    href="https://v3.vuejs.org/guide/introduction.html"
                    target="_blank"
                    rel="noopener"
                >
                    <svg
                        version="1.1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                    >
                        <g transform="translate(2e-7 .16004)">
                            <path
                                d="m1.791 3.6914 10.209 17.619 10.209-17.533v-.085938h-3.9688l-6.1816 10.615-6.1523-10.615z"
                                style="fill:#41b883"
                            />
                            <path
                                d="m5.9072 3.6914 6.1521 10.617 6.1809-10.617h-3.7228l-2.4337 4.1783-2.4226-4.1783z"
                                style="fill:#35495e"
                            />
                        </g>
                    </svg>
                </a>
                <a
                    href="https://dev.to/practicalprogramming/advantages-of-document-markup-languages-vs-wysiwyg-editors-9f6"
                    target="_blank"
                    rel="noopener"
                >
                    <svg
                        version="1.1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                    >
                        <path
                            d="m2.25 15.75v-8h2l3 3 3-3h2v8h-2v-5.17l-3 3-3-3v5.17h-2m14-8h3v4h2.5l-4 4.5-4-4.5h2.5z"
                            fill="#42a5f5"
                        />
                    </svg>
                </a>
                <a
                    href="https://next.vuex.vuejs.org/installation.html"
                    target="_blank"
                    rel="noopener"
                >
                    <svg
                        fill="none"
                        version="1.1"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                    >
                        <g
                            transform="matrix(.8043 0 0 .8043 1.4852 1.5495)"
                            clip-path="url(#clip0)"
                        >
                            <g>
                                <path
                                    d="m.2 15.99 6.32-12.75 1.58 3.11v3.27l-3.14 6.37zm15.8.01-6.32-12.75-1.58 3.11v3.27l3.13 6.37z"
                                    style="fill:#41b883"
                                />
                                <path
                                    d="m.2.04 3.95 7.98 2.37-4.78-1.58-3.2zm15.8 0-3.95 7.98-2.37-4.78 1.58-3.2z"
                                    style="fill:#35495e"
                                />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <path d="M0 0h16v16H0z" fill="#fff" />
                            </clipPath>
                        </defs>
                    </svg>
                </a>
                <a href="https://sass-lang.com/install" target="_blank" rel="noopener">
                    <svg
                        enable-background="new 0 0 612 792"
                        version="1.1"
                        viewBox="0 0 500 500"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                    >
                        <g
                            transform="matrix(1.311 0 0 1.311 -150.32 -269.45)"
                            fill="#ec407a"
                            stroke="#ec407a"
                            stroke-width="12.423"
                        >
                            <path
                                d="m434.3 278.93c-9.3-36.49-69.8-48.48-127.06-28.14-34.08 12.11-70.96 31.11-97.49 55.92-31.54 29.5-36.57 55.17-34.49 65.9 7.31 37.85 59.18 62.6 80.5 80.95v.11c-6.29 3.09-52.3 26.38-63.07 50.19-11.36 25.12 1.81 43.14 10.53 45.57 27.02 7.52 54.74-6 69.65-28.23 14.38-21.45 13.18-49.14 6.93-62.92 8.62-2.27 18.67-3.29 31.44-1.8 36.04 4.21 43.11 26.71 41.76 36.13s-8.91 14.6-11.44 16.16-3.3 2.11-3.09 3.27c.31 1.69 1.48 1.63 3.63 1.26 2.97-.5 18.92-7.66 19.61-25.04.87-22.07-20.28-46.76-57.73-46.11-15.42.27-25.12 1.73-32.13 4.34-.52-.59-1.04-1.18-1.59-1.76-23.15-24.7-65.95-42.17-64.14-75.38.66-12.07 4.86-43.86 82.24-82.42 63.39-31.59 114.14-22.89 122.91-3.63 12.53 27.52-27.12 78.67-92.95 86.05-25.08 2.81-38.29-6.91-41.57-10.53-3.46-3.81-3.97-3.98-5.27-3.27-2.1 1.17-.77 4.53 0 6.54 1.97 5.12 10.03 14.19 23.78 18.7 12.1 3.97 41.54 6.15 77.16-7.62 39.88-15.45 71.03-58.37 61.88-94.24zm-169.69 185.94c2.99 11.06 2.66 21.37-.43 30.7-.34 1.04-.72 2.06-1.13 3.08-.41 1.01-.85 2.01-1.33 3-2.38 4.94-5.58 9.56-9.49 13.83-11.94 13.02-28.61 17.95-35.76 13.8-7.72-4.48-3.85-22.84 9.98-37.46 14.89-15.74 36.31-25.86 36.31-25.86l-.03-.06c.62-.34 1.24-.68 1.88-1.03z"
                                fill="#ec407a"
                                stroke="#ec407a"
                                stroke-width="12.423"
                            />
                        </g>
                    </svg>
                </a>
                <p class="img-fluid">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        height="250"
                        viewBox="0 0 300 300"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns:v="https://vecta.io/nano"
                    >
                        <path
                            d="M37 68.5V100h63V37H37v31.5zm54 0V91H46V46h45v22.5zm-36 0V82h27V55H55v13.5zm63.5-30.3c-.2.7-.5 2.6-.7 4.3-.3 2.7-.7 3.1-4.3 3.5-3.9.5-4 .6-4 4.5s.1 4 4 4.5 4 .6 4 4.5-.1 4-4 4.5-4 .6-4 4.5v4h17l.5-4c.5-3.9.6-4 4.5-4s4 .1 4.5 4 .6 4 4.5 4h4l1-17 17-1v-8h-26l-.5 4c-.5 3.9-.6 4-4.5 4h-4l-1-17-3.8-.3c-2.4-.2-3.9.1-4.2 1z"
                        />
                        <use xlink:href="#B" />
                        <path
                            d="M199 68.5V100h63V37h-63v31.5zm54 0V91h-45V46h45v22.5zm-36 0V82h27V55h-27v13.5z"
                        />
                        <use xlink:href="#C" />
                        <use xlink:href="#B" y="18" />
                        <use xlink:href="#D" />
                        <path
                            d="M127.5 74.2c-.3.8-.4 6.8-.3 13.4l.3 11.9h8v-26l-3.8-.3c-2.4-.2-3.9.1-4.2 1z"
                        />
                        <use xlink:href="#B" x="-18" y="36" />
                        <use xlink:href="#B" y="36" />
                        <path
                            d="M109.4 83.3c-.3.8-.4 4.7-.2 8.8l.3 7.4h8v-17l-3.8-.3c-2.5-.2-3.9.1-4.3 1.1z"
                        />
                        <use xlink:href="#B" x="-9" y="45" />
                        <path
                            d="M145.5 92.2c-.3.8-.4 6.8-.3 13.4l.3 11.9h8v-26l-3.8-.3c-2.4-.2-3.9.1-4.2 1zm18 0c-.3.8-.4 6.8-.3 13.4l.3 11.9 4 .5c3.8.5 4 .7 4.5 4.5.5 3.9.6 4 4.5 4s4-.1 4.5-4 .6-4 4.5-4h4v4c0 3.9-.1 4-4 4.5l-4 .5v17h4c3.9 0 4-.1 4.5-4l.5-4 17-1v-4c0-3.9-.1-4-4-4.5l-4-.5-1-17-26-1-1-17-3.8-.3c-2.4-.2-3.9.1-4.2 1z"
                        />
                        <use xlink:href="#B" x="18" y="54" />
                        <path
                            d="M37.4 110.4c-.3.8-.4 2.7-.2 4.3.3 2.4.8 2.9 4.3 3.3 3.8.5 4 .7 4.5 4.5.5 3.9.6 4 4.5 4s4-.1 4.5-4 .6-4 4.5-4h4v4c0 3.9-.1 4-4 4.5-3.8.5-4 .7-4.5 4.5s-.7 4-4.5 4.5-4 .7-4.5 4.5-.7 4-4.5 4.5l-4 .5v44h8l1-35 4-.5c3.8-.5 4-.7 4.5-4.5.5-3.9.6-4 4.5-4h4v26l-8 1v17h4c3.9 0 4-.1 4.5-4 .5-3.8.7-4 4.5-4.5l4-.5 1-17 4-.5c3.9-.5 4-.6 4-4.5s-.1-4-4-4.5l-4-.5v-17l26-1v-4c0-3.9-.1-4-4-4.5-3.8-.5-4-.7-4.5-4.5s-.7-4-4.5-4.5-4-.7-4.5-4.5l-.5-4-21.8-.3c-18.1-.2-21.8 0-22.3 1.2zm54 0c-.3.8-.4 2.7-.2 4.3l.3 2.8 26 1v4c0 3.9-.1 4-4 4.5-3.8.5-4 .7-4.5 4.5s-.7 4-4.5 4.5c-3.9.5-4 .6-4 4.5v4l17 1 1 17h17v-4c0-3.9-.1-4-4-4.5s-4-.6-4-4.5v-4h4c3.9 0 4 .1 4.5 4s.6 4 4.5 4h4l1-17h8l1 17h8l1-17 4-.5c3.9-.5 4-.6 4-4.5v-4h-35l-.5 4c-.5 3.9-.6 4-4.5 4h-4v-17l4-.5c3.9-.5 4-.6 4-4.5v-4l-21.8-.3c-18.1-.2-21.8 0-22.3 1.2zm117-.1c-.3.8-.4 4.7-.2 8.8l.3 7.4 4 .5c3.8.5 4 .7 4.5 4.5.5 3.9.6 4 4.5 4h4v-17l-4-.5c-3.8-.5-4-.7-4.5-4.5s-.7-4-4.3-4.3c-2.5-.2-3.9.1-4.3 1.1z"
                        />
                        <use xlink:href="#B" x="63" y="72" />
                        <use xlink:href="#B" x="81" y="72" />
                        <use xlink:href="#B" x="90" y="81" />
                        <use xlink:href="#B" x="72" y="90" />
                        <use xlink:href="#C" x="-90" y="99" />
                        <path
                            d="M172.4 146.3c-.3.8-.4 4.7-.2 8.8l.3 7.4h17v-4c0-3.9-.1-4-4-4.5-3.8-.5-4-.7-4.5-4.5s-.7-4-4.3-4.3c-2.5-.2-3.9.1-4.3 1.1zm27 .1c-.3.8-.4 2.7-.2 4.3.3 2.4.8 2.9 4.3 3.3 3.8.5 4 .7 4.5 4.5s.7 4 4.5 4.5 4 .7 4.5 4.5c.5 3.9.6 4 4.5 4h4l1-17 4-.5c3.9-.5 4-.6 4-4.5v-4l-17.3-.3c-14.3-.2-17.3 0-17.8 1.2z"
                        />
                        <use xlink:href="#C" x="72" y="99" />
                        <path
                            d="M100.5 155.2c-.2.7-.5 2.6-.7 4.3l-.3 3-17 1v17h4c3.9 0 4-.1 4.5-4l.5-4 17-1v-17l-3.8-.3c-2.4-.2-3.9.1-4.2 1z"
                        />
                        <use xlink:href="#B" x="-18" y="117" />
                        <path
                            d="M154.5 164.2c-.2.7-.5 2.6-.7 4.3-.3 2.7-.7 3.1-4.3 3.5l-4 .5v17l26 1 .5 4c.5 3.8.7 4 4.5 4.5l4 .5v26l-17 1v17l4 .5c3.8.5 4 .7 4.5 4.5.5 3.9.6 4 4.5 4h4l1-17 4-.5c3.8-.5 4-.7 4.5-4.5l.5-4h26v17h-4c-3.9 0-4-.1-4.5-4l-.5-4h-17v26h4c3.9 0 4-.1 4.5-4l.5-4 35-1v-4c0-3.9-.1-4-4-4.5l-4-.5v-17l8-1v-17l-8-1v-17l4-.5c3.9-.5 4-.6 4-4.5v-4l-44-1-.5-4c-.5-3.9-.6-4-4.5-4s-4 .1-4.5 4l-.5 4h-17v-4c0-3.9.1-4 4-4.5s4-.6 4-4.5v-4l-8.3-.3c-6-.2-8.3.1-8.7 1zm62 39.3v13h-26l-.3-11.9c-.1-6.6 0-12.6.2-13.3.4-1.1 3.4-1.3 13.3-1.1l12.8.3v13z"
                        />
                        <use xlink:href="#B" x="36" y="162" />
                        <use xlink:href="#C" x="18" y="117" />
                        <path
                            d="M235.4 164.4c-.3.8-.4 2.7-.2 4.3.3 2.4.8 2.9 4.3 3.3 3.8.5 4 .7 4.5 4.5s.7 4 4.5 4.5l4 .5v17l-17 1v8h26v-44l-12.8-.3c-10.4-.2-12.8 0-13.3 1.2z"
                        />
                        <use xlink:href="#B" x="-45" y="135" />
                        <use xlink:href="#B" x="-90" y="144" />
                        <use xlink:href="#B" x="-72" y="144" />
                        <path
                            d="M109.5 182.2c-.3.8-.4 6.8-.3 13.4l.3 11.9 17 1 .5 4c.5 3.8.7 4 4.5 4.5s4 .7 4.5 4.5.7 4 4.5 4.5l4 .5 1 35h8v-44l-4-.5c-3.9-.5-4-.6-4-4.5v-4h4c3.9 0 4 .1 4.5 4s.6 4 4.5 4 4-.1 4.5-4c.5-3.8.7-4 4.5-4.5 3.9-.5 4-.6 4-4.5v-4l-35-1-.5-4c-.5-3.9-.6-4-4.5-4s-4 .1-4.5 4-.6 4-4.5 4h-4l-1-17-3.8-.3c-2.4-.2-3.9.1-4.2 1zM37 230.5V262h63v-63H37v31.5zm54 0V253H46v-45h45v22.5zm-36 0V244h27v-27H55v13.5zm54.5-12.3c-.3.8-.4 10.8-.3 22.3l.3 21h26v-4c0-3.9-.1-4-4-4.5-3.8-.5-4-.7-4.5-4.5s-.7-4-4.5-4.5c-3.9-.5-4-.6-4-4.5v-4h4c3.9 0 4 .1 4.5 4s.6 4 4.5 4h4v-17l-4-.5c-3.8-.5-4-.7-4.5-4.5l-.5-4-8.3-.3c-6.1-.2-8.4.1-8.7 1z"
                        />
                        <use xlink:href="#D" x="72" y="162" />
                        <use xlink:href="#B" x="72" y="198" />
                        <path
                            d="M244.5 245.2c-.2.7-.5 2.6-.7 4.3-.3 2.7-.7 3.1-4.3 3.5-3.9.5-4 .6-4 4.5v4h26v-4c0-3.9-.1-4-4-4.5-3.8-.5-4-.7-4.5-4.5s-.7-4-4.3-4.3c-2.4-.2-3.9.1-4.2 1z"
                        />
                        <use xlink:href="#B" y="216" />
                        <defs>
                            <path
                                id="B"
                                d="M163.4 38.4c-.3.8-.4 2.7-.2 4.3.3 2.6.7 2.8 4.3 2.8h4v-4c0-3.9-.1-4-3.8-4.3-2.6-.2-3.9.1-4.3 1.2z"
                            />
                            <path
                                id="C"
                                d="M172.4 47.4c-.3.8-.4 2.7-.2 4.3l.3 2.8h17v-8l-8.3-.3c-6.5-.2-8.4 0-8.8 1.2z"
                            />
                            <path
                                id="D"
                                d="M172.4 65.4c-.3.8-.4 2.7-.2 4.3.3 2.4.8 2.9 4.3 3.3 3.8.5 4 .7 4.5 4.5.5 3.9.6 4 4.5 4h4v-17l-8.3-.3c-6.5-.2-8.4 0-8.8 1.2z"
                            />
                        </defs>
                    </svg>
                </p>
                <span>
                    This website has 4 easter eggs. This is one of them.
                    <br />
                    <fa class="text-bpi-blue" icon="smile-wink" size="3x" />
                </span>
            </b-collapse>
        </b-container>
    </div>
</template>

<script>
export default {
    props: {
        footer: { type: Array },
        social: { type: Array }
    }
}
</script>
