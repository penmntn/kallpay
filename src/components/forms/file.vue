<template>
        <div>
            <vs-button class="kdmskdmskmdskmdksmdksmkdms"> agregae archibos </vs-button>
            <div ref="holoncteni" id="askas"  class="w-full">sa</div>
            <div class="editor" ></div>
        </div>
</template>

<script>
    import Uppy from '@uppy/core';
    // eslint-disable-next-line no-unused-vars
    import XHRUpload from '@uppy/xhr-upload';
    import Dashboard from '@uppy/dashboard';
    // eslint-disable-next-line no-unused-vars
    import drag from '@uppy/drag-drop';
    // eslint-disable-next-line no-unused-vars
    import Form from '@uppy/form';
    import editor from '@uppy/image-editor'
    import Webcam from '@uppy/webcam'
    // eslint-disable-next-line no-unused-vars
    import tus from '@uppy/tus'
    import ScreenCapture from '@uppy/screen-capture'
    import '@uppy/webcam/dist/style.css'
    import '@uppy/core/dist/style.css';
    import '@uppy/dashboard/dist/style.css';
    import '@uppy/image-editor/dist/style.css'
    import '@uppy/screen-capture/dist/style.css'
    import '@uppy/drag-drop/dist/style.css'

    export default {
        props: {
            formId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                payload: null,
                path: null,
                disabled: false
            }
        },
        mounted() {

            this.$nextTick(() => {

                // eslint-disable-next-line no-unused-vars
                const options = {
                    providerOptions: {
                        drive: {
                        key: 'AIzaSyCrsdt0JN-uWnlitwd7rSDPU220Iy6ae-I',
                        secret: '9vc3DCyuSrcHKV0bIZeP0AoD'
                        }
                    },
                    server: {
                        host: 'localhost:8080',
                        protocol: 'http',
                    }
                    }

                this.uppy = Uppy()
                .use(Webcam)
                .use(Dashboard, {
                    trigger: '.kdmskdmskmdskmdksmdksmkdms',
                    replaceTargetContent: true,
                    showProgressDetails: true,
                    inline: true,
                    target: this.$refs.holoncteni,
                    note: '1 file only (up to 1 MB)',
                    maxHeight: 200,
                    maxWidth : 1600,
                    height: 500,
                    browserBackButtonClose: true,
                    hideProgressAfterFinish: 150,
                    hideUploadButton: false,
                    plugins:['Webcam','ImageEditor'],
                    metaFields: [
                            { id: 'name', name: 'Name', placeholder: 'file name' },
                            { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
                            { id: 'detalle', name: 'detalle', placeholder: 'describe what the image is about' }
                        ]
                })
                .use(editor, {
                    id: 'ImageEditor',
                    target: Dashboard,
                    quality: 0.8,
                    inline:false,
                    cropperOptions: {
                        viewMode: 1,
                        background: false,
                        autoCropArea: 1,
                        responsive: true
                    }
                })
                .use(ScreenCapture, { target: Dashboard })
                .use(XHRUpload,{ endpoint: 'http://localhost:1337/upload', fieldName :'files' } );


                this.uppy.on('complete', (event) => {
                    if(event.successful[0] !== undefined) {
                        this.payload = event.successful[0].response.body.path;
                    }
                });
            });
        },
        methods: {
            confirmUpload() {
                if(this.payload !== null) {
                    this.disabled = true;
                    console.log('dsdn')
                }

            }
        }
    };
</script>

<style scoped>
    .image-container {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: auto;
        margin-left: auto;
    }

    .image-container > img {
        width: inherit;
        height: inherit;
    }
    .boxedoodkeo{
        overflow: auto;
        position: fixed;
        z-index: 90000;
    }
</style>