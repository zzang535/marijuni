<template>
  <v-row>
    <v-col class="text-center">
        <v-card class="mb-5 pa-5">

            <v-date-picker
                v-model="date" 
                class="mt-4"
            ></v-date-picker>

            <v-text-field
                v-model="comment"
                label="comment"
                class="mt-6"
            ></v-text-field>

            <v-file-input
                v-model="image_file"
                type="file"
                truncate-length="15"
            ></v-file-input>

            <v-btn
                block
                elevation="2"
                @click="upload_feed"
            >upload</v-btn>

        </v-card>


         <!-- 피드 랜더링 -->
        <v-list dense nav>
            <v-card class="mb-5 pa-5">
                <v-list-item
                    v-for="feed in feeds"
                    :key="feed.id"
                    link
                >
                
                    <v-list-item-content
                        class='justify-center'
                    >
                        <v-img
                            class="mt-3"
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="450"
                            max-width="650"
                            :src="feed.image_url"
                        ></v-img>
                        <v-list-item-title class="mt-3">
                            {{ feed.date }}
                        </v-list-item-title>
                        <v-list-item-title>
                            {{ feed.comment }}
                        </v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-card>
        </v-list>



    </v-col>
  </v-row>
</template>

<script>
export default {
    name: 'AlbumPage',
    data() {
        return {
            comment: '',
            date: '2018-03-02',
            image_file: null,
            feeds: []
        }
    },
    methods: {
        get_today() {
            const today = new Date()
            this.date = this.date_fommatter(today)
        },
        date_fommatter(source, delimiter = '-') { 
            const year = source.getFullYear()
            const month = this.left_pad(source.getMonth() + 1)
            const day = this.left_pad(source.getDate())
            return [year, month, day].join(delimiter)
        },
        left_pad(value) { 
            if (value >= 10) { return value } 
            return `0${value}` 
        },
        async upload_feed() {
            try {
                const form_data = new FormData()
                form_data.append('comment', this.comment)
                form_data.append('date', this.date)
                form_data.append('image_file', this.image_file)
                const result = await this.$axios.post(
                    '/api/file/upload_feed', 
                    form_data, 
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                )
                console.log(result)
                window.alert('completed!')
                this.comment = ''
                this.image_file = null
                this.get_feeds()
            } catch (err) {
                console.log(err)
            }
        },
        async get_feeds() {
            try {
                console.log('list call')
                const response = await this.$axios.get('/api/file/list')
                this.feeds = response.data.feeds
            } catch (err) {
                console.log(err)
            }
        }
    },
    created() {
        this.get_today()
        this.get_feeds()
    }
}
</script>
