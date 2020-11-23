<template>
    <div v-if="ready">
        <b-container class="my-4">
            <b-card :title="$t('image')">
                <create from="gallery" type="gallery">
                    <formulate-form name="gallery" @submit="sendImg()">
                        <formulate-input
                            type="image"
                            v-model="img"
                            :label="$t('image')"
                            validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                            accept="image/jpg, image/jpeg, image/png, image/webp"
                        />

                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>
                <data-table
                    :manual="true"
                    type="gallery"
                    :table="table"
                    :search="false"
                    :del="del"
                />
            </b-card>

            <b-card v-if="access['homepage-video.show']" title="Video" class="my-4">
                <create from="homepage-video" type="video">
                    <formulate-form name="video" @submit="send()">
                        <b-row class="form-group">
                            <b-col cols="6">
                                <formulate-input
                                    type="image"
                                    v-model="video.thumbnail"
                                    :label="$t('admin.homepage.thumbnail')"
                                    :help="$t('admin.homepage.thumbnail_help')"
                                    validation="required|mime:image/jpg,image/jpeg,image/png,image/webp"
                                    accept="image/jpg, image/jpeg, image/png, image/webp"
                                />
                            </b-col>
                            <b-col cols="6">
                                <formulate-input
                                    type="file"
                                    v-model="video.video"
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

                        <formulate-input :label="$t('submit')" type="submit" :disabled="clicked">
                            <b-spinner v-if="clicked" variant="primary" small />
                        </formulate-input>
                    </formulate-form>
                </create>

                <data-table type="video" :table="tablee" :show="show" :del="del" :search="false">
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
            </b-card>
        </b-container>

        <b-modal id="show" :title="$t('detail')" hide-footer>
            <b-row>
                <b-col cols="6">
                    <a
                        :href="sauce('storage/' + modal.thumbnail)"
                        target="_blank"
                    >{{ $t('admin.homepage.thumbnail') }}</a>
                </b-col>
                <b-col cols="6">
                    <a
                        :href="sauce('storage/' + modal.video)"
                        target="_blank"
                    >{{ $t('admin.homepage.video') }}</a>
                </b-col>
            </b-row>
            <b-embed controls type="video" :poster="sauce('storage/' + modal.thumbnail)">
                <source :src="sauce('storage/' + modal.video)" />
            </b-embed>
            <div class="mt-2">
                <strong
                    :class="`text-${modal.is_publish ? 'success' : 'danger'}`"
                >{{ $t('status') }}</strong>
                <p>{{ $t(modal.is_publish ? 'publish' : 'not_publish', {data: $t('admin.homepage.video')}) }}</p>
            </div>
        </b-modal>
        <b-modal
            id="modal-del"
            :title="$t('delete')"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
        >
            <p>{{ $t("confirm_delete") }}</p>
            <b-btn class="btn btn-danger" :disabled="clicked" @click="delImg()">{{ $t("yes") }}</b-btn>
            <a
                href="#"
                class="btn btn-secondary"
                @click.prevent="$bvModal.hide('modal-del')"
            >{{ $t("no") }}</a>
        </b-modal>
    </div>
</template>

<script>
import gallery from './script.gallery'

export default gallery
</script>
