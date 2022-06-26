<template>
  <v-row>
    <v-col class="text-center">

        <!-- 업로드 -->
        <v-card class="mb-5 pa-5">
            <v-date-picker class="mt-4" v-model="history.date"></v-date-picker>
            <v-textarea label="content_japanese" class="mt-6" v-model="history.content_japanese"></v-textarea>
            <v-textarea label="content_korean" class="mt-6" v-model="history.content_korean"></v-textarea>
            <v-btn block elevation="2" @click="upload_item">upload</v-btn>
        </v-card>

        <!-- 리스트 -->
        <v-list dense nav>
            <v-card class="mb-5 pa-5">
                <v-list-item v-for="history in histories" :key="history.id" link>
                    <v-list-item-content class='justify-center'>
                        <v-list-item-title class="mt-3">{{ history.date }}</v-list-item-title>
                        <v-list-item-title>{{ history.content_japanese }}</v-list-item-title>
                        <v-list-item-title>{{ history.content_korean }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-list>

    </v-col>
  </v-row>
</template>

<script>
export default {
    name: 'History',
    data() {
        return {
            histories: [],
            history: {
                date: null,
                content_korean: '',
                content_japanese: ''
            },
            history_initial: {
                date: null,
                content_korean: '',
                content_japanese: ''
            },
        }
    },
    created() {
        this.get_list()
    },
    methods: {
        async get_list() {
            try {
                console.log('list call')
                const response = await this.$axios.get('/api/history/list')
                console.log(response)
                this.histories = response.data.data
            } catch (err) {
                console.log(err)
            }
        },
        async upload_item() {
            try {
                const { date, content_korean, content_japanese } = this.history
                if(!date || !content_korean || !content_japanese) { window.alert('모두 입력해주세요!'); return}
                const result = await this.$axios.post('/api/history/upload', this.history)
                console.log(result)
                this.history = this.history_initial
                window.alert('업로드 완료!')
                this.get_list()
            } catch (err) {
                console.log(err)
            }
        },
        
    },
}
</script>
