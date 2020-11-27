<template>
    <div class="my-4">
        <b-container v-if="table.section.items.length > 0">
            <b-card
                v-if="access['homepage-carousel.show']"
                class="my-4"
                :title="$t('admin.homepage.carousel')"
            >
                <b-card-body>
                    <create from="homepage-carousel" type="carousel">
                        <formulate-form name="carousel" @submit="send('carousel')">
                            <b-row class="form-group">
                                <b-col cols="6">
                                    <formulate-input
                                        type="select"
                                        v-model="form.carousel.type"
                                        :label="$t('type')"
                                        :placeholder="$t('type_choose')"
                                        :options="{1: $t('type_one'), 2: $t('type_two')}"
                                        validation="required"
                                    />
                                    <v-img
                                        v-if="form.carousel.type > 0"
                                        :src="sauce(`img/carousel-type-${form.carousel.type}.png`)"
                                    />
                                </b-col>
                                <b-col cols="6">
                                    <formulate-input
                                        type="image"
                                        v-model="form.carousel.url"
                                        :label="$t('image')"
                                        validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                                        accept="image/jpg, image/jpeg, image/png, image/webp"
                                    />
                                </b-col>
                            </b-row>

                            <formulate-input
                                type="text"
                                v-model="form.carousel.title"
                                :label="$t('title')"
                                validation="required"
                            />
                            <formulate-input
                                type="textarea"
                                v-model="form.carousel.description"
                                :label="$t('description')"
                                :help="$t('nullable')"
                            />

                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.carousel"
                            >
                                <b-spinner v-if="clicked.carousel" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>
                    <data-table type="carousel" :table="table.carousel" :edit="edit" :del="del" />
                </b-card-body>
            </b-card>

            <b-card v-if="access['homepage-video.show']" class="my-4">
                <b-card-body>
                    <b-card-title>
                        <b-btn
                            v-if="access['homepage-video.update']"
                            variant="info"
                            :title="$t('edit')"
                            v-b-tooltip.hover
                            size="sm"
                            @click="edit('section', table.section.items[0])"
                        >
                            <fa icon="pencil-alt" />
                        </b-btn>
                        {{ cardTtl('admin.homepage.video', 0) }}
                    </b-card-title>
                    <create from="homepage-video" type="video">
                        <formulate-form name="video" @submit="send('video')">
                            <b-row class="form-group">
                                <b-col cols="6">
                                    <formulate-input
                                        type="image"
                                        v-model="form.video.thumbnail"
                                        :label="$t('admin.homepage.thumbnail')"
                                        :help="
                                            $t('admin.homepage.thumbnail_help')
                                        "
                                        validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                                        accept="image/jpg, image/jpeg, image/png, image/webp"
                                    />
                                </b-col>
                                <b-col cols="6">
                                    <formulate-input
                                        type="file"
                                        v-model="form.video.video"
                                        :label="$t('admin.homepage.video')"
                                        :help="$t('admin.homepage.video_help')"
                                        validation="required|mime:video/mp4,video/webm"
                                        accept="video/m4v, video/mp4, video/webm"
                                        :uploader="uploadFile"
                                    />
                                    <b-progress
                                        v-if="videoLoad > 0 && videoLoad < 100"
                                        :value="videoLoad"
                                        variant="success"
                                        animated
                                    />
                                </b-col>
                            </b-row>

                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.video"
                            >
                                <b-spinner v-if="clicked.video" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>

                    <data-table
                        type="video"
                        :table="table.video"
                        :show="show"
                        :del="del"
                        :search="false"
                    >
                        <template #default="data">
                            <b-btn
                                v-if="access['homepage-video.update']"
                                variant="info"
                                size="sm"
                                @click="videoPublish(data.cell.id)"
                                v-b-tooltip.hover
                                :title="$t(data.cell.is_publish ? 'publish' : 'not_publish', {data: $t('admin.homepage.video')})"
                            >
                                <fa :icon="data.cell.is_publish ? 'toggle-on' : 'toggle-off'" />
                            </b-btn>
                        </template>
                    </data-table>
                </b-card-body>
            </b-card>

            <b-card v-if="access['homepage-about.show']" class="my-4">
                <b-card-body v-if="access['homepage-about.update']">
                    <b-card-title>
                        <b-btn
                            variant="info"
                            :title="$t('edit')"
                            v-b-tooltip.hover
                            size="sm"
                            @click="edit('section', table.section.items[1])"
                        >
                            <fa icon="pencil-alt" />
                        </b-btn>
                        {{ cardTtl('admin.homepage.video', 1) }}
                    </b-card-title>
                    <formulate-form name="about" @submit="sendAbout()">
                        <b-row class="mb-2">
                            <b-col sm="12" md="6" lg="8">
                                <formulate-input
                                    type="markdown"
                                    v-model="table.about.content"
                                    validation="required"
                                />
                            </b-col>
                            <b-col sm="12" md="6" lg="4">
                                <formulate-input
                                    type="image"
                                    v-model="aboutImg"
                                    validation="mime:image/jpg,image/jpeg,image/png,image/webp"
                                    accept="image/jpg, image/jpeg, image/png, image/webp"
                                />
                                <v-img :src="sauce('storage/' + table.about.url)" />
                            </b-col>
                        </b-row>
                        <formulate-input
                            :label="$t('update')"
                            type="submit"
                            :disabled="clicked.about"
                        >
                            <b-spinner v-if="clicked.about" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </b-card-body>
                <b-card-body v-else>
                    <b-card-title>{{ cardTtl('admin.homepage.video', 0) }}</b-card-title>
                    <b-row>
                        <b-col sm="12" md="6" lg="8">
                            <markdown :content="table.about.content" />
                        </b-col>
                        <b-col sm="12" md="6" lg="4">
                            <v-img :src="sauce('storage/' + table.about.url)" />
                        </b-col>
                    </b-row>
                </b-card-body>
            </b-card>

            <b-card class="my-4">
                <b-row>
                    <b-col cols="6">
                        <b-card-title>
                            <b-btn
                                variant="info"
                                :title="$t('edit')"
                                v-b-tooltip.hover
                                size="sm"
                                @click="edit('section', table.section.items[2])"
                            >
                                <fa icon="pencil-alt" />
                            </b-btn>
                            {{ cardTtl('navbar.medias.news', 2) }}
                        </b-card-title>
                    </b-col>
                    <b-col cols="6">
                        <b-card-title class="text-right">
                            <b-btn
                                variant="info"
                                :title="$t('edit')"
                                v-b-tooltip.hover
                                size="sm"
                                @click="edit('section', table.section.items[3])"
                            >
                                <fa icon="pencil-alt" />
                            </b-btn>
                            {{ cardTtl('navbar.medias.news', 3) }}
                        </b-card-title>
                    </b-col>
                </b-row>
            </b-card>

            <b-card v-if="access['homepage-alumni.show']" class="my-4">
                <b-card-body>
                    <b-card-title>
                        <b-btn
                            v-if="access['homepage-alumni.update']"
                            variant="info"
                            :title="$t('edit')"
                            v-b-tooltip.hover
                            size="sm"
                            @click="edit('section', table.section.items[4])"
                        >
                            <fa icon="pencil-alt" />
                        </b-btn>
                        {{ cardTtl('admin.homepage.alumni', 4) }}
                    </b-card-title>
                    <create from="homepage-alumni" type="alumni">
                        <formulate-form name="alumni" @submit="send('alumni')">
                            <b-row>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.alumni.name"
                                        :label="$t('name')"
                                        validation="required"
                                    />
                                </b-col>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.alumni.company"
                                        :label="$t('company')"
                                        validation="required"
                                    />
                                </b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="textarea"
                                        v-model="form.alumni.content"
                                        :label="$t('content')"
                                        validation="required"
                                    />
                                </b-col>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="image"
                                        v-model="form.alumni.url"
                                        :label="$t('image')"
                                        validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                                        accept="image/jpg, image/jpeg, image/png, image/webp"
                                    />
                                </b-col>
                            </b-row>
                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.alumni"
                            >
                                <b-spinner v-if="clicked.alumni" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>

                    <data-table
                        type="alumni"
                        :table="table.alumni"
                        :show="show"
                        :edit="edit"
                        :del="del"
                    >
                        <template #default="data">
                            <b-btn
                                v-if="access['homepage-alumni.update']"
                                variant="info"
                                size="sm"
                                @click="videoPublish(data.cell.id, 'alumni')"
                                v-b-tooltip.hover
                                :title="$t(data.cell.is_publish ? 'publish' : 'not_publish', {data: $t('admin.homepage.alumni')})"
                            >
                                <fa :icon="data.cell.is_publish ? 'toggle-on' : 'toggle-off'" />
                            </b-btn>
                        </template>
                    </data-table>
                </b-card-body>
            </b-card>

            <b-card v-if="access['homepage-company.show']" class="my-4">
                <b-card-body>
                    <b-card-title>
                        <b-btn
                            v-if="access['homepage-company.update']"
                            variant="info"
                            :title="$t('edit')"
                            v-b-tooltip.hover
                            size="sm"
                            @click="edit('section', table.section.items[5])"
                        >
                            <fa icon="pencil-alt" />
                        </b-btn>
                        {{ cardTtl('admin.homepage.company', 5) }}
                    </b-card-title>
                    <create from="homepage-company" type="company">
                        <formulate-form name="company" @submit="send('company')">
                            <b-row class="mb-2">
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="image"
                                        v-model="form.company.url"
                                        :label="$t('image')"
                                        validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                                        accept="image/jpg, image/jpeg, image/png, image/webp"
                                    />
                                </b-col>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.company.link"
                                        :label="$t('link')"
                                        validation="required|regex_url"
                                        :validation-rules="{
                                            regex_url: ({ value }) => new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi).test(value)
                                        }"
                                        :validation-messages="{
                                            regex_url: 'The link format is invalid'
                                        }"
                                    />
                                </b-col>
                            </b-row>
                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.company"
                            >
                                <b-spinner v-if="clicked.company" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>

                    <data-table
                        type="company"
                        :table="table.company"
                        :show="show"
                        :edit="edit"
                        :del="del"
                    />
                </b-card-body>
            </b-card>

            <b-card
                v-if="access['homepage-social-media.show']"
                class="my-4"
                :title="$t('admin.homepage.social')"
            >
                <b-card-body>
                    <create from="homepage-social-media" type="social">
                        <formulate-form name="social" @submit="send('social')">
                            <b-row class="mb-2">
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.social.icon"
                                        :label="$t('icon')"
                                        validation="required"
                                    />
                                    <span>
                                        <a
                                            href="https://fontawesome.com/icons?d=gallery&s=brands&m=free"
                                            target="_blank"
                                        >{{ $t('icon_list') }}</a>
                                    </span>
                                </b-col>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.social.link"
                                        :label="$t('link')"
                                        validation="required|regex_url"
                                        :validation-rules="{
                                            regex_url: ({ value }) => new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi).test(value)
                                        }"
                                        :validation-messages="{
                                            regex_url: 'The link format is invalid'
                                        }"
                                    />
                                </b-col>
                            </b-row>
                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.social"
                            >
                                <b-spinner v-if="clicked.social" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>

                    <data-table
                        type="social-media"
                        :table="table.social"
                        :edit="edit"
                        :del="del"
                        :access="access"
                    />
                </b-card-body>
            </b-card>

            <b-card
                v-if="access['homepage-footer.show']"
                class="my-4"
                :title="$t('admin.homepage.footer')"
            >
                <b-card-body>
                    <create from="homepage-footer" type="footer">
                        <formulate-form name="footer" @submit="send('footer')">
                            <b-row class="mb-2">
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.footer.key"
                                        :label="$t('name')"
                                        validation="required"
                                    />
                                </b-col>
                                <b-col sm="12" md="6" lg="6">
                                    <formulate-input
                                        type="text"
                                        v-model="form.footer.value"
                                        :label="$t('value')"
                                        validation="required"
                                    />
                                </b-col>
                            </b-row>
                            <formulate-input
                                :label="$t('submit')"
                                type="submit"
                                :disabled="clicked.footer"
                            >
                                <b-spinner v-if="clicked.footer" variant="primary" small />
                            </formulate-input>
                        </formulate-form>
                    </create>

                    <data-table
                        type="footer"
                        :table="table.footer"
                        :edit="edit"
                        :del="del"
                        :access="access"
                    />
                </b-card-body>
            </b-card>
        </b-container>

        <b-modal id="homepage-modal-show" :title="$t('detail')" hide-footer>
            <div v-if="typeModal === 'video'">
                <b-row>
                    <b-col cols="6">
                        <a
                            :href="sauce('storage/' + modalShow.thumbnail)"
                            target="_blank"
                        >{{ $t('admin.homepage.thumbnail') }}</a>
                    </b-col>
                    <b-col cols="6">
                        <a
                            :href="sauce('storage/' + modalShow.video)"
                            target="_blank"
                        >{{ $t('admin.homepage.video') }}</a>
                    </b-col>
                </b-row>
                <b-embed controls type="video" :poster="sauce('storage/' + modalShow.thumbnail)">
                    <source :src="sauce('storage/' + modalShow.video)" />
                </b-embed>
                <div class="mt-2">
                    <strong
                        :class="`text-${modalShow.is_publish ? 'success' : 'danger'}`"
                    >{{ $t('status') }}</strong>
                    <p>{{ $t(modalShow.is_publish ? 'publish' : 'not_publish', {data: $t('admin.homepage.video')}) }}</p>
                </div>
            </div>
            <div v-else-if="typeModal === 'alumni'">
                <b-row class="mb-2">
                    <b-col cols="6">
                        <div class="mb-2">
                            <strong>{{ $t('name') }}</strong>
                            <p>{{ modalShow.name }}</p>
                        </div>
                        <strong>{{ $t('company') }}</strong>
                        <p>{{ modalShow.company }}</p>
                    </b-col>
                    <b-col cols="6">
                        <strong
                            :class="`text-${modalShow.is_publish ? 'success' : 'danger'}`"
                        >{{ $t('status') }}</strong>
                        <p>{{ $t(modalShow.is_publish ? 'publish' : 'not_publish', {data: $t('admin.homepage.alumni')}) }}</p>
                    </b-col>
                </b-row>
                <strong>{{ $t('content') }}</strong>
                <p>{{ modalShow.content }}</p>
                <v-img :src="sauce('storage/' + modalShow.url)" />
            </div>
            <div v-else-if="typeModal === 'company'">
                <div class="form-group">
                    <a :href="modalShow.link" target="_blank">{{ modalShow.link }}</a>
                </div>
                <div class="form-group">
                    <v-img :src="sauce('storage/' + modalShow.url)" />
                </div>
            </div>
        </b-modal>
        <b-modal id="homepage-modal-edit" :title="$t('edit')" size="lg" hide-footer>
            <form @submit.prevent="send(typeModal, '/update')">
                <div
                    v-if="
                        access['homepage-carousel.update'] &&
                        typeModal === 'carousel'
                    "
                >
                    <b-row class="mb-2">
                        <b-col cols="6">
                            <b-form-select
                                v-model="modalEdit.type"
                                :options="[{value: 1, text: $t('type_one')}, {value: 2, text: $t('type_two')}]"
                                required
                            />
                        </b-col>
                        <b-col cols="6">
                            <b-form-file
                                v-model="modalEdit.url"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                            />
                        </b-col>
                    </b-row>

                    <b-form-group :label="$t('title')">
                        <b-form-input v-model="modalEdit.title" required />
                    </b-form-group>

                    <b-form-group :label="$t('description')">
                        <b-form-textarea v-model="modalEdit.description" required />
                    </b-form-group>
                </div>
                <div
                    v-else-if="
                        access['homepage-alumni.update'] &&
                        typeModal === 'alumni'
                    "
                >
                    <b-row>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group :label="$t('name')">
                                <b-form-input v-model="modalEdit.name" required />
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group :label="$t('company')">
                                <b-form-input v-model="modalEdit.company" required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="my-2">
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('content') }}</label>
                            <b-form-textarea v-model="modalEdit.content" />
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('image') }}</label>
                            <b-form-file
                                v-model="modalEdit.url"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                            />
                        </b-col>
                    </b-row>
                </div>
                <div
                    v-else-if="
                        access['homepage-company.update'] &&
                        typeModal === 'company'
                    "
                >
                    <b-row class="my-2">
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('image') }}</label>
                            <b-form-file
                                v-model="modalEdit.url"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                            />
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('link') }}</label>
                            <b-form-input v-model="modalEdit.link" required />
                        </b-col>
                    </b-row>
                </div>
                <div
                    v-else-if="
                        access['homepage-social-media.update'] &&
                        typeModal === 'social'
                    "
                >
                    <b-row class="my-2">
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('icon') }}</label>
                            <b-form-input v-model="modalEdit.icon" required />
                            <span>
                                <a
                                    :href="`https://fontawesome.com/icons?d=gallery&s=brands&m=fre&q=${modalEdit.icon}`"
                                    target="_blank"
                                >{{ $t('icon_list') }}</a>
                            </span>
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('link') }}</label>
                            <b-form-input v-model="modalEdit.link" required />
                        </b-col>
                    </b-row>
                </div>
                <div
                    v-else-if="
                        access['homepage-footer.update'] &&
                        typeModal === 'footer'
                    "
                >
                    <b-row class="my-2">
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('name') }}</label>
                            <b-form-input v-model="modalEdit.key" required />
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('value') }}</label>
                            <b-form-input v-model="modalEdit.value" required />
                        </b-col>
                    </b-row>
                </div>
                <div v-else-if="typeModal === 'section'">
                    <b-row class="my-2">
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('title') }}</label>
                            <b-form-input v-model="modalEdit.title" required />
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <label>{{ $t('subtitle') }}</label>
                            <b-form-input v-model="modalEdit.subtitle" required />
                        </b-col>
                    </b-row>
                </div>
                <formulate-input :label="$t('update')" type="submit" :disabled="clicked[typeModal]">
                    <b-spinner v-if="clicked[typeModal]" variant="primary" small />
                </formulate-input>
            </form>
        </b-modal>
        <b-modal
            id="homepage-modal-del"
            :title="$t('delete')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_delete") }}</p>
            <b-btn
                class="btn btn-danger"
                :disabled="clicked[typeModal]"
                @click="destroy(typeModal)"
            >{{ $t("yes") }}</b-btn>
            <a
                href="#"
                class="btn btn-secondary"
                @click.prevent="$bvModal.hide('homepage-modal-del')"
            >{{ $t("no") }}</a>
        </b-modal>
    </div>
</template>

<script>
import homepage from './script.homepage'

export default homepage
</script>
