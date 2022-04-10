<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="mb-5">
                <v-card-title>
                    welcome to marijuni
                </v-card-title>
                <v-card-text v-html="greet_korea">
                </v-card-text>
                <v-card-text v-html="greet_japan">
                </v-card-text>
            </v-card>
            <v-card class="mb-5" v-if="feed" v-bind="feed">
                <v-img
                    class="mt-3"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="450"
                    max-width="650"
                    v-bind="feed"
                    :src="feed.image_url"
                ></v-img>
                <v-card-text class="pt-2 pb-0">
                    {{ feed.date }}
                </v-card-text>
                <v-card-text class="pt-2 pb-2">
                    {{ feed.comment }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'IndexPage',
    data() {
        return {
            greet_korea: `안녕하세요, 마리씨와 준씨의 인터넷 집입니다.
                <br>오늘은 이 두 분이 만난지 ${this.aniversary_gen()}일이 되는 날입니다.
                <br>오늘의 사진을 뽑아 보았습니다!`,
            greet_japan: `こんにちは、まりさんとじゅんさんのネットの家です。
                <br>今日はこの二人が会った日か${this.aniversary_gen()}日になる日です。
                <br>今日の写真を選んでみました!`,
            feeds: [],
            feed: null,
            date: '',
        }
    },
    methods: {
        async get_feeds_and_pick() {
            try {
                console.log('list call')
                const response = await this.$axios.get('/api/file/list')
                this.feeds = response.data.feeds
                const index = this.rand(0, this.feeds.length - 1)
                this.feed = this.feeds[index]
            } catch (err) {
                console.log(err)
            }
        },
        aniversary_gen() {
            let firstDate = new Date(2019, 7, 17)
            let today = new Date()
            let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            let oneDay = 24 * 60 * 60 * 1000
            let result = (currentDate - firstDate) / oneDay + 1
            return result
        },
        pick_one() {
            const index = this.rand(0, this.feeds.length - 1)
            this.feed = this.feeds[index]
        },
        rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
    },
    created() {
        this.get_feeds_and_pick()
    }
}
</script>
