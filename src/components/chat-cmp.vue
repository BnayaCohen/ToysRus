<template>
    <section class="chat-container flex flex-column justify-between">
        <article>
            <ul class="clean-list">
                <li v-for="(msg, idx) in msgs" :key="idx">
                    <span>{{ msg.from }}: </span>{{ msg.txt }}
                </li>
                <li>
                    <span v-if="anotherUser">{{ anotherUser }} Is typing...</span>
                </li>
            </ul>
        </article>
        <form class="chat-actions flex" @submit.prevent="sendMsg">
            <el-input v-model="msg.txt" @input="typing" type="text" placeholder="Type message..." />
            <el-button type="success" @click="sendMsg">Send</el-button>
        </form>
    </section>
</template>

<script>
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_TYPING_MSG, SOCKET_EVENT_USER_TYPING_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket-service'
import { utilService } from '../services/util-service.js'

export default {
    name: 'chat-cmp',
    props: {
        toyId: String
    },
    data() {
        return {
            msg: {
                from: this.$store.getters.user.username || 'Guest',
                txt: ''
            },
            msgs: [],
            anotherUser: '',
        }
    },
    created() {
        // socketService.setup()
        socketService.emit(SOCKET_EMIT_SET_TOPIC, this.toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)

        socketService.on(SOCKET_EVENT_USER_TYPING_MSG, this.setTypingUser)
    },
    destroyed() {
        socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
        socketService.off(SOCKET_EVENT_USER_TYPING_MSG, this.setTypingUser)
        // socketService.terminate()
    },
    methods: {
        setTypingUser(username) {
            this.anotherUser = username
        },
        typing() {
            socketService.emit(SOCKET_EVENT_TYPING_MSG, this.msg.from)
            utilService.debounce(() => {
                socketService.emit(SOCKET_EVENT_TYPING_MSG, '')
            },2000)()
        },
        addMsg(msg) {
            this.msgs.push(msg)
        },
        sendMsg() {
            if (this.msg.txt === '') return
            console.log('Sending', this.msg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
            this.msg = { ...this.msg }
            this.msg.txt = ''
        },
    }
}
</script>
