<template>
  <NavBarVue />
  <div class="about">
    <div class="terminal" @click="focusCommandInput">
      <div class="terminal-title">
        <div class="terminal-title-btn red"></div>
        <div class="terminal-title-btn yellow"></div>
        <div class="terminal-title-btn green"></div>
        <div class="terminal-title-text">About Me</div>
      </div>
      <div class="terminal-content" ref="terminalContent">
        <div
          v-for="(line, index) in content"
          :key="index"
          class="terminal-content-text"
        >
          <span v-if="line.isCommand">➜ ~ </span>
          <span v-if="line.needColor" :class="line.class">{{
            line.colorText
          }}</span>
          <span>{{ line.text }}</span>
        </div>
        <div class="terminal-input">
          <div class="terminal-input-text">
            <span class="termain-pointer">➜ ~ </span>
            <span class="command-display">{{ commandBeforeCursor }}</span>
            <span class="cursor">&nbsp;&nbsp;</span>
            <span class="command-display">{{ commandAfterCursor }}</span>
            <input
              ref="commandInput"
              class="command-input"
              type="text"
              v-model="command"
              @input="updateCursor"
              @keyup="updateCursor"
              @keypress.enter="processCommand"
              v-show = this.isCommendInputDisplay
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import NavBarVue from "@/components/NavBar.vue";
import aboutCommand from "@/assets/aboutCommand.json";

export default {
  name: "AboutPage",
  components: {
    NavBarVue,
  },
  data() {
    return {
      command: "",
      cursorPos: 0,
      content: [],
      isCommendInputDisplay: false,
    };
  },
  computed: {
    commandBeforeCursor() {
      return this.command.slice(0, this.cursorPos);
    },
    commandAfterCursor() {
      return this.command.slice(this.cursorPos);
    },
  },
  mounted() {
    this.content = [];
    this.animateContent("intro");
  },
  methods: {
    async animateContent(command) {
      await this.displayLoadingDots();
      await this.typeContent(command);

      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "help" to get a supporting command list.`,
      });
      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "clear" to clear the terminal screen.`,
      });
      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "exit" to return to the main page.`,
      });
      this.isCommendInputDisplay = true;
      this.$nextTick(() => {
        this.focusCommandInput();
      });
    },

    async displayLoadingDots() {
      const loadingText = { text: "Loading", isCommand: false };
      this.content.push(loadingText);
      this.focusCommandInput();

      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        loadingText.text += ".";
        this.$forceUpdate(); // 强制刷新视图
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.content.pop(); // 移除Loading...文字
    },

    async typeContent(inputCommand) {
      if (aboutCommand[inputCommand]) {
        for (let key in aboutCommand[inputCommand]) {
          for (let line of aboutCommand[inputCommand][key]) {
            await this.typeLine(line, inputCommand, key);
          }
        }
      }
      this.$nextTick(() => {
        const terminalContent = this.$refs.terminalContent;
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    },

    async typeLine(line, inputCommand, key) {
      let obj = {};
      if (key === "Weclome" || key === "MySignature") {
        obj = { text: "" };
      } else {
        obj = {
          needColor: true,
          class: [inputCommand, key, "color-span"],
          colorText: key,
          text: "",
        };
      }
      this.content.push(obj);
      let currentText = "";
      for (let char of line) {
        currentText += char;
        obj.text = currentText;
        this.$forceUpdate(); // 强制刷新视图
        await new Promise((resolve) => setTimeout(resolve, 10)); // 每个字符间隔时间
      }
      await new Promise((resolve) => setTimeout(resolve, 100)); // 每行之间间隔时间
    },

    focusCommandInput() {
      this.$refs.commandInput.focus();
    },

    updateCursor() {
      this.cursorPos = this.$refs.commandInput.selectionStart;
      if (this.cursorPos < 0) {
        this.cursorPos = 0;
      }
    },

    processCommand() {
      const inputCommand = this.command.trim().toLowerCase();
      console.log(inputCommand);
      this.content.push({ isCommand: true, text: inputCommand });
      if (inputCommand === "clear") {
        this.content = [];
        this.command = "";
        this.focusCommandInput();
        return;
      }

      if (inputCommand === "exit") {
        this.$router.push({ path: "/" });
        return;
      }

      if (inputCommand === "blog"){
        this.$router.push({ path: "/blog" });
        return;
      }

      if(inputCommand === "project"){
        // 我想通过新页打开我的项目地址
        this.$router.push({ path: "/project" });
        return;
      }

      if (aboutCommand[inputCommand]) {
        for (let key in aboutCommand[inputCommand]) {
          for (let line of aboutCommand[inputCommand][key]) {
            if (key === "Weclome" || key === "MySignature") {
              this.content.push({ text: line });
              continue;
            }

            this.content.push({
              needColor: true,
              class: [inputCommand, key, "color-span"],
              colorText: key,
              text: line,
            });
          }
        }
      } else {
        this.content.push({
          needColor: true,
          class: ["Error", "color-span"],
          colorText: "Error",
          text: ` command not found: ${inputCommand}`,
        });
        this.content.push({
          needColor: true,
          class: ["System", "color-span"],
          colorText: "System",
          text: ` Type "help" to get a supporting command list.`,
        });
      }

      this.command = "";
      this.focusCommandInput();

      // 跳转至最底部
      this.$nextTick(() => {
        const terminalContent = this.$refs.terminalContent;
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    },

    initTerminal(inputCommand) {
      if (aboutCommand[inputCommand]) {
        for (let key in aboutCommand[inputCommand]) {
          for (let line of aboutCommand[inputCommand][key]) {
            this.content.push({
              needColor: true,
              class: [inputCommand, key, "color-span"],
              colorText: key,
              text: line,
            });
          }
        }
      }

      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "help" to get a supporting command list.`,
      });
      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "clear" to clear the terminal screen.`,
      });
      this.content.push({
        needColor: true,
        class: ["System", "color-span"],
        colorText: "System",
        text: ` Type "exit" to return to the main page.`,
      });
      this.$nextTick(() => {
        const terminalContent = this.$refs.terminalContent;
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.about {
  text-align: left;
  color: #ffff;
  display: flex;
  font-weight: 800;
  flex-direction: column;
}

.terminal {
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 20px auto;
  margin-top: 3.5vh;
  max-width: 900px;
  padding-bottom: 20px;
  width: 90%;
}

.terminal-title {
  background-color: #333;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  padding: 5px 10px;
}

.terminal-title-btn {
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin-left: 5px;
}

.terminal-title-text {
  font-family: sans-serif;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 38%;
}

.terminal-content {
  height: 75vh;
  overflow-y: auto;
  padding: 20px;
}
.terminal-content::-webkit-scrollbar {
  display: none;
}

.terminal-content-text {
  color: #fff;
  font-size: 16px;
  line-height: 2.5;
}
.terminal-content-text .color-span {
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 3px;
}
.terminal-content-text .Name,
.terminal-content-text .School,
.terminal-content-text .Program,
.terminal-content-text .Email,
.terminal-content-text .connect {
  background-color: rgb(41, 128, 185);
}
.terminal-content-text .help,
.terminal-content-text .ls,
.terminal-content-text .A,
.terminal-content-text .Done {
  background-color: rgb(39, 174, 96);
}
.terminal-content-text .System {
  background-color: rgb(153, 153, 153);
}
.terminal-content-text .B {
  background-color: rgb(243, 156, 18);
}
.terminal-content-text .Stacking,
.terminal-content-text .Error {
  background-color: rgb(192, 57, 43);
}

.terminal-input {
  /* background-color: #333; */
  /* border-bottom-left-radius: 10px; */
  /* border-bottom-right-radius: 10px; */
  /* padding: 5px 10px; */
  padding-top: 10px;
  font-weight: 400;
  word-break: break-all;
}

.cursor {
  background-color: #fff;
  color: #000;
  line-height: 1.5;
  animation: flash 1s infinite;
}

.terminal-input-text {
  color: #fff;
  font-weight: 800;
  font-size: 16px;
}

.termain-pointer {
  word-break: break-all;
  font-weight: 800;
  color: rgb(155, 247, 134);
}

.command-input {
  width: 0px;
  cursor: default;
  opacity: 0;
}

.red {
  background-color: #ff5f56;
}

.yellow {
  background-color: #ffbd2e;
}

.green {
  background-color: #27c93f;
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .terminal {
    width: 80%;
  }
}

@media (max-width: 430px) {
  .terminal-content-text {
    font-size: 12px;
  }
}
</style>
